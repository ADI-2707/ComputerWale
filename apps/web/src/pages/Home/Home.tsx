import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import styles from './Home.module.css'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../components/product/ProductCard'
import { FEATURED_PRODUCTS, GRADE_DEFINITIONS } from '../../lib/mockData'

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) { setCount(target); return }
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, prefersReduced])

  return count
}

interface TrackCardProps {
  icon: string
  title: string
  description: string
  cta: string
  href: string
  highlight?: string
}

function TrackCard({ icon, title, description, cta, href, highlight }: TrackCardProps) {
  return (
    <Link to={href} className={styles.trackCard}>
      <div className={styles.trackIcon}>{icon}</div>
      <div className={styles.trackContent}>
        {highlight && <span className={styles.trackHighlight}>{highlight}</span>}
        <h3 className={styles.trackTitle}>{title}</h3>
        <p className={styles.trackDesc}>{description}</p>
      </div>
      <span className={styles.trackCta}>{cta} →</span>
    </Link>
  )
}

interface ProofItemProps {
  units: number
  client: string
  location: string
  year: number
}

function ProofItem({ units, client, location, year }: ProofItemProps) {
  return (
    <div className={styles.proofItem}>
      <span className={styles.proofUnits}>{units} units</span>
      <span className={styles.proofDetail}>supplied to {client}, {location} · {year}</span>
    </div>
  )
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect() } },
      { threshold: 0.3 },
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const stockCount = useCountUp(statsVisible ? 340 : 0, 1200)

  return (
    <main className={styles.main}>

      {}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowDot} />
              Raipur's trusted laptop store since 2018
            </div>
            <h1 className={styles.heroHeadline}>
              New, 2nd-hand &amp; refurbished laptops —{' '}
              <span className={styles.heroAccent}>audited &amp; delivered in Raipur.</span>
            </h1>
            <p className={styles.heroSubline}>
              Every refurbished unit is graded, battery-tested, and comes with a documented condition
              report. Buy with confidence, delivered to your door.
            </p>
            <div className={styles.heroCtas}>
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/laptops'}>
                Browse laptops
              </Button>
              <Button variant="ghost" size="lg" onClick={() => window.location.href = '/bulk'}>
                Bulk &amp; Govt enquiry
              </Button>
            </div>
            <div ref={statsRef} className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{stockCount}+</span>
                <span className={styles.heroStatLabel}>units in stock</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>3</span>
                <span className={styles.heroStatLabel}>grade tiers</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>Same/next day</span>
                <span className={styles.heroStatLabel}>Raipur delivery</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImageCol}>
            <img
              src="/hero-laptops.jpg"
              alt="Selection of Dell, HP, and MacBook laptops available at Computer Wale"
              className={styles.heroImage}
              width={560}
              height={420}
            />
          </div>
        </div>
      </section>

      {/* ── 2. 3-TRACK SELECTOR ─────────────────────────────── */}
      <section className={styles.section} aria-label="Who are you buying for?">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What brings you here?</h2>
            <p className={styles.sectionSubtitle}>
              We serve three kinds of buyers differently — pick the right track.
            </p>
          </div>
          <div className={styles.trackGrid}>
            <TrackCard
              icon="🛍️"
              title="Individual / Retail"
              description="Browse, compare, and buy a laptop online. Delivered to your door in Raipur — same day or next day."
              cta="Browse laptops"
              href="/laptops"
            />
            <TrackCard
              icon="🏢"
              title="Bulk / Commercial"
              description="Buying 10–500 units for your office or business? Get a quote with GST invoice and volume pricing."
              cta="Request bulk quote"
              href="/bulk"
              highlight="10–500 units"
            />
            <TrackCard
              icon="🏛️"
              title="Government Supply"
              description="Tender-compliant supply with documentation. Past proof of govt supply available. Submit an RFQ."
              cta="Government RFQ"
              href="/government"
              highlight="Tender ready"
            />
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED LISTINGS ────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-label="Featured laptops">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured laptops</h2>
            <Link to="/laptops" className={styles.sectionLink}>View all {340}+ laptops →</Link>
          </div>
          <div className={styles.productGrid}>
            {FEATURED_PRODUCTS.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. GRADE EXPLAINER ──────────────────────────────── */}
      <section className={styles.section} aria-label="Refurbished grade system">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What do the grades mean?</h2>
            <p className={styles.sectionSubtitle}>
              Every refurbished laptop we sell is independently audited and assigned a grade.
              This is what each grade guarantees — not marketing copy, documented on every listing.
            </p>
          </div>
          <div className={styles.gradeTableWrap}>
            <table className={styles.gradeTable} aria-label="Grade definitions">
              <thead>
                <tr>
                  <th className={styles.gradeThGrade}>Grade</th>
                  <th>Cosmetic condition</th>
                  <th>Battery health (minimum)</th>
                  <th>Warranty</th>
                  <th>Typical savings vs new</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_DEFINITIONS.map(g => (
                  <tr key={g.grade} className={styles.gradeRow}>
                    <td>
                      <span className={`${styles.gradePill} ${styles[`gradePill${g.grade}`]}`}>
                        Grade {g.grade}
                      </span>
                    </td>
                    <td className={styles.gradeTd}>{g.cosmeticCondition}</td>
                    <td className={styles.gradeTd}>≥{g.batteryHealthMin}%</td>
                    <td className={styles.gradeTd}>{g.warranty}</td>
                    <td className={styles.gradeTd}>{g.typicalSavings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.gradeNote}>
            Battery health and cosmetic grade are independently tested before every listing goes live.
            The condition report is linked from every product page.
          </p>
        </div>
      </section>

      {/* ── 5. DELIVERY STRIP ───────────────────────────────── */}
      <section className={styles.deliveryStrip} aria-label="Delivery information">
        <div className={styles.container}>
          <div className={styles.deliveryInner}>
            <div className={styles.deliveryLeft}>
              <div className={styles.deliveryIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 22C12 22 4 16 4 10a8 8 0 0 1 16 0c0 6-8 12-8 12z" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <div>
                <h2 className={styles.deliveryHeading}>Delivering to Raipur</h2>
                <p className={styles.deliverySubtext}>
                  Same-day delivery available for select pincodes · Next-day for all Raipur zones
                </p>
              </div>
            </div>
            <div className={styles.deliveryDetails}>
              <div className={styles.deliveryDetail}>
                <span className={styles.deliveryDetailLabel}>Delivery hours</span>
                <span className={styles.deliveryDetailValue}>10:00 AM – 7:00 PM · Mon–Sat</span>
              </div>
              <div className={styles.deliveryDetail}>
                <span className={styles.deliveryDetailLabel}>Ambikapur store</span>
                <span className={styles.deliveryDetailValue}>Walk-in only · No online delivery</span>
              </div>
              <div className={styles.deliveryDetail}>
                <span className={styles.deliveryDetailLabel}>Pincode check</span>
                <span className={styles.deliveryDetailValue}>Available on every product page</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROOF STRIP ──────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-label="Past supply proof">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trusted for bulk &amp; government supply</h2>
            <p className={styles.sectionSubtitle}>
              A sample of past supply records. Full documentation available on request for tender submissions.
            </p>
          </div>
          <div className={styles.proofGrid}>
            <ProofItem units={50} client="Chhattisgarh State Skill Development Authority" location="Raipur" year={2024} />
            <ProofItem units={120} client="National Institute of Technology" location="Raipur" year={2024} />
            <ProofItem units={35} client="District Education Office" location="Bilaspur, CG" year={2023} />
            <ProofItem units={80} client="Raipur Municipal Corporation" location="Raipur" year={2023} />
            <ProofItem units={200} client="Private IT Training Institute (bulk order)" location="Raipur" year={2025} />
            <ProofItem units={60} client="State Health &amp; Family Welfare" location="Raipur" year={2025} />
          </div>
          <div className={styles.proofCta}>
            <Button variant="outline" onClick={() => window.location.href = '/government'}>
              View government supply credentials
            </Button>
          </div>
        </div>
      </section>

    </main>
  )
}
