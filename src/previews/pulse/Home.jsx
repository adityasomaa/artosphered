import { Link } from 'react-router-dom'
import { BRAND, ARTICLES, EVENTS, STATS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const BASE = '/p/pulse'

/* marquee: pillars + cities interleaved */
const MARQUEE_ITEMS = [
  ...BRAND.pillars,
  ...BRAND.cities,
  ...BRAND.pillars,
  ...BRAND.cities,
]

const FEATURED_ARTICLES = ARTICLES.slice(0, 3)
const FEATURED_EVENTS   = EVENTS.slice(0, 3)

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.heroKicker}>{BRAND.intersect}</span>
          <h1 className={`${s.heroTitle} ${s.display}`}>
            {BRAND.heroLine1}<br />{BRAND.heroLine2}
          </h1>
          <p className={s.heroMission}>{BRAND.mission}</p>
          <div className={s.heroCtas}>
            <Link to={`${BASE}/culture-report`} className={s.btn}>Explore the Archive</Link>
            <Link to={`${BASE}/events`} className={`${s.btn} ${s.btnGhost}`}>Event Coverage</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className={s.marquee} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${item}-${i}`}>
              {i % 4 === 1 ? <em>{item}</em> : item}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED ARTICLES */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Culture Report</div>
            <h2 className={s.sectionTitle}>Latest Dispatches</h2>
            <p className={s.sectionSub}>
              Long-form features and field notes from the cities where culture moves fastest.
            </p>
          </div>
          <div className={s.articleGrid}>
            {FEATURED_ARTICLES.map((a, i) => (
              <Link
                key={a.id}
                to={`${BASE}/culture-report`}
                className={`${s.articleCard} ${s.reveal}`}
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className={s.articleImg}>
                  <Graphic
                    seed={`aro-fq-home-a${i + 1}`}
                    tone={i === 1 ? 'holo' : 'warm'}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className={s.articleBody}>
                  <div className={s.articleMeta}>
                    <span className={s.articleCat}>{a.cat}</span>
                    <span className={s.articleCity}>{a.city}</span>
                  </div>
                  <h3 className={s.articleTitle}>{a.title}</h3>
                  <p className={s.articleExcerpt}>{a.excerpt}</p>
                  <div className={s.articleFoot}>
                    <span>{a.date}</span>
                    <span>{a.read} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={s.sectionCta}>
            <Link to={`${BASE}/culture-report`} className={`${s.btn} ${s.btnGhost}`}>
              All Stories &#x2192;
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 — reversed */}
      <div className={`${s.marquee} ${s.marqueeReverse}`} aria-hidden="true">
        <div className={`${s.marqueeTrack} ${s.marqueeTrackReverse}`}>
          {[...BRAND.cities, ...BRAND.pillars, ...BRAND.cities, ...BRAND.pillars].map((item, i) => (
            <span key={`rev-${item}-${i}`}>
              {i % 3 === 2 ? <em>{item}</em> : item}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.statsGrid}>
            {STATS.map((st, i) => (
              <div
                key={st.label}
                className={`${s.statCell} ${s.reveal}`}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <div className={s.statNum}>{st.num}</div>
                <div className={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Event Coverage</div>
            <h2 className={s.sectionTitle}>On the Ground</h2>
            <p className={s.sectionSub}>
              We document shows, launches, and happenings across cities &mdash; before, during and after.
            </p>
          </div>
          <div className={s.eventGrid}>
            {FEATURED_EVENTS.map((ev, i) => (
              <Link
                key={ev.id}
                to={`${BASE}/events`}
                className={`${s.eventCard} ${s.reveal}`}
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className={s.eventImg}>
                  <Graphic
                    seed={`aro-fq-home-ev${i + 1}`}
                    tone={i === 0 ? 'amber' : i === 1 ? 'holo' : 'warm'}
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className={ev.status === 'Covered' ? `${s.evBadge} ${s.evBadgeCovered}` : s.evBadge}>
                    {ev.status}
                  </span>
                </div>
                <div className={s.eventBody}>
                  <div className={s.eventTag}>{ev.tag} &mdash; {ev.city}</div>
                  <h3 className={s.eventName}>{ev.name}</h3>
                  <p className={s.eventExcerpt}>{ev.excerpt}</p>
                  <div className={s.eventDate}>{ev.date}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className={s.sectionCta}>
            <Link to={`${BASE}/events`} className={`${s.btn} ${s.btnGhost}`}>
              All Events &#x2192;
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA BAND */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={`${s.ctaBand} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Work With Us</div>
            <h2>Pitch. Invite. Collaborate.</h2>
            <p>{BRAND.mission}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`${BASE}/contact`} className={s.btn}>Get in Touch</Link>
              <Link to={`${BASE}/services`} className={`${s.btn} ${s.btnGhost}`}>Creative Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
