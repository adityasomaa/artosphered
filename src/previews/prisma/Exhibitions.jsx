import { useState, useEffect, useCallback } from 'react'
import { EXHIBITIONS } from './data.js'
import s from './styles.module.css'

const FILTERS = ['All', 'Current', 'Upcoming', 'Past']

function badgeClass(status) {
  if (status === 'current') return `${s.badge} ${s.badgeCurrent}`
  if (status === 'upcoming') return `${s.badge} ${s.badgeUpcoming}`
  return `${s.badge} ${s.badgePast}`
}

export default function Exhibitions() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const visible = EXHIBITIONS.filter((e) => {
    if (filter === 'All') return true
    return e.status === filter.toLowerCase()
  })

  // Scroll lock + Escape for modal
  useEffect(() => {
    if (!selected) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [selected])

  const closeModal = useCallback(() => setSelected(null), [])

  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 44 }} data-reveal>
          <div className={s.eyebrow}>Programme</div>
          <h1 className={s.h2}>Exhibitions</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            From immersive light installations to monumental textile sculpture — six galleries,
            always in conversation with the now.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ marginBottom: 36, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }} data-reveal>
          <div className={s.filterBar} role="group" aria-label="Filter exhibitions">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={s.filterBtn + (filter === f ? ' ' + s.filterBtnActive : '')}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <span style={{ color: 'var(--p-muted)', fontSize: '0.86rem' }}>
            {visible.length} exhibition{visible.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className={s.glass} style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--p-muted)' }}>
            No exhibitions match this filter.
          </div>
        ) : (
          <div className={s.grid}>
            {visible.map((ex, i) => (
              <button
                key={ex.id}
                className={s.card}
                onClick={() => setSelected(ex)}
                data-reveal
                data-reveal-delay={i * 80}
                aria-label={`View details for ${ex.title}`}
              >
                <div className={s.cardMedia}>
                  <img
                    src={`https://picsum.photos/seed/${ex.seed}/600/450`}
                    alt={ex.title}
                    loading="lazy"
                    width={600}
                    height={450}
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                  <span className={badgeClass(ex.status)} style={{ textTransform: 'capitalize' }}>
                    {ex.status}
                  </span>
                </div>
                <div className={s.cardBody}>
                  <h2 className={s.cardTitle}>{ex.title}</h2>
                  <p className={s.cardSub}>{ex.artist}</p>
                  <p className={s.cardSub} style={{ marginTop: 4 }}>{ex.dates}</p>
                  <p className={s.cardSub} style={{ marginTop: 2, fontSize: '0.8rem' }}>{ex.location}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className={s.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className={s.modal}>
            <div className={s.modalMedia}>
              <img
                src={`https://picsum.photos/seed/${selected.seed}/800/600`}
                alt={selected.title}
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div className={s.modalBody}>
              <button
                className={s.modalClose}
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>

              <span className={badgeClass(selected.status)} style={{ position: 'static', textTransform: 'capitalize', alignSelf: 'flex-start' }}>
                {selected.status}
              </span>

              <h2 className={s.h3} style={{ marginTop: 4 }}>{selected.title}</h2>

              <dl className={s.modalDl}>
                {[
                  ['Artist', selected.artist],
                  ['Dates', selected.dates],
                  ['Location', selected.location],
                  ['Medium', selected.medium],
                ].map(([dt, dd]) => (
                  <div key={dt} className={s.modalRow}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>

              <p style={{ color: 'var(--p-muted)', fontSize: '0.93rem', lineHeight: 1.75, marginTop: 4 }}>
                {selected.description}
              </p>

              <button
                className={`${s.btn} ${s.btnPrimary}`}
                style={{ marginTop: 8, alignSelf: 'flex-start' }}
                onClick={closeModal}
              >
                Plan your visit →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
