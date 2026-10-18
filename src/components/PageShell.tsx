import { type CSSProperties, type ReactNode } from 'react';
import Footer from './Footer';
import LiquidIndex, { type LiquidIndexItem } from './LiquidIndex';
import TitleCard from './TitleCard';
import styles from './PageShell.module.css';

export type IndexItem = {
  /** id of the element to scroll to */
  id: string;
  label: string;
  subtitle?: string;
};

type PageShellProps = {
  title: string;
  /** Cutout sticker shown on the title banner. */
  art?: string;
  /** Entries for the sticky index on the left. */
  index: IndexItem[];
  children: ReactNode;
  /** Footer colour; the pages let the gradient run into the waves. */
  footerBg?: string;
  /** Full-width card between the title card and the index/content (EO's gallery). */
  intro?: ReactNode;
  /** Override the page background. */
  pageStyle?: CSSProperties;
  /** Title banner and content only, without the sticky index. */
  noIndex?: boolean;
};

// Plain 24x24 line icons for the bubbles of the index.
const ICONS: ReactNode[] = [
  <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>,
  <><path d="M4 19V9M10 19V4M16 19v-7M22 19H2" /></>,
  <><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" /></>,
  <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
  <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></>,
  <><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></>,
  <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14c3 0 6 2 6 5" /></>,
];
const ACCENTS = ['#38BDF8', '#22D3EE', '#3B9EFF', '#3B82F6', '#4F7BF0', '#6366F1'];

/**
 * The shared tab layout: title banner on top, then the sticky "liquid" index
 * on the left that follows you down the page, and the content on the right.
 */
export default function PageShell({ title, art, index, children, footerBg = 'transparent', intro, pageStyle, noIndex }: PageShellProps) {
  if (noIndex) {
    return (
      <main className={styles.page} style={pageStyle}>
        <TitleCard title={title} art={art} />
        {intro && <div className={styles.intro}>{intro}</div>}
        <div className={`${styles.content} ${styles.plain}`}>{children}</div>
        <Footer bgColor={footerBg} />
      </main>
    );
  }

  const items: LiquidIndexItem[] = index.map((it, i) => ({
    num: String(i + 1).padStart(2, '0'),
    label: it.label,
    subtitle: it.subtitle ?? '',
    sectionId: it.id,
    accent: ACCENTS[i % ACCENTS.length],
    icon: ICONS[i % ICONS.length],
  }));

  return (
    <main className={styles.page} style={pageStyle}>
      <LiquidIndex
        items={items}
        className={styles.grad}
        header={
          <>
            <TitleCard title={title} art={art} />
            {intro && <div className={styles.intro}>{intro}</div>}
          </>
        }
      >
        <div className={styles.content}>{children}</div>
      </LiquidIndex>
      <Footer bgColor={footerBg} />
    </main>
  );
}
