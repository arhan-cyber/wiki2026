import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import styles from './drylab.module.css';
import { dryLabPages, modelTabs } from './drylabPages';

// Each page's HTML is its own lazily loaded chunk.
const loaders = import.meta.glob('./content/*.html', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

type Mode = 'brief' | 'full';
const MODE_KEY = 'wikiReadingMode'; // same key as the draft's reading-mode.js

function storedMode(): Mode {
  try {
    return localStorage.getItem(MODE_KEY) === 'brief' ? 'brief' : 'full';
  } catch {
    return 'full';
  }
}

const MODEL_SLUGS = new Set(modelTabs.map((t) => t.slug));
const pageBySlug = (slug: string) => dryLabPages.find((p) => p.slug === slug);

// Links listed in the draft's footer.
const NOTE_LINKS = ['home', 'model', 'engineering', 'results', 'life-cycle-assessment', 'software', 'contribution'];

export default function DryLabPage({ slug }: { slug: string }) {
  const page = pageBySlug(slug)!;
  const [loaded, setLoaded] = useState<{ slug: string; html: string } | null>(null);
  const [mode, setModeState] = useState<Mode>(storedMode);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  // Target to scroll to once a Brief -> Full switch has been rendered.
  const pendingScroll = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    let alive = true;
    loaders[`./content/${slug}.html`]().then((html) => {
      if (alive) setLoaded({ slug, html });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const setMode = (next: Mode) => {
    setModeState(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* storage blocked */
    }
  };

  const setAllOpen = (open: boolean) => {
    contentRef.current?.querySelectorAll<HTMLDetailsElement>('details.acc').forEach((d) => {
      d.open = open;
    });
  };

  // Open the section(s) containing a link target. A target hidden by Brief mode
  // switches the page to Full (without changing the stored preference).
  const reveal = useCallback((target: string) => {
    const id = decodeURIComponent(target.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (!el || !contentRef.current?.contains(el)) return false;
    for (let d = el.closest('details'); d; d = d.parentElement?.closest('details') ?? null) d.open = true;
    if (el.getClientRects().length === 0 && modeRef.current === 'brief') {
      pendingScroll.current = el;
      setModeState('full');
    } else {
      el.scrollIntoView();
    }
    return true;
  }, []);

  useLayoutEffect(() => {
    pendingScroll.current?.scrollIntoView();
    pendingScroll.current = null;
  }, [mode]);

  // New page content: start at the top (a jump, not the site's smooth scroll),
  // then go to the linked section if the URL names one.
  useEffect(() => {
    if (!loaded || loaded.slug !== slug) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (hash) reveal(hash);
  }, [loaded, slug, hash, reveal]);

  useEffect(() => {
    const openAll = () => setAllOpen(true);
    window.addEventListener('beforeprint', openAll);
    return () => window.removeEventListener('beforeprint', openAll);
  }, []);

  // In-page anchors reveal their section; Dry Lab page links stay inside the app.
  const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href') ?? '';
    if (href.startsWith('#') && href.length > 1) {
      if (reveal(href)) {
        window.history.replaceState(window.history.state, '', href);
        e.preventDefault();
      }
    } else if (href.startsWith('/dry-lab')) {
      e.preventDefault();
      navigate(href);
    }
  };

  const ready = loaded?.slug === slug;

  return (
    <main className={`${styles.page} ${mode === 'brief' ? styles.modeBrief : ''}`}>
      <header className={styles.hero}>
        <div className={styles.titleCard}>
          <img src="/wetlab/protocols/title-card.svg" alt="" className={styles.titleCardImg} />
          <div className={styles.titleInner}>
            <span className={styles.eyebrow}>Dry Lab</span>
            <h1 className={styles.title}>{page.title}</h1>
          </div>
        </div>
        <p className={styles.subtitle}>{page.subtitle}</p>
      </header>

      <div className={styles.row}>
        <aside className={styles.rail} aria-hidden="true" />
        <div className={styles.column}>
          {MODEL_SLUGS.has(slug) && (
            <nav aria-label="Model sections">
              <ul className={styles.tabs}>
                {modelTabs.map((t) => (
                  <li key={t.slug}>
                    <NavLink
                      to={t.path}
                      end
                      className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}
                    >
                      {t.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Wrapper bounds the sticky reading bar to the article. */}
          <div>
            <div className={styles.readingBar}>
              <span className={styles.rbLabel} id="rb-label">
                Reading depth
              </span>
              <div className={styles.seg} role="group" aria-labelledby="rb-label">
                <button type="button" aria-pressed={mode === 'brief'} onClick={() => setMode('brief')}>
                  Brief
                </button>
                <button type="button" aria-pressed={mode === 'full'} onClick={() => setMode('full')}>
                  Full
                </button>
              </div>
              <button type="button" className={styles.lnk} onClick={() => setAllOpen(true)}>
                Expand all
              </button>
              <button type="button" className={styles.lnk} onClick={() => setAllOpen(false)}>
                Collapse all
              </button>
            </div>

            <article className={styles.card}>
              {ready ? (
                <div
                  ref={contentRef}
                  className={styles.content}
                  onClick={onContentClick}
                  dangerouslySetInnerHTML={{ __html: loaded.html }}
                />
              ) : (
                <div className={styles.loading} aria-busy="true" />
              )}
            </article>
          </div>

          {/* The draft's footer text (license + repository link are in the site footer). */}
          <section className={styles.note} aria-label="About the Dry Lab pages">
            <div>
              <h4>IIT Bombay iGEM 2026</h4>
              <p>
                Every figure on this site is a statement about a model. None of it has been validated against
                wet-lab data. Status labels on each page say what is computed, taken from literature, a hypothesis,
                or pending.
              </p>
            </div>
            <div>
              <h4>Pages</h4>
              <ul>
                {NOTE_LINKS.map((s) => {
                  const p = pageBySlug(s)!;
                  return (
                    <li key={s}>
                      <Link to={p.path}>{p.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4>Code</h4>
              <p>
                Pre-flight tool (MIT):{' '}
                <a href="https://github.com/Siddhant-Chowdhary/igem-preflight">
                  github.com/Siddhant-Chowdhary/igem-preflight
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer bgColor="transparent" />
    </main>
  );
}

/** /dry-lab/model/:slug — one of the model sub-pages; anything else goes to the overview. */
export function DryLabModelRoute() {
  const { slug = '' } = useParams();
  if (slug === 'model' || !MODEL_SLUGS.has(slug)) return <Navigate to="/dry-lab/model" replace />;
  return <DryLabPage slug={slug} />;
}
