import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND } from './content'

/**
 * Y2K intro loader for the proposal shell — chrome wordmark, amber holo bar,
 * Orbitron readout. Guaranteed to dismiss (hard timeout fallback) so it can
 * never get stuck. Each redesign concept ships its OWN distinct loader.
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
      else setTimeout(() => setDone(true), 380)
    }
    raf = requestAnimationFrame(tick)
    const safety = setTimeout(() => setDone(true), 2800) // never get stuck
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="introloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="y2k-grid"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background:
              'radial-gradient(120% 90% at 50% 0%, #2a160d, #0b0705 70%)',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* sweeping amber glow */}
          <div
            style={{
              position: 'absolute',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,138,30,0.25), transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          <div style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="y2k-chrome"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.6rem, 10vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                textTransform: 'lowercase',
              }}
            >
              art<span style={{ WebkitTextFillColor: '#ff8a1e' }}>○</span>sphered
            </motion.div>
            <div
              style={{
                marginTop: '1.5rem',
                fontFamily: 'Orbitron, monospace',
                color: 'var(--amber-2)',
                letterSpacing: '0.34em',
                fontSize: '0.72rem',
                display: 'flex',
                gap: '1.2rem',
                justifyContent: 'center',
                textTransform: 'uppercase',
              }}
            >
              <span>Loading Archive</span>
              <span style={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{String(pct).padStart(3, '0')}%</span>
            </div>
            <div
              style={{
                marginTop: '1.1rem',
                width: 'min(340px, 72vw)',
                height: 8,
                border: '1px solid rgba(255,179,92,0.5)',
                borderRadius: 999,
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.4)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg,#ff5e1a,#ff8a1e,#ffb35c)',
                  boxShadow: '0 0 12px rgba(255,138,30,0.8)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
