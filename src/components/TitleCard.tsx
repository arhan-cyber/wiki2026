import styles from './PageShell.module.css';

/**
 * The "main box" at the top of a tab — the same card PageShell draws, for
 * pages that bring their own index/content layout (Sustainability, Education).
 */
export default function TitleCard({ title }: { title: string }) {
  return (
    <div className={styles.titleWrap}>
      <div className={styles.titleCard}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
}
