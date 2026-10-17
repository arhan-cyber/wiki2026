// Protocol content transcribed from "wiki wetlab doccumentation.pdf" (pages 23–37).

export type ListItem = string | { text: string; sub: string[] };

export type Block =
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: ListItem[]; start?: number }
  | { t: 'table'; head: string[]; rows: string[][] };

export type Protocol = { title: string; blocks: Block[] };

export type ProtocolSection = {
  id: string;
  title: string;
  segment: string; // wheel segment colour
  button: string; // pill colour
  body: string; // open-panel tint
  border: string; // card border colour
  titleTop: number;
  lineTop: number;
  buttonsTop: number;
  protocols: Protocol[];
};

export const sections: ProtocolSection[] = [
  {
    id: 'media-preparation',
    title: 'Media Preparation',
    segment: '#65b3f9',
    button: '#93ccff',
    body: '#e7f2ff',
    border: '#bbddfb',
    titleTop: 34,
    lineTop: 75.5,
    buttonsTop: 110,
    protocols: [
      {
        title: 'LB Broth',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['LB Broth powder', 'Distilled or Milli-Q water', 'Autoclavable flask or bottle', 'Autoclave'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              "Weigh 2g of LB broth powder according to the manufacturer's instructions (typically 20 g/L).",
              'Dissolve the powder in 100 ml of Milli-Q water.',
              'Autoclave at 120°C, 1 atm for 20-30 minutes.',
              'Allow the medium to cool to room temperature before use or storage.',
              'Store at 4°C.',
            ],
          },
        ],
      },
      {
        title: 'LB Agar',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['LB Broth powder', 'Agar', 'Distilled or Milli-Q water', 'Petri dishes'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Prepare LB broth as described above.',
              'Add 35g/L agar before autoclaving.',
              'Autoclave at 120°C for 15–20 minutes.',
              'Cool the medium to 45–50°C.',
              'If required, add antibiotics and mix gently.',
              'Pour approximately 20–25 mL into each sterile Petri dish.',
              'Allow plates to solidify.',
              'Store inverted at 4°C.',
            ],
          },
        ],
      },
      {
        title: 'YPD Broth',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['Dextrose', 'Protease Peptone', 'Yeast Extract', 'Milli-Q (MQ) Water', 'Magnetic stir bar', 'Autoclave'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Add 300 mL Milli-Q water to a sterile glass bottle.',
              'Add 6 g dextrose and stir until completely dissolved.',
              'Add 6 g protease peptone and mix until dissolved.',
              'Add 3 g yeast extract and mix thoroughly.',
              'Place a magnetic stir bar into the bottle and loosely cap the bottle.',
              'Cover the bottle with aluminium foil.',
              'Sterilize by autoclaving at 120°C for 20 minutes.',
              'Allow the medium to cool to room temperature before use or storage.',
            ],
          },
        ],
      },
      {
        title: 'YPD Agar',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['YPD broth', 'Agar', 'Magnetic stir bar', 'Sterile Petri dishes'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Prepare YPD broth as described above.',
              'Add 6 g agar to the prepared YPD broth and mix thoroughly.',
              'Place a magnetic stir bar in the bottle before autoclaving.',
              'Cover the bottle with aluminium foil and autoclave for 20 minutes.',
              'After autoclaving, remove the aluminium foil, loosen the bottle cap, and allow the medium to cool briefly.',
              'Place the bottle on a magnetic stirrer with gentle heating and maintain the agar at 50–55°C for at least 15 minutes or until ready for pouring.',
              'Pour approximately 20–25 mL of medium into each sterile Petri dish.',
              'Allow the plates to solidify completely before storage or use.',
              'Store plates inverted at 4°C.',
            ],
          },
        ],
      },
      {
        title: 'SD-URA Agar',
        blocks: [
          { t: 'h', text: 'Materials' },
          {
            t: 'ul',
            items: [
              'Yeast Nitrogen Base (YNB) without amino acids',
              'Ammonium sulfate',
              'Synthetic Dropout Supplement (-Uracil)',
              'D-Glucose (Dextrose)',
              'Milli-Q water',
              'Magnetic stir bar',
              'Glass bottle',
              'Agar powder',
              'Sterile Petri dishes',
            ],
          },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Add approximately 174 mL Milli-Q water to a glass bottle.',
              'Add 4 g agar powder to the medium.',
              'Add 4 g dextrose/glucose to the medium',
              'Autoclave at 120°C with the magnetic bar/bead inside it.',
              { text: 'Let it cool on a magnetic stirrer', sub: ['at room temperature.', 'on a heat plate if not for immediate use'] },
              'Add 20 mL of 10x yeast nitrogen base, 2 mL each of lysine, histidine, leucine and stir it.',
              'Pour approximately 20–25 mL into each sterile Petri dish.',
              'Allow the plates to solidify completely.',
              'Store inverted at 4°C.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dna-extraction-purification',
    title: 'DNA Extraction & Purification',
    segment: '#a0a2f5',
    button: '#c6c7f8',
    body: '#eeeefd',
    border: '#c6c7f8',
    titleTop: 31,
    lineTop: 77,
    buttonsTop: 119,
    protocols: [
      {
        title: 'Genomic DNA Extraction',
        blocks: [
          { t: 'h', text: 'A. Growth and Harvest of Cells' },
          {
            t: 'ol',
            items: [
              'Inoculate a colony in 5 ml YPD and incubate at 30°C, 200 rpm for O/N (overnight).',
              'Centrifuge at 13,000 rpm for 15 sec.',
              'Remove the media and replace with 1 mL sterile H₂O and resuspend the pellet by gentle vortexing.',
              'Centrifuge at 13,000 rpm for 15 sec.',
              'Discard supernatant.',
            ],
          },
          { t: 'h', text: 'B. Extraction of DNA' },
          {
            t: 'ol',
            items: [
              'Add 0.2 ml of Triton-SDS to cells and resuspend the pellet by gentle pipetting.',
              'Add 0.2 ml of phenol-chloroform and 0.2 g glass beads and vortex for 30 seconds at room temperature.',
              'Add 0.2 ml of Tris-EDTA (pH 8.0) and vortex for 30 seconds.',
              'Centrifuge at 13,000 rpm for 10 min for phase separation.',
              'Transfer the aq. layer to a new MCT without disturbing materials at the interface.',
            ],
          },
          { t: 'h', text: 'C. DNA Isolation' },
          {
            t: 'ol',
            items: [
              'Add 0.7 ml of absolute chilled(-20°C) ethanol + 10 μl of 4M NH₄(CH₃COO) Acetate to aq. Solution and mix by inverting (5-10 times)',
              'Incubate at -20°C for 12 mins.',
              'Centrifuge at 13,000 rpm for 10 mins.',
              'Decant the supernatant and rinse the pellet with 0.5 ml of 70% ethanol.',
              'Centrifuge at 13,000 rpm for 10 mins and discard ethanol.',
              'Air dry DNA pellet for 1 min at 60 °C water bath. (Confirm drying by smelling. There should be no ethanol)',
              'Dissolve pellets in 30 µl of AMQ at 60 ℃ for 15 mins (Close lid of MCT and store).',
            ],
          },
        ],
      },
      {
        title: 'Plasmid Isolation',
        blocks: [
          { t: 'h', text: 'A. Cell Lysis' },
          {
            t: 'ol',
            items: [
              'Pellet bacterial culture by centrifugation at 13,000 rpm for 2 min. Discard the supernatant.',
              'Resuspend the pellet thoroughly in 250 µL Buffer S1 (containing RNase A).',
              'Add 250 µL Buffer S2 and mix by gently inverting the tube 4-5 times. Do not vortex. Incubate until the lysate becomes clear but not for more than 5 min.',
              'Add 350 µL Buffer S3 and immediately invert the tube 4–6 times. Do not vortex.',
              'Centrifuge at 13,000 rpm for 10 min.',
            ],
          },
          { t: 'h', text: 'B. DNA Purification' },
          {
            t: 'ol',
            items: [
              'Carefully transfer the cleared supernatant to a mini Q column placed in a collection tube.',
              'Allow the column to stand for 5 min to maximize DNA binding.',
              'Centrifuge at 13,000 rpm for 30 s. Discard the flow-through.',
              'Add 500 µL Buffer AW, centrifuge for 30 s, and discard the flow-through.',
              'Add 700 µL Buffer PW, centrifuge for 30 s, and discard the flow-through.',
              'Centrifuge the empty column at 13,000 rpm for 1 min to remove residual wash buffer.',
              'Transfer the spin column to a fresh 1.5 mL microcentrifuge tube.',
              'Add 30 µL AMQ directly to the center of the membrane without touching the bed.',
              'Incubate for 5 min at room temperature.',
              'Centrifuge at 13,000 rpm for 1 min to elute the plasmid DNA.',
            ],
          },
          { t: 'p', text: 'The eluate contains the purified plasmid DNA.' },
        ],
      },
      {
        title: 'DNA Purification / Gel Extraction',
        blocks: [
          { t: 'h', text: 'Materials' },
          {
            t: 'ul',
            items: [
              'GB Buffer',
              'NW Buffer',
              'AMQ (Ultrapure Water)',
              'Spin column with collection tube',
              'Microcentrifuge',
              'Fresh 1.5 mL microcentrifuge (Eppendorf) tube',
            ],
          },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              {
                text: 'Add 3 volumes of GB Buffer to your sample.',
                sub: [
                  'For example, if you have 100 µL of plasmid DNA solution or 100 µg equivalent gel sample, add 300 µL of GB Buffer.',
                  'Mix thoroughly until the solution is homogeneous.',
                ],
              },
              'Transfer the mixture to the spin column placed inside its collection tube.',
              'Centrifuge at 13,000 rpm for 1 minute.',
              'Discard the flow-through and place the spin column back into the collection tube.',
              'Add 700 µL of NW Buffer to the spin column.',
              'Centrifuge at 13,000 rpm for 30 seconds.',
              'Discard the flow-through and return the spin column to the collection tube.',
              'Perform an additional centrifugation at 13,000 rpm for 1 minute to remove any residual wash buffer.',
              'Transfer the spin column to a fresh 1.5 mL microcentrifuge (Eppendorf) tube.',
              'Add 30 µL of AMQ (ultrapure water) directly to the center of the membrane, taking care not to touch the membrane with the pipette tip.',
              'Incubate the column at room temperature for 10 minutes to maximize DNA elution.',
              'Centrifuge at 13,000 rpm for 1 minute.',
              'The purified DNA will be collected in the Eppendorf tube and is ready for downstream applications.',
            ],
          },
          { t: 'h', text: 'Notes' },
          {
            t: 'ul',
            items: [
              'Use 3× the sample volume (or gel weight equivalent) of GB Buffer for efficient DNA binding.',
              'Avoid touching the silica membrane while adding the elution buffer, as this can reduce DNA recovery or damage the membrane.',
              'The flow-through should always be discarded after binding and washing steps; the DNA remains bound to the silica membrane until elution.',
              'For higher DNA yield, the elution step can be repeated using the first eluate or an additional 20–30 µL of AMQ if required.',
            ],
          },
        ],
      },
    ],
  },
  // The four sections below have wheel segments in Figma but no section design;
  // they reuse the layout of the two sections above (approved by the team).
  {
    id: 'pcr-analysis',
    title: 'PCR & Analysis',
    segment: '#d48bc2',
    button: '#e4b4d8',
    body: '#f8ecf5',
    border: '#e4b4d8',
    titleTop: 31,
    lineTop: 77,
    buttonsTop: 119,
    protocols: [
      {
        title: 'PCR Amplification',
        blocks: [
          { t: 'h', text: 'A. Preparation and Setup' },
          {
            t: 'ol',
            items: [
              'Reagent Management: Retrieve all reagents (except Taq polymerase) from -20℃ storage and keep them on ice throughout the procedure.',
              {
                text: 'Pipetting Technique:',
                sub: [
                  // TODO: the PDF reads "for volumes 1 µL" — a comparison symbol (≤ / <) appears to be missing.
                  'Use a low-volume micropipette for volumes 1 µL.',
                  'Depress the plunger only to the first stop (single click) to aspirate.',
                  'When dispensing, dip the tip directly into the liquid mix and stir gently once or twice to ensure complete release.',
                ],
              },
            ],
          },
          { t: 'h', text: 'B. Reaction Assembly' },
          { t: 'p', text: 'Prepare the PCR reaction in sterile 0.2 mL thin-walled tubes according to the table below. Prepare three types of reactions:' },
          { t: 'ul', items: ['Test (Mammalian gDNA)', 'Positive Control (pET28a)', 'Negative Control (Distilled Water)'] },
          {
            t: 'table',
            head: ['Order', 'Component', 'Volume (per vial)'],
            rows: [
              ['1', '10X PCR Buffer', '5 µL'],
              ['2', '2 mM dNTPs Mix', '5 µL'],
              ['3', 'Forward Primer', '1 µL'],
              ['4', 'Reverse Primer', '1 µL'],
              ['5', 'Template DNA (Test / + / -)', '2 µL'],
              ['6', 'Taq DNA Polymerase', '1.5 µL'],
              ['7', 'Nuclease-Free Water (DW)', '34.5 µL'],
            ],
          },
          { t: 'p', text: 'Total Volume: 50 µL' },
          { t: 'p', text: 'Note: Taq polymerase must be added last and will be dispensed by the instructor.' },
          { t: 'h', text: 'C. Mixing and Loading' },
          {
            t: 'ol',
            items: [
              'Centrifugation: Place the vials in a microcentrifuge. Ensure vials are placed symmetrically opposite one another to maintain balance. Spin for 30 seconds.',
              {
                text: 'Thermal Cycler Loading:',
                sub: [
                  'Arrange vials evenly within the PCR block.',
                  'Place vials filled with water in the four corners of the block to ensure even pressure and heat distribution from the lid.',
                ],
              },
              // TODO: cycling program (temperatures / times / cycles) is not given in the PDF.
              'Run Duration: Initiate the programmed cycle',
              'Post-PCR: Proceed to Gel Electrophoresis immediately following the run.',
            ],
          },
        ],
      },
      {
        title: 'Agarose Gel Electrophoresis',
        blocks: [
          { t: 'h', text: 'A. Buffer and Gel Preparation' },
          { t: 'h', text: '1. Preparation of 10X TBE Stock Buffer' },
          {
            t: 'ol',
            items: [
              'Combine 54 g Tris base, 27.5 g Boric acid, and 20 mL 0.5 M EDTA (pH 8.0) with 300 mL of Milli-Q water.',
              'Place the mixture on a magnetic stirrer. Set to a moderate speed to prevent beaker damage or splashing.',
              'Adjust the final volume to 500 mL using Milli-Q water.',
              'Autoclave the 10X stock before storage.',
            ],
          },
          { t: 'h', text: '2. Preparation of 1% Agarose Gel' },
          {
            t: 'ol',
            items: [
              'Prepare 1X TBE working solution by diluting 30 mL of 10X TBE into 270 mL of Milli-Q water.',
              'In a flask, combine 32 mL of 1X TBE (includes margin for evaporation) with 0.3 g Agarose powder.',
              'Microwave until the solution begins to bubble, remove the flask carefully and swirl.',
              'Repeat the step until the solution is completely homogeneous and transparent, with no visible agarose strands.',
              'Cool the flask to 60°C and add 17 µL of Azidye',
            ],
          },
          { t: 'h', text: 'B. Gel Casting and Loading' },
          {
            t: 'ol',
            items: [
              'Pour the agarose into the casting tray and adjust the tray leveling knobs to ensure an even gel thickness.',
              'Insert the comb at the end opposite to the tray knobs to create the sample wells and allow the gel to sit until it is completely solidified.',
              'Once the gel has solidified, carefully remove the comb and transfer the gel into the electrophoresis tank.',
              'Fill the tank with 1X TBE buffer up to the indicated “Fill” line.',
              'Place the gel with the wells positioned near the negative (black) terminal.',
              'Prepare the samples with loading dye and carefully pipette them into the wells.',
            ],
          },
          { t: 'h', text: 'C. Running and Visualization' },
          {
            t: 'ol',
            items: [
              'Close the tank lid and set the power supply to 100 V to begin electrophoresis.',
              'Verify current flow by checking for bubble formation at the negative terminal and ensuring that the power supply screen does not display a “connection error.”',
              'After the electrophoresis run is complete, carefully transfer the gel to a UV transilluminator for visualization.',
              'Capture an image of the bright orange fluorescent DNA bands.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'restriction-cloning',
    title: 'Restriction & Cloning',
    segment: '#f9ce57',
    button: '#fbe09a',
    body: '#fdf4dd',
    border: '#fbe09a',
    titleTop: 31,
    lineTop: 77,
    buttonsTop: 119,
    protocols: [
      {
        title: 'Restriction Digestion',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['DNA sample', 'Restriction enzyme(s)', '10X reaction buffer', 'Nuclease-free water'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Assemble the digestion reaction according to the recommended buffer and enzyme concentrations.',
              'Mix gently and briefly with a centrifuge.',
              'Incubate at the recommended temperature (typically 37°C) for the required duration (typically 1 hour).',
              'Allow the digested DNA to cool to room temperature before use or storage.',
              'Store digested DNA on ice for immediate use or at −20°C for long-term storage.',
            ],
          },
        ],
      },
      {
        title: 'p426GPD Vector Preparation',
        blocks: [
          { t: 'h', text: "Sequential Digestion of 3' Flank and p426GPD" },
          { t: 'h', text: 'A. Reaction Setup' },
          {
            t: 'table',
            head: ['Component', "Tube 1: S2 (3' Flank)", 'Tube 2: p426GPD Vector'],
            rows: [
              ['DNA Template', '90 µL (PCR Product)', '10 µL (Plasmid)'],
              ['10X NEB Buffer', '20 µL', '5 µL'],
              ['SacI Enzyme', '2 µL', '2 µL'],
              ['Milli-Q Water', '88 µL', '33 µL'],
              ['Total Volume', '200 µL', '50 µL'],
            ],
          },
          { t: 'h', text: 'B. Digestion Step 1: SacI' },
          {
            t: 'ol',
            items: [
              'Briefly spin both vials to collect the liquid at the bottom.',
              'Incubate the vials in a 37°C water bath for 90 minutes.',
              'Every 30 minutes, remove the vials, gently tap them to mix, briefly spin them, and return them to the water bath.',
              'Transfer the vials to a 65°C water bath and incubate for 20 minutes to completely inactivate the SacI enzyme.',
            ],
          },
          { t: 'h', text: 'C. Digestion Step 2: BamHI' },
          {
            t: 'ol',
            items: [
              'Add 2 µL of BamHI directly to each of the two vials.',
              'Return the vials to the 37°C water bath and incubate them for 60 minutes.',
              'After the first 30 minutes, gently tap the vials to mix the contents and briefly spin them before continuing the incubation.',
            ],
          },
          { t: 'h', text: 'D. Post-Digestion Purification' },
          { t: 'p', text: 'Since BamHI is not efficiently heat-inactivated at 65°C and higher temperatures may damage the DNA, proceed directly with spin-column purification after digestion.' },
          {
            t: 'ol',
            items: [
              'Add five volumes of NR Buffer to each tube, such as 1 mL for Tube 1 and 250 µL for Tube 2, and allow the mixture to stand for 5 minutes.',
              'Transfer the mixture to the spin column and centrifuge at 12,100 rpm for 1 minute, discard the flow-through, and wash the column twice with 700 µL of NW Buffer.',
              'Centrifuge the empty column at maximum speed for 2 minutes to remove any residual ethanol.',
              'Add 30 µL of EB Buffer to the center of the column, allow it to stand for 5 minutes, and centrifuge at 12,500 rpm to collect the purified digested DNA.',
            ],
          },
        ],
      },
      {
        title: 'Ligation',
        blocks: [
          { t: 'h', text: 'Sequential Digestion of ORF and Intermediate Plasmid (I)' },
          { t: 'h', text: 'A. Reaction Setup' },
          { t: 'p', text: 'Prepare two separate reactions. We will use a 50 µL volume for both to ensure high DNA concentration for the final ligation.' },
          {
            t: 'table',
            // TODO: PDF header reads "S1 (2257 kb bp ORF)" — unit needs confirming.
            head: ['Component', 'Tube 1: S1 (2257 kb bp ORF)', 'Tube 2: Intermediate Plasmid (I)'],
            rows: [
              ['DNA Template', '30–40 µL (Purified ORF)', '10 µL (Intermediate Plasmid)'],
              ['10X NEB Buffer', '5 µL', '5 µL'],
              ['XhoI Enzyme', '2 µL', '2 µL'],
              ['Milli-Q Water', 'Up to 50 µL total', '33 µL'],
              ['Total Volume', '50 µL', '50 µL'],
            ],
          },
          { t: 'h', text: 'B. Digestion Step 1: XhoI' },
          {
            t: 'ol',
            items: [
              'Briefly centrifuge the vials for 10 seconds to collect the reagents at the bottom.',
              'Incubate the vials in a 37°C water bath for 90 minutes.',
              'Every 30 minutes, remove the vials, gently tap them to mix, briefly centrifuge them, and return them to the water bath to ensure thorough enzyme interaction with the DNA.',
              'Transfer the vials to a 65°C water bath and incubate for 20 minutes to inactivate the XhoI enzyme before the next digestion step.',
            ],
          },
          { t: 'h', text: 'C. Digestion Step 2: KpnI' },
          {
            t: 'ol',
            items: [
              'Add 2 µL of KpnI directly to each of the two vials.',
              'Return the vials to the 37°C water bath and incubate them for 90 minutes to allow efficient digestion of the large DNA fragments.',
              'Every 30 minutes, remove the vials, gently tap them to mix, briefly centrifuge them, and return them to the water bath.',
            ],
          },
          { t: 'h', text: 'D. Column Purification (Final Prep)' },
          {
            t: 'ol',
            items: [
              'Add 250 µL of NR Buffer to each tube using the specified 5:1 ratio and allow the tubes to stand at room temperature for 5–8 minutes to facilitate binding of the large DNA fragments to the silica membrane.',
              'Transfer the mixture to the spin column, centrifuge at 12,100 rpm for 1 minute, and wash the column twice with 700 µL of NW Buffer.',
              'Centrifuge the empty column at maximum speed for 2 minutes to remove residual ethanol that could interfere with the subsequent ligation.',
              // TODO: this step is cut off mid-sentence in the PDF, and no ligation reaction steps follow.
              'Add 30 µL of EB Buffer pre-warmed to 55°C to the column, allow it to stand for 5 minutes,',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'transformation',
    title: 'Transformation',
    segment: '#94d8bf',
    button: '#bce7d7',
    body: '#e9f7f2',
    border: '#bce7d7',
    titleTop: 31,
    lineTop: 77,
    buttonsTop: 119,
    protocols: [
      {
        title: 'Competent Cell Preparation and Transformation',
        blocks: [
          { t: 'h', text: 'Calcium chloride-mediated transformation in E. coli DH5α' },
          { t: 'h', text: 'Material' },
          {
            t: 'ol',
            items: [
              'Sterile LB Broth tubes and 100 ml LB in 500 ml flask.',
              'O/N culture of E. coli DH5α strain.',
              'LA plates with antibiotics (LA + Amp) and LA plates (without Amp).',
              'Sterile 100 mM CaCl₂·2H₂O (Chilled).',
              'DNA (~30 ng/µl).',
              'Sterile centrifuge tubes should be pre-chilled with the rotor.',
              'Water bath set at 42°C.',
            ],
          },
          { t: 'h', text: 'Method' },
          {
            t: 'ol',
            items: [
              'Inoculate 5 ml LB with culture of E. coli DH5α on the previous night.',
              'The next morning, add 1 ml of the O/N culture to 100 ml of LB and allow it to grow.',
              'Monitor the growth by measuring the Optical Density at 600 nm.',
              'Once the culture O.D. reaches 0.5, keep the flask on ice-water for quick chilling and then transfer it on ice for 30 mins and collect the cells by centrifugation at 4000 rpm for 10 mins. Use sterile pre-chilled centrifuge bottles/tubes.',
              'Aseptically drain the supernatant and re-suspend the cell pellet in 30 ml chilled 100 mM CaCl₂.',
              'Place the tubes on ice for 30 min.',
              'Centrifuge the cell suspension and discard the supernatant.',
              'Resuspend the cell pellet in 10 ml of chilled 100 mM CaCl₂.',
              'Place the tubes on ice for 30 min.',
              'Centrifuge the cell suspension and discard the supernatant.',
              'Resuspend the cell pellet in 2 ml of chilled 100 mM CaCl₂.',
            ],
          },
          { t: 'p', text: 'These are your competent cells.' },
          { t: 'h', text: 'Transformation' },
          {
            t: 'ol',
            start: 12,
            items: [
              {
                text: '',
                sub: [
                  'Dispense 200 µl of this culture into an appropriate glass vial and add 1 µl of DNA (~30 ng) by a gentle swirl motion.',
                  '(For pure plasmid transformation- Dispense 1µl of plasmid into 100µl of the competent cell culture)',
                ],
              },
              'Incubate this mixture on ice for 30 mins.',
              'Transfer the tubes to 42°C and keep it for 90 seconds.',
              'Remove the tubes and keep it on ice for 5 mins. Add 1 ml of sterile LB and incubate the tube at 37°C on a shaker for 45 mins.',
            ],
          },
        ],
      },
      {
        title: 'Yeast Transformation',
        blocks: [
          { t: 'h', text: 'Materials' },
          {
            t: 'ol',
            items: [
              'Saccharomyces cerevisiae BY4742 culture',
              'YPD broth',
              'Sterile AMQ',
              'Lithium acetate (LiAc), 100 mM',
              'PEG solution',
              'Single-stranded carrier DNA (ssDNA), 2 mg/mL',
              'Linearised final recombinant plasmid',
              'DMSO',
              'Sterile test tubes',
              'Sterile microcentrifuge tubes',
              'Micropipettes and sterile tips',
              'Centrifuge',
              'Shaker incubator',
              'Water bath',
              'Vortex mixer',
            ],
          },
          { t: 'h', text: 'Method' },
          { t: 'h', text: 'A. Preparation of Primary Culture' },
          {
            t: 'ol',
            items: ['Inoculate S. cerevisiae BY4742 in 3 mL YPD broth in a test tube.', 'Incubate the culture at 30°C overnight.'],
          },
          { t: 'h', text: 'B. Secondary Inoculation' },
          {
            t: 'ol',
            items: [
              'Transfer 100 µL of the primary culture into 3 mL fresh YPD broth.',
              'Allow the culture to grow for approximately 3.5 hours, until an OD of approximately 0.8–1.0 is reached.',
            ],
          },
          { t: 'h', text: 'C. Preparation of Competent Cells' },
          {
            t: 'ol',
            items: [
              'Centrifuge the culture at 13,000 rpm for 15 seconds to pellet the cells.',
              'Add 500 µL AMQ and resuspend the pellet by vortexing.',
              'Pool the cultures into a single microcentrifuge tube.',
              'Centrifuge the pooled cells at 13,000 rpm for 15 seconds.',
              'Add 1 mL of 100 mM LiAc and resuspend the pellet.',
              'Place the tube in a shaker incubator at 200 rpm and 30°C for 1.5 hours.',
              'During this incubation, boil the ssDNA for 10 minutes and then place it on ice.',
            ],
          },
          { t: 'h', text: 'D. Transformation' },
          {
            t: 'ol',
            items: [
              'Transfer 200 µL of the cell suspension into a fresh microcentrifuge tube.',
              'Centrifuge at 13,000 rpm for 15 seconds.',
              'Discard the supernatant, leaving a small volume for resuspension.',
              'Add 240 µL PEG, 36 µL of 1 M LiAc, 20 µL ssDNA (2 mg/mL), and the linearised final recombinant plasmid.',
              'Mix the transformation mixture by vortexing.',
              'Place the tube in a shaker incubator at 200 rpm and 30°C for 1 hour.',
              'Add 45 µL DMSO and mix by inversion or gentle vortexing.',
              'Place the mixture in a water bath at 42°C for 30 minutes for heat shock.',
              'Centrifuge the tube and discard the supernatant.',
              'Resuspend the cells in 1 mL YPD medium.',
              'Incubate the cells for 3 hours to allow recovery.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'culture-storage',
    title: 'Culture & Storage',
    segment: '#8dcee0',
    button: '#b8e1ec',
    body: '#eaf5f9',
    border: '#b8e1ec',
    titleTop: 31,
    lineTop: 77,
    buttonsTop: 119,
    protocols: [
      {
        title: 'Glycerol Stock',
        blocks: [
          { t: 'h', text: 'Materials' },
          { t: 'ul', items: ['Overnight bacterial or yeast culture', 'Sterile glycerol (50–80%)', 'Cryovials/ MCT'] },
          { t: 'h', text: 'Procedure' },
          {
            t: 'ol',
            items: [
              'Mix culture with sterile glycerol in MCT’s (600 µL culture + 400 µL sterile 50% glycerol)',
              'Mix gently by inversion.',
              'Store immediately at −80°C.',
            ],
          },
        ],
      },
    ],
  },
];

// Wheel segment angular ranges (degrees, clockwise from 3 o'clock), measured from the Figma render.
export const wheelSegments: { id: string; from: number; to: number }[] = [
  { id: 'media-preparation', from: 240, to: 300 },
  { id: 'dna-extraction-purification', from: 300, to: 360 },
  { id: 'pcr-analysis', from: 0, to: 54 },
  { id: 'restriction-cloning', from: 54, to: 115 },
  { id: 'transformation', from: 115, to: 172 },
  { id: 'culture-storage', from: 172, to: 240 },
];
