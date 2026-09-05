import { useState } from 'react'
import { Link } from 'react-router'
import styles from './Account.module.css'
import { useAuthStore } from '../../state/authStore'
import { Button } from '../../components/ui/Button'
import { formatPrice } from '../../lib/mockData'

export default function Account() {
  const { user, isAuthenticated, login, logout, addAddress } = useAuthStore()

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginName, setLoginName] = useState('')
  const [loginPhone, setLoginPhone] = useState('')

  // Address modal/form state
  const [newStreet, setNewStreet] = useState('')
  const [newPincode, setNewPincode] = useState('492001')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim()) return
    login(loginEmail, loginName || 'Rahul Verma', loginPhone || '+91 98765 43210')
  }

  const handleDemoLogin = () => {
    login('rahul.verma@example.com', 'Rahul Verma', '+91 98765 43210')
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStreet.trim()) return
    addAddress({
      name: user?.name || 'Customer',
      phone: user?.phone || '+91 98765 43210',
      line1: newStreet,
      city: 'Raipur',
      pincode: newPincode,
      state: 'Chhattisgarh',
    })
    setNewStreet('')
  }

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Customer Sign In</h1>
          <p className={styles.authSub}>
            Sign in to view your orders, store warranty certificates, and saved delivery addresses in Raipur.
          </p>

          <form onSubmit={handleLogin} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Verma"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className={styles.input}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Sign In / Register
            </Button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <Button type="button" variant="outline" size="lg" fullWidth onClick={handleDemoLogin}>
            Quick 1-Click Demo Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Account Header */}
      <div className={styles.accountHeader}>
        <div className={styles.userProfileMeta}>
          <div className={styles.avatar}>{user.name.charAt(0)}</div>
          <div>
            <h1 className={styles.userName}>{user.name}</h1>
            <div className={styles.userSub}>
              {user.email} · {user.phone}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'addresses' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          Saved Addresses
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile & Warranty
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className={styles.tabContent}>
          <div className={styles.ordersList}>
            {/* Active Mock Order */}
            <div className={styles.orderCard}>
              <div className={styles.orderCardHeader}>
                <div>
                  <span className={styles.orderId}>#CW-98241</span>
                  <div className={styles.orderDate}>Ordered on Sep 05, 2026 · Raipur Same-Day</div>
                </div>
                <div className={styles.statusPillActive}>Out for Delivery</div>
              </div>

              <div className={styles.orderBody}>
                <div className={styles.orderItem}>
                  <div>
                    <strong>Dell Latitude 5420 (Grade A Refurbished)</strong>
                    <div className={styles.itemMeta}>Qty: 1 · ₹27,499 · 6-Month Raipur Warranty</div>
                  </div>
                  <Link to="/track-order?id=CW-98241">
                    <Button variant="primary" size="sm">
                      Track Live
                    </Button>
                  </Link>
                </div>
              </div>

              <div className={styles.orderFooter}>
                <span>Payment: Cash on Delivery</span>
                <span>Total: <strong>{formatPrice(27499)}</strong></span>
              </div>
            </div>

            {/* Past Mock Order */}
            <div className={styles.orderCard}>
              <div className={styles.orderCardHeader}>
                <div>
                  <span className={styles.orderId}>#CW-73190</span>
                  <div className={styles.orderDate}>Ordered on Aug 18, 2026 · Raipur Walk-in Pickup</div>
                </div>
                <div className={styles.statusPillDone}>Delivered</div>
              </div>

              <div className={styles.orderBody}>
                <div className={styles.orderItem}>
                  <div>
                    <strong>HP EliteBook 840 G6 (Grade B Refurbished)</strong>
                    <div className={styles.itemMeta}>Qty: 1 · ₹19,999 · Warranty Active till Feb 2027</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert('Warranty Certificate downloaded!')}>
                    Warranty Card
                  </Button>
                </div>
              </div>

              <div className={styles.orderFooter}>
                <span>Payment: Paid via UPI</span>
                <span>Total: <strong>{formatPrice(19999)}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Addresses */}
      {activeTab === 'addresses' && (
        <div className={styles.tabContent}>
          <div className={styles.addressGrid}>
            {user.addresses.map((addr, idx) => (
              <div key={idx} className={styles.addressCard}>
                <div className={styles.addressName}>{addr.name}</div>
                <div className={styles.addressText}>{addr.line1}</div>
                <div className={styles.addressText}>
                  {addr.city}, {addr.state} — {addr.pincode}
                </div>
                <div className={styles.addressPhone}>Phone: {addr.phone}</div>
                <span className={styles.defaultBadge}>Default Delivery Address</span>
              </div>
            ))}

            {/* Add Address Form */}
            <form onSubmit={handleAddAddress} className={styles.addAddressCard}>
              <h3 className={styles.addAddressTitle}>Add New Address in Raipur</h3>
              <div className={styles.inputGroup}>
                <label className={styles.label}>House / Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Shailendra Nagar"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Raipur Pincode</label>
                <input
                  type="text"
                  required
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                  className={styles.input}
                />
              </div>
              <Button type="submit" variant="primary">
                Save Address
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === 'profile' && (
        <div className={styles.tabContent}>
          <div className={styles.profileCard}>
            <h2 className={styles.profileSectionHeading}>Account Details</h2>
            <div className={styles.profileDataRows}>
              <div className={styles.dataRow}>
                <span>Full Name:</span>
                <strong>{user.name}</strong>
              </div>
              <div className={styles.dataRow}>
                <span>Email Address:</span>
                <strong>{user.email}</strong>
              </div>
              <div className={styles.dataRow}>
                <span>Registered Phone:</span>
                <strong>{user.phone}</strong>
              </div>
              <div className={styles.dataRow}>
                <span>Preferred Store Hub:</span>
                <strong>Computer Wale Pandri, Raipur</strong>
              </div>
            </div>

            <div className={styles.warrantyHighlight}>
              <h3>Direct Store Support Hotline</h3>
              <p>For instant warranty claims, repairs, or upgrades, visit our store or call +91 98765 43210.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
