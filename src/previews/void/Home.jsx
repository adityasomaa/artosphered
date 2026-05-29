import { Link } from 'react-router-dom'
import { BRAND, ARTICLES, EVENTS, STATS } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/void'

const PILLARS = [
  { no: '01', label: 'Culture Report', desc: 'Editorial features, city dispatches and trend analysis.' },
  { no: '02', label: 'Art & Design', desc: 'Documenting the visual language of contemporary culture.' },
  { no: '03', label: 'Event Coverage', desc: 'On-the-ground documentation of shows, launches, happenings.' },
]

export default function Home() {
  const previewArticles = ARTICLES.slice(0, 4)
  const previewEvents = EVENTS.slice(0, 3)

  return (
    <div className={s.homePage}>

      {/* ---- Hero ---- */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroMeta}>
            <span>EST. {BRAND.est}</span>
            <span className={s.heroMetaSep}>/</span>
            <span>{BRAND.cities.length} CITIES</span>
            <span className={s.heroMetaSep}>/</span>
            <span>DOC. INDEX NO. 001</span>
          </div>

          <h1 className={s.heroTitle}>
            <span className={s.heroLine1}>{BRAND.heroLine1}</span>
            <span className={s.heroLine2}>{BRAND.heroLine2}</span>
          </h1>

          <div className={s.heroRule} />

          <p className={s.heroParagraph}>{BRAND.mission}</p>

          <div className={s.heroCtas}>
            <Link to={`${BASE}/culture-report`} className={s.btnPrimary}>
              Enter Archive &rarr;
            </Link>
            <Link to={`${BASE}/contact`} className={s.btnOutline}>
              Pitch a Story
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Stats bar ---- */}
      <section className={s.statsBar}>
        <div className={s.container}>
          <div className={s.statsBarInner}>
            {STATS.map((st, i) => (
              <div key={i} className={s.statsBarItem}>
                <span className={s.statsBarNum}>{st.num}</span>
                <span className={s.statsBarLabel}>{st.label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Pillars ---- */}
      <section className={s.pillarsSection}>
        <div className={s.container}>
          <div className={s.pillarsHeader}>
            <span className={s.blockLabel}>// WHAT WE DO</span>
          </div>
          <div className={s.pillarsList}>
            {PILLARS.map(p => (
              <div key={p.no} className={s.pillarRow} data-reveal>
                <span className={s.pillarNo}>{p.no}</span>
                <span className={s.pillarLabel}>{p.label}</span>
                <span className={s.pillarDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Index preview ---- */}
      <section className={s.indexSection}>
        <div className={s.container}>

          {/* Articles sub-index */}
          <div className={s.indexBlock} data-reveal>
            <div className={s.indexBlockHeader}>
              <span className={s.blockLabel}>CULTURE REPORT &mdash; LATEST ENTRIES</span>
              <Link to={`${BASE}/culture-report`} className={s.indexMore}>View all &rarr;</Link>
            </div>
            <table className={s.indexTable}>
              <thead>
                <tr className={s.indexThead}>
                  <th className={s.thNo}>NO.</th>
                  <th className={s.thDate}>DATE</th>
                  <th className={s.thCity}>CITY</th>
                  <th className={s.thCat}>CAT.</th>
                  <th className={s.thTitle}>TITLE</th>
                </tr>
              </thead>
              <tbody>
                {previewArticles.map((a, i) => (
                  <tr key={a.id} className={s.indexRow}>
                    <td className={s.tdNo}>{String(i + 1).padStart(2, '0')}</td>
                    <td className={s.tdDate}>{a.date}</td>
                    <td className={s.tdCity}>{a.city.toUpperCase()}</td>
                    <td className={s.tdCat}>
                      <span className={s.catPill}>{a.cat.toUpperCase()}</span>
                    </td>
                    <td className={s.tdTitle}>{a.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Events sub-index */}
          <div className={s.indexBlock} data-reveal>
            <div className={s.indexBlockHeader}>
              <span className={s.blockLabel}>EVENT LOG &mdash; RECENT</span>
              <Link to={`${BASE}/events`} className={s.indexMore}>View all &rarr;</Link>
            </div>
            <table className={s.indexTable}>
              <thead>
                <tr className={s.indexThead}>
                  <th className={s.thNo}>NO.</th>
                  <th className={s.thDate}>DATE</th>
                  <th className={s.thCity}>CITY</th>
                  <th className={s.thStatus}>STATUS</th>
                  <th className={s.thTitle}>EVENT</th>
                </tr>
              </thead>
              <tbody>
                {previewEvents.map((ev, i) => (
                  <tr key={ev.id} className={s.indexRow}>
                    <td className={s.tdNo}>{String(i + 1).padStart(2, '0')}</td>
                    <td className={s.tdDate}>{ev.date}</td>
                    <td className={s.tdCity}>{ev.city.toUpperCase()}</td>
                    <td className={s.tdStatus}>
                      <span className={ev.status === 'Upcoming' ? s.statusUpcoming : s.statusCovered}>
                        {ev.status.toUpperCase()}
                      </span>
                    </td>
                    <td className={s.tdTitle}>{ev.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- Contact line ---- */}
      <section className={s.contactLine}>
        <div className={s.container}>
          <div className={s.contactLineInner} data-reveal>
            <span className={s.contactLineText}>
              Pitch a story, invite us to your event, start a project.
            </span>
            <Link to={`${BASE}/contact`} className={s.btnPrimary}>
              Get in Touch &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
