import { useState, type ReactNode } from 'react';
import PageShell from '../components/PageShell';
import ScopeTrack from './ScopeTrack';
import styles from './futureScope.module.css';

const INDEX = [
  { id: 'fs-accomplished', label: 'What we have accomplished' },
  { id: 'fs-scope-1', label: 'Scope 1: In vivo methylation' },
  { id: 'fs-scope-2', label: 'Scope 2: Whole-cell modelling' },
  { id: 'fs-scope-3', label: 'Scope 3: Profile refinement' },
  { id: 'fs-scope-4', label: 'Scope 4: Yield optimisation' },
  { id: 'fs-road-ahead', label: 'The road ahead' },
];

const ACCOMPLISHED: { title: string; body: ReactNode }[] = [
  {
    title: 'FAS2 Characterisation',
    body: (
      <p>
        We mapped chain-length control in the yeast type I fatty acid synthase to the ketoacyl synthase domain of
        FAS2, whose acyl-binding tunnel acts as a molecular ruler for the growing chain.
      </p>
    ),
  },
  {
    title: 'FFA Engineering',
    body: (
      <p>
        The mutated FAS2 ORF and its 3′ homology flank were assembled into p426GPD, Sanger-verified and transformed
        into <i>S. cerevisiae</i> to shift the free fatty acid profile from C16/C18 towards C14.
      </p>
    ),
  },
  {
    title: 'Mutation Design',
    body: (
      <p>
        By aligning KS domains we located the residue lining the acyl tunnel in our chassis, V1254, and chose a
        bulkier tryptophan (V1254W) to narrow the pocket and cap elongation at C14.
      </p>
    ),
  },
];

type Scope = {
  id: string;
  title: string;
  why?: string;
  what?: string[];
  goal?: string;
};

const SCOPES: Scope[] = [
  {
    id: 'fs-scope-1',
    title: '1. Establishing In Vivo Methylation',
    why: 'Our current engineering focuses on generating a more suitable C14 fatty acid precursor, while our final target is methyl myristate. The next step is therefore to establish an efficient methylation pathway within yeast. This will also increase the demand for SAM (S-adenosyl-L-methionine), introducing an additional metabolic constraint.',
    what: [
      'Establish and validate an in vivo methylation pathway.',
      'Characterise SAM availability and utilisation.',
      'Investigate bottlenecks caused by increased methyl-group demand.',
      'Study SAM-related perturbations, including the proposed deletion, and their effects on production and growth.',
    ],
    goal: 'Connect the engineered C14 FFA pool to efficient in vivo methyl myristate production while maintaining healthy cellular growth.',
  },
  {
    id: 'fs-scope-2',
    title: '2. Whole-Cell Metabolic Modelling with YEAST10.0',
    why: 'Engineering one pathway can affect the entire cell. Increasing product flux may divert resources from biomass formation or other essential processes. The YEAST10.0 genome-scale model will help us predict these system-level trade-offs.',
    what: [
      'Model effects of genetic perturbations on FFA production, SAM metabolism, biomass formation, and competing pathways.',
      'Predict how SAM-related modifications affect growth and product flux.',
      'Identify promising interventions for experimental validation.',
    ],
    goal: 'Identify engineering strategies that improve product formation without imposing excessive metabolic burden on the yeast.',
  },
  { id: 'fs-scope-3', title: '3. Targeted Profile Refinement' },
  { id: 'fs-scope-4', title: '4. Yield Optimisation' },
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
      {scope.why ? (
        <>
          <p className={styles.label}>Why is it needed?</p>
          <p>{scope.why}</p>
          <p className={styles.label}>What will we do?</p>
          <ul>
            {scope.what?.map((w) => <li key={w}>{w}</li>)}
          </ul>
          <p className={styles.label}>Goal</p>
          <p>{scope.goal}</p>
        </>
      ) : (
        <p className={styles.pending}>Details for this stage will be added soon.</p>
      )}
    </article>
  );
}

export default function FutureScopePage() {
  return (
    <PageShell title="Future Scope" index={INDEX}>
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
            <p className={styles.signTitle}>BiFROST:</p>
            <p className={styles.signSub}>Engineering a Sustainable Future</p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
