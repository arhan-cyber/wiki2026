// Reconstructed from helper set/project engineering under project/cssallyaer.css
// (Figma dev-mode export). The design's own navbar and footer are omitted — the
// app supplies those. Coordinates are on the original 1440-wide canvas; the page
// scales the canvas to fit. CONTENT_TOP/CONTENT_H bound the rebuilt middle.
export const CANVAS_W = 1440;
export const CONTENT_H = 3340;

export type Box = {
  left: number; top: number; width: number; height: number;
  bg?: string; border?: string; radius?: number; shadow?: string;
};

export type Txt = {
  text: string; left: number; top: number; width: number; height: number;
  font: 'inria' | 'inter'; size: number; lineHeight: number; weight: number;
  italic?: boolean; color: string; upper?: boolean; align?: 'left' | 'center';
};

export type Arrow = { left: number; top: number; color: string };

// Panels, the left rail, inner content boxes, and accordion bars (back to front).
export const boxes: Box[] = [
  { left: 133, top: 660, width: 201, height: 2621, bg: '#FAFAFA' }, // left rail
  // Title card (sketchy Figma border approximated as a rounded border)
  { left: 178, top: 185, width: 1083, height: 370, bg: '#FAFAFA', border: '9px solid #88C0E6', radius: 70, shadow: '2px 4px 10px #88C0E6' },
  // Section panels
  { left: 357, top: 660, width: 950, height: 836, bg: '#F5F8FA', radius: 30 }, // CYCLE 0
  { left: 355, top: 1514, width: 950, height: 774, bg: '#F5F8FA', radius: 30 }, // DESIGN
  { left: 380, top: 1782, width: 900, height: 470, bg: '#EDF3FF', radius: 30 }, // DESIGN inner
  { left: 355, top: 2306, width: 950, height: 475, bg: '#F5F8FA', radius: 30 }, // WETLAB
  { left: 355, top: 2799, width: 950, height: 482, bg: '#F5F8FA', radius: 30 }, // DRYLAB
  // CYCLE 0 — Q1 expanded answer container + the three question header bars
  { left: 383, top: 990, width: 900, height: 311, bg: '#E4F3EE', border: '2px solid #DCEFF0', radius: 30 },
  { left: 382, top: 990, width: 900, height: 64, bg: '#245C53', radius: 30 },
  { left: 382, top: 1318, width: 900, height: 64, bg: '#245C53', radius: 30 },
  { left: 382, top: 1400, width: 900, height: 64, bg: '#245C53', radius: 30 },
  // WETLAB DBTL cycle bars
  { left: 377, top: 2431, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 377, top: 2515, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 378, top: 2599, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 377, top: 2683, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  // DRYLAB DBTL cycle bars (empty placeholders, as in the design)
  { left: 380, top: 2928, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 380, top: 3012, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 380, top: 3096, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
  { left: 382, top: 3180, width: 900, height: 64, bg: '#D7E5F0', radius: 30 },
];

// Accent rules (vertical or horizontal thin lines).
export const lines: Box[] = [
  { left: 397, top: 1071, width: 2, height: 206, bg: '#63AEA6' },   // CYCLE 0 answer accent
  { left: 403, top: 1805, width: 3, height: 409, bg: '#2A3A57' },   // DESIGN left accent
  { left: 378, top: 2391, width: 327, height: 3, bg: '#2A3A57' },   // WETLAB underline
  { left: 389, top: 2879, width: 327, height: 3, bg: '#2A3A57' },   // DRYLAB underline
];

// Down-chevrons on the right of each accordion bar.
export const arrows: Arrow[] = [
  { left: 1240, top: 1012, color: '#FFFFFF' },
  { left: 1240, top: 1340, color: '#FFFFFF' },
  { left: 1240, top: 1422, color: '#FFFFFF' },
  { left: 1235, top: 2453, color: '#172B4D' },
  { left: 1235, top: 2537, color: '#172B4D' },
  { left: 1236, top: 2621, color: '#172B4D' },
  { left: 1235, top: 2705, color: '#172B4D' },
  { left: 1238, top: 2950, color: '#17365D' },
  { left: 1238, top: 3034, color: '#17365D' },
  { left: 1238, top: 3118, color: '#17365D' },
  { left: 1240, top: 3202, color: '#17365D' },
];

export const texts: Txt[] = [
  { text: 'project engineering', left: 396, top: 328, width: 633, height: 84, font: 'inria', size: 70, lineHeight: 84, weight: 400, color: '#1E1E1E', align: 'center' },
  { text: 'Cycle 0 :', left: 382, top: 694, width: 257, height: 54, font: 'inter', size: 45, lineHeight: 54, weight: 800, color: '#3F94D2', upper: true },
  { text: 'Application Specification: Is methyl myristate a viable coolant?', left: 383, top: 759, width: 900, height: 72, font: 'inter', size: 30, lineHeight: 36, weight: 700, color: '#263746' },
  { text: 'Before engineering the yeast, we first needed to determine whether methyl myristate could serve as a viable dielectric-immersion coolant for AI data centres. This application layer defines the performance and sustainability requirements that the engineered strain must ultimately satisfy', left: 383, top: 835, width: 900, height: 100, font: 'inter', size: 18, lineHeight: 22, weight: 400, color: '#263746' },
  { text: 'Q1. Can methyl myristate cool effectively?', left: 404, top: 1007, width: 631, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#FFFFFF' },
  { text: 'We modelled single-phase immersion cooling using methyl myristate as the working fluid and compared its performance with mineral oil and a fluorinated dielectric reference. The comparison considered properties relevant to immersion cooling, including: Thermal conductivity Volumetric heat capacity Kinematic viscosity Junction temperature Pumping power This established whether the thermal performance of methyl myristate justified pursuing it as the target coolant.', left: 408, top: 1071, width: 860, height: 206, font: 'inter', size: 17, lineHeight: 21, weight: 400, color: '#245C53' },
  { text: 'Q2. How would the coolant actually be produced?', left: 404, top: 1335, width: 622, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#FFFFFF' },
  { text: 'Q3. Is the proposed coolant environmentally competitive?', left: 406, top: 1416, width: 671, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#FFFFFF' },
  { text: 'DESIGN', left: 421, top: 1801, width: 175, height: 54, font: 'inter', size: 45, lineHeight: 54, weight: 600, color: '#17365D' },
  { text: 'How can we alter FAS to shift production toward C14?', left: 417, top: 1855, width: 640, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 700, color: '#17365D' },
  { text: '1. Enzyme Design — Engineering FAS2 for C14 Production To shift FAS output from C16/C18 toward C14, we targeted the acyl-binding cavity, which controls fatty-acid chain length. BLAST and phylogenetic analysis were used to identify variable cavity-lining residues in S. cerevisiae FAS. Candidate mutations were evaluated using molecular docking and molecular dynamics for their predicted C14 versus C16 preference. V1254W was selected as the lead mutation, predicted to reduce cavity volume and favour C14 release. 2. Chassis Design — Will Yeast Retain C14? FAS engineering alone may not increase C14 accumulation if the cell subsequently consumes the product. We therefore used genome-scale flux balance analysis (FBA) with the Yeast8/9 model to study C14 metabolism. We examined competing pathways, particularly peroxisomal β-oxidation and fatty-acid reactivation, to identify potential routes of C14 loss and distinguish poor production from post-production degradation.', left: 424, top: 1907, width: 838, height: 324, font: 'inter', size: 20, lineHeight: 24, weight: 700, color: '#343A40' },
  { text: 'WETLAB DBTL:', left: 377, top: 2323, width: 336, height: 54, font: 'inter', size: 45, lineHeight: 54, weight: 700, color: '#2A3A57' },
  { text: 'DBTL Cycle 1: Optimisation of FAS2 ORF Primer Annealing', left: 399, top: 2448, width: 698, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#172B4D' },
  { text: 'DBTL Cycle 2: Directional Cloning of the FAS2 ORF into p426GPD', left: 399, top: 2532, width: 762, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#172B4D' },
  { text: 'DBTL Cycle 3', left: 400, top: 2616, width: 698, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#172B4D' },
  { text: 'DBTL Cycle 4', left: 399, top: 2700, width: 698, height: 29, font: 'inter', size: 24, lineHeight: 29, weight: 600, color: '#172B4D' },
  { text: 'DRYLAB DBTL:', left: 380, top: 2825, width: 326, height: 54, font: 'inter', size: 45, lineHeight: 54, weight: 700, color: '#2A3A57' },
];
