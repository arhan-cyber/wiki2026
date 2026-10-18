import { useState } from 'react';
import type { WriteUp } from '../pages/ihpData';
import styles from './WriteUpCard.module.css';

type Section = { label: string; key: keyof WriteUp };

const SECTIONS: Section[] = [
  { label: 'Purpose', key: 'purpose' },
  { label: 'Key Takeaway', key: 'keyTakeaway' },
  { label: 'Contribution', key: 'contribution' },
  { label: 'Implementation', key: 'implementation' },
  { label: 'References', key: 'references' },
];

type Props = {
  person: WriteUp;
  onBackToNetwork?: () => void;
};

/**
 * One person's write-up: a header row, a horizontal row of section tabs, then
 * the photo beside the answer. The answer box grows with its text instead of
 * sitting in a fixed-height panel, so short write-ups don't leave the card
 * mostly empty.
 */
export default function WriteUpCard({ person, onBackToNetwork }: Props) {
  const [active, setActive] = useState<keyof WriteUp>('purpose');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBtn}>
          <span className={styles.name}>{person.name}</span>
          {person.affiliation && <span className={styles.aff}>({person.affiliation})</span>}
        </div>
        {onBackToNetwork && (
          <button className={styles.back} onClick={onBackToNetwork}>
            Back to network ↑
          </button>
        )}
      </div>

      {/* Section tabs, laid out across the card */}
      <div className={styles.tabs} role="tablist" aria-label={`${person.name} write-up sections`}>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={active === s.key}
            className={`${styles.tab} ${active === s.key ? styles.tabActive : ''}`}
            onClick={() => setActive(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.box}>
        <div className={styles.image} aria-label={`Photo of ${person.name}`}>
          Image
        </div>
        <p className={styles.answer} key={active as string}>
          {person[active]}
        </p>
      </div>
    </div>
  );
}
