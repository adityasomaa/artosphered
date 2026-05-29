/**
 * PRISM Loader — frosted glass shards assembling over the gradient mesh.
 * Each shard scales + blurs in from scattered positions, then the wordmark
 * comes into focus with a refracted light sweep. Runs once (~1.5 s), then
 * fades out with framer-motion.
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './styles.module.css'

const SHARDS = [
  { w: '38vw', h: '28vh', top: '-8%',  left: '-4%',  rotate: '-18deg', delay: 0 },
  { w: '28vw', h: '22vh', top: '5%',   right: '-6%', rotate: '24deg',  delay: 0.07 },
  { w: '22vw', h: '34vh', bottom: '2%',left: '10%',  rotate: '-8deg',  delay: 0.14 },
  { w: '32vw', h: '20vh', bottom: '-4%',right: '4%', rotate: '14deg',  delay: 0.21 },
  { w: '18vw', h: '18vh', top: '38%',  left: '42%',  rotate: '-30deg', delay: 0.28 },
]

/* Stagger the shards assembling */
const shardVariants = {
  hidden: (delay) => ({
    opacity: 0,
    scale: 0.6,
    filter: 'blur(24px)',
    transition: { delay },
  }),
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: 'blur(18px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const wordmarkVariants = {
  hidden: { opacity: 0, filter: 'blur(22px)', letterSpacing: '0.6em' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    letterSpacing: '0.12em',
    transition: { delay: 0.45, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'blur(16px)',
    transition: { duration: 0.4 },
  },
}

const sweepVariants = {
  hidden: { x: '-110%', opacity: 0.8 },
  visible: {
    x: '110%',
    opacity: 0,
    transition: { delay: 0.9, duration: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
}

const containerVariants = {
  exit: {
    opacity: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    /* Optionally pause smooth scroll during load */
    if (window.__lenis) window.__lenis.stop()

    const tid = setTimeout(() => {
      setVisible(false)
      if (window.__lenis) window.__lenis.start()
      if (onDone) onDone()
    }, 1650)

    return () => clearTimeout(tid)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="prism-loader"
          className={s.loaderRoot}
          variants={containerVariants}
          initial="visible"
          exit="exit"
        >
          {/* Gradient mesh blobs (same as layout, isolated) */}
          <div className={s.mesh} aria-hidden="true" style={{ position: 'absolute' }}>
            <div className={s.blob + ' ' + s.blob1} />
            <div className={s.blob + ' ' + s.blob2} />
            <div className={s.blob + ' ' + s.blob3} />
            <div className={s.blob + ' ' + s.blob4} />
          </div>

          {/* Glass shards assembling */}
          {SHARDS.map((sh, i) => (
            <motion.div
              key={i}
              className={s.loaderShard}
              style={{
                width: sh.w,
                height: sh.h,
                top: sh.top,
                left: sh.left,
                right: sh.right,
                bottom: sh.bottom,
                transform: `rotate(${sh.rotate})`,
              }}
              custom={sh.delay}
              variants={shardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          ))}

          {/* Wordmark + tagline centred */}
          <motion.div
            className={s.loaderCenter}
            variants={wordmarkVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Refraction light sweep */}
            <motion.span
              className={s.loaderSweep}
              variants={sweepVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            />

            <div className={s.loaderWordmark}>
              <span className={s.loaderArt}>art</span>
              <span className={s.loaderSphered}>osphered</span>
            </div>
            <div className={s.loaderTagline}>For the globe, for creatives</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
