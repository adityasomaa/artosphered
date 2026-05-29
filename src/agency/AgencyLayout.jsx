import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../shared/useReveal'
import './agency.css'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
]

export default function AgencyLayout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close drawer on navigation + lock body scroll while open
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="ag">
      <header className={`ag-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="ag-container ag-nav-inner">
          <Link to="/" className="ag-logo" aria-label="ARTOSPHERED home">
            <span className="ag-logo-dot" />
            ARTOSPHERED
          </Link>

          <nav className="ag-links" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `ag-link${isActive ? ' active' : ''}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="ag-cta">Start a project →</Link>

          <button
            className={`ag-burger${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`ag-drawer${open ? ' open' : ''}`} aria-label="Mobile">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {n.label}
          </NavLink>
        ))}
        <Link to="/contact" className="ag-btn ag-btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
          Start a project →
        </Link>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="ag-footer">
      <div className="ag-container">
        <div className="ag-footer-top">
          <div className="ag-footer-big">
            Let’s build something <span style={{ color: 'var(--brand)' }}>unforgettable.</span>
          </div>
          <div className="ag-footer-cols">
            <div className="ag-footer-col">
              <h4>Studio</h4>
              <Link to="/work">Work</Link>
              <Link to="/services">Services</Link>
              <Link to="/process">Process</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="ag-footer-col">
              <h4>Directions</h4>
              <Link to="/p/atelier">01 · Editorial</Link>
              <Link to="/p/prisma">02 · Prism</Link>
              <Link to="/p/lumen">03 · Monolith</Link>
              <Link to="/p/pulse">04 · Frequency</Link>
              <Link to="/p/void">05 · Archive</Link>
            </div>
            <div className="ag-footer-col">
              <h4>Connect</h4>
              <a href="mailto:artosphered@gmail.com">artosphered@gmail.com</a>
              <a href="https://instagram.com/artosphered" target="_blank" rel="noopener noreferrer">@artosphered</a>
            </div>
          </div>
        </div>
        <div className="ag-footer-bottom">
          <span>© 2026 ARTOSPHERED. Crafted with intent.</span>
          <span>Design + Build · Worldwide / Remote</span>
        </div>
      </div>
    </footer>
  )
}
