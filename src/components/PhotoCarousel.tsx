import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import styles from './PhotoCarousel.module.css';

/** Widths (%) of the visible tiles, first one wide, for 2, 3 or 4 tiles. */
const SLOTS: Record<number, number[]> = {
  2: [60, 40],
  3: [46, 28, 26],
  4: [40, 22, 20, 18],
};
const STEP_MS = 2600;

type Props = { photos: string[]; label?: string };

/**
 * A strip of event photos with the first one wide. Every few seconds the wide
 * photo slides out to the left, the rest move up a place (the new first one
 * widening), and the next photo slides in at the right.
 */
export default function PhotoCarousel({ photos, label }: Props) {
  const n = photos.length;
  const visible = Math.min(4, n);
  // Each tile needs a spot to slide out to and one to wait in off-screen, so a
  // short set is repeated; windows of `visible` in a row stay distinct.
  const tiles = useMemo(() => {
    if (n < 2) return photos;
    const out = [...photos];
    while (out.length < visible + 2) out.push(...photos);
    return out;
  }, [photos, n, visible]);
  const t = tiles.length;

  const [offset, setOffset] = useState(0);

  // Starts as soon as the card opens and keeps going: no pause on hover (the
  // cursor is usually right over the strip after clicking the card open).
  // With reduced motion the photos still change, just without the slide
  // (the transition is switched off in the CSS).
  useEffect(() => {
    if (n < 2) return;
    const id = window.setInterval(() => setOffset((o) => (o + 1) % t), STEP_MS);
    return () => window.clearInterval(id);
  }, [n, t]);

  if (n === 0) return null;
  if (n === 1) {
    return (
      <div className={styles.strip} aria-label={label}>
        <img src={photos[0]} alt="" className={styles.tile} style={{ left: 0, width: '100%' }} />
      </div>
    );
  }

  const widths = SLOTS[visible];
  const lefts = widths.map((_, i) => widths.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div className={styles.strip} aria-label={label}>
      {tiles.map((src, i) => {
        const rel = (i - offset + t) % t;
        let style: CSSProperties;
        let cls = styles.tile;
        if (rel < visible) {
          style = { left: `${lefts[rel]}%`, width: `${widths[rel]}%` };
        } else if (rel === t - 1) {
          // just left the strip: slides out past the left edge
          style = { left: `-${widths[0]}%`, width: `${widths[0]}%` };
        } else {
          // waiting off the right edge; jumps there without animating
          style = { left: '100%', width: `${widths[visible - 1]}%` };
          cls = `${styles.tile} ${styles.parked}`;
        }
        return <img key={i} src={src} alt="" loading="lazy" className={cls} style={style} />;
      })}
    </div>
  );
}
