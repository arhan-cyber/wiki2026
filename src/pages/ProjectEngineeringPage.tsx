import { useLayoutEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import { boxes, lines, arrows, texts, CANVAS_W, CONTENT_H } from './engineeringData';

const fontStack = (f: 'inria' | 'inter') =>
  f === 'inria' ? "'Inria Serif', Georgia, serif" : "'Inter', system-ui, sans-serif";

/**
 * Project Engineering — rebuilt as real HTML from the Figma export: selectable
 * text, CSS panels/bars, and drawn flowchart chevrons on a fixed 1440-wide canvas
 * that scales to fit. The design's own navbar/footer are dropped in favour of the
 * app's navbar and shared <Footer/>.
 */
export default function ProjectEngineeringPage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CANVAS_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <main className="w-full">
      <div
        className="w-full flex justify-center"
        style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #6DB8EA 101.6%)' }}
      >
        <div
          ref={wrapRef}
          style={{ width: '100%', maxWidth: CANVAS_W, height: CONTENT_H * scale, overflow: 'hidden' }}
        >
          <div
            style={{
              width: CANVAS_W,
              height: CONTENT_H,
              position: 'relative',
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
            }}
          >
            {/* Panels, rail, accordion bars */}
            {boxes.map((b, i) => (
              <div
                key={`b${i}`}
                style={{
                  position: 'absolute',
                  left: b.left,
                  top: b.top,
                  width: b.width,
                  height: b.height,
                  background: b.bg,
                  border: b.border,
                  borderRadius: b.radius,
                  boxShadow: b.shadow,
                  boxSizing: 'border-box',
                }}
              />
            ))}

            {/* Accent rules */}
            {lines.map((l, i) => (
              <div
                key={`l${i}`}
                style={{ position: 'absolute', left: l.left, top: l.top, width: l.width, height: l.height, background: l.bg }}
              />
            ))}

            {/* Down-chevrons */}
            {arrows.map((a, i) => (
              <svg
                key={`a${i}`}
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                style={{ position: 'absolute', left: a.left, top: a.top }}
              >
                <path d="M6 9l6 6 6-6" stroke={a.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}

            {/* Text */}
            {texts.map((t, i) => (
              <div
                key={`t${i}`}
                style={{
                  position: 'absolute',
                  left: t.left,
                  top: t.top,
                  width: t.width,
                  height: t.height,
                  margin: 0,
                  fontFamily: fontStack(t.font),
                  fontSize: t.size,
                  lineHeight: `${t.lineHeight}px`,
                  fontWeight: t.weight,
                  fontStyle: t.italic ? 'italic' : 'normal',
                  color: t.color,
                  textTransform: t.upper ? 'uppercase' : 'none',
                  textAlign: t.align ?? 'left',
                  overflow: 'visible',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {t.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer bgColor="#6DB8EA" />
    </main>
  );
}
