import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND } from './content'

/**
 * Full-screen intro loader shown once on first load of the proposal site.
 * Counts 0→100 while the wordmark assembles, then curtains away.
 * Each redesign CONCEPT ships its own distinct loader; this one is the
 * agency/proposal shell's signature opener.
 */
export default function IntroLoader() {
  const [done, setDone] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const start = performance.now()
    const DUR = 1700
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / DUR, 1)
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 360)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="introloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#08080c',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 9vw, 5.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#f4f4f8',
              }}
            >
              {BRAND.wordmark[0]}
              <span style={{ color: '#7c5cff' }}>{BRAND.wordmark[1]}</span>
            </motion.div>
            <div
              style={{
                marginTop: '1.6rem',
                fontFamily: 'Space Grotesk, monospace',
                color: '#74748a',
                letterSpacing: '0.3em',
                fontSize: '0.8rem',
                display: 'flex',
                gap: '1.4rem',
                justifyContent: 'center',
              }}
            >
              <span>REDESIGN PROPOSAL</span>
              <span style={{ color: '#00e5c0', fontVariantNumeric: 'tabular-nums' }}>{String(pct).padStart(3, '0')}%</span>
            </div>
            <div style={{ marginTop: '1.2rem', width: 'min(320px, 70vw)', height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#7c5cff,#00e5c0)' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
