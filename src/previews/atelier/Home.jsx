import { Link } from 'react-router-dom'
import { BRAND, ARTICLES, EVENTS, STATS } from '../../shared/content'
import { BASE } from './data'
import s from './styles.module.css'

const MARQUEE_ITEMS = [
  'Culture Report',
  'Art & Design',
  'Event Coverage',
  'City Dispatches',
  'Fashion',
  'Emerging Movements',
  'Cultural Archive',
  'Global Perspectives',
]

export default function Home() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const featuredArticles = ARTICLES.slice(0, 3)
  const featuredEvents = EVENTS.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={s.aroHero} aria-label="Hero">
        <div className={s.aroHeroLeft}>
          <p className={s.aroHeroVol} data-reveal="fade">
            Vol. I &nbsp;&#183;&nbsp; Est. {BRAND.est}
          </p>
          <p className={s.aroHeroEyebrow} data-reveal="fade">
            {BRAND.intersect}
          </p>
          <h1 className={s.aroHeroHeadline} data-reveal>
            {BRAND.heroLine1}<br />
            <em>{BRAND.heroLine2}</em>
          </h1>
          <div className={s.aroHeroRule} aria-hidden="true" />
          <p className={s.aroHeroMission} data-reveal data-reveal-delay="80">
            {BRAND.mission}
          </p>
          <div className={s.aroHeroCtas} data-reveal data-reveal-delay="150">
            <Link to={`${BASE}/culture-report`} className={s.btnPrimary}>
              Culture Report
            </Link>
            <Link to={`${BASE}/events`} className={s.btnGhost}>
              Event Coverage
            </Link>
          </div>
        </div>
        <div className={s.aroHeroRight}>
          <img
            src="https://picsum.photos/seed/aro-home-hero/900/1100"
            alt="ARTOSPHERED — cultural archive editorial"
            width={900}
            height={1100}
            loading="eager"
          />
          <div className={s.aroHeroCaption}>
            ARTOSPHERED &nbsp;&#183;&nbsp; {BRAND.tagline}
          </div>
        </div>
      </section>

      {/* ── Three pillars ────────────────────────────────── */}
      <div className={s.aroPillars} aria-label="Our pillars">
        {BRAND.pillars.map((pillar, i) => (
          <div key={pillar} className={s.aroPillar} data-reveal data-reveal-delay={i * 80}>
            <span className={s.aroPillarNum}>0{i + 1}</span>
            <div className={s.aroPillarRule} />
            <p className={s.aroPillarTitle}>{pillar}</p>
          </div>
        ))}
      </div>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className={s.marqueeWrap} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {doubled.map((item, i) => (
            <span key={i} className={s.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Featured articles ────────────────────────────── */}
      <section className={s.aroArticleStrip} aria-label="Latest from Culture Report">
        <div className={s.aroStripHeader} data-reveal>
          <h2 className={s.aroStripTitle}>Culture Report</h2>
          <Link to={`${BASE}/culture-report`} className={s.btnGhost}>
            All Stories
          </Link>
        </div>
        <div className={s.aroArticleGrid}>
          {featuredArticles.map((article, i) => (
            <Link
              key={article.id}
              to={`${BASE}/culture-report`}
              className={s.aroArticleCard}
              data-reveal
              data-reveal-delay={i * 80}
            >
              <div className={`${s.aroArticleCardImg}${i === 0 ? ` ${s.tall}` : ''}`}>
                <img
                  src={`https://picsum.photos/seed/${article.seed}/${i === 0 ? '700/900' : '600/400'}`}
                  alt={article.title}
                  width={i === 0 ? 700 : 600}
                  height={i === 0 ? 900 : 400}
                  loading="lazy"
                />
              </div>
              <p className={s.aroArticleCat}>
                {article.cat} &nbsp;&#183;&nbsp; {article.city}
              </p>
              <h3 className={`${s.aroArticleCardTitle}${i === 0 ? ` ${s.large}` : ''}`}>
                {article.title}
              </h3>
              <p className={s.aroArticleMeta}>{article.read} &nbsp;&#183;&nbsp; {article.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Events teaser ────────────────────────────────── */}
      <section className={s.aroEventTeaser} aria-label="Event Coverage">
        <div className={s.aroEventTeaserInner}>
          <div className={s.aroEventTeaserHead} data-reveal>
            <p className={s.sectionEyebrow}>Event Coverage</p>
            <h2 className={s.aroEventTeaserTitle}>On the Ground</h2>
            <Link to={`${BASE}/events`} className={s.btnSecondary} style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--ivory)' }}>
              All Events
            </Link>
          </div>
          <div className={s.aroEventList}>
            {featuredEvents.map((ev, i) => (
              <div key={ev.id} className={s.aroEventRow} data-reveal data-reveal-delay={i * 70}>
                <p className={s.aroEventRowTag}>{ev.tag}</p>
                <div>
                  <p className={s.aroEventRowName}>{ev.name}</p>
                  <p className={s.aroEventRowMeta}>{ev.city} &nbsp;&#183;&nbsp; {ev.date}</p>
                </div>
                <span className={`${s.aroEventRowStatus} ${ev.status === 'Upcoming' ? s.upcoming : s.covered}`}>
                  {ev.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className={s.aroStats} aria-label="By the numbers">
        <div className={s.aroStatsInner}>
          {STATS.map((st, i) => (
            <div key={st.label} className={s.aroStatItem} data-reveal data-reveal-delay={i * 70}>
              <div className={s.aroStatNum}>{st.num}</div>
              <div className={s.aroStatLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section className={s.aroCtaBand} aria-label="Contact">
        <p className={s.sectionEyebrow} data-reveal="fade">Get in Touch</p>
        <h2 className={s.aroCtaBandTitle} data-reveal>
          Pitch a Story. Cover an Event.
        </h2>
        <p className={s.aroCtaBandSub} data-reveal data-reveal-delay="80">
          We read everything. If you have a story, an event, or a creative project
          you want to build with us, we want to hear it.
        </p>
        <div className={s.aroCtaBandLinks} data-reveal data-reveal-delay="120">
          <Link to={`${BASE}/contact`} className={s.btnPrimary}>
            Contact Us
          </Link>
          <a href={`mailto:${BRAND.email}`} className={s.aroCtaLink}>
            {BRAND.email}
          </a>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className={s.aroCtaLink}>
            {BRAND.instagram}
          </a>
        </div>
      </section>
    </>
  )
}
