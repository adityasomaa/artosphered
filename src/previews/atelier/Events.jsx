import { useState } from 'react'
import { EVENTS } from '../../shared/content'
import s from './styles.module.css'

const STATUS_FILTERS = ['All', 'Upcoming', 'Covered']

export default function Events() {
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = activeStatus === 'All'
    ? EVENTS
    : EVENTS.filter((ev) => ev.status === activeStatus)

  return (
    <div className={s.evPage}>
      {/* ── Hero masthead ───────────────────────────────── */}
      <div className={s.evHero}>
        <div data-reveal>
          <p className={s.sectionEyebrow}>Event Coverage</p>
          <h1 className={s.evHeroTitle}>
            On the<br />Ground
          </h1>
        </div>
        <p className={s.evHeroSub} data-reveal data-reveal-delay="80">
          We document the shows, openings, performances and gatherings where
          contemporary culture is being written in real time.
        </p>
      </div>

      {/* ── Filtered grid ───────────────────────────────── */}
      <div className={s.evBody}>
        {/* Status filter */}
        <div className={s.evFilter} role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              className={activeStatus === st
                ? `${s.evFilterBtn} ${s.evFilterBtnActive}`
                : s.evFilterBtn}
              onClick={() => setActiveStatus(st)}
              aria-pressed={activeStatus === st}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Event grid */}
        <div className={s.evGrid}>
          {filtered.map((ev, i) => (
            <article
              key={ev.id}
              className={s.evCard}
              data-reveal
              data-reveal-delay={Math.min(i * 80, 320)}
            >
              <div className={s.evCardImg}>
                <img
                  src={`https://picsum.photos/seed/${ev.seed}/480/640`}
                  alt={ev.name}
                  width={480}
                  height={640}
                  loading="lazy"
                />
              </div>
              <div className={s.evCardBody}>
                <p className={s.evCardTag}>{ev.tag}</p>
                <h2 className={s.evCardName}>{ev.name}</h2>
                <p className={s.evCardMeta}>{ev.city} &nbsp;&#183;&nbsp; {ev.date}</p>
                <p className={s.evCardExcerpt}>{ev.excerpt}</p>
                <span className={`${s.evCardStatus} ${ev.status === 'Upcoming' ? s.upcoming : s.covered}`}>
                  {ev.status}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', textAlign: 'center', padding: '64px 0' }}>
            No events in this category.
          </p>
        )}
      </div>
    </div>
  )
}
