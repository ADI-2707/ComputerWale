import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { clsx } from 'clsx'
import styles from './Navbar.module.css'
import { Button } from '../../ui/Button'
import { useCartStore } from '../../../state/cartStore'
import { LogoIntro } from './LogoIntro'

interface NavbarProps {
  cartCount?: number
}

const NAV_CATEGORIES = [
  { label: 'New Laptops', href: '/laptops?condition=new', desc: 'Brand new, manufacturer warranty' },
  { label: 'Refurbished Grade A', href: '/laptops?condition=refurbished&grade=A', desc: '≥85% battery · 6 mo warranty' },
  { label: 'Refurbished Grade B', href: '/laptops?condition=refurbished&grade=B', desc: '≥72% battery · 3 mo warranty' },
  { label: 'Refurbished Grade C', href: '/laptops?condition=refurbished&grade=C', desc: '≥60% battery · Best value' },
  { label: 'All Laptops', href: '/laptops', desc: 'Browse the full catalog' },
]

const BRANDS = ['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'Asus', 'MSI']

export function Navbar({ cartCount }: NavbarProps) {
  const navigate = useNavigate()
  const storeCount = useCartStore((s) => s.getItemCount())
  const effectiveCartCount = cartCount !== undefined ? cartCount : storeCount

  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const logoMarkRef = useRef<HTMLSpanElement>(null)

  const [logoReady, setLogoReady] = useState<boolean>(
    () => typeof window !== 'undefined' && !!sessionStorage.getItem('cw-logo-animated')
  )
  const showIntro = !logoReady

  const onIntroComplete = useCallback(() => setLogoReady(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!megaOpen) return
    const close = (e: MouseEvent) => {
      const nav = document.getElementById('cw-navbar')
      if (nav && !nav.contains(e.target as Node)) setMegaOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [megaOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>

      {showIntro && (
        <LogoIntro logoMarkRef={logoMarkRef} onComplete={onIntroComplete} />
      )}

      <header
        id="cw-navbar"
        className={clsx(styles.header, scrolled && styles.scrolled)}
        role="banner"
      >
        <div className={styles.inner}>

          <Link to="/" className={styles.logo} aria-label="Computer Wale — Home">

            <span
              ref={logoMarkRef}
              className={clsx(styles.logoMark, !logoReady && styles.logoMarkHidden)}
            >
              <img src="/logo-mark.png" alt="Computer Wale" className={styles.logoMarkImg} />
            </span>

            <span
              className={clsx(
                styles.logoText,
                !logoReady && styles.logoTextHidden,
                logoReady  && styles.logoTextVisible,
              )}
            >
              Computer<strong>Wale</strong>
            </span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <div className={styles.megaTriggerWrap}>
              <button
                className={clsx(styles.navLink, megaOpen && styles.navLinkActive)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen(o => !o)}
                id="laptops-menu-btn"
              >
                Laptops
                <svg className={clsx(styles.chevron, megaOpen && styles.chevronUp)} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {megaOpen && (
                <div className={styles.megaMenu} role="dialog" aria-labelledby="laptops-menu-btn">
                  <div className={styles.megaInner}>
                    <div className={styles.megaSection}>
                      <p className={styles.megaSectionLabel}>Browse by type</p>
                      <ul className={styles.megaList}>
                        {NAV_CATEGORIES.map(c => (
                          <li key={c.href}>
                            <Link to={c.href} className={styles.megaItem} onClick={() => setMegaOpen(false)}>
                              <span className={styles.megaItemLabel}>{c.label}</span>
                              <span className={styles.megaItemDesc}>{c.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.megaSection}>
                      <p className={styles.megaSectionLabel}>Browse by brand</p>
                      <ul className={styles.megaBrands}>
                        {BRANDS.map(b => (
                          <li key={b}>
                            <Link to={`/laptops?brand=${b}`} className={styles.megaBrandLink} onClick={() => setMegaOpen(false)}>
                              {b}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/bulk" className={styles.navLink}>Bulk &amp; Govt</Link>
            <Link to="/track" className={styles.navLink}>Track Order</Link>
          </nav>

          <div className={styles.rightSide}>
            <span className={styles.deliveryPill} aria-label="Delivering to Raipur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 11C6 11 1.5 7.5 1.5 5a4.5 4.5 0 0 1 9 0c0 2.5-4.5 6-4.5 6z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Raipur
            </span>

            <Link to="/account/login" className={styles.signInLink}>Sign in</Link>

            <Link to="/cart" className={styles.cartBtn} aria-label={`Cart — ${effectiveCartCount} item${effectiveCartCount !== 1 ? 's' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2 2h1.5l2 9h9l1.5-6H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="16" r="1" fill="currentColor"/>
                <circle cx="14" cy="16" r="1" fill="currentColor"/>
              </svg>
              {effectiveCartCount > 0 && <span className={styles.cartBadge}>{effectiveCartCount}</span>}
            </Link>

            <button
              className={styles.hamburger}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(o => !o)}
            >
              <span className={clsx(styles.bar, mobileOpen && styles.bar1Active)} />
              <span className={clsx(styles.bar, mobileOpen && styles.barHidden)} />
              <span className={clsx(styles.bar, mobileOpen && styles.bar3Active)} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.mobileDrawerOverlay} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
      <nav
        className={clsx(styles.mobileDrawer, mobileOpen && styles.mobileDrawerOpen)}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileDrawerInner}>
          <div className={styles.mobileDeliveryPill}>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 11C6 11 1.5 7.5 1.5 5a4.5 4.5 0 0 1 9 0c0 2.5-4.5 6-4.5 6z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Delivering to Raipur
          </div>

          <ul className={styles.mobileNavList}>
            <li><p className={styles.mobileNavGroup}>Laptops</p></li>
            {NAV_CATEGORIES.map(c => (
              <li key={c.href}>
                <Link to={c.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>{c.label}</Link>
              </li>
            ))}
            <li className={styles.mobileDivider} />
            <li><Link to="/bulk" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Bulk &amp; Commercial</Link></li>
            <li><Link to="/government" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Government Supply</Link></li>
            <li><Link to="/track" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Track Order</Link></li>
            <li><Link to="/stores" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Our Stores</Link></li>
          </ul>

          <div className={styles.mobileNavCtas}>
            <Button variant="primary" fullWidth onClick={() => { setMobileOpen(false); navigate('/laptops') }}>
              Browse Laptops
            </Button>
            <Button variant="ghost" fullWidth onClick={() => { setMobileOpen(false); navigate('/account/login') }}>
              Sign in
            </Button>
          </div>
        </div>
      </nav>

      <div className={styles.mobileBottomBar} role="navigation" aria-label="Quick actions">
        <Link to="/laptops" className={styles.bottomBarItem}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Laptops</span>
        </Link>
        <Link to="/track" className={styles.bottomBarItem}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Track</span>
        </Link>
        <Link to="/cart" className={styles.bottomBarItem} aria-label={`Cart — ${effectiveCartCount} items`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M2 2h1.5l2 9h9l1.5-6H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="16" r="1" fill="currentColor"/>
            <circle cx="14" cy="16" r="1" fill="currentColor"/>
          </svg>
          {effectiveCartCount > 0 && <span className={styles.bottomBarBadge}>{effectiveCartCount}</span>}
          <span>Cart</span>
        </Link>
      </div>
    </>
  )
}

