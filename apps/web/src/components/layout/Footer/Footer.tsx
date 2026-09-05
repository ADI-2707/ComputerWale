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
                <li><a href="/laptops?condition=new" className={styles.colLink}>New Laptops</a></li>
                <li><a href="/laptops?condition=refurbished&grade=A" className={styles.colLink}>Refurbished Grade A</a></li>
                <li><a href="/laptops?condition=refurbished&grade=B" className={styles.colLink}>Refurbished Grade B</a></li>
                <li><a href="/laptops?condition=refurbished&grade=C" className={styles.colLink}>Refurbished Grade C</a></li>
                <li><a href="/laptops" className={styles.colLink}>All Laptops</a></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Business</p>
              <ul className={styles.colList}>
                <li><a href="/bulk" className={styles.colLink}>Bulk Orders</a></li>
                <li><a href="/government" className={styles.colLink}>Government Supply</a></li>
                <li><a href="/sell" className={styles.colLink}>Sell / Trade-in</a></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Account</p>
              <ul className={styles.colList}>
                <li><a href="/account/login" className={styles.colLink}>Sign in</a></li>
                <li><a href="/account/register" className={styles.colLink}>Register</a></li>
                <li><a href="/account/orders" className={styles.colLink}>My Orders</a></li>
                <li><a href="/track" className={styles.colLink}>Track Order</a></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.colHeading}>Legal</p>
              <ul className={styles.colList}>
                <li><a href="/privacy" className={styles.colLink}>Privacy Policy</a></li>
                <li><a href="/terms" className={styles.colLink}>Terms &amp; Conditions</a></li>
                <li><a href="/warranty" className={styles.colLink}>Warranty Terms</a></li>
                <li><a href="/returns" className={styles.colLink}>Return Policy</a></li>
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
                <a href={`tel:${store.phone}`} className={styles.storePhone}>{store.phone}</a>
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
