import { useRef, useState, useEffect } from 'react'
import { LOOKBOOK } from './data'
import s from './styles.module.css'

export default function Lookbook() {
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // Drag-to-scroll
  function onMouseDown(e) {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }
  function onMouseMove(e) {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    trackRef.current.scrollLeft = scrollLeft - walk
  }
  function onMouseUp() { setIsDragging(false) }

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const slides = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll('[data-slide]'))
      : []
    if (!slides.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.slide, 10)
            setActiveIndex(idx)
          }
        })
      },
      { root: trackRef.current, threshold: 0.5 }
    )
    slides.forEach((sl) => io.observe(sl))
    return () => io.disconnect()
  }, [])

  function scrollToSlide(idx) {
    const slides = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll('[data-slide]'))
      : []
    if (slides[idx]) {
      slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  return (
    <div className={s.lookbookPage}>
      {/* Hero */}
      <div className={s.lookbookHero} data-reveal="fade">
        <img
          className={s.lookbookHeroBg}
          src="https://picsum.photos/seed/lookbook-atelier-bg/1600/900"
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className={s.lookbookHeroContent}>
          <p className={s.lookbookSeason} data-reveal="fade">Fall / Winter 2026</p>
          <h1 className={s.lookbookTitle} data-reveal>
            Fragments<br />of Silence
          </h1>
          <p className={s.lookbookSub} data-reveal data-reveal-delay="100">
            Six looks · Shot in Lyon · Photography by M. Renard
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className={s.lookbookScrollOuter}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        role="region"
        aria-label="Lookbook — scroll or drag to explore"
      >
        <div className={s.lookbookTrack}>
          {LOOKBOOK.map((look, i) => (
            <div
              key={look.id}
              className={s.lookbookSlide}
              data-slide={i}
              aria-label={`Look ${look.figNum}: ${look.title}`}
            >
              <img
                className={s.lookbookSlideImg}
                src={`https://picsum.photos/seed/${look.seed}/${look.w}/${look.h}`}
                alt={`${look.title} — ${look.caption.slice(0, 60)}…`}
                width={look.w}
                height={look.h}
                loading={i < 2 ? 'eager' : 'lazy'}
                draggable="false"
              />
              <div className={s.lookbookCaption}>
                <p className={s.lookbookFig}>Fig. {look.figNum}</p>
                <h2 className={s.lookbookCaptionTitle}>{look.title}</h2>
                <p className={s.lookbookCaptionText}>{look.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div
        className={s.lookbookHint}
        role="navigation"
        aria-label="Lookbook navigation"
      >
        <span style={{ marginRight: '24px', opacity: 0.5 }}>Drag or scroll to navigate</span>
        {LOOKBOOK.map((look, i) => (
          <button
            key={look.id}
            type="button"
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to look ${look.figNum}`}
            aria-current={activeIndex === i ? 'true' : undefined}
            style={{
              display: 'inline-block',
              width: activeIndex === i ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeIndex === i ? 'var(--gold)' : 'var(--rule)',
              border: 'none',
              cursor: 'pointer',
              marginRight: '8px',
              transition: 'all 0.35s ease',
              padding: 0,
              verticalAlign: 'middle',
            }}
          />
        ))}
      </div>

      {/* Editorial spreads — vertical alternating below scroll */}
      <section
        style={{ padding: '120px 48px', maxWidth: '1280px', margin: '0 auto' }}
        aria-label="Editorial notes"
      >
        <p className={s.sectionEyebrow} data-reveal="fade" style={{ textAlign: 'center', marginBottom: '16px' }}>
          Notes on the Collection
        </p>
        <h2
          className={s.sectionTitle}
          data-reveal
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          The Idea Behind FW26
        </h2>

        {[
          {
            heading: 'On Silence',
            body: 'The FW26 collection began with a question: what does a wardrobe sound like when it stops speaking? We found the answer in cloth — specifically in the qualities of weight, fall, and surface texture that communicate without competing. A coat that enters a room before you do, then says nothing.',
            img: 'lookbook-notes-1',
          },
          {
            heading: 'On Material',
            body: 'Every piece in Fragments of Silence uses a material sourced within a 500-mile radius of the atelier. Camel hair from Outer Mongolia is the single exception — and it has been our single exception since 1987, when Isabelle Faure decided that one extraordinary thing was worth the distance.',
            img: 'lookbook-notes-2',
          },
          {
            heading: 'On Time',
            body: 'FW26 was six months in the making. We offer it knowing it will take longer than that to understand, and longer still to wear in. We are not interested in the customer who needs it now. We are interested in the customer who will still be wearing it in 2046.',
            img: 'lookbook-notes-3',
          },
        ].map((note, i) => (
          <div
            key={note.heading}
            className={s.twoCols}
            style={{ marginBottom: '96px' }}
            data-reveal
          >
            {i % 2 === 1 && (
              <div style={{ overflow: 'hidden', borderRadius: '0' }}>
                <img
                  src={`https://picsum.photos/seed/${note.img}/700/500`}
                  alt={note.heading}
                  width={700}
                  height={500}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif, Georgia)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--ink, #15120e)',
                  marginBottom: '20px',
                }}
              >
                {note.heading}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: 'var(--ink-muted, #6b6458)',
                  margin: 0,
                }}
              >
                {note.body}
              </p>
            </div>
            {i % 2 === 0 && (
              <div style={{ overflow: 'hidden' }}>
                <img
                  src={`https://picsum.photos/seed/${note.img}/700/500`}
                  alt={note.heading}
                  width={700}
                  height={500}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
