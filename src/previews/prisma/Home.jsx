import { Link } from 'react-router-dom'
import { BRAND, ARTICLES, EVENTS, STATS } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/prisma'

const PILLARS = [
  {
    icon: '◈',
    title: 'Culture Report',
    desc: 'Long-form editorial documenting the movements, aesthetics and ideas reshaping contemporary culture across cities.',
    color: 'var(--p-accent)',
  },
  {
    icon: '◉',
    title: 'Art & Design',
    desc: 'Visual stories from studios, galleries and streets — the craft behind the culture.',
    color: 'var(--p-violet)',
  },
  {
    icon: '◎',
    title: 'Event Coverage',
    desc: 'On-the-ground documentation of shows, happenings and moments that matter.',
    color: 'var(--p-magenta)',
  },
]

export default function Home() {
  const featuredArticles = ARTICLES.slice(0, 3)
  const featuredEvents = EVENTS.slice(0, 2)

  return (
    <>
      {/* ── Hero ── */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroInner}>
            <div className={s.heroCard} data-reveal data-reveal-delay="0">
              <div className={s.eyebrow}>Est. {BRAND.est} &mdash; Global</div>
              <h1 className={s.h1}>
                {BRAND.heroLine1}
                <br />
                <span className={s.gradText}>{BRAND.heroLine2}</span>
              </h1>
              <p className={s.lead} style={{ marginTop: 20 }}>
                {BRAND.mission}
              </p>
              <div className={s.heroActions}>
                <Link to={`${BASE}/culture-report`} className={`${s.btn} ${s.btnPrimary}`}>
                  Read the Archive &rarr;
                </Link>
                <Link to={`${BASE}/events`} className={`${s.btn} ${s.btnGlass}`}>
                  Event Coverage
                </Link>
              </div>

              <div className={s.floatChips}>
                {BRAND.cities.slice(0, 4).map((city, i) => (
                  <span key={city} className={s.chip}>
                    <span
                      className={s.chipDot}
                      style={
                        i === 1
                          ? { background: 'var(--p-accent)', boxShadow: '0 0 8px var(--p-accent)' }
                          : i === 2
                          ? { background: 'var(--p-violet)', boxShadow: '0 0 8px var(--p-violet)' }
                          : i === 3
                          ? { background: 'var(--p-magenta)', boxShadow: '0 0 8px var(--p-magenta)' }
                          : undefined
                      }
                    />
                    {city}
                  </span>
                ))}
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

      {/* ── Three Pillars ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>What we do</div>
              <h2 className={s.h2}>The Archive</h2>
            </div>
          </div>
          <div className={s.grid}>
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={s.pillarTile}
                data-reveal
                data-reveal-delay={i * 100}
              >
                <span className={s.pillarIcon} style={{ color: p.color }}>{p.icon}</span>
                <h3 className={s.h3} style={{ marginTop: 16 }}>{p.title}</h3>
                <p style={{ color: 'var(--p-muted)', marginTop: 10, fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Featured Articles ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>Latest</div>
              <h2 className={s.h2}>Culture Report</h2>
            </div>
            <Link to={`${BASE}/culture-report`} className={`${s.btn} ${s.btnGlass}`} style={{ flexShrink: 0 }}>
              Full archive &rarr;
            </Link>
          </div>
          <div className={s.grid}>
            {featuredArticles.map((art, i) => (
              <Link
                key={art.id}
                to={`${BASE}/culture-report`}
                className={s.card}
                data-reveal
                data-reveal-delay={i * 100}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className={s.cardMedia}>
                  <img
                    src={`https://picsum.photos/seed/${art.seed}/600/450`}
                    alt={art.title}
                    loading="lazy"
                    width={600}
                    height={450}
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                  <span className={`${s.badge} ${s.badgeUpcoming}`}>{art.cat}</span>
                </div>
                <div className={s.cardBody}>
                  <p className={s.cardSub} style={{ marginBottom: 6 }}>{art.city} &middot; {art.date}</p>
                  <h3 className={s.cardTitle}>{art.title}</h3>
                  <p className={s.cardSub} style={{ marginTop: 8, lineHeight: 1.6 }}>
                    {art.excerpt.slice(0, 90)}&hellip;
                  </p>
                  <p className={s.cardSub} style={{ marginTop: 8, color: 'var(--p-accent)' }}>
                    {art.read} read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Events Teaser ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <div className={s.eyebrow}>On the ground</div>
              <h2 className={s.h2}>Event Coverage</h2>
            </div>
            <Link to={`${BASE}/events`} className={`${s.btn} ${s.btnGlass}`} style={{ flexShrink: 0 }}>
              All events &rarr;
            </Link>
          </div>
          <div className={s.featured} data-reveal>
            <div className={s.featuredMedia}>
              <img
                src={`https://picsum.photos/seed/${featuredEvents[0].seed}/800/600`}
                alt={featuredEvents[0].name}
                loading="lazy"
                width={800}
                height={600}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div className={s.featuredBody}>
              <div className={s.eyebrow}>{featuredEvents[0].tag}</div>
              <h3 className={s.h3}>{featuredEvents[0].name}</h3>
              <div className={s.featuredMeta}>
                <span>{featuredEvents[0].city}</span>
                <span>&middot;</span>
                <span>{featuredEvents[0].date}</span>
                <span>&middot;</span>
                <span
                  style={{
                    color:
                      featuredEvents[0].status === 'Upcoming'
                        ? 'var(--p-accent)'
                        : 'var(--p-teal)',
                  }}
                >
                  {featuredEvents[0].status}
                </span>
              </div>
              <p style={{ color: 'var(--p-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: 4 }}>
                {featuredEvents[0].excerpt}
              </p>
              <div style={{ marginTop: 12 }}>
                <Link to={`${BASE}/events`} className={`${s.btn} ${s.btnPrimary}`}>
                  All event coverage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* ── Contact CTA ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.newsletter} data-reveal>
            <div>
              <div className={s.eyebrow}>Work with us</div>
              <h2 className={s.h2} style={{ marginTop: 8 }}>
                Let&apos;s create something
                <br />
                <span className={s.gradText}>worth archiving.</span>
              </h2>
            </div>
            <p className={s.lead}>
              From editorial partnerships to event coverage and creative direction &mdash; we translate culture into lasting insight.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to={`${BASE}/services`} className={`${s.btn} ${s.btnPrimary}`}>
                Creative Services &rarr;
              </Link>
              <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnGlass}`}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
