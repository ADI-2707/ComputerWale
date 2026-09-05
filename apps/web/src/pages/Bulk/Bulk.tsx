import styles from './Bulk.module.css'
import { RFQForm } from '../../components/forms/RFQForm'

export default function Bulk() {
  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <section className={styles.hero}>
        <span className={styles.tag}>B2B & Commercial Sales</span>
        <h1 className={styles.title}>Bulk Laptop Procurement for Businesses</h1>
        <p className={styles.subtitle}>
          Supplying coaching centers, IT firms, BPOs, and offices across Raipur, Durg, Bhilai, and Chhattisgarh.
          100% GST compliant with input tax credit, custom OS installation, and doorstep deployment.
        </p>
      </section>

      {/* 3 Pillars Grid */}
      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📄</div>
          <h3 className={styles.featureTitle}>18% GST Invoice</h3>
          <p className={styles.featureText}>
            Clean tax invoices with your company GSTIN to claim full input credit. Complete legal documentation.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⚙️</div>
          <h3 className={styles.featureTitle}>Custom OS & Software Preloaded</h3>
          <p className={styles.featureText}>
            We clone your company software image, configure Windows licenses, and pre-install required dev tools.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🛡️</div>
          <h3 className={styles.featureTitle}>On-Site Warranty in Raipur</h3>
          <p className={styles.featureText}>
            Dedicated corporate technician support for batches of 10+ units with 24-48h turnaround replacement.
          </p>
        </div>
      </section>

      {/* Tier Pricing Table */}
      <section className={styles.tierSection}>
        <h2 className={styles.sectionHeading}>Volume Discount Structure</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.tierTable}>
            <thead>
              <tr>
                <th>Quantity Tier</th>
                <th>Typical Pricing</th>
                <th>Support & Delivery</th>
                <th>Payment Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>5 – 19 units</strong></td>
                <td>Up to 15% off retail MRP</td>
                <td>Free Raipur delivery + 3mo warranty</td>
                <td>50% advance, 50% on delivery</td>
              </tr>
              <tr>
                <td><strong>20 – 49 units</strong></td>
                <td>Up to 25% off retail MRP</td>
                <td>Free CG dispatch + 6mo warranty</td>
                <td>PO with agreed corporate milestones</td>
              </tr>
              <tr>
                <td><strong>50+ units</strong></td>
                <td>Wholesale contract rates</td>
                <td>Dedicated Account Manager + On-site buffer units</td>
                <td>Net 15 / 30 for approved corporate accounts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Request a Commercial Bulk Quote</h2>
            <p className={styles.formDesc}>
              Fill in your requirement specifications below. Our corporate sales team in Raipur will prepare a formal
              quotation within 2 business hours.
            </p>
          </div>
          <RFQForm enquiryType="bulk" />
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can we inspect the units physically before ordering?</h3>
            <p className={styles.faqAnswer}>
              Yes! You can visit our Pandri, Raipur store anytime during business hours to inspect sample batches and run
              diagnostics.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can we upgrade RAM and SSD on bulk orders?</h3>
            <p className={styles.faqAnswer}>
              Yes. We provide in-house upgrades (e.g., upgrading 8GB to 16GB RAM or 256GB to 512GB SSD) at subsidized
              component costs.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What is the delivery timeline for bulk orders in Chhattisgarh?</h3>
            <p className={styles.faqAnswer}>
              Stock in our Raipur warehouse is delivered same-day or next-day. Custom-imaged batches usually take 48
              hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
