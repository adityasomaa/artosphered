import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../shared/useReveal'
import { BASE } from './data'
import Loader from './Loader'
import s from './styles.module.css'

const NAV_ITEMS = [
  { to: '', label: 'Home', end: true },
  { to: 'culture-report', label: 'Culture Report' },
  { to: 'events', label: 'Event Coverage' },
  { to: 'services', label: 'Creative Services' },
  { to: 'contact', label: 'Contact' },
]

/* Letterbox wipe: black bars retract top/bottom, then page fades in */
const barVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
  exit: { scaleY: 1, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
}
const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

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
    <div className={s.lumen}>
      {/* Loader renders OUTSIDE the page-transition wrapper so route changes never kill it */}
      <Loader />

      <header className={s.header}>
        <Link to={BASE} className={s.brand}>
          <span className={s.brandArt}>art</span><span className={s.brandSphere}>sphered</span>
        </Link>

        <nav className={s.navLinks}>
          {NAV_ITEMS.map((n) => (
            <NavLink key={n.label} to={`${BASE}/${n.to}`} end={n.end} className={linkClass}>
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
          <span /><span /><span />
        </button>
      </header>

      <div className={open ? `${s.overlay} ${s.overlayOpen}` : s.overlay}>
        {NAV_ITEMS.map((n, i) => (
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
        <Link to="/" className={s.overlayBack}>&#8617; Back to ARTOSPHERED</Link>
      </div>

      <main className={s.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ position: 'relative' }}
          >
            {/* Letterbox bars for page transitions */}
            <motion.div
              variants={barVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '12vh',
                background: '#0b0705',
                zIndex: 350,
                transformOrigin: 'top',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              variants={barVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '12vh',
                background: '#0b0705',
                zIndex: 350,
                transformOrigin: 'bottom',
                pointerEvents: 'none',
              }}
            />
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
    <footer className={s.footer}>
      <div className={s.footTop}>
        <div className={s.footBrand}>
          <span className={s.footBrandArt}>art</span><em>sphered</em>
        </div>
        <div className={s.footCols}>
          <div className={s.footCol}>
            <h5>Archive</h5>
            <Link to={`${BASE}/culture-report`}>Culture Report</Link>
            <Link to={`${BASE}/events`}>Event Coverage</Link>
            <Link to={`${BASE}/services`}>Creative Services</Link>
            <Link to={`${BASE}/contact`}>Contact</Link>
          </div>
          <div className={s.footCol}>
            <h5>Contact</h5>
            <a href="mailto:artosphered@gmail.com">artosphered@gmail.com</a>
            <a href="https://instagram.com/artosphered" target="_blank" rel="noreferrer">@artosphered</a>
          </div>
          <div className={s.footCol}>
            <h5>Cities</h5>
            <p>Jakarta &middot; Tokyo &middot; Berlin</p>
            <p>New York &middot; Seoul &middot; London</p>
            <p>Lagos &middot; Paris</p>
          </div>
        </div>
      </div>
      <div className={s.footBottom}>
        <span>&#169; {new Date().getFullYear()} ARTOSPHERED. All rights reserved.</span>
        <span>Archiving culture since 2024.</span>
      </div>
    </footer>
  )
}
