import styles from './PageShell.module.css';

// Blue outline icon for each tab.
const ICONS: Record<string, string> = {
  'Protocols': 'Protocol',
  'Notebook': 'Notebook',
  'Parts': 'Parts',
  'Safety': 'Safety_Wetlab',
  'Project Engineering': 'Engineering_DBTL',
  'Educational Outreach': 'Education',
  'Future Scope': 'Future_Scope',
  'Results': 'Result',
  'Contribution': 'Contribution',
  'Modeling': 'Model_Name_Yeast',
  'Software': 'Design',
  'CFD': 'CFD',
  'Life Cycle Assessment': 'LCA_Analysis',
  'Sustainability': 'Sustainability',
  'Entrepreneurship': 'Product_Development',
  'Description': 'Description_Notebook',
  'News': 'News_Headlines',
  'Integrated Human Practices': 'Integrated_Human_Practices',
  'KYT': 'KYT',
  'Attributions': 'Attributions',
};
const FALLBACK = 'Science';

type Props = {
  title: string;
  /** Kept for callers; the icon is picked by title. */
  art?: string;
};

/**
 * The title banner on every tab: the same rounded blue outline as Project Description, the title in
 * the home page's font and the tab's blue outline icon.
 */
export default function TitleCard({ title }: Props) {
  const icon = `/titles/icons/${ICONS[title] ?? FALLBACK}.png`;

  return (
    <div className={styles.titleWrap}>
      <div className={styles.collage}>

        <h1 className={styles.collageTitle}>{title}</h1>

        <img className={styles.titleIcon} src={icon} alt="" aria-hidden />
      </div>
    </div>
  );
}
