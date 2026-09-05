import styles from './Government.module.css'
import { RFQForm } from '../../components/forms/RFQForm'

export default function Government() {
  return (
    <div className={styles.container}>
      {}
      <section className={styles.hero}>
        <span className={styles.tag}>GeM & Institutional Procurement</span>
        <h1 className={styles.title}>Government & PSU Laptop Supply</h1>
        <p className={styles.subtitle}>
          Registered GeM seller and trusted supplier to educational institutions, municipal bodies, and state departments
          across Chhattisgarh with verifiable past performance.
        </p>
      </section>

      {}
      <section className={styles.credentialsGrid}>
        <div className={styles.credCard}>
          <div className={styles.credIcon}>🏛️</div>
          <h3 className={styles.credTitle}>GeM Registered</h3>
          <p className={styles.credText}>Active GeM seller portal profile with verified catalog listing.</p>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credIcon}>📑</div>
          <h3 className={styles.credTitle}>MSME / Udyam Certified</h3>
          <p className={styles.credText}>Eligible for MSE procurement preferences & purchase quotas.</p>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credIcon}>⚡</div>
          <h3 className={styles.credTitle}>BIS & CE Certified</h3>
          <p className={styles.credText}>Compliant power adapters and safety-tested internal components.</p>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credIcon}>🏢</div>
          <h3 className={styles.credTitle}>Local Raipur Service Hub</h3>
          <p className={styles.credText}>Physical Pandri workshop fulfills SLA tender conditions within 48h.</p>
        </div>
      </section>

      {}
      <section className={styles.complianceSection}>
        <h2 className={styles.sectionHeading}>Standard Tender Compliance Matrix</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th>Tender Parameter</th>
                <th>Government Requirement</th>
                <th>Computer Wale Fulfillment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Operating System</strong></td>
                <td>Windows 10/11 Pro Genuine with OEM COA</td>
                <td>Factory digital license activated & verifiable with Microsoft</td>
                <td><span className={styles.statusPass}>Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Diagnostic Health</strong></td>
                <td>Minimum 80% battery capacity, zero drive bad sectors</td>
                <td>Standard OEM hardware diagnostics report provided for every SN</td>
                <td><span className={styles.statusPass}>Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Local Support SLA</strong></td>
                <td>Service center located within 50 km of delivery point</td>
                <td>Pandri, Raipur facility with walk-in & field engineers</td>
                <td><span className={styles.statusPass}>Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Billing & Taxes</strong></td>
                <td>GST invoice with HSN code 84713010</td>
                <td>GSTIN registered in Chhattisgarh (22XXXXX...) with E-Way bills</td>
                <td><span className={styles.statusPass}>Compliant</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Submit Tender Specification / RFQ</h2>
            <p className={styles.formDesc}>
              Upload tender details or specification requirements. Our Government Tenders Cell will respond with technical
              and financial bid compliance docs.
            </p>
          </div>
          <RFQForm enquiryType="government" />
        </div>
      </section>

      {}
      <section className={styles.nodalCard}>
        <div className={styles.nodalInfo}>
          <h3 className={styles.nodalTitle}>Nodal Officer — Institutional & Government Tenders</h3>
          <p className={styles.nodalText}>
            For direct tender document collection, earnest money deposit (EMD) discussions, or GeM direct contract
            queries:
          </p>
          <div className={styles.nodalDetails}>
            <div><strong>Contact:</strong> Rajesh Sharma (Government Affairs)</div>
            <div><strong>Direct Desk:</strong> +91 98765 43219</div>
            <div><strong>Official Email:</strong> tenders@computerwale.in</div>
            <div><strong>Office:</strong> Shop 12, IT Park Road, Pandri, Raipur, CG — 492002</div>
          </div>
        </div>
      </section>
    </div>
  )
}
