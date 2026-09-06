import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { clsx } from 'clsx'
import styles from './Account.module.css'
import { useAuthStore } from '../../state/authStore'
import { Button } from '../../components/ui/Button'
import { formatPrice } from '../../lib/mockData'

export default function Account() {
  const { user, isAuthenticated, login, logout, addAddress } = useAuthStore()
  const { tab } = useParams<{ tab?: string }>()

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(
    tab === 'register' || tab === 'signup' ? 'signup' : 'signin'
  )

  useEffect(() => {
    if (tab === 'register' || tab === 'signup') {
      setAuthMode('signup')
    } else if (tab === 'login') {
      setAuthMode('signin')
    }
  }, [tab])

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const [newStreet, setNewStreet] = useState('')
  const [newPincode, setNewPincode] = useState('492001')

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim()) return
    login(loginEmail, 'Rahul Verma', '+91 98765 43210')
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupEmail.trim() || !signupName.trim()) return
    login(signupEmail, signupName, signupPhone || '+91 98765 43210')
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

          <div className={styles.authNav} role="tablist" aria-label="Authentication navigation">
            <button
              type="button"
              role="tab"
              aria-selected={authMode === 'signin'}
              className={clsx(styles.authTab, authMode === 'signin' && styles.authTabActive)}
              onClick={() => setAuthMode('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={authMode === 'signup'}
              className={clsx(styles.authTab, authMode === 'signup' && styles.authTabActive)}
              onClick={() => setAuthMode('signup')}
            >
              Create Account
            </button>
          </div>

          <div className={styles.authHeader}>
            <h1 className={styles.authTitle}>
              {authMode === 'signin' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className={styles.authSub}>
              {authMode === 'signin'
                ? 'Sign in to access your orders, warranty certificates, and saved delivery addresses in Raipur.'
                : 'Join ComputerWale Raipur for fast local delivery, GST invoicing, and warranty registration.'}
            </p>
          </div>

          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn} className={styles.authForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email or Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="rahul@example.com or 9876543210"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="username"
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Password</label>
                  <span className={styles.faintHint}>Optional for demo</span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className={styles.authForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className={styles.input}
                  autoComplete="name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="email"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Mobile Number (for Raipur delivery updates)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  className={styles.input}
                  autoComplete="tel"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Create Account
              </Button>
            </form>
          )}

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <Button type="button" variant="outline" size="lg" fullWidth onClick={handleDemoLogin}>
            Quick 1-Click Demo Login
          </Button>

          <p className={styles.switchText}>
            {authMode === 'signin' ? (
              <>
                Don't have an account?
                <button
                  type="button"
                  className={styles.switchBtn}
                  onClick={() => setAuthMode('signup')}
                >
                  Create one here
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button
                  type="button"
                  className={styles.switchBtn}
                  onClick={() => setAuthMode('signin')}
                >
                  Sign in here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>

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

      {activeTab === 'orders' && (
        <div className={styles.tabContent}>
          <div className={styles.ordersList}>

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

