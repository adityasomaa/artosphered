import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BRAND, NAV } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/void'

/* ====================================================
   LOADER — Amber-phosphor Y2K terminal boot sequence
   Plays on EVERY mount. No sessionStorage.
   ==================================================== */
const BOOT_LINES = [
  { text: 'ARTOSPHERED ARCHIVE v2.6.0', ok: false },
  { text: 'INITIALIZING ARCHIVE...', ok: false },
  { text: 'INDEXING 120 ENTRIES ✓', ok: true },
  { text: 'CROSS-REF: 8 CITIES / 5 CATEGORIES', ok: false },
  { text: 'MOUNTING EVENT LOG...', ok: false },
  { text: 'LOADING ARTOSPHERED//2026 ✦', ok: false },
  { text: 'ARCHIVE READY.', ok: true },
]

function Loader() {
  const [gone, setGone] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }

    try { window.__lenis && window.__lenis.stop() } catch (e) {}

    var timers = []
    var STEP = 260

    BOOT_LINES.forEach(function (_, i) {
      timers.push(
        setTimeout(function () {
          setVisibleCount(function (v) { return v + 1 })
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        }, 120 + i * STEP)
      )
    })

    // Fade out
    timers.push(
      setTimeout(function () {
        setGone(true)
        try { window.__lenis && window.__lenis.start() } catch (e) {}
      }, 120 + BOOT_LINES.length * STEP + 420)
    )

    return function () {
      timers.forEach(function (t) { clearTimeout(t) })
      try { window.__lenis && window.__lenis.start() } catch (e) {}
    }
  }, [])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="ld"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={s.loader}
        >
          <div className={s.loaderInner}>

            {/* Header */}
            <div className={s.loaderHeader}>
              <span className={s.loaderBrand}>ARTOSPHERED</span>
              <span className={s.loaderVersion}>ARCHIVE SYSTEM v2.6</span>
            </div>

            {/* Terminal lines */}
            <div className={s.loaderTerminal}>
              {BOOT_LINES.slice(0, visibleCount).map(function (line, i) {
                return (
                  <motion.div
                    key={i}
                    className={s.loaderLine}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    <span className={s.loaderPrompt}>&gt;&nbsp;</span>
                    <span className={line.ok ? s.loaderOk : undefined}>{line.text}</span>
                  </motion.div>
                )
              })}
              {visibleCount < BOOT_LINES.length && (
                <div className={s.loaderLine}>
                  <span className={s.loaderPrompt}>&gt;&nbsp;</span>
                  <span className={s.loaderCursor} />
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className={s.loaderProgressWrap}>
              <div className={s.loaderProgressTrack}>
                <motion.div
                  className={s.loaderProgressFill}
                  initial={{ width: '0%' }}
                  animate={{ width: progress + '%' }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                />
              </div>
              <div className={s.loaderProgressMeta}>
                <span>INDEXING</span>
                <span className={s.loaderProgressNum}>{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ====================================================
   NAV
   ==================================================== */
function Nav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(function () { setOpen(false) }, [location.pathname])

  useEffect(function () {
    document.body.style.overflow = open ? 'hidden' : ''
    return function () { document.body.style.overflow = '' }
  }, [open])

  const links = NAV.map(function (n) {
    return {
      to: n.path ? BASE + '/' + n.path : BASE,
      label: n.label,
      end: !!n.end,
    }
  })

  return (
    <>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <Link to={BASE} className={s.navLogo}>
            <span className={s.navLogoMark}>ARC</span>
            <span className={s.navLogoSub}>HIVE</span>
          </Link>

          <div className={s.navLinks}>
            {links.map(function (_ref) {
              var to = _ref.to
              var label = _ref.label
              var end = _ref.end
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={function (_ref2) {
                    return _ref2.isActive ? s.navLink + ' ' + s.navLinkActive : s.navLink
                  }}
                >
                  {label}
                </NavLink>
              )
            })}
          </div>

          <div className={s.navSpacer} />

          <Link to="/" className={s.navBack}>
            <span>&#8617;</span> ARTOSPHERED
          </Link>

          <button
            className={s.hamburger + (open ? ' ' + s.hamburgerOpen : '')}
            onClick={function () { setOpen(function (v) { return !v }) }}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
          </button>
        </div>
      </nav>

      <div
        className={s.mobileOverlay + (open ? ' ' + s.mobileOverlayOpen : '')}
        role="dialog"
        aria-modal="true"
      >
        <div className={s.mobileOverlayHeader}>
          <span className={s.mobileOverlayLabel}>NAVIGATION</span>
        </div>
        {links.map(function (_ref3, i) {
          var to = _ref3.to
          var label = _ref3.label
          var end = _ref3.end
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={function (_ref4) {
                return _ref4.isActive
                  ? s.mobileNavLink + ' ' + s.mobileNavLinkActive
                  : s.mobileNavLink
              }}
            >
              <span className={s.mobileNavIdx}>{String(i + 1).padStart(2, '0')}</span>
              {label}
            </NavLink>
          )
        })}
        <Link to="/" className={s.mobileBackLink}>&#8617; ARTOSPHERED</Link>
      </div>
    </>
  )
}

/* ====================================================
   FOOTER
   ==================================================== */
function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerLeft}>
          <div className={s.footerLogo}>ARTOSPHERED</div>
          <div className={s.footerTagline}>{BRAND.tagline}</div>
          <div className={s.footerMeta}>
            <span>EST. {BRAND.est}</span>
            <span className={s.footerDot} />
            <span>{BRAND.cities.length} CITIES</span>
            <span className={s.footerDot} />
            <span>CULTURAL ARCHIVE</span>
          </div>
        </div>
        <div className={s.footerRight}>
          <div className={s.footerNav}>
            {NAV.map(function (n) {
              return (
                <Link
                  key={n.path}
                  to={n.path ? BASE + '/' + n.path : BASE}
                  className={s.footerLink}
                >
                  {n.label}
                </Link>
              )
            })}
          </div>
          <div className={s.footerContact}>
            <a href={'mailto:' + BRAND.email} className={s.footerLink}>{BRAND.email}</a>
            <a
              href={BRAND.instagramUrl}
              className={s.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {BRAND.instagram}
            </a>
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <span className={s.footerCopy}>&copy; 2026 ARTOSPHERED &mdash; ALL RIGHTS RESERVED</span>
        <span className={s.footerBottomTag}>CULTURE, CATALOGUED &#10022;</span>
      </div>
    </footer>
  )
}

/* ====================================================
   PAGE TRANSITION
   ==================================================== */
const pageVariants = {
  initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  animate: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  exit:    { opacity: 0, clipPath: 'inset(0 0 0% 0)' },
}

const pageTransition = {
  duration: 0.45,
  ease: [0.83, 0, 0.17, 1],
}

/* ====================================================
   LAYOUT
   ==================================================== */
export default function Layout() {
  useReveal()
  const location = useLocation()

  return (
    <div className={s.root}>
      {/* Loader renders OUTSIDE the page wrapper — plays on every mount */}
      <Loader />

      <div className={s.layout}>
        <Nav />
        <main className={s.main}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}
