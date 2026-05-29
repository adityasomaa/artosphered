import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BASE } from './data'
import { BRAND, NAV as CONTENT_NAV } from '../../shared/content'
import s from './styles.module.css'

/* ── Loader ─────────────────────────────────────────────────── */
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Loader({ onDone }) {
  return (
    <motion.div
      className={s.loaderWrap}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* Wordmark slides up */}
      <div className={s.loaderWordmark}>
        <motion.span
          className={s.loaderWordmarkInner}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          ARTOSPHERED
        </motion.span>
      </div>

      {/* Issue line fades in */}
      <motion.p
        className={s.loaderIssue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        Issue 01 &nbsp;/&nbsp; 2026
      </motion.p>

      {/* Rule draws across */}
      <div className={s.loaderRuleWrap}>
        <motion.div
          className={s.loaderRuleLine}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Tagline */}
      <motion.p
        className={s.loaderTagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        {BRAND.tagline}
      </motion.p>
    </motion.div>
  )
}

/* ── Nav items ────────────────────────────────────────────────── */
const NAV = CONTENT_NAV.map((n) => ({
  to: n.path === '' ? BASE : `${BASE}/${n.path}`,
  label: n.label,
  end: !!n.end,
}))

/* ── Layout ───────────────────────────────────────────────────── */
export default function Layout() {
  useReveal()
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  /* First-load loader */
  useEffect(() => {
    if (prefersReducedMotion) {
      setLoaded(true)
      return
    }
    if (window.__lenis) window.__lenis.stop()
    const t = setTimeout(() => {
      setLoaded(true)
      if (window.__lenis) window.__lenis.start()
    }, 1450)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink

  const overlayClass = ({ isActive }) =>
    isActive ? `${s.overlayLink} ${s.overlayLinkActive}` : s.overlayLink

  return (
    <div className={s.atelier}>
      {/* ── First-load loader ───────────────────────────── */}
      <AnimatePresence>
        {!loaded && !prefersReducedMotion && (
          <Loader key="loader" onDone={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* ── Header ──────────────────────────────────────── */}
      <header className={s.header}>
        <Link to={BASE} className={s.brand}>
          ARTOSPHERED
        </Link>

        <nav className={s.navLinks}>
          {NAV.map((n) => (
            <NavLink key={n.label} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/" className={s.backLink}>&#8617; ARTOSPHERED</Link>
        </nav>

        <button
          type="button"
          className={open ? `${s.burger} ${s.burgerOpen}` : s.burger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Mobile overlay ──────────────────────────────── */}
      <div
        className={open ? `${s.overlay} ${s.overlayOpen}` : s.overlay}
        aria-hidden={!open}
      >
        {NAV.map((n, i) => (
          <NavLink
            key={n.label}
            to={n.to}
            end={n.end}
            className={overlayClass}
            style={{ transitionDelay: `${0.07 * i + 0.08}s` }}
          >
            {n.label}
          </NavLink>
        ))}
        <Link
          to="/"
          className={s.overlayBack}
          style={{ transitionDelay: `${0.07 * NAV.length + 0.08}s` }}
        >
          &#8617; Back to ARTOSPHERED
        </Link>
      </div>

      {/* ── Page transitions ────────────────────────────── */}
      <main className={s.main}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className={s.pageTransition}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footTop}>
        <div className={s.footBrand}>
          ARTOSPHERED
        </div>
        <div className={s.footCols}>
          <div className={s.footCol}>
            <h5>Navigate</h5>
            {NAV.map((n) => (
              <Link key={n.label} to={n.to}>{n.label}</Link>
            ))}
          </div>
          <div className={s.footCol}>
            <h5>Contact</h5>
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">{BRAND.instagram}</a>
          </div>
          <div className={s.footCol}>
            <h5>Cities</h5>
            {BRAND.cities.slice(0, 5).map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={s.footBottom}>
        <span>&#169; {new Date().getFullYear()} ARTOSPHERED. All rights reserved.</span>
        <span>Archiving since {BRAND.est}.</span>
      </div>
    </footer>
  )
}
