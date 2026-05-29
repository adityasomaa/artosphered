import { useState, useEffect, useCallback } from 'react'
import { ARTICLES, ARTICLE_CATS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

export default function CultureReport() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index into filtered list

  const filtered = activeCat === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.cat === activeCat)

  const openLb = (i) => {
    setLightbox(i)
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
  }
  const closeLb = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
    if (window.__lenis) window.__lenis.start()
  }, [])
  const prevLb = () => setLightbox((v) => (v > 0 ? v - 1 : filtered.length - 1))
  const nextLb = () => setLightbox((v) => (v < filtered.length - 1 ? v + 1 : 0))

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLb()
      if (e.key === 'ArrowLeft') prevLb()
      if (e.key === 'ArrowRight') nextLb()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered.length, closeLb])

  // Close lb when filter changes
  useEffect(() => {
    if (lightbox !== null) closeLb()
  }, [activeCat])

  const lbArticle = lightbox !== null ? filtered[lightbox] : null

  return (
    <>
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>Dispatches</p>
        <h1 data-reveal>
          Culture <em>Report</em>
        </h1>
      </div>

      {/* CATEGORY FILTER */}
      <div className={s.chips}>
        {ARTICLE_CATS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={activeCat === cat ? `${s.chip} ${s.chipActive}` : s.chip}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLE MASONRY */}
      <div className={s.masonry}>
        {filtered.map((a, i) => {
          const aspectPad = i % 3 === 0 ? '125%' : i % 3 === 1 ? '87%' : '107%'
          return (
            <div
              key={a.id}
              className={s.mCard}
              onClick={() => openLb(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open article: ${a.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLb(i) }}
            >
              <div className={s.mCardGraphic} style={{ paddingBottom: aspectPad }}>
                <Graphic
                  seed={`aro-mo-cr-${a.seed}`}
                  tone="warm"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div className={s.mMeta}>
                <span className={s.cat}>{a.cat} &mdash; {a.city}</span>
                <div className={s.ttl}>{a.title}</div>
              </div>
              <div className={s.mZoom} aria-hidden="true">&#8599;</div>
            </div>
          )
        })}
      </div>

      {/* LIGHTBOX */}
      {lbArticle && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lbArticle.title}
          onClick={closeLb}
        >
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbClose}`}
            onClick={closeLb}
            aria-label="Close"
          >
            &#10005;
          </button>
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); prevLb() }}
            aria-label="Previous article"
          >
            &#8592;
          </button>
          <button
            type="button"
            className={`${s.lbBtn} ${s.lbNext}`}
            onClick={(e) => { e.stopPropagation(); nextLb() }}
            aria-label="Next article"
          >
            &#8594;
          </button>

          <div
            className={s.lbGraphicWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <Graphic
              seed={`aro-mo-lb-${lbArticle.seed}`}
              tone="warm"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div className={s.lbCap} onClick={(e) => e.stopPropagation()}>
            <div className={s.cat}>{lbArticle.cat} &mdash; {lbArticle.city} &mdash; {lbArticle.date}</div>
            <div className={s.ttl}>{lbArticle.title}</div>
            <p className={s.lbExcerpt}>{lbArticle.excerpt}</p>
            <span className={s.lbRead}>{lbArticle.read} read</span>
          </div>
          <div className={s.lbCount}>
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  )
}
