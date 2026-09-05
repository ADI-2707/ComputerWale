import { Link } from 'react-router'
import styles from './Stores.module.css'
import { STORES } from '../../lib/mockData'
import { Button } from '../../components/ui/Button'

export default function Stores() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Experience Centers</span>
        <h1 className={styles.title}>Visit Our Physical Stores</h1>
        <p className={styles.subtitle}>
          Touch, test, and run hardware benchmarks in person. Both stores maintain certified testing benches with technicians on-site.
        </p>
      </div>

      <div className={styles.storesGrid}>
        {STORES.map((store) => (
          <div key={store.id} className={styles.storeCard}>
            <div className={styles.storeCityTag}>{store.city} Flagship</div>
            <h2 className={styles.storeName}>{store.name}</h2>
            <p className={styles.storeAddress}>{store.address}</p>

            <div className={styles.metaSection}>
              <div className={styles.metaRow}>
                <span className={styles.metaIcon}>🕒</span>
                <span className={styles.metaText}>{store.hours}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaIcon}>📞</span>
                <Link to={`tel:${store.phone}`} className={styles.metaLink}>
                  {store.phone}
                </Link>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaIcon}>🛵</span>
                <span className={styles.metaText}>
                  {store.deliveryAvailable
                    ? 'Doorstep delivery & local dispatch hub active'
                    : 'Walk-in testing & purchase only'}
                </span>
              </div>
            </div>

            <div className={styles.servicesBox}>
              <h3 className={styles.servicesTitle}>In-Store Services:</h3>
              <ul className={styles.servicesList}>
                <li>32-Point diagnostic live check on any laptop before purchase</li>
                <li>Instant RAM and SSD upgrades completed on-the-spot</li>
                <li>Old laptop exchange & instant cash buyback valuation</li>
                <li>Original chargers, batteries, and genuine bags in stock</li>
              </ul>
            </div>

            <div className={styles.actionButtons}>
              <Link
                to={store.mapUrl || 'https://maps.google.com/?q=Raipur+Chhattisgarh'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1 }}
              >
                <Button variant="primary" fullWidth>
                  Get Directions
                </Button>
              </Link>
              <Link
                to={`https://wa.me/${store.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1 }}
              >
                <Button variant="outline" fullWidth>
                  WhatsApp Store
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className={styles.benchBanner}>
        <div className={styles.bannerIcon}>🔬</div>
        <div className={styles.bannerContent}>
          <h3 className={styles.bannerTitle}>The Computer Wale Testing Bench</h3>
          <p className={styles.bannerDesc}>
            When you visit our store, you can run Cinebench, CrystalDiskMark, and battery depletion tests on any
            laptop you want to buy. No pressure, full transparency.
          </p>
        </div>
      </div>
    </div>
  )
}
