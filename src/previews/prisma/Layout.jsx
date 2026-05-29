import { useState, useEffect, useCallback } from 'react'
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { useReveal } from '../../shared/useReveal'
import s from './styles.module.css'

const BASE = '/p/prisma'

const NAV_LINKS = [
  { to: `${BASE}`, label: 'Home', end: true },
  { to: `${BASE}/exhibitions`, label: 'Exhibitions' },
  { to: `${BASE}/artists`, label: 'Artists' },
  { to: `${BASE}/visit`, label: 'Visit' },
  { to: `${BASE}/contact`, label: 'Tickets & Contact' },
]

export default function Layout() {
  useReveal()

  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Body scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape
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
              PRISMA
              <span className={s.brandSub}>Contemporary Art</span>
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
              <Link to="/" className={s.backLink}>↩ ARTOSPHERED</Link>
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
            ✕
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
          <Link to="/" className={s.overlayBack}>↩ Back to ARTOSPHERED</Link>
        </div>

        {/* Page content */}
        <main className={s.main} id="main-content">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className={s.footer}>
          <div className={s.container}>
            <div className={s.footerInner}>
              {/* Brand col */}
              <div>
                <div className={s.footerBrand}>
                  <span className={s.brandMark} style={{ display: 'inline-block', marginRight: 10 }} aria-hidden="true" />
                  PRISMA
                </div>
                <p style={{ color: 'var(--p-muted)', fontSize: '0.9rem', marginTop: 14, maxWidth: '28ch', lineHeight: 1.7 }}>
                  A contemporary art gallery at the intersection of new media, material practice and speculative futures.
                </p>
              </div>

              {/* Explore col */}
              <div className={s.footerCol}>
                <h5>Explore</h5>
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>

              {/* Info col */}
              <div className={s.footerCol}>
                <h5>Visit</h5>
                <span>14 Aperture Mews</span>
                <span>London, EC1V 7ND</span>
                <span style={{ marginTop: 10 }}>Tue – Sun, 10:00 – 19:00</span>
                <a href="mailto:hello@prismagallery.art" style={{ marginTop: 10 }}>
                  hello@prismagallery.art
                </a>
                <a href="tel:+442071234567">+44 207 123 4567</a>
              </div>
            </div>

            <div className={s.footerBottom}>
              <span>© 2026 PRISMA Gallery. All rights reserved.</span>
              <span>A demo by ARTOSPHERED</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
