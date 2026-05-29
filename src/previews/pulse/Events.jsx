import { useState } from 'react'
import { EVENTS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const STATUSES = ['All', 'Upcoming', 'Covered']
const TONES    = ['holo', 'warm', 'amber', 'holo', 'warm', 'amber']

export default function Events() {
  const [status, setStatus] = useState('All')

  const filtered = status === 'All' ? EVENTS : EVENTS.filter((ev) => ev.status === status)

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>Event Coverage</div>
          <h1 className={s.sectionTitle}>On the Ground</h1>
          <p className={s.sectionSub}>
            Photo, video and written documentation of shows, launches and happenings across cities.
          </p>
        </div>

        {/* Status filter */}
        <div className={`${s.filterBar} ${s.reveal}`} data-reveal>
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              className={status === st ? `${s.filterBtn} ${s.filterBtnActive}` : s.filterBtn}
              onClick={() => setStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className={s.evGrid}>
          {filtered.map((ev, i) => (
            <article
              key={ev.id}
              className={`${s.evFullCard} ${s.reveal}`}
              data-reveal
              data-reveal-delay={i * 70}
            >
              <div className={s.evFullImg}>
                <Graphic
                  seed={`aro-fq-ev-${ev.id}`}
                  tone={TONES[i % TONES.length]}
                  style={{ width: '100%', height: '100%' }}
                />
                <span className={ev.status === 'Covered' ? `${s.evBadge} ${s.evBadgeCovered}` : s.evBadge}>
                  {ev.status}
                </span>
              </div>
              <div className={s.evFullBody}>
                <div className={s.eventTag}>{ev.tag} &mdash; {ev.city}</div>
                <h2 className={s.evFullName}>{ev.name}</h2>
                <p className={s.eventExcerpt}>{ev.excerpt}</p>
                <div className={s.evFullFoot}>
                  <span className={s.eventDate}>{ev.date}</span>
                  <span className={ev.status === 'Covered' ? `${s.evStatusChip} ${s.evStatusCovered}` : s.evStatusChip}>
                    {ev.status === 'Covered' ? 'Read Coverage' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
