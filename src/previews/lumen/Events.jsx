import { useState } from 'react'
import { EVENTS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const STATUSES = ['All', 'Upcoming', 'Covered']

export default function Events() {
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = activeStatus === 'All'
    ? EVENTS
    : EVENTS.filter((ev) => ev.status === activeStatus)

  return (
    <>
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>On the ground</p>
        <h1 data-reveal>
          Event <em>Coverage</em>
        </h1>
      </div>

      {/* STATUS FILTER */}
      <div className={s.chips}>
        {STATUSES.map((st) => (
          <button
            key={st}
            type="button"
            className={activeStatus === st ? `${s.chip} ${s.chipActive}` : s.chip}
            onClick={() => setActiveStatus(st)}
          >
            {st}
          </button>
        ))}
      </div>

      {/* EVENT CARDS */}
      <div className={s.eventsGrid}>
        {filtered.map((ev, i) => (
          <div
            key={ev.id}
            className={s.eventCard}
            data-reveal
            data-reveal-delay={String(i * 90)}
          >
            <div className={s.eventCardImgWrap}>
              <Graphic
                seed={`aro-mo-ev-${ev.seed}`}
                tone="amber"
                className={s.eventGraphic}
                style={{ width: '100%', height: '100%' }}
              />
              <div className={s.eventCardOverlay} />
            </div>
            <div className={s.eventCardBody}>
              <div className={s.eventCardMeta}>
                <span className={s.eventTag}>{ev.tag}</span>
                <span
                  className={s.eventStatus}
                  data-covered={ev.status === 'Covered'}
                >
                  {ev.status}
                </span>
              </div>
              <h2 className={s.eventCardName}>{ev.name}</h2>
              <p className={s.eventCardCity}>
                {ev.city} &mdash; {ev.date}
              </p>
              <p className={s.eventCardExcerpt}>{ev.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
