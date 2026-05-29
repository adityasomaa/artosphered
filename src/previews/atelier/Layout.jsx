import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useReveal } from '../../shared/useReveal'
import { BASE } from './data'
import s from './styles.module.css'

const NAV = [
  { to: `${BASE}/collections`, label: 'Collections' },
  { to: `${BASE}/lookbook`, label: 'Lookbook' },
  { to: `${BASE}/about`, label: 'Maison' },
  { to: `${BASE}/contact`, label: 'Contact' },
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
    <div className={s.atelier}>
      <header className={s.header}>
        <Link to={BASE} className={s.brand}>
          AT<em>E</em>LIER
        </Link>

        <nav className={s.navLinks}>
          {NAV.map((n) => (
            <NavLink key={n.label} to={n.to} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/" className={s.backLink}>↩ ARTOSPHERED</Link>
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

      <div
        className={open ? `${s.overlay} ${s.overlayOpen}` : s.overlay}
        aria-hidden={!open}
      >
        {NAV.map((n, i) => (
          <NavLink
            key={n.label}
            to={n.to}
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
          ↩ Back to ARTOSPHERED
        </Link>
      </div>

      <main className={s.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footTop}>
        <div className={s.footBrand}>
          AT<em>E</em>LIER
        </div>
        <div className={s.footCols}>
          <div className={s.footCol}>
            <h5>Maison</h5>
            <Link to={`${BASE}/collections`}>Collections</Link>
            <Link to={`${BASE}/lookbook`}>Lookbook FW26</Link>
            <Link to={`${BASE}/about`}>Our Story</Link>
            <Link to={`${BASE}/contact`}>Book an Appointment</Link>
          </div>
          <div className={s.footCol}>
            <h5>Contact</h5>
            <a href="mailto:maison@atelier.co">maison@atelier.co</a>
            <p>+33 4 72 00 00 00</p>
            <p>Lyon · London · New York</p>
          </div>
          <div className={s.footCol}>
            <h5>Follow</h5>
            <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#pinterest" onClick={(e) => e.preventDefault()}>Pinterest</a>
            <a href="#editorial" onClick={(e) => e.preventDefault()}>Editorial Archive</a>
          </div>
        </div>
      </div>
      <div className={s.footBottom}>
        <span>© {new Date().getFullYear()} ATELIER. All rights reserved.</span>
        <span>Crafted with intention — since 1987.</span>
      </div>
    </footer>
  )
}
