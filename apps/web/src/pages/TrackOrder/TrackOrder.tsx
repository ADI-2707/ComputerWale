import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import styles from './TrackOrder.module.css'
import { Button } from '../../components/ui/Button'

export default function TrackOrder() {
  const [searchParams] = useSearchParams()
  const orderIdFromUrl = searchParams.get('id') || ''

  const [orderQuery, setOrderQuery] = useState(orderIdFromUrl || 'CW-98241')
  const [isSearched, setIsSearched] = useState(true)

  useEffect(() => {
    if (orderIdFromUrl) {
      setOrderQuery(orderIdFromUrl)
      setIsSearched(true)
    }
  }, [orderIdFromUrl])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderQuery.trim()) {
      setIsSearched(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Track Your Delivery in Raipur</h1>
        <p className={styles.subtitle}>
          Check real-time fulfillment status, inspection milestone, and rider dispatch updates.
        </p>

        <form onSubmit={handleSearch} className={styles.searchBar}>
          <input
            type="text"
            placeholder="Enter Order ID (e.g. CW-98241) or Mobile Number"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className={styles.searchInput}
          />
          <Button type="submit" variant="primary">
            Track Order
          </Button>
        </form>
      </div>

      {isSearched && (
        <div className={styles.resultCard}>
          <div className={styles.orderTopRow}>
            <div>
              <span className={styles.orderLabel}>Order Number</span>
              <h2 className={styles.orderNumber}>{orderQuery.toUpperCase()}</h2>
            </div>
            <div className={styles.orderStatusBadge}>Out for Delivery</div>
          </div>

          <div className={styles.timeline}>
            <div className={`${styles.timelineStep} ${styles.stepDone}`}>
              <div className={styles.stepDot}>✓</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Order Confirmed</div>
                <div className={styles.stepTime}>Today, 11:20 AM</div>
                <div className={styles.stepDesc}>Payment & address verified by Pandri team</div>
              </div>
            </div>

            <div className={`${styles.timelineStep} ${styles.stepDone}`}>
              <div className={styles.stepDot}>✓</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>32-Point Inspection & Packaging</div>
                <div className={styles.stepTime}>Today, 01:45 PM</div>
                <div className={styles.stepDesc}>Battery health certified (88%), charger tested, sealed box</div>
              </div>
            </div>

            <div className={`${styles.timelineStep} ${styles.stepActive}`}>
              <div className={styles.stepDot}>🛵</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Out for Raipur Local Delivery</div>
                <div className={styles.stepTime}>Today, 03:30 PM</div>
                <div className={styles.stepDesc}>Dispatched from Pandri hub. Estimated arrival within 45 mins.</div>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepDot}>○</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Delivered & Doorstep Testing</div>
                <div className={styles.stepTime}>Expected Today by 5:00 PM</div>
                <div className={styles.stepDesc}>Verify boot, screen, and invoice before final payment</div>
              </div>
            </div>
          </div>

          <div className={styles.riderBox}>
            <div className={styles.riderAvatar}>👨🏽‍💼</div>
            <div className={styles.riderDetails}>
              <div className={styles.riderName}>Rider: Ramesh Sahu</div>
              <div className={styles.riderMeta}>Computer Wale Store Dispatch Rider · Raipur Pandri Hub</div>
            </div>
            <Link to="tel:+919876500123" className={styles.callRiderBtn}>
              📞 Call Rider
            </Link>
          </div>

          <div className={styles.packageSummary}>
            <h3 className={styles.packageHeading}>Package Contents:</h3>
            <div className={styles.packageItem}>
              <div>
                <strong>Dell Latitude 5420 (Grade A Refurbished)</strong>
                <div className={styles.packageSub}>i5-1135G7 · 16GB · 512GB SSD · 6-Month Store Warranty</div>
              </div>
              <div className={styles.packagePrice}>₹27,499</div>
            </div>
          </div>

          <div className={styles.supportFoot}>
            <span>Need help with this delivery?</span>
            <Link to="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className={styles.supportLink}>
              Chat with Raipur Store Support on WhatsApp →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

