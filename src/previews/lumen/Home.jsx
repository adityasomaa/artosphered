import { Link } from 'react-router-dom'
import { BASE } from './data'
import { BRAND, ARTICLES, EVENTS, STATS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const PILLARS = [
  {
    label: 'Culture Report',
    desc: 'Long-form essays, city dispatches and trend intelligence from the frontlines of global creative culture.',
    icon: '01',
  },
  {
    label: 'Art & Design',
    desc: 'From gallery openings to studio visits — we document the practitioners reshaping visual language.',
    icon: '02',
  },
  {
    label: 'Event Coverage',
    desc: 'On-the-ground photo, video and written records of the shows, parties and happenings that matter.',
    icon: '03',
  },
]

export default function Home() {
  const featuredArticles = ARTICLES.slice(0, 3)
  const featuredEvents = EVENTS.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroGraphicWrap}>
          <Graphic
            seed="aro-mo-hero"
            tone="warm"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className={s.heroVignette} />
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>A Cultural Archive</p>
          <h1 className={s.heroTitle}>
            {BRAND.heroLine1}<br />
            <em>{BRAND.heroLine2}</em>
          </h1>
          <p className={s.heroSub}>{BRAND.mission}</p>
          <div className={s.heroActions}>
            <Link to={`${BASE}/culture-report`} className={`${s.btn} ${s.btnFilled}`}>
              Explore the archive
            </Link>
            <Link to={`${BASE}/contact`} className={s.btn}>
              Work with us
            </Link>
          </div>
        </div>
        <div className={s.scrollCue}>Scroll</div>
        <div className={s.heroCityTicker} aria-hidden="true">
          {BRAND.cities.concat(BRAND.cities).map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </section>

      {/* MISSION / MANIFESTO */}
      <section className={s.section}>
        <div className={s.manifesto}>
          <div data-reveal>
            <p className={s.eyebrow}>What we are</p>
            <h2 className={s.h2}>
              {BRAND.intersect}
            </h2>
          </div>
          <div className={s.manifestoText} data-reveal data-reveal-delay="120">
            <p>
              ARTOSPHERED is not a media outlet. It is a cultural archive &#8212; a sustained
              act of documentation across cities, disciplines and scenes that mainstream
              culture is still catching up to. Every story we publish, every event we cover,
              becomes a permanent record.
            </p>
            <p style={{ marginTop: 20, fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'var(--muted)', fontFamily: 'var(--sans)', fontWeight: 300 }}>
              Est. {BRAND.est} &mdash; {BRAND.cities.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* THREE PILLARS */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>Our pillars</p>
        <h2 className={s.h2} data-reveal>What we document</h2>
        <div className={s.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <div key={p.label} className={s.pillar} data-reveal data-reveal-delay={String(i * 100)}>
              <span className={s.pillarNum}>{p.icon}</span>
              <h3 className={s.pillarTitle}>{p.label}</h3>
              <p className={s.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={s.hairline} />

      {/* FEATURED ARTICLES */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>Latest dispatches</p>
        <h2 className={s.h2} data-reveal>From the Culture Report</h2>
        <div className={s.articleGrid}>
          {featuredArticles.map((a, i) => (
            <Link
              key={a.id}
              to={`${BASE}/culture-report`}
              className={s.articleCard}
              data-reveal
              data-reveal-delay={String(i * 100)}
            >
              <div className={s.articleImgWrap}>
                <Graphic
                  seed={`aro-mo-${a.seed}`}
                  tone="warm"
                  className={s.articleGraphic}
                />
              </div>
              <div className={s.articleMeta}>
                <span className={s.articleCat}>{a.cat}</span>
                <span className={s.articleCity}>{a.city}</span>
              </div>
              <h3 className={s.articleTitle}>{a.title}</h3>
              <p className={s.articleExcerpt}>{a.excerpt}</p>
              <div className={s.articleFooter}>
                <span>{a.date}</span>
                <span>{a.read} read</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 44 }} data-reveal>
          <Link to={`${BASE}/culture-report`} className={s.btn}>View all reports</Link>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* FEATURED EVENTS */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>On the ground</p>
        <h2 className={s.h2} data-reveal>Event Coverage</h2>
        <div className={s.eventsHomeList}>
          {featuredEvents.map((ev, i) => (
            <Link
              key={ev.id}
              to={`${BASE}/events`}
              className={s.eventHomeRow}
              data-reveal
              data-reveal-delay={String(i * 80)}
            >
              <div className={s.eventHomeImg}>
                <Graphic
                  seed={`aro-mo-${ev.seed}`}
                  tone="amber"
                  className={s.eventGraphic}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className={s.eventHomeInfo}>
                <div className={s.eventHomeMeta}>
                  <span className={s.eventTag}>{ev.tag}</span>
                  <span className={s.eventStatus} data-covered={ev.status === 'Covered'}>
                    {ev.status}
                  </span>
                </div>
                <h3 className={s.eventHomeName}>{ev.name}</h3>
                <p className={s.eventHomeCity}>{ev.city} &mdash; {ev.date}</p>
                <p className={s.eventHomeExcerpt}>{ev.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 44 }} data-reveal>
          <Link to={`${BASE}/events`} className={s.btn}>All events</Link>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* STATS */}
      <section className={s.section} style={{ paddingTop: 'clamp(56px, 8vw, 100px)', paddingBottom: 'clamp(56px, 8vw, 100px)' }}>
        <div className={s.statsRow}>
          {STATS.map((st, i) => (
            <div key={st.label} className={s.stat} data-reveal data-reveal-delay={String(i * 80)}>
              <div className={s.statNum}>{st.num}</div>
              <div className={s.statLbl}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className={s.cta}>
        <div className={s.ctaBgGraphic}>
          <Graphic seed="aro-mo-cta-home" tone="warm" style={{ width: '100%', height: '100%' }} />
        </div>
        <p className={s.eyebrow} data-reveal style={{ justifyContent: 'center' }}>
          Collaborate
        </p>
        <h2 className={s.ctaTitle} data-reveal>
          Pitch a story.<br />
          <em>We read everything.</em>
        </h2>
        <div data-reveal>
          <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnFilled}`}>
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
