import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import styles from './eo.module.css';

// ─── LEARN hub data ───────────────────────────────────────────────────────────

type Hub = {
  letter: string;
  name: string;
  /** Label broken onto lines the way the Figma selector shows it. */
  lines: string[];
  sectionId: string;
  desc: string;
  initiatives: string[];
};

const HUBS: Hub[] = [
  {
    letter: 'L', name: 'Listen First', lines: ['Listen', 'First'], sectionId: 'learn-l',
    desc: 'Before teaching anything, we listened. Surveys, questionnaires, and stakeholder conversations mapped what people already knew, misunderstood, or feared about synthetic biology — evidence before assumption.',
    initiatives: ['Public Awareness Survey', 'Internal AI Audit', 'AIIMS Stakeholder Questionnaire', 'International Survey w/ Team Denmark', 'Freshers Questionnaire'],
  },
  {
    letter: 'E', name: 'Engage Minds', lines: ['Engage', 'Minds'], sectionId: 'learn-e',
    desc: 'With that groundwork laid, we turned listening into dialogue — sparking curiosity about synthetic biology through talks, quizzes, and collaborations that met people where their interest already was.',
    initiatives: ['GYAANU 2026', 'BioTL (w/ BioX Club)'],
  },
  {
    letter: 'A', name: 'Assemble Community', lines: ['Assemble', 'Community'], sectionId: 'learn-a',
    desc: 'Engagement became belonging. We convened students, clubs, and experts into a shared space — connecting people across disciplines so the conversation could outlast any single event.',
    initiatives: ['SynBioCon', 'TechConnect', 'BioX Club Collaboration', 'Webinars/Speaker Sessions'],
  },
  {
    letter: 'R', name: 'Reach Beyond Walls', lines: ['Reach Beyond', 'Walls'], sectionId: 'learn-r',
    desc: 'We carried the story past the campus gates — through digital series, comics, and interactive tools that made synthetic biology accessible to anyone with a phone and a question.',
    initiatives: ['Instagram/LinkedIn Series', 'Digital Comic Strip', 'Interactive Gene Cloning Simulation (site)'],
  },
  {
    letter: 'N', name: 'Nurture What Grows', lines: ['Nurture', 'What', 'Grows'], sectionId: 'learn-n',
    desc: 'iGEM ends; the resources shouldn\'t. We left behind open booklets, reusable simulations, and an impact dashboard so the next team — and anyone curious — can pick up where we left off.',
    initiatives: ['OER Booklets', 'Interactive Gene Cloning Simulation (as reusable resource)', 'Impact Dashboard'],
  },
];

const SUBTABS = ['Purpose', 'Who We Reached', 'What We Did', 'Key Takeaway', 'Feedback', 'References'];

const SUBTAB_PROMPTS = [
  'Why this initiative? What gap or question prompted it?',
  'Which audience did this reach, and how many people?',
  'What did we actually run, build, or deliver?',
  'What did we learn — and what changed because of it?',
  'What did participants tell us afterwards?',
  'Sources, links, and further reading.',
];

// Per-initiative content. Anything not listed here still shows the generic
// prompt above. The AIIMS entry carries the awards the team won.
type SubtabContent = { awards?: string[]; paras?: string[]; bullets?: [string, string][] };

const INITIATIVE_CONTENT: Record<string, Partial<Record<string, SubtabContent>>> = {
  'AIIMS Stakeholder Questionnaire': {
    'Key Takeaway': {
      awards: ['Best Human Practices (iHP) Award', 'Best Overall Team Award'],
      bullets: [
        [
          'Recognised across the whole project.',
          'The awards acknowledged our science, engineering, Human Practices and interdisciplinary work together, not one strong area.',
        ],
        [
          'Strong under scrutiny.',
          'We held up across 4 formats, from informal poster conversations to a judge Q&A where we defended our decisions.',
        ],
        [
          'Stakeholder engagement stood out.',
          'Judges highlighted the breadth and diversity of our Human Practices work.',
        ],
        [
          'The experience was two-way.',
          "Questions from participants and judges helped us see parts of BiFROST we couldn't see from inside the team.",
        ],
      ],
    },
  },
};

// Event photos from the Figma, shown across the top of an initiative card.
const INITIATIVE_PHOTOS: Record<string, string[]> = {
  'Public Awareness Survey': ['/eo/pas/photo1.jpg', '/eo/pas/photo2.jpg', '/eo/pas/photo3.jpg', '/eo/pas/photo4.jpg'],
};

// Photo strip geometry, as fractions of the strip (from the Figma: 826px wide,
// later photos overlap the earlier ones).
const PHOTO_SLOTS = [
  { left: 0, width: 43.58 },
  { left: 38.5, width: 28.21 },
  { left: 64.53, width: 22.52 },
  { left: 80.87, width: 19.13 },
];

// Team photos for the gallery card.
const TEAM_PHOTOS = ['/eo/team.jpg', '/team_pic.png', '/eo/team2.jpg', '/eo/team3.png'];

// ─── helpers ─────────────────────────────────────────────────────────────────

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}
function cardId(hubId: string, name: string) {
  return `${hubId}-${slug(name)}`;
}

// Gradual smooth scroll with an easeInOutCubic curve.
function smoothScrollTo(id: string, offset = 90, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;
  let startTime: number | null = null;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Gallery ("images slide by slide") ───────────────────────────────────────

function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TEAM_PHOTOS.length;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  // Slide on its own every few seconds, unless hovered or the user prefers less motion.
  useEffect(() => {
    if (paused || typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((prev) => (prev + 1) % n), 5000);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <div
      className={styles.gallery}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Team photos"
    >
      <div className={styles.galleryTrack} style={{ transform: `translateX(-${i * 100}%)` }}>
        {TEAM_PHOTOS.map((src, idx) => (
          <div key={src} className={styles.gallerySlide} aria-hidden={idx !== i}>
            <img src={src} alt={`iGEM IIT Bombay team ${idx + 1}`} />
          </div>
        ))}
      </div>
      <button type="button" className={`${styles.galleryArrow} ${styles.galleryPrev}`} aria-label="Previous photo" onClick={() => go(-1)}>
        ←
      </button>
      <button type="button" className={`${styles.galleryArrow} ${styles.galleryNext}`} aria-label="Next photo" onClick={() => go(1)}>
        →
      </button>
      <div className={styles.galleryDots}>
        {TEAM_PHOTOS.map((src, idx) => (
          <button
            key={src}
            type="button"
            className={`${styles.galleryDot} ${idx === i ? styles.galleryDotOn : ''}`}
            aria-label={`Show photo ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Atoms (the "constellation") ─────────────────────────────────────────────

// Five orbit ellipses per atom, with the centre / rotation / skew read from the
// Figma (all coordinates in the atom's own 231 x 205 box).
const ORBITS = [
  { cx: 117.85, cy: 102.6, w: 181.868, h: 100.629, rot: -46.58 },
  { cx: 117.84, cy: 103.47, w: 181.868, h: 100.629, rot: -119.7 },
  { cx: 114.22, cy: 103.16, w: 190.671, h: 108.862, rot: -157.14 },
  { cx: 115.49, cy: 93.3, w: 219.636, h: 85.166, rot: 160.53 },
  { cx: 121.29, cy: 103.02, w: 181.868, h: 100.629, rot: 91.53 },
];
const CORE = { cx: 118.05, cy: 94.12, w: 48.74, h: 51.51 };
const ATOM_W = 231;
const ATOM_H = 205;

// Where initiative dots sit on an atom (the four from the Figma, plus one more
// at the top), and which side their label goes on.
const DOT_SLOTS: { x: number; y: number; side: 'right' | 'below' }[] = [
  { x: 168.5, y: 56.5, side: 'right' },
  { x: 162.5, y: 124.5, side: 'right' },
  { x: 61.5, y: 141.5, side: 'below' },
  { x: 47.5, y: 64.5, side: 'right' },
  { x: 112, y: 14, side: 'right' },
];

// Atom positions in the 907 x 447 field (Figma layout: three over two).
const FIELD_W = 907;
const FIELD_H = 447;
const ATOM_POS: Record<string, { left: number; top: number }> = {
  L: { left: 46, top: 0 },
  E: { left: 338, top: 0 },
  A: { left: 636, top: 0 },
  R: { left: 195, top: 242 },
  N: { left: 493, top: 242 },
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Atom({ hub, onCore, onDot }: { hub: Hub; onCore: () => void; onDot: (name: string) => void }) {
  const pos = ATOM_POS[hub.letter];
  return (
    <div
      className={styles.atom}
      style={{
        left: pct(pos.left, FIELD_W),
        top: pct(pos.top, FIELD_H),
        width: pct(ATOM_W, FIELD_W),
      }}
    >
      <svg viewBox={`0 0 ${ATOM_W} ${ATOM_H}`} className={styles.atomSvg} aria-hidden>
        {ORBITS.map((o, k) => (
          <ellipse
            key={k}
            cx={0}
            cy={0}
            rx={o.w / 2 - 1}
            ry={o.h / 2 - 1}
            transform={`translate(${o.cx} ${o.cy}) rotate(${o.rot}) skewX(-3.17)`}
            fill="none"
            stroke="#1190D5"
            strokeWidth={2}
          />
        ))}
        <ellipse cx={CORE.cx} cy={CORE.cy} rx={CORE.w / 2} ry={CORE.h / 2} fill="#8ED8F8" fillOpacity={0.5} />
      </svg>

      <button
        type="button"
        className={styles.atomCore}
        style={{
          left: pct(CORE.cx, ATOM_W),
          top: pct(CORE.cy, ATOM_H),
          width: pct(CORE.w, ATOM_W),
        }}
        aria-label={`Go to ${hub.name}`}
        onClick={onCore}
      >
        {hub.letter}
      </button>

      {hub.initiatives.slice(0, DOT_SLOTS.length).map((name, k) => {
        const s = DOT_SLOTS[k];
        return (
          <button
            key={name}
            type="button"
            className={styles.atomDot}
            style={{ left: pct(s.x, ATOM_W), top: pct(s.y, ATOM_H) }}
            onClick={() => onDot(name)}
          >
            <span className={styles.atomDotMark} aria-hidden />
            <span className={`${styles.atomLabel} ${s.side === 'below' ? styles.atomLabelBelow : ''}`}>{name}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── LEARN progress strip ────────────────────────────────────────────────────

function LearnStrip({ activeIndex, onPick }: { activeIndex: number; onPick: (i: number) => void }) {
  return (
    <div className={styles.strip}>
      {HUBS.map((h, i) => (
        <button
          key={h.letter}
          type="button"
          className={`${styles.stripDot} ${i === activeIndex ? styles.stripDotOn : ''}`}
          aria-label={`Go to ${h.name}`}
          aria-current={i === activeIndex}
          onClick={() => onPick(i)}
        >
          {h.letter}
        </button>
      ))}
    </div>
  );
}

// ─── Initiative (a bar that opens into its card) ─────────────────────────────

function SubtabBody({ name, subtab }: { name: string; subtab: number }) {
  const content = INITIATIVE_CONTENT[name]?.[SUBTABS[subtab]];
  if (!content) return <p className={styles.prompt}>{SUBTAB_PROMPTS[subtab]}</p>;
  return (
    <div className={styles.rich}>
      {content.awards && (
        <ul className={styles.awards}>
          {content.awards.map((a) => (
            <li key={a}>
              <span className={styles.awardMedal} aria-hidden>
                🏅
              </span>
              {a}
            </li>
          ))}
        </ul>
      )}
      {content.paras?.map((t) => (
        <p key={t}>{t}</p>
      ))}
      {content.bullets && (
        <ul className={styles.points}>
          {content.bullets.map(([lead, rest]) => (
            <li key={lead}>
              <b>{lead}</b> {rest}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Initiative({
  name,
  hubId,
  isOpen,
  onToggle,
}: {
  name: string;
  hubId: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [subtab, setSubtab] = useState(0);
  const photos = INITIATIVE_PHOTOS[name];

  return (
    <div id={cardId(hubId, name)} className={`${styles.init} ${isOpen ? styles.initOpen : ''}`}>
      {isOpen ? (
        <div className={styles.initHead}>
          <button type="button" className={styles.initTitle} aria-expanded onClick={onToggle}>
            {name}
          </button>
          <button type="button" className={styles.backLink} onClick={() => smoothScrollTo('constellation')}>
            Back to network ↑
          </button>
        </div>
      ) : (
        <button type="button" className={styles.initBar} aria-expanded={false} onClick={onToggle}>
          <span>{name}</span>
          <img src="/eo/atom/arrow.svg" alt="" className={styles.initArrow} />
        </button>
      )}

      {isOpen && (
        <div className={styles.initBody}>
          {photos && (
            <div className={styles.photos}>
              {photos.map((src, k) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={styles.photo}
                  style={{ left: `${PHOTO_SLOTS[k].left}%`, width: `${PHOTO_SLOTS[k].width}%` }}
                />
              ))}
            </div>
          )}

          <div className={styles.frame}>
            <div className={styles.tabs} role="tablist" aria-label={`${name} details`}>
              {SUBTABS.map((st, i) => (
                <button
                  key={st}
                  type="button"
                  role="tab"
                  aria-selected={subtab === i}
                  className={`${styles.tab} ${subtab === i ? styles.tabOn : ''}`}
                  onClick={() => setSubtab(i)}
                >
                  {st}
                </button>
              ))}
            </div>
            <div className={styles.panelBox}>
              <SubtabBody name={name} subtab={subtab} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

const INDEX = [
  { id: 'learn-process', label: 'The LEARN process' },
  { id: 'constellation', label: 'Initiatives' },
  ...HUBS.map((h) => ({ id: `${h.sectionId}-cards`, label: `${h.letter} · ${h.name}` })),
];

export default function EducationPage() {
  const [learnSel, setLearnSel] = useState(0);
  const sel = HUBS[learnSel];
  // One open initiative per hub; the first starts open, as in the Figma.
  const [open, setOpen] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(HUBS.map((h) => [h.sectionId, h.initiatives[0]])),
  );

  const toggle = (hubId: string, name: string) =>
    setOpen((prev) => ({ ...prev, [hubId]: prev[hubId] === name ? null : name }));

  const openInitiative = (hub: Hub, name: string) => {
    setOpen((prev) => ({ ...prev, [hub.sectionId]: name }));
    // Wait a frame so the card is laid out open before scrolling to it.
    requestAnimationFrame(() => requestAnimationFrame(() => smoothScrollTo(cardId(hub.sectionId, name), 100)));
  };

  const goHub = (i: number) => smoothScrollTo(`${HUBS[i].sectionId}-cards`);

  return (
    <PageShell
      title="Educational Outreach"
      index={INDEX}
      shellMaxWidth={1230}
      intro={<Gallery />}
      pageStyle={{ background: 'linear-gradient(175.575deg, #fafafa 0%, #6db8ea 82.027%)' }}
      titleStyle={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(38px, 6vw, 80px)' }}
    >
      <div className={styles.box}>
        {/* LEARN process selector */}
        <h2 id="learn-process" className={styles.learnHeading}>
          The E in EO — We Derived Our Own process: <b>LEARN</b>
        </h2>

        <div className={styles.select} role="tablist" aria-label="LEARN process">
          {HUBS.map((h, i) => (
            <button
              key={h.letter}
              type="button"
              role="tab"
              aria-selected={learnSel === i}
              className={`${styles.selCell} ${learnSel === i ? styles.selCellOn : ''}`}
              onClick={() => setLearnSel(i)}
            >
              <span className={styles.selLetter}>{h.letter}</span>
              <span className={styles.selName}>
                {h.lines.map((l, k) => (
                  <span key={k}>{l}</span>
                ))}
              </span>
              <span className={styles.selLine} />
            </button>
          ))}
        </div>

        <div className={styles.detail}>
          <div className={styles.detailLetter} aria-hidden>
            {sel.letter}
          </div>
          <div className={styles.detailBody}>
            <h3>{sel.name}</h3>
            <p>{sel.desc}</p>
          </div>
          <img className={styles.detailIcon} src={`/eo/icons/${sel.letter}.png`} alt="" aria-hidden />
        </div>

        {/* Atoms */}
        <h2 className={styles.srOnly}>The constellation of initiatives</h2>
        <div id="constellation" className={styles.field}>
          {HUBS.map((h, i) => (
            <Atom key={h.letter} hub={h} onCore={() => goHub(i)} onDot={(name) => openInitiative(h, name)} />
          ))}
        </div>

        {/* One LEARN strip + initiatives per hub */}
        {HUBS.map((h, i) => (
          <section id={`${h.sectionId}-cards`} key={h.sectionId} className={styles.hub}>
            <LearnStrip activeIndex={i} onPick={goHub} />
            <div className={styles.inits}>
              {h.initiatives.map((name) => (
                <Initiative
                  key={name}
                  name={name}
                  hubId={h.sectionId}
                  isOpen={open[h.sectionId] === name}
                  onToggle={() => toggle(h.sectionId, name)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
