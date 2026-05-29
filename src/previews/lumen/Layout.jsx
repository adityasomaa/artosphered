import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useReveal } from '../../shared/useReveal'
import { BASE } from './data'
import s from './styles.module.css'

const NAV = [
  { to: '', label: 'Home', end: true },
  { to: 'portfolio', label: 'Portfolio' },
  { to: 'about', label: 'About' },
  { to: 'services', label: 'Services' },
  { to: 'contact', label: 'Contact' },
]

export default function Layout() {
  useReveal()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // close overlay on navigation
  useEffect(() => { setOpen(false) }, [pathname])

  // lock body scroll while overlay open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink
  const overlayClass = ({ isActive }) =>
    isActive ? `${s.overlayLink} ${s.overlayLinkActive}` : s.overlayLink

  return (
    <div className={s.lumen}>
      <header className={s.header}>
        <Link to={BASE} className={s.brand}>LU<span>M</span>EN</Link>

        <nav className={s.navLinks}>
          {NAV.map((n) => (
            <NavLink key={n.label} to={`${BASE}/${n.to}`} end={n.end} className={linkClass}>
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
          <span /><span /><span />
        </button>
      </header>

      <div className={open ? `${s.overlay} ${s.overlayOpen}` : s.overlay}>
        {NAV.map((n, i) => (
          <NavLink
            key={n.label}
            to={`${BASE}/${n.to}`}
            end={n.end}
            className={overlayClass}
            style={{ transitionDelay: `${0.08 * i + 0.1}s` }}
          >
            {n.label}
          </NavLink>
        ))}
        <Link to="/" className={s.overlayBack}>↩ Back to ARTOSPHERED</Link>
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
        <div className={s.footBrand}>LU<em>M</em>EN</div>
        <div className={s.footCols}>
          <div className={s.footCol}>
            <h5>Studio</h5>
            <Link to={`${BASE}/portfolio`}>Portfolio</Link>
            <Link to={`${BASE}/about`}>About</Link>
            <Link to={`${BASE}/services`}>Services</Link>
            <Link to={`${BASE}/contact`}>Book a shoot</Link>
          </div>
          <div className={s.footCol}>
            <h5>Contact</h5>
            <a href="mailto:hello@lumenstudio.co">hello@lumenstudio.co</a>
            <p>+1 (415) 555 0192</p>
            <p>San Francisco · worldwide</p>
          </div>
          <div className={s.footCol}>
            <h5>Follow</h5>
            <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#behance" onClick={(e) => e.preventDefault()}>Behance</a>
            <a href="#vimeo" onClick={(e) => e.preventDefault()}>Vimeo</a>
          </div>
        </div>
      </div>
      <div className={s.footBottom}>
        <span>© {new Date().getFullYear()} LUMEN Photography Studio</span>
        <span>Light, framed — since 2015.</span>
      </div>
    </footer>
  )
}
