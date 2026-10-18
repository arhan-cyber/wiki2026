import styles from './PeopleFlow.module.css';

type Note = {
  id: string;
  label: string;
  /** Position and size on the 715 x 540 reference board, in px. */
  x: number;
  y: number;
  w: number;
  h: number;
  body: string;
  bar: string;
  /** People in the note: label shown, and the id of their write-up (null = no write-up). */
  people: [string, string | null][];
  muted?: boolean;
};

// Taken from the team's "People Flow" board.
const NOTES: Note[] = [
  {
    id: 'wetlab', label: 'WETLABS', x: 82, y: 16, w: 146, h: 172, body: '#fddba8', bar: '#e0b030',
    people: [
      ['Parth', 'parth'], ['Prachita', 'prachita'], ['Professor Phale', 'prof-phale'], ['Professor Santanu', 'prof-santanu'],
      ['Anushka Alikar', 'anushka-alikar'], ['Professor Balaji', 'balaji'], ['Pratik Makhija', 'pratik-makhija'],
    ],
  },
  {
    id: 'pis', label: "PI'S", x: 278, y: 14, w: 145, h: 146, body: '#b9e5f8', bar: '#7fb6e0',
    people: [['Professor Saket', null], ['Professor Rajesh', null]],
  },
  {
    id: 'drylab', label: 'DRY LABS', x: 505, y: 40, w: 163, h: 148, body: '#e3c8f4', bar: '#c77fd0',
    people: [
      ['Professor Yogendra Shastri', 'yogendra-shastri'], ['Professor Sandip', 'prof-sandeep'], ['Professor Suyash', 'prof-suyash'],
      ['Shubham', 'shubham'], ['Rutuja Maam', 'rutuja'],
    ],
  },
  {
    id: 'product-dev', label: 'PRODUCT DEV', x: 30, y: 196, w: 145, h: 149, body: '#fdb3b8', bar: '#e25a55',
    people: [
      ['Dr. Navratna', 'dr-navratna'], ['Rajesh Vadgama Sir (L’Oréal)', 'rajesh-vagdama'],
      ['Subhendu Sir (Shell)', 'subhendhu'], ['Vaibhav Sai Sir', 'vaibhav-sai'],
    ],
  },
  {
    id: 'regulations', label: 'REGULATIONS', x: 545, y: 218, w: 145, h: 139, body: '#fdd9a0', bar: '#e0b200',
    people: [['ECHA', 'echa']],
  },
  {
    id: 'alumni', label: 'ALUMNI', x: 278, y: 358, w: 144, h: 139, body: '#c7f0ac', bar: '#4fd262',
    people: [['Husayn', 'husayn'], ['Aditya', 'aditya-ict'], ['Anagdha', 'anagdha'], ['Deepan', 'deepan'], ['Dawar', 'dawar']],
  },
  // Not on the team's board, but they have write-ups, so they stay reachable here.
  {
    id: 'others', label: 'OTHERS', x: 545, y: 384, w: 145, h: 148, body: '#e6e6ea', bar: '#a9a9b4', muted: true,
    people: [['iGEM Denmark', 'igem-denmark']],
  },
];

const W = 715;
const H = 540;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// Hand-drawn arrows from the hub to each note (path coordinates are on the same 715 x 540 grid).
const ARROWS = [
  'M 268 234 C 246 228 234 216 232 204', // wetlabs
  'M 362 212 L 362 176', // PIs
  'M 444 236 C 478 236 500 224 503 206', // dry labs
  'M 232 268 L 190 268', // product dev
  'M 488 270 L 532 270', // regulations
  'M 370 314 L 372 350', // alumni
];

type Props = { onPick: (id: string) => void };

/**
 * The People Flow board, drawn the way the team sketched it: sticky notes on
 * grid paper, arrows out from a hand-drawn iHP hub. Every name with a write-up
 * opens it.
 */
export default function PeopleFlow({ onPick }: Props) {
  return (
    <div className={styles.paper}>
      <div className={styles.canvas}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden>
          <defs>
            <marker id="pf-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="#1f1f1f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {/* hand-drawn hub: a loose ellipse plus a darker looping stroke */}
          <ellipse cx="362" cy="252" rx="108" ry="38" fill="none" stroke="#2b2b2b" strokeWidth="1.4" />
          <path d="M 304 232 C 330 210 412 206 438 234 C 452 250 440 270 410 270 C 430 258 424 240 396 232 C 372 224 340 226 318 238"
            fill="none" stroke="#1f1f1f" strokeWidth="3.2" strokeLinecap="round" />
          {ARROWS.map((d) => (
            <path key={d} d={d} fill="none" stroke="#1f1f1f" strokeWidth="1.7" strokeLinecap="round" markerEnd="url(#pf-head)" />
          ))}
        </svg>
        <span className={styles.hub}>IHP</span>

        {NOTES.map((n) => (
          <div
            key={n.id}
            className={`${styles.note} ${n.muted ? styles.noteMuted : ''}`}
            style={{ left: pct(n.x, W), top: pct(n.y, H), width: pct(n.w, W), height: pct(n.h, H) }}
          >
            <div className={styles.shadow} />
            <div className={styles.sheet} style={{ background: n.body }}>
              <div className={styles.bar} style={{ background: n.bar }} />
              <h3 className={styles.label}>{n.label}</h3>
              <ul className={styles.people}>
                {n.people.map(([name, id]) => (
                  <li key={name}>
                    {id ? (
                      <button type="button" className={styles.person} onClick={() => onPick(id)}>
                        {name}
                      </button>
                    ) : (
                      <span className={`${styles.person} ${styles.personStatic}`}>{name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
