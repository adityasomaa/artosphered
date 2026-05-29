import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BASE } from './data'
import { BRAND, NAV as CONTENT_NAV } from '../../shared/content'
import s from './styles.module.css'

/* ── Loader ─────────────────────────────────────────────────── */
function Loader() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }
    try { window.__lenis && window.__lenis.stop() } catch (e) {}
    const t = setTimeout(() => {
      setGone(true)
      try { window.__lenis && window.__lenis.start() } catch (e) {}
    }, 2200)
    return () => {
      clearTimeout(t)
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center' }}
          className={s.loader}
          aria-hidden="true"
        >
          <div className={s.loaderInner}>
            {/* Chrome wordmark slides up */}
            <div className={s.loaderWordmark} style={{ overflow: 'hidden' }}>
              <motion.span
                className={s.loaderWordmarkInner}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                ARTOSPHERED
              </motion.span>
            </div>

            {/* Issue line */}
            <motion.p
              className={s.loaderIssue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.45 }}
            >
              ISSUE 01 &mdash; 2026
            </motion.p>

            {/* Holographic rule wipes across */}
            <div className={s.loaderRuleWrap}>
              <motion.div
                className={s.loaderRuleLine}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.85, duration: 0.65, ease: 'easeInOut' }}
              />
            </div>

            {/* Sparkle */}
            <motion.span
              className={s.loaderSparkle}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              aria-hidden="true"
            >
              &#10022;
            </motion.span>

            {/* Tagline */}
            <motion.p
              className={s.loaderTagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.4 }}
            >
              {BRAND.tagline}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const location = useLocation()

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
      {/* ── Loader — sibling OUTSIDE page transitions ────── */}
      <Loader />

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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
