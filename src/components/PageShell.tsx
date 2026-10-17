import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Footer from './Footer';
import styles from './PageShell.module.css';

export type IndexItem = {
  /** id of the element to scroll to */
  id: string;
  label: string;
};

type PageShellProps = {
  title: string;
  /** Entries for the left index panel. */
  index: IndexItem[];
  children: ReactNode;
  /** Footer colour; wet lab pages let the page gradient run into the waves. */
  footerBg?: string;
  /** Extra class on the content column. */
  contentClassName?: string;
  /** Full-width card between the title card and the index/content row (EO's photo gallery). */
  intro?: ReactNode;
  /** Max width of the whole layout in px. Defaults to 1360. */
  shellMaxWidth?: number;
  /** Override the page background. */
  pageStyle?: CSSProperties;
  /** Override the title text style (font, size). */
  titleStyle?: CSSProperties;
};

/**
 * The shared tab layout, taken from the Protocols page: a title card ("main
 * box") across the top, then the index panel and the content box side by side.
 * The index highlights whichever section is currently in view.
 */
export default function PageShell({
  title,
  index,
  children,
  footerBg = 'transparent',
  contentClassName,
  intro,
  shellMaxWidth,
  pageStyle,
  titleStyle,
}: PageShellProps) {
  const [active, setActive] = useState(index[0]?.id ?? '');

  // Highlight the section nearest the top of the viewport.
  useEffect(() => {
    if (!index.length) return;
    const onScroll = () => {
      let current = index[0].id;
      for (const item of index) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [index]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className={styles.page} style={pageStyle}>
      <div className={styles.shell} style={shellMaxWidth ? { maxWidth: shellMaxWidth } : undefined}>
        {/* Main box */}
        <div className={styles.titleWrap}>
          <div className={styles.titleCard}>
            <h1 className={styles.title} style={titleStyle}>
              {title}
            </h1>
          </div>
        </div>

        {intro && <div className={styles.intro}>{intro}</div>}

        {/* Index box + content box */}
        <div className={styles.row}>
          <aside className={styles.index} aria-label="On this page">
            <p className={styles.indexHeading}>On this page</p>
            <ul className={styles.indexList}>
              {index.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.indexLink} ${active === item.id ? styles.indexLinkActive : ''}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => go(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={`${styles.content} ${contentClassName ?? ''}`}>{children}</div>
        </div>
      </div>
      <Footer bgColor={footerBg} />
    </main>
  );
}
