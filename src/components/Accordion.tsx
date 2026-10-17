import { useState, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export type AccordionTheme = {
  /** Closed/open bar colour. */
  bar: string;
  /** Bar text + chevron colour. */
  barText: string;
  /** Panel colour shown under the bar when open. */
  body: string;
  /** Colour of the accent line down the left of the panel. */
  accent: string;
};

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
    >
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AccordionProps = {
  items: AccordionItem[];
  theme: AccordionTheme;
  /** Left-align the title instead of centring it (used by the question bars). */
  alignStart?: boolean;
  /** Gap between items, in px. */
  gap?: number;
};

/**
 * The site's single dropdown style. When open, the bar squares off its bottom
 * corners and the tinted panel sits flush beneath it, so the two read as one
 * connected block rather than two floating pieces.
 */
export default function Accordion({ items, theme, alignStart, gap = 12 }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <button
              type="button"
              className={`${styles.btn} ${isOpen ? styles.btnOpen : ''} ${alignStart ? styles.btnStart : ''}`}
              style={{ background: theme.bar, color: theme.barText }}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : it.id)}
            >
              <span>{it.title}</span>
              <Chevron open={isOpen} color={theme.barText} />
            </button>
            {isOpen && (
              <div className={styles.body} style={{ background: theme.body }}>
                <div className={styles.bodyInner} style={{ borderLeftColor: theme.accent }}>
                  {it.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
