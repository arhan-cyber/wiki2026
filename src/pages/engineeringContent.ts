// Project Engineering content.
// Cycle 0, the master DBTL stages and the wet lab DBTL cycles are transcribed
// from "wiki wetlab doccumentation.pdf" (pages 9-16). The dry lab DBTL cycle is
// condensed from src/pages/drylab/content/engineering.html.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'flow'; steps: string[] };

export type Accordion = { id: string; title: string; blocks: Block[] };

export const cycle0Intro =
  'Before engineering the yeast, we first needed to determine whether methyl myristate could serve as a viable dielectric-immersion coolant for AI data centres. This application layer defines the performance and sustainability requirements that the engineered strain must ultimately satisfy.';

export const cycle0: Accordion[] = [
  {
    id: 'q1',
    title: 'Q1. Can methyl myristate cool effectively?',
    blocks: [
      {
        t: 'p',
        text: 'We modelled single-phase immersion cooling using methyl myristate as the working fluid and compared its performance with mineral oil and a fluorinated dielectric reference.',
      },
      { t: 'p', text: 'The comparison considered properties relevant to immersion cooling, including:' },
      {
        t: 'ul',
        items: ['Thermal conductivity', 'Volumetric heat capacity', 'Kinematic viscosity', 'Junction temperature', 'Pumping power'],
      },
      {
        t: 'p',
        text: 'This established whether the thermal performance of methyl myristate justified pursuing it as the target coolant.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'Q2. How would the coolant actually be produced?',
    blocks: [
      { t: 'p', text: 'A process flow diagram was developed to map the proposed production pathway:' },
      { t: 'flow', steps: ['Fermentation', 'Cell lysis', 'Lipid extraction', 'Ex-cell enzymatic esterification', 'Purification'] },
      { t: 'p', text: 'This provided the process framework on which the environmental assessment could be performed.' },
    ],
  },
  {
    id: 'q3',
    title: 'Q3. Is the proposed coolant environmentally competitive?',
    blocks: [
      {
        t: 'p',
        text: 'Life-cycle assessment was used to compare the environmental impact of the proposed coolant with incumbent bio-based dielectric fluids. The analysis considered:',
      },
      { t: 'ul', items: ['Carbon footprint', 'Cumulative energy demand', 'Water use', 'Eutrophication'] },
      {
        t: 'p',
        text: 'The output of Cycle 0 was therefore not simply that methyl myristate "works," but a set of specifications that the strain-engineering layer needs to meet: the required C14 fraction, acceptable C12/C16 contamination, and minimum production titer.',
      },
    ],
  },
];

// The four master DBTL stages.
export type Stage = {
  key: string;
  letter: string;
  label: string;
  accent: string;
  tint: string;
  question: string;
  blocks: Block[];
};

export const masterStages: Stage[] = [
  {
    key: 'design',
    letter: 'D',
    label: 'Design',
    accent: '#17365D',
    tint: '#EDF3FF',
    question: 'How can we alter FAS to shift production toward C14?',
    blocks: [
      { t: 'h', text: '1. Enzyme Design — Engineering FAS2 for C14 Production' },
      {
        t: 'p',
        text: 'To shift FAS output from C16/C18 toward C14, we targeted the acyl-binding cavity, which controls fatty-acid chain length.',
      },
      {
        t: 'p',
        text: 'BLAST and phylogenetic analysis were used to identify variable cavity-lining residues in S. cerevisiae FAS. Candidate mutations were evaluated using molecular docking and molecular dynamics for their predicted C14 versus C16 preference. V1254W was selected as the lead mutation, predicted to reduce cavity volume and favour C14 release.',
      },
      { t: 'h', text: '2. Chassis Design — Will Yeast Retain C14?' },
      {
        t: 'p',
        text: 'FAS engineering alone may not increase C14 accumulation if the cell subsequently consumes the product. We therefore used genome-scale flux balance analysis (FBA) with the Yeast8/9 model to study C14 metabolism.',
      },
      {
        t: 'p',
        text: 'We examined competing pathways, particularly peroxisomal beta-oxidation and fatty-acid reactivation, to identify potential routes of C14 loss and distinguish poor production from post-production degradation.',
      },
    ],
  },
  {
    key: 'build',
    letter: 'B',
    label: 'Build',
    accent: '#245C53',
    tint: '#E4F3EE',
    question: 'Can we construct and integrate the design?',
    blocks: [
      {
        t: 'p',
        text: 'The selected V1254W FAS2 allele was assembled into the p426GPD backbone with the required homology regions and transformed into S. cerevisiae BY4742 for stable genomic integration.',
      },
      { t: 'h', text: '1. Construct Assembly' },
      {
        t: 'p',
        text: 'The construct was assembled through DBTL cycles, incorporating mutated FAS2, regulatory elements, and the 3-prime homology flank. Restriction digestion and PCR screened constructs, while Sanger sequencing confirmed the final sequence and V1254W mutation.',
      },
      { t: 'h', text: '2. Yeast Transformation + Verification' },
      {
        t: 'p',
        text: 'Transformants were selected using a URA marker. Correct genomic integration was verified using 5-prime and 3-prime junction PCR, with primers spanning the construct-genome boundaries.',
      },
      {
        t: 'ul',
        items: ['Digest/PCR: construct architecture', 'Sanger: V1254W mutation', 'Junction PCR: genomic integration'],
      },
      { t: 'p', text: 'These checks confirmed the Build stage, not the final C14-producing phenotype.' },
    ],
  },
  {
    key: 'test',
    letter: 'T',
    label: 'Test',
    accent: '#8A6D1F',
    tint: '#FBF2DC',
    question: 'Does the engineered strain actually produce a useful coolant?',
    blocks: [
      {
        t: 'p',
        text: 'Characterization and Validation: GC-MS will determine the fatty-acid profile, including C14 fraction, absolute titer, C12/C16 distribution, and intracellular versus secreted product. This allows us to distinguish genuine C14 production from simply reduced C16 production. Growth curves and viability measurements will assess whether increased C14 production causes cellular stress or reduced biomass, which could affect overall yield.',
      },
      {
        t: 'p',
        text: 'Wild-type and empty-cassette strains will serve as controls to distinguish the effect of V1254W from genomic integration and selection effects. Finally, the experimentally measured fatty-acid composition will be fed back into the CFD model, allowing us to determine whether the actual fatty-acid mixture produced by the yeast retains the required cooling performance.',
      },
    ],
  },
  {
    key: 'learn',
    letter: 'L',
    label: 'Learn',
    accent: '#8C3A2B',
    tint: '#FBE7E1',
    question: 'What did the experiment teach us?',
    blocks: [
      {
        t: 'p',
        text: 'Experimental results are compared against the models and specifications established earlier to determine what should happen next. The measured C14 profile is compared with docking/MD predictions to assess whether V1254W produced the expected chain-length shift, while experimental titer is compared with FBA predictions to distinguish poor production from C14 degradation or product toxicity.',
      },
      {
        t: 'p',
        text: 'The measured C14 composition and titer are then checked against the predefined specifications, ensuring that success is judged against the original engineering goals. Finally, the actual product composition is fed back into the CFD/LCA models to evaluate cooling and environmental performance, guiding the next iteration through genetic engineering, metabolic optimisation, purification, or process changes.',
      },
    ],
  },
];

export const wetlabCycles: Accordion[] = [
  {
    id: 'wl1',
    title: 'DBTL Cycle 1: Optimisation of FAS2 ORF Primer Annealing Conditions',
    blocks: [
      { t: 'h', text: 'Design' },
      {
        t: 'p',
        text: 'Designed primers targeting the 5-prime and 3-prime ends of the FAS2 ORF. In-silico Tm analysis showed a disparity between the primers, so a 3-point gradient PCR was planned across the predicted annealing temperatures.',
      },
      { t: 'h', text: 'Build' },
      {
        t: 'p',
        text: 'Set up PCR reactions using the designed primer pair and tested the gradient across multiple rounds while troubleshooting amplification conditions.',
      },
      { t: 'h', text: 'Test' },
      {
        t: 'p',
        text: 'Initial reactions consistently produced faint or absent FAS2 ORF bands. After replacing the PCR reagents and repeating the same gradient, substantially brighter and sharper bands were obtained. The forward primer performed best at 58 degrees C, while the 3-prime reverse primer performed best at 60 degrees C.',
      },
      { t: 'h', text: 'Learn' },
      {
        t: 'p',
        text: 'Repeated testing indicated that reagent quality, rather than primer design or temperature range, was the primary bottleneck. The validated annealing conditions were then used for subsequent FAS2 amplification.',
      },
    ],
  },
  {
    id: 'wl2',
    title: 'DBTL Cycle 2: Directional Cloning of the FAS2 ORF into p426GPD',
    blocks: [
      { t: 'h', text: 'Design' },
      {
        t: 'p',
        text: 'Selected p426GPD as the expression backbone. It is a yeast/E. coli shuttle vector, so the same construct can be assembled and screened in bacteria before transformation into S. cerevisiae, and it was already available in the lab. The CYC1 terminator was targeted for removal, as it was not required for our expression design. XhoI and KpnI were chosen as the cloning pair because they flank the CYC1 terminator in this backbone, giving a single directional excision that removes the terminator and opens the insertion site in one step. Both enzymes are common, well characterised for double digestion, and already stocked in the lab. The FAS2 ORF primers were therefore designed with XhoI and KpnI tails so the amplicon would carry compatible overhangs on each end, fixing the orientation of the insert.',
      },
      { t: 'h', text: 'Build' },
      {
        t: 'p',
        text: 'Double digested the p426GPD backbone and the FAS2 ORF amplicon with XhoI and KpnI, then ligated the digested insert into the linearised vector.',
      },
      { t: 'h', text: 'Test' },
      { t: 'p', text: 'Two independent restriction checks were run on the recovered plasmid.' },
      {
        t: 'p',
        text: 'Re-digestion with the original XhoI and KpnI pair released a band at approximately 2.2 kb, matching the expected size of the FAS2 ORF insert. Excision of a fragment at the predicted size confirms that an insert of the correct length is present at the intended site.',
      },
      {
        t: 'p',
        text: 'A second digest with HindIII, which cuts at two sites spanning the insert junction, released a 684 bp fragment. Because this band can only be produced if the insert is present and correctly positioned relative to the backbone HindIII site, it verifies integration independently of the enzymes used to build the construct.',
      },
      { t: 'h', text: 'Learn' },
      {
        t: 'p',
        text: 'Both diagnostic digests agreed, confirming successful directional ligation of the FAS2 ORF into p426GPD with the CYC1 terminator removed. Using a second enzyme with a cut site spanning the junction was the more informative of the two checks, since re-digestion with the cloning enzymes alone would return a correctly sized band from any insert that ligated at that site, whereas the HindIII result depends on the junction itself. This two enzyme verification is carried forward as the standard confirmation step for subsequent assembly rounds, ahead of sequencing across the junctions.',
      },
    ],
  },
  {
    id: 'wl3',
    title: 'DBTL Cycle 3',
    blocks: [
      { t: 'h', text: 'Design' },
      {
        t: 'p',
        text: 'The intermediate plasmid generated in the previous cycle, containing the FAS2 ORF in place of the CYC1 terminator, was used as the starting backbone for the next assembly. The objective was to replace the existing GAP promoter and incorporate the required 3-prime flank, thereby completing the recombinant construct. The same restriction-ligation strategy used in DBTL Cycle 2 was followed, using compatible restriction sites to remove the existing promoter and introduce the replacement sequence in the desired orientation.',
      },
      { t: 'h', text: 'Build' },
      {
        t: 'p',
        text: 'The intermediate plasmid was digested to remove the GAP promoter, and the replacement fragment was prepared with compatible ends. The fragments were then ligated to generate the modified recombinant plasmid. Following transformation and plasmid recovery, multiple rounds of assembly and screening were performed to obtain the desired construct.',
      },
      { t: 'h', text: 'Test' },
      {
        t: 'p',
        text: 'PCR-based screening was first used to check whether the GAP promoter had been successfully replaced. Primers targeting the promoter region were used on the recovered plasmids, with the resulting amplicon pattern used to distinguish successful from unsuccessful assemblies.',
      },
      {
        t: 'p',
        text: 'After several iterations of screening and troubleshooting, we confirmed the incorporation of the 3-prime flank into the construct. As a final validation step, the complete plasmid was sent for Sanger sequencing. The sequencing data showed the expected sequence as well as the intended FAS2 mutation, providing sequence-level confirmation that the recombinant plasmid had been correctly assembled.',
      },
      { t: 'h', text: 'Learn' },
      {
        t: 'p',
        text: 'The iterative screening showed that plasmid recovery alone was not sufficient to establish successful assembly, and that targeted PCR was useful for rapidly identifying the correct constructs. However, PCR could only confirm the presence or absence of a region and could not establish the exact sequence. Whole-plasmid Sanger sequencing therefore provided the decisive validation: the expected construct architecture and the intended FAS2 mutation were present in the recovered plasmid. This confirmed the final recombinant plasmid and completed the DBTL cycle.',
      },
    ],
  },
  {
    id: 'wl4',
    title: 'DBTL Cycle 4',
    blocks: [
      { t: 'h', text: 'Design' },
      {
        t: 'p',
        text: 'The validated recombinant plasmid was designed for integration into the Saccharomyces cerevisiae genome through homologous recombination. The construct contained the required 5-prime and 3-prime homology flanks, allowing the plasmid sequence to recombine with the corresponding genomic locus. A URA auxotrophic marker was included in the construct to enable selection of yeast cells that had acquired the plasmid DNA.',
      },
      {
        t: 'p',
        text: 'To distinguish successful genomic integration from simple acquisition of plasmid DNA, two sets of junction PCR primers were designed. For each flank, one primer was positioned outside the integration construct, within the yeast genome, while the second primer was positioned inside the recombinant plasmid. Separate primer sets were designed for the 5-prime and 3-prime integration junctions.',
      },
      { t: 'h', text: 'Build' },
      {
        t: 'p',
        text: 'The validated recombinant plasmid was transformed into S. cerevisiae strain 4742. Cells were plated under selective conditions using the URA marker, allowing colonies containing the construct to be recovered. Multiple independent colonies were selected for subsequent screening.',
      },
      { t: 'h', text: 'Test' },
      {
        t: 'p',
        text: 'Plasmid/genomic DNA was isolated from the selected colonies and used as the template for junction PCR. Two independent PCR assays were performed to verify integration at both ends of the target locus.',
      },
      {
        t: 'p',
        text: 'For the 5-prime junction PCR, one primer annealed to the genomic sequence outside the 5-prime homology flank, while the second annealed within the integrated construct. Similarly, for the 3-prime junction PCR, one primer annealed outside the 3-prime homology flank in the genome and the other annealed within the construct.',
      },
      {
        t: 'p',
        text: 'Amplicons were obtained for both the 5-prime and 3-prime junctions in the screened colonies. Since each PCR requires a primer located outside the introduced construct, amplification indicates that the construct is physically joined to the corresponding genomic region, rather than merely being present independently in the cell.',
      },
      { t: 'h', text: 'Learn' },
      {
        t: 'p',
        text: 'URA-based selection was effective for recovering colonies containing the recombinant DNA, but selection alone could not establish whether the construct had integrated into the genome at the intended locus. The two-sided junction PCR provided stronger evidence of successful homologous recombination by independently confirming both integration boundaries.',
      },
      {
        t: 'p',
        text: 'The presence of the expected amplicons at both the 5-prime and 3-prime junctions confirmed successful integration of the recombinant construct into the S. cerevisiae genome, completing the transition from plasmid assembly to the engineered yeast strain.',
      },
    ],
  },
];

export const drylabIntro =
  'The modelling work comprised one complete Design, Build, Test, Learn cycle, in which the Test stage indicated that the design should be changed. The cycle is computational: the Test stage is model against model and model against literature, and no wet-lab data closed the loop.';

export const drylabCycles: Accordion[] = [
  {
    id: 'dl-design',
    title: 'Design',
    blocks: [
      {
        t: 'p',
        text: 'The goal was to choose genetic edits that move the fatty acids of yeast toward myristic acid (C14:0). Two ideas were planned: a single mutation in the fatty acid synthase, and gene deletions that reduce fat breakdown, ranked with a metabolic model.',
      },
      {
        t: 'p',
        text: 'Initial plan. Two strategies were planned: a FAS2 point mutation to release C14 early (by analogy with Yarrowia lipolytica I1220W), and gene knockouts that reduce fatty-acid degradation in order to preserve C14:0. Candidate knockouts were to be ranked by agreement between the predicted fatty-acid profile and a target, using flux balance analysis on Yeast9.',
      },
    ],
  },
  {
    id: 'dl-build',
    title: 'Build',
    blocks: [
      {
        t: 'p',
        text: 'Three tools were built: a fast metabolic calculator with a scoring function, three ways of searching gene-deletion combinations, and a pipeline that predicts how a fatty acid sits in the enzyme.',
      },
      {
        t: 'ul',
        items: [
          'A fast FBA evaluator and a scoring function over fatty-acid profiles.',
          'A search over knockout combinations: brute force, greedy and a reinforcement-learning agent.',
          'A structural pipeline for the FAS2 ketoacyl synthase (KS) domain: homology-based site identification and Boltz-2 ligand placement.',
        ],
      },
    ],
  },
  {
    id: 'dl-test',
    title: 'Test',
    blocks: [
      {
        t: 'p',
        text: 'The tests undermined the plan. The ranking had almost no margin over the unedited strain, the model showed myristic acid arising only from fat breakdown, a learning-based search lost to simpler ones, and early structure predictions depended on setup.',
      },
      {
        t: 'ul',
        items: [
          'Brute-force evaluation of 175 combinations returned a leading set (FAA1 + FAA4, score 0.202529) against 0.202509 for the unedited strain, a margin of 0.010 per cent. GC-MS composition varies by 1-5 per cent between replicates, so no experiment could separate the two.',
          'Route analysis of the FBA solution showed that the model forms C14:0 only by shortening C16:0 through beta-oxidation. Deletion of POX1 gave exactly zero.',
          'Benchmarking of the reinforcement-learning agent over 20 seeds showed it found the exact best answer in 10 per cent of runs, against 65 per cent for greedy search and 100 per cent for brute force.',
          'The first structural runs suggested that unconstrained Boltz-2 does not place the ligand and that the acyl chain overlaps M1251. Reruns with five samples reproduced neither observation, so both are treated as dependent on the setup.',
        ],
      },
    ],
  },
  {
    id: 'dl-learn',
    title: 'Learn',
    blocks: [
      {
        t: 'p',
        text: 'Five lessons followed: the planned deletion strategy was reversed, no ranked list could be sent to the laboratory, the model needed a hand-added reaction, simple search was sufficient, and one residue was excluded as a likely gate.',
      },
      {
        t: 'ul',
        items: [
          'The degradation-knockdown strategy was inverted. In the model, degradation is the only source of C14:0, so the strategy was no longer planned.',
          'The scoring function could not support any ranking, and no knockout list was passed to the wet lab.',
          'The metabolic model could not represent the intended intervention. Yeast9 has no early C14 release from FAS, so a documented reaction was added.',
          'Simple search was sufficient. At the present scale, exact enumeration finishes in minutes to under two hours.',
          'M1251 is probably a gate and not a site for mutation, and it was therefore excluded.',
        ],
      },
      {
        t: 'p',
        text: 'Next iteration: the early-release reaction was added and the analysis repeated. C14:0 export increased by 2.6 per cent and the limit moved to NADPH. The next cycle repeats the frontier and knockout screen with the reaction, computes growth penalties and tests the model against published literature outcomes.',
      },
    ],
  },
];
