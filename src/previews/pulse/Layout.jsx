import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useReveal } from '../../shared/useReveal'
import { FESTIVAL_INFO, SOCIALS } from './data'
import s from './styles.module.css'

const BASE = '/p/pulse'

const NAV = [
  { to: '', label: 'Home', end: true },
  { to: 'lineup', label: 'Lineup' },
  { to: 'schedule', label: 'Schedule' },
  { to: 'tickets', label: 'Tickets' },
  { to: 'contact', label: 'Contact' },
]

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
      <header className={s.header}>
        <nav className={s.nav}>
          <Link to={`${BASE}`} className={s.brand}>
            PULSE<span className={s.brandDot}>.</span>
          </Link>

          <div className={s.navLinks}>
            {NAV.map((n) => (
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
            <Link to="/" className={s.backLink}>↩ ARTOSPHERED</Link>
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
          ✕
        </button>
        {NAV.map((n, i) => (
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
          <Link to="/" onClick={() => setOpen(false)}>↩ ARTOSPHERED</Link>
          &nbsp;&nbsp;·&nbsp;&nbsp;{FESTIVAL_INFO.dates}&nbsp;&nbsp;·&nbsp;&nbsp;{FESTIVAL_INFO.location}
        </div>
      </div>

      <main className={s.page}>
        <Outlet />
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
          <div className={s.footerBrand}>PULSE<span style={{ color: 'var(--cyan)' }}>.</span></div>
          <div className={s.footerNote}>
            {FESTIVAL_INFO.dates} &nbsp;·&nbsp; {FESTIVAL_INFO.location}
          </div>
          <div className={s.footerNote} style={{ marginTop: 6 }}>
            © {new Date().getFullYear()} PULSE Festival. All rights reserved.
          </div>
        </div>
        <div className={s.footerLinks}>
          {SOCIALS.map((sc) => (
            <a key={sc.label} href="#social" onClick={(e) => e.preventDefault()}>
              {sc.label}
            </a>
          ))}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
          <a href="#accessibility" onClick={(e) => e.preventDefault()}>Accessibility</a>
        </div>
      </div>
    </footer>
  )
}
