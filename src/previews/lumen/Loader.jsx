import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './styles.module.css'

/**
 * Cinematic Y2K loader — bulletproof self-contained pattern.
 * Renders outside the page-transition wrapper so route changes never unmount it.
 * Sequence:
 *   0 ms  — film-title card visible, letterbox bars, chrome wordmark rises
 *   500ms — amber lens-flare sweeps
 *   700ms — aperture iris appears
 *  1300ms — bars retract, iris expands out
 *  1800ms — fade to transparent, pointer-events removed
 *  2000ms — unmounted from DOM
 */
export default function Loader() {
  const [gone, setGone] = useState(false)
  const [phase, setPhase] = useState(0) // 0=intro, 1=iris, 2=exit

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }
    try { if (window.__lenis) window.__lenis.stop() } catch (e) { /* noop */ }

    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1300)
    const t3 = setTimeout(() => {
      setGone(true)
      try { if (window.__lenis) window.__lenis.start() } catch (e) { /* noop */ }
    }, 2000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      try { if (window.__lenis) window.__lenis.start() } catch (e) { /* noop */ }
    }
  }, [])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="ld"
          className={s.loaderRoot}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          {/* Letterbox bars */}
          <motion.div
            className={s.loaderBarTop}
            animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className={s.loaderBarBot}
            animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Aperture iris */}
          <motion.div
            className={s.loaderIrisWrap}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === 0
                ? { opacity: 0, scale: 0.6 }
                : phase === 1
                ? { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                : { opacity: 0, scale: 2.4, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
            }
          >
            <svg viewBox="0 0 120 120" className={s.loaderIris} aria-hidden="true">
              <circle cx="60" cy="60" r="54" stroke="#ffb35c" strokeWidth="1" fill="none" strokeDasharray="4 8" />
              <circle cx="60" cy="60" r="42" stroke="#ff8a1e" strokeWidth="0.5" fill="none" opacity="0.5" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="60" y1="60"
                  x2={60 + 36 * Math.cos((deg * Math.PI) / 180)}
                  y2={60 + 36 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#ffb35c"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              ))}
              <circle cx="60" cy="60" r="4" fill="#ff8a1e" opacity="0.85" />
              {/* inner glow ring */}
              <circle cx="60" cy="60" r="28" stroke="#ff5e1a" strokeWidth="0.4" fill="none" opacity="0.3" strokeDasharray="2 6" />
            </svg>
          </motion.div>

          {/* Amber lens-flare sweep */}
          <div className={s.loaderFlare} />
          <div className={s.loaderFlareDot} />

          {/* Y2K sparkle star */}
          <svg className={s.loaderSparkle} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0 L13.5 9 L22 12 L13.5 15 L12 24 L10.5 15 L2 12 L10.5 9 Z" fill="#ffb35c" opacity="0.9" />
          </svg>

          {/* Chrome wordmark */}
          <motion.div
            className={s.loaderWordmark}
            initial={{ opacity: 0, y: 18 }}
            animate={
              phase === 0
                ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 } }
                : phase === 2
                ? { opacity: 0, y: -12, transition: { duration: 0.35 } }
                : { opacity: 1, y: 0 }
            }
          >
            ARTOSPHERED
          </motion.div>

          {/* Tagline */}
          <motion.p
            className={s.loaderTagline}
            initial={{ opacity: 0 }}
            animate={
              phase === 0
                ? { opacity: 1, transition: { duration: 0.8, delay: 0.45 } }
                : phase === 2
                ? { opacity: 0, transition: { duration: 0.25 } }
                : { opacity: 0.7 }
            }
          >
            For the globe, for creatives
          </motion.p>

          {/* Film frame corners */}
          <div className={s.loaderCorner} data-pos="tl" />
          <div className={s.loaderCorner} data-pos="tr" />
          <div className={s.loaderCorner} data-pos="bl" />
          <div className={s.loaderCorner} data-pos="br" />

          {/* Frame counter strip */}
          <div className={s.loaderFilmStrip}>
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className={s.loaderFrame}>{String(i + 1).padStart(2, '0')}</span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
