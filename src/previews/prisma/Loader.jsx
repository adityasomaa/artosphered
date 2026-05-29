/**
 * PRISM Y2K Holographic Loader
 * Frosted warm-glass shards assemble over the gradient mesh,
 * then a holographic light sweep reveals the wordmark.
 * Runs once on mount (~2 s), then fades out.
 * Bulletproof: rendered outside the page-transition wrapper in index.jsx.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './styles.module.css'

const SHARDS = [
  { w: '42vw', h: '30vh', top: '-6%',   left: '-5%',   rotate: '-16deg', delay: 0 },
  { w: '30vw', h: '24vh', top: '4%',    right: '-8%',  rotate: '22deg',  delay: 0.08 },
  { w: '24vw', h: '36vh', bottom: '1%', left: '8%',    rotate: '-9deg',  delay: 0.16 },
  { w: '34vw', h: '22vh', bottom: '-5%',right: '3%',   rotate: '13deg',  delay: 0.24 },
  { w: '20vw', h: '20vh', top: '36%',   left: '40%',   rotate: '-28deg', delay: 0.32 },
]

const shardVariants = {
  hidden: (delay) => ({
    opacity: 0,
    scale: 0.5,
    filter: 'blur(28px)',
    transition: { delay },
  }),
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(20px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const wordmarkVariants = {
  hidden: { opacity: 0, filter: 'blur(24px)', letterSpacing: '0.6em' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    letterSpacing: '0.08em',
    transition: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'blur(16px)',
    transition: { duration: 0.4 },
  },
}

const sweepVariants = {
  hidden:  { x: '-120%', opacity: 0.9 },
  visible: {
    x: '120%',
    opacity: 0,
    transition: { delay: 1.0, duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
}

const containerVariants = {
  exit: {
    opacity: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Loader() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }

    /* Pause smooth scroll if present */
    try { window.__lenis && window.__lenis.stop() } catch (e) { /* no-op */ }

    const t = setTimeout(() => {
      setGone(true)
      try { window.__lenis && window.__lenis.start() } catch (e) { /* no-op */ }
    }, 2000)

    return () => {
      clearTimeout(t)
      try { window.__lenis && window.__lenis.start() } catch (e) { /* no-op */ }
    }
  }, [])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="ld"
          className={s.loaderRoot}
          variants={containerVariants}
          initial={{ opacity: 1 }}
          exit="exit"
        >
          {/* Warm holographic mesh blobs */}
          <div className={s.mesh} aria-hidden="true" style={{ position: 'absolute' }}>
            <div className={s.blob + ' ' + s.blob1} />
            <div className={s.blob + ' ' + s.blob2} />
            <div className={s.blob + ' ' + s.blob3} />
            <div className={s.blob + ' ' + s.blob4} />
          </div>

          {/* Glass shards assembling from blur */}
          {SHARDS.map((sh, i) => (
            <motion.div
              key={i}
              className={s.loaderShard}
              style={{
                width:  sh.w,
                height: sh.h,
                top:    sh.top,
                left:   sh.left,
                right:  sh.right,
                bottom: sh.bottom,
                transform: 'rotate(' + sh.rotate + ')',
              }}
              custom={sh.delay}
              variants={shardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          ))}

          {/* Centred wordmark panel */}
          <motion.div
            className={s.loaderCenter}
            variants={wordmarkVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Holographic light sweep */}
            <motion.span
              className={s.loaderSweep}
              variants={sweepVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            />

            {/* Sparkles */}
            <span className={s.loaderSparkle} aria-hidden="true">&#10022;</span>
            <span className={s.loaderSparkle2} aria-hidden="true">&#10022;</span>

            {/* Y2K chrome wordmark */}
            <div className={s.loaderWordmark}>
              <span className={s.loaderArt}>art</span>
              <span className={s.loaderCircle}>&#9675;</span>
              <span className={s.loaderSphered}>sphered</span>
            </div>

            <div className={s.loaderTagline}>For the globe &mdash; for creatives &#10022;</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
