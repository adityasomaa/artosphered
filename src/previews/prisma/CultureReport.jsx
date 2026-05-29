import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ARTICLES, ARTICLE_CATS } from '../../shared/content.js'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

export default function CultureReport() {
  const [activeCat, setActiveCat] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeCat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.cat === activeCat)

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
          <div className={s.eyebrow}>Editorial &#10022;</div>
          <h1 className={s.h2}>Culture Report</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            Field notes, essays and city reports from the movements shaping art, fashion and contemporary culture.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ marginBottom: 40 }}>
          <div className={s.filterBar}>
            {ARTICLE_CATS.map((cat) => (
              <button
                key={cat}
                className={`${s.filterBtn}${activeCat === cat ? ' ' + s.filterBtnActive : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={s.grid}>
          {filtered.map((art, i) => (
            <button
              key={art.id}
              className={s.card}
              data-reveal
              data-reveal-delay={i * 80}
              onClick={() => setSelected(art)}
              aria-label={'Read: ' + art.title}
            >
              <div className={s.cardMedia}>
                <Graphic
                  seed={'aro-cr-' + art.seed}
                  tone="holo"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
                <span className={`${s.badge} ${s.badgeUpcoming}`}>{art.cat}</span>
              </div>
              <div className={s.cardBody}>
                <p className={s.cardSub} style={{ marginBottom: 6 }}>
                  {art.city} &middot; {art.date}
                </p>
                <h3 className={s.cardTitle}>{art.title}</h3>
                <p className={s.cardSub} style={{ marginTop: 8, lineHeight: 1.6 }}>
                  {art.excerpt}
                </p>
                <p className={s.cardSub} style={{ marginTop: 10, color: 'var(--p-accent)' }}>
                  {art.read} read &rarr;
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Article Modal */}
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
            aria-label={selected.title}
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
                  seed={'aro-cr-modal-' + selected.seed}
                  tone="amber"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div className={s.modalBody}>
                <span
                  className={s.badge}
                  style={{
                    position: 'static',
                    display: 'inline-flex',
                    color: 'var(--p-accent)',
                    borderColor: 'rgba(255,174,61,0.4)',
                  }}
                >
                  {selected.cat}
                </span>
                <h2 className={s.h3} style={{ marginTop: 8 }}>{selected.title}</h2>
                <dl className={s.modalDl}>
                  <div className={s.modalRow}>
                    <dt>City</dt>
                    <dd>{selected.city}</dd>
                  </div>
                  <div className={s.modalRow}>
                    <dt>Published</dt>
                    <dd>{selected.date}</dd>
                  </div>
                  <div className={s.modalRow}>
                    <dt>Read time</dt>
                    <dd>{selected.read}</dd>
                  </div>
                </dl>
                <p style={{ color: 'var(--p-muted)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {selected.excerpt}
                </p>
                <p style={{ color: 'var(--p-muted)', lineHeight: 1.75, fontSize: '0.93rem', marginTop: 12 }}>
                  This piece explores the cultural undercurrents at work in {selected.city} right now &mdash; a long-form report drawn from our on-the-ground network of artists, designers and cultural producers.
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
                aria-label="Close article"
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
