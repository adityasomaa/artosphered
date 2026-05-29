import { Link } from 'react-router-dom'
import { FEATURED, EXHIBITIONS, ARTISTS } from './data.js'
import s from './styles.module.css'

const BASE = '/p/prisma'

const STATS = [
  { num: '14+', label: 'Years exhibiting' },
  { num: '280', label: 'Artists represented' },
  { num: '84k', label: 'Annual visitors' },
  { num: '6', label: 'Active exhibitions' },
]

export default function Home() {
  const currentShows = EXHIBITIONS.filter((e) => e.status === 'current')
  const teaserArtists = ARTISTS.slice(0, 4)

  return (
    <>
      {/* ── Hero ── */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroInner}>
            <div className={s.heroCard} data-reveal data-reveal-delay="0">
              <div className={s.eyebrow}>Now Open in London</div>
              <h1 className={s.h1}>
                Art that <br />
                <span className={s.gradText}>refuses</span> <br />
                to whisper.
              </h1>
              <p className={s.lead} style={{ marginTop: 20 }}>
                PRISMA brings together the most compelling voices in contemporary art — from
                light-installation and generative painting to textile sculpture and biometric
                performance. Six galleries. Zero compromises.
              </p>
              <div className={s.heroActions}>
                <Link to={`${BASE}/exhibitions`} className={`${s.btn} ${s.btnPrimary}`}>
                  View Exhibitions →
                </Link>
                <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnGlass}`}>
                  Book Tickets
                </Link>
              </div>

              <div className={s.floatChips}>
                <span className={s.chip}>
                  <span className={s.chipDot} />
                  Luminous Void — Now Showing
                </span>
                <span className={s.chip}>
                  <span className={s.chipDot} style={{ background: 'var(--p-accent)', boxShadow: '0 0 8px var(--p-accent)' }} />
                  Free entry under 12
                </span>
                <span className={s.chip}>
                  <span className={s.chipDot} style={{ background: 'var(--p-violet)', boxShadow: '0 0 8px var(--p-violet)' }} />
                  Open Tue – Sun
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={s.sectionTight}>
        <div className={s.container}>
          <div className={s.stats}>
            {STATS.map((st, i) => (
              <div key={st.label} className={s.statTile} data-reveal data-reveal-delay={i * 80}>
                <div className={s.statNum}>{st.num}</div>
                <div className={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Featured Exhibition ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>Now Showing</div>
              <h2 className={s.h2}>Featured Exhibition</h2>
            </div>
            <Link to={`${BASE}/exhibitions`} className={`${s.btn} ${s.btnGlass}`} style={{ flexShrink: 0 }}>
              All exhibitions →
            </Link>
          </div>

          <div className={s.featured} data-reveal>
            <div className={s.featuredMedia}>
              <img
                src={`https://picsum.photos/seed/${FEATURED.seed}/800/600`}
                alt={FEATURED.title}
                loading="lazy"
                width={800}
                height={600}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div className={s.featuredBody}>
              <div className={s.eyebrow}>Current</div>
              <h3 className={s.h3}>{FEATURED.title}</h3>
              <div className={s.featuredMeta}>
                <span>{FEATURED.artist}</span>
                <span>·</span>
                <span>{FEATURED.dates}</span>
                <span>·</span>
                <span>{FEATURED.location}</span>
              </div>
              <p style={{ color: 'var(--p-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: 4 }}>
                {FEATURED.description.slice(0, 220)}…
              </p>
              <div style={{ marginTop: 12 }}>
                <Link to={`${BASE}/exhibitions`} className={`${s.btn} ${s.btnPrimary}`}>
                  Explore exhibition
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Currently On ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>On View</div>
              <h2 className={s.h2}>Currently Showing</h2>
            </div>
          </div>
          <div className={s.grid}>
            {currentShows.map((ex, i) => (
              <Link
                key={ex.id}
                to={`${BASE}/exhibitions`}
                className={s.card}
                data-reveal
                data-reveal-delay={i * 100}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className={s.cardMedia}>
                  <img
                    src={`https://picsum.photos/seed/${ex.seed}/600/450`}
                    alt={ex.title}
                    loading="lazy"
                    width={600}
                    height={450}
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                  <span className={`${s.badge} ${s.badgeCurrent}`}>Current</span>
                </div>
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{ex.title}</h3>
                  <p className={s.cardSub}>{ex.artist} · {ex.location}</p>
                  <p className={s.cardSub} style={{ marginTop: 4 }}>{ex.dates}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Artists Teaser ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>Represented</div>
              <h2 className={s.h2}>Our Artists</h2>
            </div>
            <Link to={`${BASE}/artists`} className={`${s.btn} ${s.btnGlass}`} style={{ flexShrink: 0 }}>
              All artists →
            </Link>
          </div>
          <div className={s.gridArtists}>
            {teaserArtists.map((ar, i) => (
              <div
                key={ar.id}
                className={s.artistCard}
                data-reveal
                data-reveal-delay={i * 90}
              >
                <div className={s.artistMedia}>
                  <img
                    src={`https://picsum.photos/seed/${ar.seed}/400/400`}
                    alt={ar.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    sizes="(max-width: 600px) 50vw, 25vw"
                  />
                </div>
                <div className={s.artistBody}>
                  <div className={s.artistName}>{ar.name}</div>
                  <div className={s.artistDisc}>{ar.discipline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Newsletter ── */}
      <section className={s.section}>
        <div className={s.container}>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}

function NewsletterForm() {
  return (
    <div className={s.newsletter} data-reveal>
      <div>
        <div className={s.eyebrow}>Stay in the loop</div>
        <h2 className={s.h2} style={{ marginTop: 8 }}>
          Openings, talks, <br />
          <span className={s.gradText}>late nights.</span>
        </h2>
      </div>
      <p className={s.lead}>
        Join 12,000 subscribers who hear about private views, artist talks, and collector
        events before they go public.
      </p>
      <form
        className={s.formRow}
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.querySelector('input')
          if (input) {
            input.value = ''
            input.placeholder = 'You\'re on the list. Welcome.'
          }
        }}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          className={s.input}
          aria-label="Email address"
        />
        <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>
          Subscribe →
        </button>
      </form>
      <p style={{ color: 'var(--p-muted)', fontSize: '0.78rem', marginTop: -8 }}>
        No spam. Unsubscribe any time. Your data stays with PRISMA.
      </p>
    </div>
  )
}
