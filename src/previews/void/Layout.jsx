import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { useReveal } from '../../shared/useReveal'
import s from './styles.module.css'

const BASE = '/p/void'

// ---- Floating Particles ----
function Particles() {
  return (
    <div className={s.particles} aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className={s.particle}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 10}s`,
            width: i % 4 === 0 ? '3px' : '2px',
            height: i % 4 === 0 ? '3px' : '2px',
          }}
        />
      ))}
    </div>
  )
}

// ---- Nav ----
function Nav({ wallet, onWalletToggle }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Close overlay on navigation
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { to: BASE, label: 'Home', end: true },
    { to: `${BASE}/drops`, label: 'Drops' },
    { to: `${BASE}/roadmap`, label: 'Roadmap' },
    { to: `${BASE}/team`, label: 'Team' },
    { to: `${BASE}/mint`, label: 'Mint' },
  ]

  const walletLabel = wallet.connected
    ? `${wallet.address.slice(0, 4)}…${wallet.address.slice(-4)}`
    : 'Connect Wallet'

  return (
    <>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <Link to={BASE} className={s.navLogo}>VOID</Link>

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
            <span>↩</span> ARTOSPHERED
          </Link>

          <button className={s.walletBtn} onClick={onWalletToggle}>
            {wallet.connected && <span className={s.walletDot} />}
            {walletLabel}
            {wallet.connected && (
              <span style={{ fontFamily: 'inherit', fontSize: 10, opacity: 0.7, marginLeft: 2 }}>
                {wallet.balance} ETH
              </span>
            )}
          </button>

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

      {/* Mobile Overlay */}
      <div className={`${s.mobileOverlay} ${open ? s.mobileOverlayOpen : ''}`} role="dialog" aria-modal="true">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? `${s.mobileNavLink} ${s.mobileNavLinkActive}` : s.mobileNavLink
            }
          >
            {label}
          </NavLink>
        ))}
        <button
          className={`${s.walletBtn} ${s.mobileWalletBtn}`}
          onClick={() => { onWalletToggle(); setOpen(false) }}
        >
          {wallet.connected && <span className={s.walletDot} />}
          {walletLabel}
        </button>
        <Link to="/" className={s.mobileBackLink}>↩ ARTOSPHERED</Link>
      </div>
    </>
  )
}

// ---- Footer ----
function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div>
          <div className={s.footerLogo}>VOID</div>
          <div className={s.footerTagline}>Own the future. Own the void.</div>
          <div className={s.footerContract}>
            Contract: 0x4a3B…d0c8 &nbsp;·&nbsp; ERC-721A
          </div>
        </div>
        <div className={s.footerLinks}>
          <a href="#" className={s.footerLink}>OpenSea</a>
          <a href="#" className={s.footerLink}>Etherscan</a>
          <a href="#" className={s.footerLink}>Discord</a>
          <a href="#" className={s.footerLink}>Twitter / X</a>
          <a href="#" className={s.footerLink}>Whitepaper</a>
        </div>
      </div>
      <div className={s.footerBottom}>
        <span>© 2026 VOID GENESIS — All rights reserved</span>
        <span>Built on Ethereum &nbsp;·&nbsp; Audited by CertiK &nbsp;·&nbsp; IPFS Metadata</span>
      </div>
    </footer>
  )
}

// ---- Layout ----
export default function Layout() {
  useReveal()

  const [wallet, setWallet] = useState({
    connected: false,
    address: '',
    balance: '',
  })

  const toggleWallet = useCallback(() => {
    setWallet(w =>
      w.connected
        ? { connected: false, address: '', balance: '' }
        : {
            connected: true,
            address: '0x7F3c9A2E8d4B1f0e6C5a7D9b3F2e8A4c1B6d0a45E',
            balance: '2.847',
          }
    )
  }, [])

  return (
    <div className={s.root}>
      <div className={s.layout}>
        <Particles />
        <Nav wallet={wallet} onWalletToggle={toggleWallet} />
        <main className={s.main}>
          <Outlet context={{ wallet, toggleWallet }} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
