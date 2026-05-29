import { useState, useEffect, useCallback } from 'react'
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BRAND, NAV } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/prisma'

const NAV_LINKS = NAV.map(({ path, label, end }) => ({
  to: path ? `${BASE}/${path}` : BASE,
  label,
  end,
}))

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(14px)', scale: 0.98 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(14px)', scale: 0.98 },
}

const pageTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

export default function Layout() {
  useReveal()

  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setMenuOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className={s.root}>
      {/* Animated gradient mesh background */}
      <div className={s.mesh} aria-hidden="true">
        <div className={s.blob + ' ' + s.blob1} />
        <div className={s.blob + ' ' + s.blob2} />
        <div className={s.blob + ' ' + s.blob3} />
        <div className={s.blob + ' ' + s.blob4} />
      </div>
      <div className={s.meshGrain} aria-hidden="true" />

      <div className={s.shell}>
        {/* Sticky nav */}
        <header className={s.header}>
          <nav className={s.nav} aria-label="Main navigation">
            {/* Brand */}
            <Link to={BASE} className={s.brand}>
              <span className={s.brandMark} aria-hidden="true" />
              <span>
                <span style={{ color: 'var(--p-accent)', textShadow: '0 0 18px rgba(255,174,61,0.55)' }}>{BRAND.wordmark[0]}</span>
                {BRAND.wordmark[1]}
              </span>
              <span className={s.brandSub}>Cultural Archive</span>
            </Link>

            {/* Desktop links */}
            <div className={s.navLinks}>
              {NAV_LINKS.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    s.navLink + (isActive ? ' ' + s.navLinkActive : '')
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right side */}
            <div className={s.navRight}>
              <Link to="/" className={s.backLink}>&#x21A9; ARTOSPHERED</Link>
              <button
                className={s.burger + (menuOpen ? ' ' + s.burgerOpen : '')}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile overlay menu */}
        <div
          className={s.overlay + (menuOpen ? ' ' + s.overlayOpen : '')}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className={s.overlayClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &#x2715;
          </button>
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                s.overlayLink + (isActive ? ' ' + s.overlayLinkActive : '')
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/" className={s.overlayBack}>&#x21A9; Back to ARTOSPHERED</Link>
        </div>

        {/* Page content — framer-motion glassy transitions */}
        <main className={s.main} id="main-content">
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

        {/* Footer */}
        <footer className={s.footer}>
          <div className={s.container}>
            <div className={s.footerInner}>
              {/* Brand col */}
              <div>
                <div className={s.footerBrand}>
                  <span className={s.brandMark} style={{ display: 'inline-block', marginRight: 10 }} aria-hidden="true" />
                  <span style={{ color: 'var(--p-accent)', textShadow: '0 0 18px rgba(255,174,61,0.55)' }}>ART</span>OSPHERED
                </div>
                <p style={{ color: 'var(--p-muted)', fontSize: '0.9rem', marginTop: 14, maxWidth: '28ch', lineHeight: 1.7 }}>
                  {BRAND.tagline}. Documenting creative culture since {BRAND.est}.
                </p>
              </div>

              {/* Explore col */}
              <div className={s.footerCol}>
                <h5>Explore</h5>
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>

              {/* Connect col */}
              <div className={s.footerCol}>
                <h5>Connect</h5>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {BRAND.instagram}
                </a>
                <span style={{ marginTop: 10 }}>
                  {BRAND.cities.slice(0, 4).join(' / ')}
                </span>
              </div>
            </div>

            <div className={s.footerBottom}>
              <span>&copy; {BRAND.est}&ndash;2026 {BRAND.name}. All rights reserved.</span>
              <span>{BRAND.intersect}.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
