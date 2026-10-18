import { useState } from 'react';
import Accordion from '../components/Accordion';
import PageShell from '../components/PageShell';
import styles from './engineering.module.css';
import {
  cycle0,
  cycle0Intro,
  drylabCycles,
  drylabIntro,
  masterStages,
  wetlabCycles,
  type Block,
} from './engineeringContent';

/**
 * Project Engineering — the template the other tabs follow: a tight title band,
 * a sticky left rail that actually navigates, and a wide content column. Every
 * question and DBTL cycle is a working accordion.
 */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === 'p') return <p key={i}>{b.text}</p>;
        if (b.t === 'h') return <h4 key={i}>{b.text}</h4>;
        if (b.t === 'ul')
          return (
            <ul key={i}>
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        return (
          <div key={i} className={styles.flow}>
            {b.steps.map((s, j) => (
              <span key={s} style={{ display: 'contents' }}>
                <span className={styles.flowStep}>{s}</span>
                {j < b.steps.length - 1 && <span className={styles.flowArrow}>→</span>}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
}

const INDEX = [
  { id: 'cycle-0', label: 'Cycle 0' },
  { id: 'master-dbtl', label: 'Master DBTL' },
  { id: 'wetlab-dbtl', label: 'Wet Lab DBTL' },
  { id: 'drylab-dbtl', label: 'Dry Lab DBTL' },
];

export default function ProjectEngineeringPage() {
  const [stage, setStage] = useState(masterStages[0].key);
  const active = masterStages.find((s) => s.key === stage) ?? masterStages[0];

  return (
    <PageShell title="Project Engineering" index={INDEX} footerBg="#6DB8EA">
      {/* Cycle 0 */}
      <section id="cycle-0" className={styles.panel}>
        <p className={styles.eyebrow}>Cycle 0 :</p>
        <h2 className={styles.panelTitle}>Application Specification: Is methyl myristate a viable coolant?</h2>
        <p className={styles.panelIntro}>{cycle0Intro}</p>
        <Accordion alignStart items={cycle0.map((c) => ({ id: c.id, title: c.title, content: <div className={styles.prose}><Blocks blocks={c.blocks} /></div> }))} theme={{ bar: '#245C53', barText: '#FFFFFF', body: '#E4F3EE', accent: '#63AEA6' }} />
      </section>

      {/* Master DBTL */}
      <section id="master-dbtl" className={styles.panel}>
        <h2 className={styles.sectionHead}>Master DBTL</h2>
        <div className={styles.stageRow}>
          {masterStages.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`${styles.stageCard} ${s.key === stage ? styles.stageActive : ''}`}
              style={{ background: s.tint, color: s.accent }}
              aria-pressed={s.key === stage}
              onClick={() => setStage(s.key)}
            >
              <span className={styles.stageLetter}>{s.letter}</span>
              <span className={styles.stageLabel}>{s.label}</span>
            </button>
          ))}
        </div>
        <div
          className={`${styles.stagePanel} ${styles.prose}`}
          style={{ background: active.tint, borderLeftColor: active.accent }}
        >
          <p className={styles.stageQuestion} style={{ color: active.accent }}>
            {active.question}
          </p>
          <Blocks blocks={active.blocks} />
        </div>
      </section>

      {/* Wet lab DBTL */}
      <section id="wetlab-dbtl" className={styles.panel}>
        <h2 className={styles.sectionHead}>Wet Lab DBTL</h2>
        <Accordion alignStart items={wetlabCycles.map((c) => ({ id: c.id, title: c.title, content: <div className={styles.prose}><Blocks blocks={c.blocks} /></div> }))} theme={{ bar: '#D7E5F0', barText: '#172B4D', body: '#EDF3FF', accent: '#2A3A57' }} />
      </section>

      {/* Dry lab DBTL */}
      <section id="drylab-dbtl" className={styles.panel}>
        <h2 className={styles.sectionHead}>Dry Lab DBTL</h2>
        <p className={styles.panelIntro}>
          {drylabIntro}
        </p>
        <Accordion alignStart items={drylabCycles.map((c) => ({ id: c.id, title: c.title, content: <div className={styles.prose}><Blocks blocks={c.blocks} /></div> }))} theme={{ bar: '#D7E5F0', barText: '#172B4D', body: '#EDF3FF', accent: '#2A3A57' }} />
      </section>
    </PageShell>
  );
}
