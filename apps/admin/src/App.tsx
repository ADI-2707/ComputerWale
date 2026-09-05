import { useState } from 'react'
import './App.css'

interface Order {
  id: string
  customer: string
  phone: string
  area: string
  slot: string
  amount: number
  status: 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered'
  rider: string
}

interface Lead {
  id: string
  org: string
  type: 'Bulk' | 'Government'
  qty: number
  contact: string
  date: string
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'CW-98241',
    customer: 'Rahul Verma',
    phone: '+91 98765 43210',
    area: 'Pandri, Raipur',
    slot: 'Evening (4-8 PM)',
    amount: 27499,
    status: 'Out for Delivery',
    rider: 'Ramesh Sahu',
  },
  {
    id: 'CW-98242',
    customer: 'Pooja Dewangan',
    phone: '+91 98765 11223',
    area: 'Telibandha, Raipur',
    slot: 'Evening (4-8 PM)',
    amount: 19999,
    status: 'Packed',
    rider: 'Unassigned',
  },
  {
    id: 'CW-98240',
    customer: 'Amit Agrawal',
    phone: '+91 98765 99887',
    area: 'Shankar Nagar, Raipur',
    slot: 'Morning (10-1 PM)',
    amount: 38999,
    status: 'Delivered',
    rider: 'Suresh Yadav',
  },
]

const INITIAL_LEADS: Lead[] = [
  {
    id: 'RFQ-401',
    org: 'Horizon Academy Raipur',
    type: 'Bulk',
    qty: 25,
    contact: 'Vikas Sharma (+91 98765 00991)',
    date: 'Today, 2:15 PM',
  },
  {
    id: 'RFQ-402',
    org: 'Directorate of Technical Education CG',
    type: 'Government',
    qty: 120,
    contact: 'K. S. Patel, Nodal Desk',
    date: 'Today, 11:30 AM',
  },
]

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'inventory' | 'leads'>('dashboard')
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-brand">
            <span className="logo-badge">CW</span>
            <h1>Computer Wale Admin</h1>
            <p>Store & Fulfillment Operations · Raipur Portal</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsLoggedIn(true)
            }}
            className="login-form"
          >
            <div className="input-box">
              <label>Admin Username</label>
              <input type="text" defaultValue="admin@computerwale.in" required />
            </div>
            <div className="input-box">
              <label>Password</label>
              <input type="password" defaultValue="••••••••••••" required />
            </div>
            <button type="submit" className="btn-primary">
              Log In to Ops Portal
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-logo">CW</span>
          <div>
            <div className="brand-title">Computer Wale</div>
            <div className="brand-sub">Raipur Hub Portal</div>
          </div>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Operations Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Raipur Orders ({orders.filter((o) => o.status !== 'Delivered').length})
          </button>
          <button
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            💻 Laptop Inventory (10 Units)
          </button>
          <button
            className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            🏢 Bulk & Tender RFQs (2)
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="store-pill">📍 Pandri Store Active</div>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-viewport">
        <header className="topbar">
          <div>
            <h1 className="topbar-title">
              {activeTab === 'dashboard' && 'Daily Operations Overview'}
              {activeTab === 'orders' && 'Raipur Order Fulfillment'}
              {activeTab === 'inventory' && 'Store Laptop Inventory'}
              {activeTab === 'leads' && 'Commercial & Government RFQ Leads'}
            </h1>
            <div className="topbar-meta">Pandri Dispatch Desk · Raipur, Chhattisgarh</div>
          </div>
          <div className="topbar-user">
            <span className="user-badge">Store Manager</span>
            <span className="user-name">Rajesh Sharma</span>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="content-wrap">
            {/* KPI Metric Cards */}
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Today's Orders</span>
                <span className="metric-val">14</span>
                <span className="metric-trend text-green">↑ 3 from yesterday</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Raipur Dispatches Pending</span>
                <span className="metric-val">2</span>
                <span className="metric-trend text-amber">Evening slot active</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Units in Store (Pandri)</span>
                <span className="metric-val">42</span>
                <span className="metric-trend text-blue">9 Graded A · 23 Graded B</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Total Today's Gross</span>
                <span className="metric-val">₹3,84,500</span>
                <span className="metric-trend text-green">Includes 1 Bulk PO</span>
              </div>
            </div>

            {/* Quick Orders Stream */}
            <div className="card-panel">
              <div className="panel-header">
                <h2>Live Raipur Dispatches</h2>
                <button className="link-btn" onClick={() => setActiveTab('orders')}>
                  View All Orders →
                </button>
              </div>

              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Zone</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Rider</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customer}</td>
                      <td>{order.area}</td>
                      <td>₹{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.rider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header">
                <h2>All Orders for Raipur Dispatch</h2>
              </div>
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer & Phone</th>
                    <th>Delivery Area & Slot</th>
                    <th>Amount</th>
                    <th>Rider Assigned</th>
                    <th>Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.id}</strong></td>
                      <td>
                        <div>{o.customer}</div>
                        <small className="text-muted">{o.phone}</small>
                      </td>
                      <td>
                        <div>{o.area}</div>
                        <small className="text-muted">{o.slot}</small>
                      </td>
                      <td><strong>₹{o.amount.toLocaleString()}</strong></td>
                      <td>{o.rider}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                          className="status-select"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header">
                <h2>Laptop Catalog & Physical Stock in Raipur Store</h2>
              </div>
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Condition & Grade</th>
                    <th>Specs</th>
                    <th>Price</th>
                    <th>Pandri Stock</th>
                    <th>Store Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dell Latitude 5420</strong></td>
                    <td><span className="badge-grade">Grade A</span> Refurbished</td>
                    <td>i5-11th · 16GB · 512GB SSD</td>
                    <td>₹27,499</td>
                    <td><strong className="text-green">6 Units</strong></td>
                    <td>6 Months</td>
                  </tr>
                  <tr>
                    <td><strong>Dell Vostro 3510</strong></td>
                    <td><span className="badge-grade">Grade B</span> Refurbished</td>
                    <td>i5-11th · 8GB · 256GB SSD</td>
                    <td>₹21,999</td>
                    <td><strong className="text-green">4 Units</strong></td>
                    <td>3 Months</td>
                  </tr>
                  <tr>
                    <td><strong>HP EliteBook 840 G6</strong></td>
                    <td><span className="badge-grade">Grade B</span> Refurbished</td>
                    <td>i5-8th · 8GB · 256GB SSD</td>
                    <td>₹19,999</td>
                    <td><strong className="text-green">5 Units</strong></td>
                    <td>3 Months</td>
                  </tr>
                  <tr>
                    <td><strong>Apple MacBook Air M1</strong></td>
                    <td><span className="badge-grade">Grade A</span> Refurbished</td>
                    <td>M1 · 8GB · 256GB · 92% Batt</td>
                    <td>₹49,999</td>
                    <td><strong className="text-amber">2 Units</strong> (Low)</td>
                    <td>6 Months</td>
                  </tr>
                  <tr>
                    <td><strong>Asus VivoBook 15</strong></td>
                    <td><span className="badge-new">Brand New</span></td>
                    <td>Ryzen 5 5500U · 16GB · 512GB</td>
                    <td>₹42,999</td>
                    <td><strong className="text-green">8 Units</strong></td>
                    <td>1 Year OEM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RFQ Leads Tab */}
        {activeTab === 'leads' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header">
                <h2>Commercial & Government Quotation Requests</h2>
              </div>
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Lead #</th>
                    <th>Organization</th>
                    <th>Enquiry Track</th>
                    <th>Qty Needed</th>
                    <th>Contact Officer</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {INITIAL_LEADS.map((l) => (
                    <tr key={l.id}>
                      <td><strong>{l.id}</strong></td>
                      <td><strong>{l.org}</strong></td>
                      <td>
                        <span className={`lead-tag lead-${l.type.toLowerCase()}`}>{l.type}</span>
                      </td>
                      <td><strong>{l.qty} Units</strong></td>
                      <td>{l.contact}</td>
                      <td>{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
