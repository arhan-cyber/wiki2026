import { useState, type ReactNode } from 'react';
import PageShell from '../components/PageShell';
import ScopeTrack from './ScopeTrack';
import styles from './futureScope.module.css';

const INDEX = [
  { id: 'fs-accomplished', label: 'What we have accomplished' },
  { id: 'fs-scope-1', label: 'Scope 1: In vivo methylation' },
  { id: 'fs-scope-2', label: 'Scope 2: Whole-cell modelling' },
  { id: 'fs-scope-3', label: 'Scope 3: Refining the FFA profile' },
  { id: 'fs-scope-4', label: 'Scope 4: Yield and yeast fitness' },
  { id: 'fs-road-ahead', label: 'The road ahead' },
];

// Text from "wiki wetlab doccumentation" (day 3), Future Scope section.
const ACCOMPLISHED: { title: string; body: ReactNode }[] = [
  { title: 'FAS2 Characterisation', body: <p>Mapped FAS2’s role in fatty acid synthesis to identify engineering opportunities.</p> },
  { title: 'FFA Engineering', body: <p>Developed strategies to steer yeast toward enhanced short-chain FFA production.</p> },
  { title: 'Mutation Design', body: <p>Identified V1254 as a key engineering site and proposed the V1254W mutation.</p> },
  {
    title: 'Experimental Validation',
    body: <p>Successfully introduced FAS2 V1254W in yeast, establishing an engineered chassis for C14 FFA production.</p>,
  },
  {
    title: 'System Analysis',
    body: <p>Integrated CFD, LCA, and metabolic modelling to evaluate cooling performance and system-level impacts.</p>,
  },
];

type Step = string | { text: string; sub: string[] };

type Scope = {
  id: string;
  title: string;
  goal: string;
  why: string;
  what: Step[];
};

const SCOPES: Scope[] = [
  {
    id: 'fs-scope-1',
    title: '1. Establishing In Vivo Methylation',
    goal: 'Connect the engineered C14 FFA pool to efficient in vivo methyl myristate production while maintaining healthy cellular growth.',
    why: 'Our current engineering focuses on generating a more suitable C14 fatty acid precursor, while our final target is methyl myristate. The next step is therefore to establish an efficient methylation pathway within yeast. This will also increase the demand for SAM (S-adenosyl-L-methionine), introducing an additional metabolic constraint.',
    what: [
      'Establish and validate an in vivo methylation pathway.',
      'Characterise SAM availability and utilisation.',
      'Investigate bottlenecks caused by increased methyl-group demand.',
      'Study SAM-related perturbations, including the proposed deletion, and their effects on production and growth.',
    ],
  },
  {
    id: 'fs-scope-2',
    title: '2. Whole-Cell Metabolic Modelling',
    goal: 'Validate relevant metabolic predictions by studying FFA production and yeast growth experimentally.',
    why: 'Our FBA model mapped the native routes to free myristate and their trade-off with growth, but it cannot represent the engineered FAS2 V1254W metabolic pathway. Yeast-GEM terminates FAS at C16 and C18, so all modelled C14 arises from peroxisomal β-oxidation. Measurement is the only way to establish the engineered strain’s actual performance, and to tell FAS-derived C14 apart from β-oxidation-derived C14.',
    what: [
      'Measure growth and the full C10–C18 fatty-acid profile of the engineered strain against wild type.',
      'Use the experimental results to assess relevant model predictions and guide further modeling/experiments.',
    ],
  },
  {
    id: 'fs-scope-3',
    title: '3. Refining the Targeted FFA Profile',
    goal: 'Fine-tune the fatty acid profile toward the desired C14 precursor rather than simply maximising total FFA production.',
    why: 'The V1254W mutation provides a starting point for shifting the FFA profile, but a single mutation may not be sufficient for the desired C14 enrichment. More total FFA does not necessarily mean more of the FFA we need.',
    what: [
      {
        text: 'Combine experimental data with metabolic modelling to identify modifications affecting:',
        sub: [
          'fatty acid chain-length distribution;',
          'precursor availability;',
          'competing fatty acid pathways;',
          'FAS activity; and',
          'intracellular metabolic flux.',
        ],
      },
      'Promising modifications will then be experimentally validated.',
    ],
  },
  {
    id: 'fs-scope-4',
    title: '4. Optimising FFA Yield Without Compromising Yeast Fitness',
    goal: 'Develop a robust yeast chassis that efficiently produces the target FFA while maintaining healthy cellular growth.',
    why: 'Once the desired FFA profile is established, the next challenge is increasing its production without compromising cellular growth and metabolic stability.',
    what: [
      {
        text: 'Evaluate potential improvements in:',
        sub: ['target FFA production', 'cellular growth', 'precursor availability', 'metabolic burden'],
      },
      'Assess whether further genetic modifications can improve FFA production while maintaining yeast fitness.',
    ],
  },
];

function Dropdown({ title, body }: { title: string; body: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.drop}>
      <button type="button" className={styles.dropBtn} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`${styles.caret} ${open ? styles.caretOpen : ''}`} aria-hidden />
      </button>
      {open && <div className={styles.dropBody}>{body}</div>}
    </div>
  );
}

function ScopeCard({ scope }: { scope: Scope }) {
  return (
    <article id={scope.id} className={styles.card} style={{ scrollMarginTop: 96 }}>
      <h3 className={styles.cardTitle}>{scope.title}</h3>
      <p className={styles.goal}>
        <b>Goal:</b> {scope.goal}
      </p>
      <p className={styles.label}>Why is it needed?</p>
      <p>{scope.why}</p>
      <p className={styles.label}>What will we do?</p>
      <ul>
        {scope.what.map((w) =>
          typeof w === 'string' ? (
            <li key={w}>{w}</li>
          ) : (
            <li key={w.text}>
              {w.text}
              <ul className={styles.subList}>
                {w.sub.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </article>
  );
}

export default function FutureScopePage() {
  return (
    <PageShell title="Future Scope" art="map" index={INDEX}>
      <div className={styles.panel}>
        <section className={styles.section}>
          <h2 className={styles.h1}>Building on Our Approach</h2>
          <p className={styles.lead}>
            Our work in the iGEM 25-26 Cycle established the molecular, computational, and systems-level foundations
            for engineering <i>Saccharomyces cerevisiae</i> <b>for methyl myristate production.</b>
          </p>
        </section>

        <section id="fs-accomplished" className={styles.section} style={{ scrollMarginTop: 96 }}>
          <h3 className={styles.h2}>What We Have Accomplished</h3>
          <div className={styles.dropGrid}>
            {ACCOMPLISHED.map((a) => (
              <Dropdown key={a.title} title={a.title} body={a.body} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.h2}>From an Engineered FFA Profile to the Final Product</h3>
          <p className={styles.lead}>
            The V1254W-engineered chassis provides the starting point for the next stage of our work. To move from a{' '}
            <b>shifted FFA profile to efficient methyl myristate production</b>, we now need to integrate product
            formation, whole-cell metabolic modelling, and further pathway optimisation.
          </p>
          <ScopeTrack>
            {SCOPES.map((s) => (
              <div key={s.id} className={styles.step}>
                <ScopeCard scope={s} />
              </div>
            ))}
          </ScopeTrack>
        </section>

        <section id="fs-road-ahead" className={styles.section} style={{ scrollMarginTop: 96 }}>
          <h2 className={styles.h1}>The Road Ahead</h2>
          <p className={styles.roadBox}>
            Our future work will progressively build upon the <b>V1254W-engineered chassis</b>, moving from FFA profile
            shifting to <b>in vivo methylation, whole-cell metabolic modelling, targeted profile refinement, and yield
            optimisation.</b> Each stage addresses a different layer of the production pathway, bringing us closer to
            efficient methyl myristate biosynthesis. Ultimately, we aim to integrate these approaches into a{' '}
            <b>robust, productive, and metabolically sustainable yeast chassis</b> for methyl myristate production.
          </p>
          <div className={styles.sign}>
            <p className={styles.signTitle}>BiFROST</p>
            <p className={styles.signSub}>Engineering a Sustainable Future</p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
