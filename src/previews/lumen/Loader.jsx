import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './styles.module.css'

/**
 * MONOLITH cinematic loader.
 * Sequence:
 *   0 ms  — black screen, letterbox bars visible
 *  200 ms — wordmark fades up
 *  800 ms — aperture iris closes (ring contracts inward)
 * 1400 ms — bars retract, screen fades out, onDone fires
 */
export default function Loader({ onDone }) {
  const [phase, setPhase] = useState(0) // 0=bars+word, 1=iris, 2=exit
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { onDone(); return }

    // Stop lenis during loader
    if (window.__lenis) window.__lenis.stop()

    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1300)
    const t3 = setTimeout(() => {
      setVisible(false)
    }, 1800)
    const t4 = setTimeout(() => {
      if (window.__lenis) window.__lenis.start()
      onDone()
    }, 2100)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      if (window.__lenis) window.__lenis.start()
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={s.loaderRoot}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          {/* Top letterbox bar */}
          <motion.div
            className={s.loaderBarTop}
            animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom letterbox bar */}
          <motion.div
            className={s.loaderBarBot}
            animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Aperture iris — SVG ring that contracts */}
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
              <circle cx="60" cy="60" r="54" stroke="#e7c89a" strokeWidth="1" fill="none" strokeDasharray="4 8" />
              <circle cx="60" cy="60" r="42" stroke="#e7c89a" strokeWidth="0.5" fill="none" opacity="0.4" />
              {/* Aperture blades */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="60" y1="60"
                  x2={60 + 36 * Math.cos((deg * Math.PI) / 180)}
                  y2={60 + 36 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#e7c89a"
                  strokeWidth="0.5"
                  opacity="0.35"
                />
              ))}
              <circle cx="60" cy="60" r="4" fill="#e7c89a" opacity="0.7" />
            </svg>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            className={s.loaderWordmark}
            initial={{ opacity: 0, y: 18 }}
            animate={
              phase === 0
                ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
                : phase === 2
                ? { opacity: 0, y: -12, transition: { duration: 0.35 } }
                : { opacity: 1, y: 0 }
            }
          >
            <span className={s.loaderWordArt}>art</span>
            <span className={s.loaderWordSphere}>sphered</span>
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
