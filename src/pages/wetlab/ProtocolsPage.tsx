import { useState, type MouseEvent } from 'react';
import Footer from '../../components/Footer';
import styles from './wetlab.module.css';
import { sections, wheelSegments, type Block, type ProtocolSection } from './protocolsData';

// Wheel centre and ring radii inside the wheel card (from the Figma frame).
const WHEEL_CX = 471.84;
const WHEEL_CY = 364.5;
const HIT_R_MIN = 150;
const HIT_R_MAX = 330;

function segmentAt(x: number, y: number) {
  const dx = x - WHEEL_CX;
  const dy = y - WHEEL_CY;
  const r = Math.hypot(dx, dy);
  if (r < HIT_R_MIN || r > HIT_R_MAX) return null;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  const a = (deg + 360) % 360;
  return wheelSegments.find((s) => a >= s.from && a < s.to) ?? null;
}

function ProtocolBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h':
            return <h4 key={i}>{b.text}</h4>;
          case 'p':
            return <p key={i}>{b.text}</p>;
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} start={b.start}>
                {b.items.map((it, j) =>
                  typeof it === 'string' ? (
                    <li key={j}>{it}</li>
                  ) : (
                    <li key={j}>
                      {it.text}
                      <ol>
                        {it.sub.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </li>
                  ),
                )}
              </ol>
            );
          case 'table':
            return (
              <table key={i}>
                <thead>
                  <tr>
                    {b.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((c, k) => (
                        <td key={k}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
        }
      })}
    </>
  );
}

function Section({ section, first }: { section: ProtocolSection; first: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id={section.id}
      className={`${styles.section} ${first ? styles.sectionFirst : ''}`}
      style={{ borderColor: section.border }}
    >
      <h2 className={styles.sectionTitle} style={{ paddingTop: section.titleTop - 2 }}>
        {section.title}
        <div className={styles.sectionLine} style={{ marginTop: section.lineTop - section.titleTop - 39 }} />
      </h2>
      <div className={styles.pills} style={{ marginTop: section.buttonsTop - section.lineTop - 1 }}>
        {section.protocols.map((p) => {
          const isOpen = open === p.title;
          return (
            <div key={p.title}>
              <button
                type="button"
                className={styles.pill}
                style={{ background: section.button }}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : p.title)}
              >
                <span>{p.title}</span>
                <img
                  src="/wetlab/protocols/arrow.svg"
                  alt=""
                  className={`${styles.pillArrow} ${isOpen ? styles.pillArrowOpen : ''}`}
                />
              </button>
              {isOpen && (
                <div className={styles.protocolBody}>
                  <ProtocolBlocks blocks={p.blocks} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ProtocolsPage() {
  const [hover, setHover] = useState(false);

  const onWheelClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const seg = segmentAt(e.clientX - rect.left, e.clientY - rect.top);
    if (seg) document.getElementById(seg.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onWheelMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHover(segmentAt(e.clientX - rect.left, e.clientY - rect.top) !== null);
  };

  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <img src="/wetlab/protocols/title-card.svg" alt="" className={styles.titleCard} />
        <h1 className={styles.title}>PROTOCOLS</h1>

        <div className={styles.row} style={{ minHeight: 3940 }}>
          <aside className={styles.sidebar} />
          <div className={styles.column}>
            <div className={styles.wheelCard}>
              <img
                src="/wetlab/protocols/wheel.png"
                alt="Protocol wheel: Media Preparation, DNA Extraction, PCR & Analysis, Restriction & Cloning, Transformation, Culture & Storage"
                className={styles.wheelImg}
              />
              <div
                className={styles.wheelHit}
                style={{ cursor: hover ? 'pointer' : 'default' }}
                onClick={onWheelClick}
                onMouseMove={onWheelMove}
                onMouseLeave={() => setHover(false)}
              />
            </div>
            {sections.map((s, i) => (
              <Section key={s.id} section={s} first={i === 0} />
            ))}
          </div>
        </div>
      </div>
      <Footer bgColor="transparent" />
    </main>
  );
}
