import { Link } from 'react-router'
import styles from './Footer.module.css'
import { STORES } from '../../../lib/mockData'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>

        {}
        <div className={styles.topRow}>

          {}
          <div className={styles.brand}>
            <div className={styles.logoMark}>CW</div>
            <div>
              <p className={styles.brandName}>Computer<strong>Wale</strong></p>
              <p className={styles.brandTagline}>Audited laptops. Raipur delivery.</p>
            </div>
          </div>

          {}
          <div className={styles.navColumns}>
            <div className={styles.navCol}>
              <p className={styles.colHeading}>Laptops</p>
              <ul className={styles.colList}>
                <li><Link to="/laptops?condition=new" className={styles.colLink}>New Laptops</Link></li>
                <li><Link to="/laptops?condition=refurbished&grade=A" className={styles.colLink}>Refurbished Grade A</Link></li>
                <li><Link to="/laptops?condition=refurbished&grade=B" className={styles.colLink}>Refurbished Grade B</Link></li>
                <li><Link to="/laptops?condition=refurbished&grade=C" className={styles.colLink}>Refurbished Grade C</Link></li>
                <li><Link to="/laptops" className={styles.colLink}>All Laptops</Link></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Business</p>
              <ul className={styles.colList}>
                <li><Link to="/bulk" className={styles.colLink}>Bulk Orders</Link></li>
                <li><Link to="/government" className={styles.colLink}>Government Supply</Link></li>
                <li><Link to="/sell" className={styles.colLink}>Sell / Trade-in</Link></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Account</p>
              <ul className={styles.colList}>
                <li><Link to="/account/login" className={styles.colLink}>Sign in</Link></li>
                <li><Link to="/account/register" className={styles.colLink}>Register</Link></li>
                <li><Link to="/account/orders" className={styles.colLink}>My Orders</Link></li>
                <li><Link to="/track" className={styles.colLink}>Track Order</Link></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Legal</p>
              <ul className={styles.colList}>
                <li><Link to="/privacy" className={styles.colLink}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={styles.colLink}>Terms &amp; Conditions</Link></li>
                <li><Link to="/warranty" className={styles.colLink}>Warranty Terms</Link></li>
                <li><Link to="/returns" className={styles.colLink}>Return Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {}
        <div className={styles.storesRow}>
          <p className={styles.storesHeading}>Our Stores</p>
          <div className={styles.storesGrid}>
            {STORES.map(store => (
              <div key={store.id} className={styles.storeCard}>
                <div className={styles.storeHeader}>
                  <p className={styles.storeName}>{store.name}</p>
                  {store.deliveryAvailable ? (
                    <span className={styles.deliveryBadge}>Raipur delivery</span>
                  ) : (
                    <span className={styles.walkinBadge}>Walk-in only</span>
                  )}
                </div>
                <p className={styles.storeAddress}>{store.address}</p>
                <p className={styles.storeHours}>{store.hours}</p>
                <Link to={`tel:${store.phone}`} className={styles.storePhone}>{store.phone}</Link>
                {!store.deliveryAvailable && (
                  <p className={styles.walkinNote}>
                    No online ordering or delivery — visit the store in person.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {year} Computer Wale · GSTIN 22AAAAA0000A1Z5
          </p>
          <p className={styles.madeIn}>
            Raipur &amp; Ambikapur, Chhattisgarh
          </p>
        </div>

      </div>
    </footer>
  )
}
