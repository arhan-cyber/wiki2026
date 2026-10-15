import Footer from '../../components/Footer';
import styles from './wetlab.module.css';

export default function NotebookPage() {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <img src="/wetlab/protocols/title-card.svg" alt="" className={styles.titleCard} />
        <h1 className={styles.title} style={{ left: 712 }}>
          NOTEBOOK
        </h1>

        <div className={styles.row} style={{ height: 3940 }}>
          <aside className={styles.sidebar} />
          <div className={styles.panel}>
            <iframe src="/wetlab/notebook.pdf#view=FitH" title="Wet Lab Notebook" className={styles.pdfViewer} />
          </div>
        </div>
      </div>
      <Footer bgColor="transparent" />
    </main>
  );
}
