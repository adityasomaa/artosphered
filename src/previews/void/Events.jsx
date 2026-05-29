import { useState } from 'react'
import { EVENTS } from '../../shared/content.js'
import s from './styles.module.css'

const STATUS_FILTERS = ['All', 'Upcoming', 'Covered']

export default function Events() {
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = activeStatus === 'All'
    ? EVENTS
    : EVENTS.filter(ev => ev.status === activeStatus)

  return (
    <div className={s.innerPage}>
      <div className={s.container}>

        {/* Page header */}
        <div className={s.pageHeader}>
          <div className={s.pageHeaderMeta}>
            <span className={s.blockLabel}>// EVENT LOG</span>
            <span className={s.pageHeaderCount}>{filtered.length} RECORDS</span>
          </div>
          <h1 className={s.pageTitle}>Event Coverage</h1>
          <p className={s.pageSubtitle}>
            On-the-ground documentation of shows, launches and cultural happenings.
          </p>
        </div>

        {/* Filter bar */}
        <div className={s.filterBar}>
          <span className={s.filterBarLabel}>STATUS</span>
          {STATUS_FILTERS.map(st => (
            <button
              key={st}
              className={`${s.filterBtn} ${activeStatus === st ? s.filterBtnActive : ''}`}
              onClick={() => setActiveStatus(st)}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Events log */}
        <div className={s.eventLog} data-reveal>
          {filtered.map((ev, i) => (
            <div key={ev.id} className={s.eventEntry}>
              <div className={s.eventEntryLeft}>
                <span className={s.eventNo}>{String(i + 1).padStart(2, '0')}</span>
                <div className={s.eventDateBlock}>
                  <span className={s.eventDate}>{ev.date}</span>
                  <span className={s.eventCity}>{ev.city.toUpperCase()}</span>
                </div>
              </div>

              <div className={s.eventEntryCenter}>
                <div className={s.eventNameRow}>
                  <span className={s.eventName}>{ev.name}</span>
                  <span className={s.eventTag}>{ev.tag.toUpperCase()}</span>
                </div>
                <p className={s.eventExcerpt}>{ev.excerpt}</p>
              </div>

              <div className={s.eventEntryRight}>
                <img
                  src={`https://picsum.photos/seed/${ev.seed}/120/80`}
                  alt={ev.name}
                  width={120}
                  height={80}
                  loading="lazy"
                  className={s.eventThumb}
                />
                <span className={ev.status === 'Upcoming' ? s.statusUpcoming : s.statusCovered}>
                  {ev.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className={s.emptyState}>
              <span className={s.blockLabel}>NO EVENTS MATCH THIS FILTER</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
