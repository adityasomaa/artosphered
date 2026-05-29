import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENTS } from '../../shared/content.js'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const STATUS_FILTERS = ['All', 'Upcoming', 'Covered']

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeFilter === 'All' ? EVENTS : EVENTS.filter((e) => e.status === activeFilter)

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [selected, closeModal])

  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 52 }} data-reveal>
          <div className={s.eyebrow}>On the ground &#10022;</div>
          <h1 className={s.h2}>Event Coverage</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            We document the shows, happenings and gatherings that shape contemporary culture &mdash; from biennales and fashion weeks to late-night performances and open studios.
          </p>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 40 }}>
          <div className={s.filterBar}>
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                className={`${s.filterBtn}${activeFilter === f ? ' ' + s.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={s.grid}>
          {filtered.map((ev, i) => (
            <button
              key={ev.id}
              className={s.card}
              data-reveal
              data-reveal-delay={i * 80}
              onClick={() => setSelected(ev)}
              aria-label={'View: ' + ev.name}
            >
              <div className={s.cardMedia}>
                <Graphic
                  seed={'aro-ev-' + ev.seed}
                  tone={ev.status === 'Upcoming' ? 'holo' : 'warm'}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
                <span
                  className={`${s.badge} ${ev.status === 'Upcoming' ? s.badgeUpcoming : s.badgeCurrent}`}
                >
                  {ev.status}
                </span>
              </div>
              <div className={s.cardBody}>
                <p className={s.cardSub} style={{ marginBottom: 6 }}>
                  {ev.city} &middot; {ev.tag}
                </p>
                <h3 className={s.cardTitle}>{ev.name}</h3>
                <p className={s.cardSub} style={{ marginTop: 6 }}>{ev.date}</p>
                <p className={s.cardSub} style={{ marginTop: 8, lineHeight: 1.6 }}>
                  {ev.excerpt}
                </p>
                <p className={s.cardSub} style={{ marginTop: 10, color: 'var(--p-accent)' }}>
                  View coverage &rarr;
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className={s.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              className={s.modal}
              initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 16, scale: 0.97, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={s.modalMedia}>
                <Graphic
                  seed={'aro-ev-modal-' + selected.seed}
                  tone={selected.status === 'Upcoming' ? 'holo' : 'amber'}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div className={s.modalBody}>
                <span
                  className={s.badge}
                  style={{
                    position: 'static',
                    display: 'inline-flex',
                    color: selected.status === 'Upcoming' ? 'var(--p-accent)' : 'var(--p-cyan)',
                    borderColor: selected.status === 'Upcoming'
                      ? 'rgba(255,174,61,0.4)'
                      : 'rgba(54,230,255,0.4)',
                  }}
                >
                  {selected.status}
                </span>
                <h2 className={s.h3} style={{ marginTop: 8 }}>{selected.name}</h2>
                <dl className={s.modalDl}>
                  <div className={s.modalRow}>
                    <dt>City</dt>
                    <dd>{selected.city}</dd>
                  </div>
                  <div className={s.modalRow}>
                    <dt>Date</dt>
                    <dd>{selected.date}</dd>
                  </div>
                  <div className={s.modalRow}>
                    <dt>Type</dt>
                    <dd>{selected.tag}</dd>
                  </div>
                </dl>
                <p style={{ color: 'var(--p-muted)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {selected.excerpt}
                </p>
                <p style={{ color: 'var(--p-muted)', lineHeight: 1.75, fontSize: '0.93rem', marginTop: 12 }}>
                  {selected.status === 'Covered'
                    ? 'Our team was on the ground for this one. Full photo essay, interviews and written report available in the archive.'
                    : 'We will be covering this event. Follow @artosphered for live updates from the field.'}
                </p>
                <button
                  className={`${s.btn} ${s.btnPrimary}`}
                  style={{ marginTop: 8, alignSelf: 'flex-start' }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              <button
                className={s.modalClose}
                onClick={closeModal}
                aria-label="Close event"
              >
                &#x2715;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
