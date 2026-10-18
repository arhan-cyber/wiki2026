import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './futureScope.module.css';

/** Corner radius of the line's centreline where it turns. */
const R = 16;

type Geo = {
  w: number;
  h: number;
  /** SVG path of the line's centreline through every step. */
  d: string;
  bar: number;
  /** y of each card's title row — a station lights up there once the drop passes. */
  stations: number[];
};

// Trace the snaking line from the step boxes: down one side of a card, across
// beneath it, down the other side of the next card, and so on.
function measure(track: HTMLElement): Geo | null {
  const steps = [...track.children].filter((el) => el.classList.contains(styles.step)) as HTMLElement[];
  if (!steps.length) return null;
  const tr = track.getBoundingClientRect();
  const bar = parseFloat(getComputedStyle(track).getPropertyValue('--bar')) || 10;
  const half = bar / 2;
  let d = '';
  const stations: number[] = [];

  steps.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const top = r.top - tr.top;
    const bottom = r.bottom - tr.top;
    const left = r.left - tr.left + half;
    const right = r.right - tr.left - half;
    const leftSide = i % 2 === 0;
    const x = leftSide ? left : right;
    const x2 = leftSide ? right : left;
    const dir = leftSide ? 1 : -1;

    const card = el.firstElementChild as HTMLElement | null;
    if (card) stations.push(card.getBoundingClientRect().top - tr.top + 36);

    if (i === 0) d += `M ${x} ${top}`;
    if (i === steps.length - 1) {
      d += ` L ${x} ${bottom}`;
      return;
    }
    const yb = bottom - half;
    d += ` L ${x} ${yb - R} Q ${x} ${yb} ${x + dir * R} ${yb}`;
    d += ` L ${x2 - dir * R} ${yb} Q ${x2} ${yb} ${x2} ${yb + R}`;
  });

  return { w: tr.width, h: tr.height, d, bar, stations };
}

/**
 * The line that links the scope cards, with a drop of coolant that runs along
 * it as the page scrolls. Line behind the drop fills with glowing aqua coolant
 * (a glossy core with bubbles flowing through it), and each card's station
 * lights up as the drop reaches it.
 */
export default function ScopeTrack({ children }: { children: ReactNode }) {
  const uid = useId().replace(/:/g, '');
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const stationRefs = useRef<(SVGGElement | null)[]>([]);
  // Distance travelled along the line, kept across re-measures.
  const curRef = useRef<number | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setGeo(measure(el));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const path = pathRef.current;
    const fill = fillRef.current;
    const mask = maskRef.current;
    const drop = dropRef.current;
    const body = bodyRef.current;
    if (!geo || !track || !path || !fill || !mask || !drop || !body) return;

    const total = path.getTotalLength();
    // y never decreases along the line, so a sampled table maps a y on the
    // line to a distance along it (used to place the card stations).
    const n = Math.max(2, Math.ceil(total / 3));
    const ys = new Float32Array(n + 1);
    for (let i = 0; i <= n; i++) ys[i] = path.getPointAtLength((total * i) / n).y;
    const lengthAtY = (y: number) => {
      if (y <= ys[0]) return 0;
      if (y >= ys[n]) return total;
      let lo = 0;
      let hi = n;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ys[mid] <= y) lo = mid;
        else hi = mid - 1;
      }
      return (total * lo) / n;
    };

    const stationLens = geo.stations.map(lengthAtY);
    stationLens.forEach((l, i) => {
      const p = path.getPointAtLength(l);
      stationRefs.current[i]?.setAttribute('transform', `translate(${p.x} ${p.y})`);
    });

    for (const p of [fill, mask]) p.style.strokeDasharray = `${total} ${total}`;
    const k = geo.bar / 10;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll maps linearly onto distance along the line, so the drop keeps one
    // steady speed on the straights down and the runs across alike. It starts
    // when the top of the line reaches mid-screen and arrives when the bottom
    // does, so on average it stays around the middle of the screen.
    const y0 = ys[0];
    const span = Math.max(1, ys[n] - y0);
    const targetNow = () => {
      const f = (window.innerHeight * 0.5 - track.getBoundingClientRect().top - y0) / span;
      return Math.min(1, Math.max(0, f)) * total;
    };

    let target = targetNow();
    let cur = curRef.current === null ? target : Math.min(curRef.current, total);
    let vel = 0;
    let raf = 0;
    let last = 0;

    const draw = () => {
      curRef.current = cur;
      const off = String(total - cur);
      fill.style.strokeDashoffset = off;
      mask.style.strokeDashoffset = off;
      const p = path.getPointAtLength(cur);
      const a = path.getPointAtLength(Math.max(0, cur - 1.5));
      const b = path.getPointAtLength(Math.min(total, cur + 1.5));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI - 90;
      drop.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${ang}) scale(${k})`);
      // A fast-moving drop stretches out along its path, like real liquid.
      const s = 1 + Math.min(0.4, Math.abs(vel) * 0.012);
      body.setAttribute('transform', `scale(${1 / Math.sqrt(s)} ${s})`);
      stationLens.forEach((l, i) => stationRefs.current[i]?.classList.toggle(styles.stationLit, cur >= l - 1));
    };

    // Ease towards the scroll position so the drop moves smoothly between
    // wheel steps.
    const tick = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60;
      last = t;
      const prev = cur;
      cur += (target - cur) * (1 - Math.exp(-dt * 10));
      if (Math.abs(target - cur) < 0.3) cur = target;
      vel = (cur - prev) / (dt * 60);
      draw();
      if (cur !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
        vel = 0;
        draw();
      }
    };

    const onScroll = () => {
      target = targetNow();
      if (reduce) {
        cur = target;
        draw();
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    draw();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [geo]);

  const gradId = `flow-${uid}`;
  const maskId = `trail-${uid}`;
  const dropId = `drop-${uid}`;

  return (
    <div ref={trackRef} className={styles.track}>
      {geo && (
        <svg className={styles.trackSvg} width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden>
          <defs>
            <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.h}>
              <stop offset="0%" stopColor="#38e1f5" />
              <stop offset="100%" stopColor="#14c7b4" />
            </linearGradient>
            <radialGradient id={dropId} cx="38%" cy="62%" r="70%">
              <stop offset="0%" stopColor="#f0fbff" />
              <stop offset="35%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width={geo.w + 40} height={geo.h + 40}>
              <path ref={maskRef} d={geo.d} fill="none" stroke="#fff" strokeWidth={geo.bar} strokeLinecap="round" />
            </mask>
          </defs>

          {/* line still ahead of the drop */}
          <path ref={pathRef} d={geo.d} fill="none" stroke="#3f94d2" strokeWidth={geo.bar} strokeLinecap="round" />
          {/* line the drop has already passed */}
          <path
            ref={fillRef}
            className={styles.trail}
            d={geo.d}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={geo.bar}
            strokeLinecap="round"
          />
          {/* glossy core + bubbles flowing through the passed part */}
          <g mask={`url(#${maskId})`}>
            <path
              className={styles.core}
              d={geo.d}
              fill="none"
              stroke="#d9fbff"
              strokeWidth={geo.bar * 0.3}
              strokeLinecap="round"
            />
            <path
              className={styles.bubbles}
              d={geo.d}
              fill="none"
              stroke="#fff"
              strokeWidth={geo.bar * 0.36}
              strokeLinecap="round"
            />
          </g>

          {geo.stations.map((_, i) => (
            <g
              key={i}
              ref={(el) => {
                stationRefs.current[i] = el;
              }}
              className={styles.station}
            >
              <circle className={styles.stationHalo} r={geo.bar * 1.5} />
              <circle className={styles.stationDot} r={geo.bar * 0.85} strokeWidth={geo.bar * 0.3} />
            </g>
          ))}

          {/* the drop: round end leads, tip trails behind */}
          <g ref={dropRef} className={styles.drop}>
            <g ref={bodyRef}>
              <g className={styles.wobble}>
                <path
                  d="M 0 -22 C 3 -13 10 -8 10 0 A 10 10 0 1 1 -10 0 C -10 -8 -3 -13 0 -22 Z"
                  fill={`url(#${dropId})`}
                  stroke="#fff"
                  strokeWidth="1.6"
                />
                <ellipse cx="-3.8" cy="2.5" rx="2.4" ry="3.8" fill="#fff" opacity="0.85" />
                <circle cx="3.6" cy="-3" r="1.3" fill="#fff" opacity="0.7" />
              </g>
            </g>
          </g>
        </svg>
      )}
      {children}
    </div>
  );
}
