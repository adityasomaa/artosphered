import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BRAND, NAV } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/void'

// ---- Terminal Loader ----
const BOOT_LINES = [
  { text: 'ARTOSPHERED ARCHIVE v2.6.0', delay: 0 },
  { text: 'INITIALIZING CULTURAL DATABASE...', delay: 120 },
  { text: 'LOADING INDEX: 120 ENTRIES FOUND', delay: 260 },
  { text: 'CROSS-REF: 8 CITIES / 5 CATEGORIES', delay: 420 },
  { text: 'MOUNTING EVENT LOG...', delay: 580 },
  { text: 'ESTABLISHING READ CONTEXT: EST. 2024', delay: 740 },
  { text: 'ARCHIVE READY.', delay: 900 },
]

function TerminalLoader({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    // Stop lenis during loader
    if (window.__lenis) window.__lenis.stop()

    const timers = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(v => [...v, line.text])
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        }, line.delay)
      )
    })

    timers.push(
      setTimeout(() => {
        setDone(true)
      }, 1100)
    )

    timers.push(
      setTimeout(() => {
        setExit(true)
        if (window.__lenis) window.__lenis.start()
        onDone()
      }, 1600)
    )

    return () => {
      timers.forEach(t => clearTimeout(t))
      if (window.__lenis) window.__lenis.start()
    }
  }, [onDone])

  return (
    <motion.div
      className={s.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: exit ? 0 : 1 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      aria-label="Loading archive"
      aria-live="polite"
    >
      <div className={s.loaderInner}>
        <div className={s.loaderHeader}>
          <span className={s.loaderBrand}>ARTOSPHERED</span>
          <span className={s.loaderVersion}>ARCHIVE SYSTEM</span>
        </div>

        <div className={s.loaderTerminal}>
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              className={s.loaderLine}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <span className={s.loaderPrompt}>&gt;&nbsp;</span>
              <span>{line}</span>
            </motion.div>
          ))}
          {!done && (
            <div className={s.loaderLine}>
              <span className={s.loaderPrompt}>&gt;&nbsp;</span>
              <span className={s.loaderCursor}>_</span>
            </div>
          )}
        </div>

        <div className={s.loaderProgressWrap}>
          <div className={s.loaderProgressTrack}>
            <motion.div
              className={s.loaderProgressFill}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </div>
          <div className={s.loaderProgressMeta}>
            <span>INDEXING</span>
            <span className={s.loaderProgressNum}>{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ---- Nav ----
function Nav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = NAV.map(n => ({
    to: n.path ? `${BASE}/${n.path}` : BASE,
    label: n.label,
    end: !!n.end,
  }))

  return (
    <>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <Link to={BASE} className={s.navLogo}>
            <span className={s.navLogoMark}>ARC</span>
            <span className={s.navLogoSub}>HIVE</span>
          </Link>

          <div className={s.navLinks}>
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className={s.navSpacer} />

          <Link to="/" className={s.navBack}>
            <span>&#8617;</span> ARTOSPHERED
          </Link>

          <button
            className={`${s.hamburger} ${open ? s.hamburgerOpen : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
          </button>
        </div>
      </nav>

      <div className={`${s.mobileOverlay} ${open ? s.mobileOverlayOpen : ''}`} role="dialog" aria-modal="true">
        <div className={s.mobileOverlayHeader}>
          <span className={s.mobileOverlayLabel}>NAVIGATION</span>
        </div>
        {links.map(({ to, label, end }, i) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? `${s.mobileNavLink} ${s.mobileNavLinkActive}` : s.mobileNavLink
            }
          >
            <span className={s.mobileNavIdx}>{String(i + 1).padStart(2, '0')}</span>
            {label}
          </NavLink>
        ))}
        <Link to="/" className={s.mobileBackLink}>&#8617; ARTOSPHERED</Link>
      </div>
    </>
  )
}

// ---- Footer ----
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
            {NAV.map(n => (
              <Link
                key={n.path}
                to={n.path ? `${BASE}/${n.path}` : BASE}
                className={s.footerLink}
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className={s.footerContact}>
            <a href={`mailto:${BRAND.email}`} className={s.footerLink}>{BRAND.email}</a>
            <a href={BRAND.instagramUrl} className={s.footerLink} target="_blank" rel="noopener noreferrer">
              {BRAND.instagram}
            </a>
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <span className={s.footerCopy}>&copy; 2026 ARTOSPHERED &mdash; ALL RIGHTS RESERVED</span>
        <span className={s.footerBottomTag}>CULTURE, CATALOGUED</span>
      </div>
    </footer>
  )
}

// ---- Page transition variants ----
const pageVariants = {
  initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  animate: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  exit:    { opacity: 0, clipPath: 'inset(0 0 0% 0)' },
}

const pageTransition = {
  duration: 0.45,
  ease: [0.83, 0, 0.17, 1],
}

// ---- Layout ----
const LOADER_KEY = 'void-archive-loaded'

export default function Layout() {
  useReveal()
  const location = useLocation()
  const [loaderDone, setLoaderDone] = useState(() => {
    // Show loader only once per session
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(LOADER_KEY) === '1'
  })

  const handleLoaderDone = () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(LOADER_KEY, '1')
    }
    setLoaderDone(true)
  }

  // Respect reduced motion — skip loader
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const showLoader = !loaderDone && !prefersReduced

  return (
    <div className={s.root}>
      <AnimatePresence>
        {showLoader && (
          <TerminalLoader key="loader" onDone={handleLoaderDone} />
        )}
      </AnimatePresence>

      <div className={s.layout} style={{ visibility: showLoader ? 'hidden' : 'visible' }}>
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
