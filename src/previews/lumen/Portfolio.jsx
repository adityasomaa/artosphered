import { useState, useEffect, useCallback } from 'react'
import { CATEGORIES, WORKS } from './data'
import s from './styles.module.css'

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index into filtered list

  const filtered = active === 'All' ? WORKS : WORKS.filter((w) => w.cat === active)

  const open = useCallback((i) => {
    setLightbox(i)
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])

  const prev = useCallback(() => {
    setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  const next = useCallback(() => {
    setLightbox((i) => (i + 1) % filtered.length)
  }, [filtered.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, close, prev, next])

  // Cleanup on unmount
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  // When category changes, close lightbox
  useEffect(() => {
    if (lightbox !== null) close()
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>Selected works</p>
        <h1 data-reveal>
          The <em>portfolio.</em>
        </h1>
      </div>

      {/* CATEGORY CHIPS */}
      <div className={s.chips} role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={active === cat ? `${s.chip} ${s.chipActive}` : s.chip}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      <div className={s.masonry} aria-label="Portfolio gallery">
        {filtered.map((work, i) => (
          <div
            key={work.id}
            className={s.mCard}
            onClick={() => open(i)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${work.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') open(i) }}
            data-reveal
            data-reveal-delay={String((i % 3) * 80)}
          >
            <img
              src={`https://picsum.photos/seed/${work.seed}/${work.w}/${work.h}`}
              alt={work.title}
              loading="lazy"
              width={work.w}
              height={work.h}
            />
            <div className={s.mMeta}>
              <div className={s.cat}>{work.cat}</div>
              <div className={s.ttl}>{work.title}</div>
            </div>
            <div className={s.mZoom} aria-hidden="true">+</div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          {/* Close */}
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbClose}`}
            onClick={close}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbPrev}`}
            onClick={prev}
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Image */}
          <img
            key={filtered[lightbox].id}
            className={s.lbImg}
            src={`https://picsum.photos/seed/${filtered[lightbox].seed}/${filtered[lightbox].w}/${filtered[lightbox].h}`}
            alt={filtered[lightbox].title}
          />

          {/* Caption */}
          <div className={s.lbCap}>
            <div className={s.cat}>{filtered[lightbox].cat}</div>
            <div className={s.ttl}>{filtered[lightbox].title}</div>
          </div>

          {/* Next */}
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbNext}`}
            onClick={next}
            aria-label="Next image"
          >
            →
          </button>

          {/* Counter */}
          <div className={s.lbCount} aria-live="polite">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  )
}
