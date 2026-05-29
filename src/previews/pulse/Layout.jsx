import { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BRAND, NAV } from '../../shared/content'
import s from './styles.module.css'

const BASE = '/p/pulse'

/* ─── SPARKLE POSITIONS — stable, not random ─── */
const SPARKS = [
  { left: '12%',  top: '18%', delay: '0.0s', size: 8 },
  { left: '78%',  top: '11%', delay: '0.6s', size: 6 },
  { left: '55%',  top: '72%', delay: '1.1s', size: 7 },
  { left: '30%',  top: '60%', delay: '0.4s', size: 5 },
  { left: '88%',  top: '55%', delay: '1.5s', size: 9 },
  { left: '6%',   top: '80%', delay: '0.9s', size: 6 },
  { left: '65%',  top: '30%', delay: '0.2s', size: 7 },
  { left: '42%',  top: '45%', delay: '1.3s', size: 5 },
]

const BAR_COUNT = 14

/* ─── Y2K KINETIC LOADER ─── */
function Loader() {
  const [gone, setGone] = useState(false)
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }
    try { window.__lenis && window.__lenis.stop() } catch (e) { /* ignore */ }

    const DURATION = 1800
    function tick(ts) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setGone(true)
          try { window.__lenis && window.__lenis.start() } catch (e) { /* ignore */ }
        }, 420)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      try { window.__lenis && window.__lenis.start() } catch (e) { /* ignore */ }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="ld"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center' }}
          className={s.loader}
        >
          {/* scan lines */}
          <div className={s.loaderScan} aria-hidden="true" />
          {/* Y2K grid */}
          <div className={s.loaderGrid} aria-hidden="true" />

          {/* floating sparkles */}
          <div className={s.loaderSparkles} aria-hidden="true">
            {SPARKS.map((sp, i) => (
              <span
                key={i}
                className={s.spark}
                style={{
                  left: sp.left,
                  top: sp.top,
                  width: sp.size,
                  height: sp.size,
                  animationDelay: sp.delay,
                  background: i % 2 === 0 ? 'var(--amber)' : 'var(--hot)',
                }}
              />
            ))}
          </div>

          {/* equalizer bars */}
          <div className={s.loaderBars} aria-hidden="true">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <div
                key={i}
                className={s.loaderBar}
                style={{ animationDelay: `${i * 0.055}s` }}
              />
            ))}
          </div>

          {/* chrome / holographic wordmark */}
          <div className={s.loaderWordmark} aria-label="ARTOSPHERED">
            <span className={s.loaderArt}>ART</span>
            <span className={s.loaderSphered}>OSPHERED</span>
          </div>

          {/* holographic accent bar */}
          <div className={s.loaderHoloBar} aria-hidden="true" />

          {/* glitchy counter */}
          <div className={s.loaderCounter} aria-label={`Loading ${count} percent`}>
            <span className={s.loaderCountGhost} aria-hidden="true">
              {String(count).padStart(3, '0')}
            </span>
            <span>{String(count).padStart(3, '0')}</span>
            <span className={s.loaderPct}>%</span>
          </div>

          <div className={s.loaderTag}>FREQUENCY &mdash; CULTURE IN MOTION</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── NAV ITEMS ─── */
const NAV_ITEMS = NAV.map((n) => ({ to: n.path, label: n.label, end: n.end }))

export default function Layout() {
  useReveal()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink

  const overlayClass = ({ isActive }) =>
    isActive ? `${s.overlayLink} ${s.overlayLinkActive}` : s.overlayLink

  return (
    <div className={s.root}>
      {/* loader — sibling to page, outside transition wrapper, plays once */}
      <Loader />

      <header className={s.header}>
        <nav className={s.nav}>
          <Link to={`${BASE}`} className={s.brand}>
            <span className={s.brandArt}>art</span>
            <span className={s.brandSphered}>sphered</span>
          </Link>

          <div className={s.navLinks}>
            {NAV_ITEMS.map((n) => (
              <NavLink
                key={n.label}
                to={`${BASE}/${n.to}`}
                end={n.end}
                className={linkClass}
              >
                {n.label}
              </NavLink>
            ))}
          </div>

          <div className={s.navRight}>
            <Link to="/" className={s.backLink}>&#x21A9; ARTOSPHERED</Link>
            <button
              type="button"
              className={open ? `${s.burger} ${s.burgerOpen}` : s.burger}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={open ? `${s.overlay} ${s.overlayOpen}` : s.overlay}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={s.overlayClose}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &#x2715;
        </button>
        {NAV_ITEMS.map((n, i) => (
          <NavLink
            key={n.label}
            to={`${BASE}/${n.to}`}
            end={n.end}
            className={overlayClass}
            style={{ transitionDelay: open ? `${0.07 * i + 0.08}s` : '0s' }}
          >
            {n.label}
          </NavLink>
        ))}
        <div className={s.overlayMeta}>
          <Link to="/" onClick={() => setOpen(false)}>&#x21A9; ARTOSPHERED</Link>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;Est. {BRAND.est}&nbsp;&nbsp;&middot;&nbsp;&nbsp;For the globe
        </div>
      </div>

      <main className={s.page}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <PulseFooter />
    </div>
  )
}

function PulseFooter() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footerInner}`}>
        <div>
          <div className={s.footerBrand}>ARTOSPHERED</div>
          <div className={s.footerNote}>{BRAND.tagline}</div>
          <div className={s.footerNote} style={{ marginTop: 6 }}>
            &copy; {new Date().getFullYear()} ARTOSPHERED. All rights reserved.
          </div>
        </div>
        <div className={s.footerLinks}>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">{BRAND.instagram}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
        </div>
      </div>
    </footer>
  )
}
