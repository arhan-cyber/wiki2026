import PageShell from '../../components/PageShell';
import styles from './wetlab.module.css';

// Content from "wiki wetlab doccumentation.pdf" pages 7–8.
const newParts = [
  [
    'BBa_262JY8UB',
    'Basic',
    'CDS',
    'FAS1',
    // TODO: subunit symbol is missing in the PDF ("Forms the   subunits").
    'Forms the subunits of the S. cerevisiae fatty acid synthase (FAS) complex, which is responsible for the production of fatty acids',
  ],
  [
    'BBa_26H2XI4I',
    'Basic',
    'CDS',
    'FAS2',
    'Forms the ɑ subunits of the S. cerevisiae fatty acid synthase (FAS) complex which is responsible for the production of fatty acids',
  ],
  [
    'BBa_26Z1ZAUT',
    'Basic',
    'CDS',
    'FAS2 V1254W',
    // TODO: PDF says "Wild type FAS1" for the FAS2 V1254W part, confirm.
    'Wild type FAS1 with a point mutation at position 1254 converting valine to tryptophan. This increases the proportion of C14 fatty acids produced',
  ],
];

const existingParts = [
  ['BBa_Y1007', 'Basic', 'CDS', 'URA3', 'Allows production of uracil containing nucleotides for auxotrophic selection of S. cerevisiae transformants'],
  [
    'BBa_K3939012',
    'Basic',
    'Promoter',
    'URA3 promoter',
    'Promoter for the URA3 gene which is required for uracil based auxotrophic selection in S. cerevisiae',
  ],
  ['BBa_Y1002', 'Basic', 'CDS', 'AmpR', 'Provides resistance towards Ampicillin for E. coli transformant selection'],
  ['BBa_K5487112', 'Basic', 'Promoter', 'AmpR promoter', 'Promoter for the AmpR gene which is required for Ampicillin resistance in E. coli'],
  ['BBa_K5426004', 'Basic', 'ORI', 'pMB1 ori', 'Acts as origin of replication in E. coli with high plasmid copy number'],
];

function PartsTable({ rows }: { rows: string[][] }) {
  return (
    <table className={styles.partsTable}>
      <thead>
        <tr>
          <th>Part ID</th>
          <th>Composition</th>
          <th>Type</th>
          <th>Name</th>
          <th>Function</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            {r.map((c, i) => (
              <td key={i}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PartsPage() {
  return (
    <PageShell
      title="Parts"
      art="dna"
      index={[
        { id: 'new-parts', label: 'New Parts' },
        { id: 'existing-parts', label: 'Existing Parts' },
      ]}
    >
      {/* New Parts, its own curved box */}
      <div id="new-parts" className={styles.panel}>
        <div className={`${styles.partsBody} ${styles.prose}`}>
          <h2 className={styles.cardHeading}>New Parts</h2>
          <p>
            Our project revolves around engineering the fatty acid composition of S. cerevisiae to be more biased to C14. This is
            achieved via mutating the fatty acid synthase (FAS) complex. Therefore, both the wild-type and mutated subunits of this
            complex form our new parts.
          </p>
          <p>
            It is to be noted that the 2022 SuZhou Union team has already submitted FAS1 and FAS2 genes in the registry as BBa_K4124006
            and BBa_K4124004, respectively. Though the experiments were conducted in S. cerevisiae, NCBI BLAST (blastx) results indicate
            the sequences are likely from Kluyveromyces marxianus (99.89 and 99.76% identity), another yeast, and not S. cerevisiae
            (81.05 and 74.67% identity). Thus, our FAS1 and FAS2 parts are novel. Additionally, we have also characterised the direct
            fatty acid yield and composition, which has not been done by this team.
          </p>
          <p>
            The FAS1 and FAS2 wildtype parts were directly characterised from the chromosome, not from a plasmid. The mutation was also
            introduced into the chromosome via homologous recombination. Due to this, all three parts do not comply with both RFC 10 and
            RFC 1000 standards.
          </p>
          <PartsTable rows={newParts} />
          <p className={styles.footnote} style={{ marginBottom: 0 }}>
            *CDS = Coding sequence
          </p>
        </div>
      </div>

      {/* Existing Parts, its own curved box */}
      <div id="existing-parts" className={styles.panel}>
        <div className={`${styles.partsBody} ${styles.prose}`}>
          <h2 className={styles.cardHeading}>Existing Parts</h2>
          <p>
            These parts were present in the plasmid backbone we have used (p426GPD) and were necessary for plasmid replication and
            transformant selection.
          </p>
          <PartsTable rows={existingParts} />
          <p className={styles.footnote} style={{ marginBottom: 0 }}>
            *CDS = Coding sequence; ORI = Origin of replication
          </p>
        </div>
      </div>
    </PageShell>
  );
}
