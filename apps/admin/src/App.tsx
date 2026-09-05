import { useState } from 'react'
import './App.css'

function PencilIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="action-icon"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="action-icon"
    >
      <g className="trash-lid">
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </g>
      <g className="trash-body">
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </g>
    </svg>
  )
}

function DoorIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="door-icon"
    >
      <path d="M3 21h18" />
      <path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" />
      <rect x="6" y="4" width="12" height="17" fill="currentColor" fillOpacity="0.15" stroke="none" />
      <g className="door-panel">
        <rect x="6" y="4" width="12" height="17" rx="0.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
        <circle cx="15.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

export interface Order {
  id: string
  customer: string
  phone: string
  area: string
  slot: string
  amount: number
  status: 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
  rider: string
  label?: string
}

export interface Lead {
  id: string
  org: string
  type: 'Bulk' | 'Government' | 'Corporate' | 'Education'
  qty: number
  contact: string
  date: string
  status: 'Pending Quotation' | 'Under Review' | 'Approved' | 'Rejected'
  notes?: string
}

export interface InventoryItem {
  id: string
  model: string
  condition: 'Refurbished' | 'Brand New' | 'Pre-owned'
  grade: 'Grade A' | 'Grade B' | 'Grade C' | 'Brand New'
  specs: string
  price: number
  stock: number
  warranty: string
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
    label: 'Express',
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
    label: 'COD',
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
    label: 'Prepaid',
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
    status: 'Pending Quotation',
    notes: 'Requires 25 laptops for new computer lab setup',
  },
  {
    id: 'RFQ-402',
    org: 'Directorate of Technical Education CG',
    type: 'Government',
    qty: 120,
    contact: 'K. S. Patel, Nodal Desk',
    date: 'Today, 11:30 AM',
    status: 'Under Review',
    notes: 'Tender procurement for technical colleges in Raipur',
  },
]

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-101',
    model: 'Dell Latitude 5420',
    condition: 'Refurbished',
    grade: 'Grade A',
    specs: 'i5-11th · 16GB · 512GB SSD',
    price: 27499,
    stock: 6,
    warranty: '6 Months',
  },
  {
    id: 'INV-102',
    model: 'Dell Vostro 3510',
    condition: 'Refurbished',
    grade: 'Grade B',
    specs: 'i5-11th · 8GB · 256GB SSD',
    price: 21999,
    stock: 4,
    warranty: '3 Months',
  },
  {
    id: 'INV-103',
    model: 'HP EliteBook 840 G6',
    condition: 'Refurbished',
    grade: 'Grade B',
    specs: 'i5-8th · 8GB · 256GB SSD',
    price: 19999,
    stock: 5,
    warranty: '3 Months',
  },
  {
    id: 'INV-104',
    model: 'Apple MacBook Air M1',
    condition: 'Refurbished',
    grade: 'Grade A',
    specs: 'M1 · 8GB · 256GB · 92% Batt',
    price: 49999,
    stock: 2,
    warranty: '6 Months',
  },
  {
    id: 'INV-105',
    model: 'Asus VivoBook 15',
    condition: 'Brand New',
    grade: 'Brand New',
    specs: 'Ryzen 5 5500U · 16GB · 512GB',
    price: 42999,
    stock: 8,
    warranty: '1 Year OEM',
  },
]

type ModalType =
  | 'add-inventory'
  | 'edit-inventory'
  | 'add-order'
  | 'edit-order'
  | 'add-lead'
  | 'edit-lead'
  | null

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'inventory' | 'leads'>('dashboard')

  // Core collections
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY)
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)

  // Filters & searches
  const [orderSearch, setOrderSearch] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')

  const [inventorySearch, setInventorySearch] = useState('')
  const [inventoryConditionFilter, setInventoryConditionFilter] = useState('All')

  const [leadSearch, setLeadSearch] = useState('')
  const [leadTypeFilter, setLeadTypeFilter] = useState('All')

  // Notification message
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  // Modals
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Sidebar collapse with localStorage
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('cw_admin_sidebar_collapsed') === 'true'
    } catch {
      return false
    }
  })

  // Mobile sidebar open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const switchTab = (tab: 'dashboard' | 'orders' | 'inventory' | 'leads') => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem('cw_admin_sidebar_collapsed', String(next))
      } catch {}
      return next
    })
  }

  // Inventory Handlers
  const handleSaveInventory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const itemData = {
      model: formData.get('model') as string,
      condition: formData.get('condition') as InventoryItem['condition'],
      grade: formData.get('grade') as InventoryItem['grade'],
      specs: formData.get('specs') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      warranty: formData.get('warranty') as string,
    }

    if (activeModal === 'edit-inventory' && editingItem) {
      setInventory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...itemData } : i))
      )
      showNotification(`Updated inventory item "${itemData.model}"`)
    } else {
      const newItem: InventoryItem = {
        id: `INV-${Math.floor(100 + Math.random() * 900)}`,
        ...itemData,
      }
      setInventory((prev) => [newItem, ...prev])
      showNotification(`Added "${newItem.model}" to inventory`)
    }

    setActiveModal(null)
    setEditingItem(null)
  }

  const handleDeleteInventory = (id: string, model: string) => {
    if (window.confirm(`Are you sure you want to remove "${model}" from inventory?`)) {
      setInventory((prev) => prev.filter((i) => i.id !== id))
      showNotification(`Removed "${model}" from inventory`)
    }
  }

  const handleStockChange = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newStock = Math.max(0, i.stock + delta)
          return { ...i, stock: newStock }
        }
        return i
      })
    )
  }

  // Order Handlers
  const handleSaveOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const orderData = {
      customer: formData.get('customer') as string,
      phone: formData.get('phone') as string,
      area: formData.get('area') as string,
      slot: formData.get('slot') as string,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as Order['status'],
      rider: formData.get('rider') as string,
      label: formData.get('label') as string,
    }

    if (activeModal === 'edit-order' && editingItem) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingItem.id ? { ...o, ...orderData } : o))
      )
      showNotification(`Updated Order #${editingItem.id}`)
    } else {
      const newOrder: Order = {
        id: `CW-${Math.floor(98000 + Math.random() * 999)}`,
        ...orderData,
      }
      setOrders((prev) => [newOrder, ...prev])
      showNotification(`Created Order #${newOrder.id} for ${newOrder.customer}`)
    }

    setActiveModal(null)
    setEditingItem(null)
  }

  const handleDeleteOrder = (id: string) => {
    if (window.confirm(`Delete Order #${id}?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== id))
      showNotification(`Deleted Order #${id}`)
    }
  }

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
    showNotification(`Order #${orderId} status changed to ${newStatus}`)
  }

  // Lead Handlers
  const handleSaveLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const leadData = {
      org: formData.get('org') as string,
      type: formData.get('type') as Lead['type'],
      qty: Number(formData.get('qty')),
      contact: formData.get('contact') as string,
      status: formData.get('status') as Lead['status'],
      notes: formData.get('notes') as string,
    }

    if (activeModal === 'edit-lead' && editingItem) {
      setLeads((prev) =>
        prev.map((l) => (l.id === editingItem.id ? { ...l, ...leadData } : l))
      )
      showNotification(`Updated RFQ Lead #${editingItem.id}`)
    } else {
      const newLead: Lead = {
        id: `RFQ-${Math.floor(400 + Math.random() * 100)}`,
        date: 'Just now',
        ...leadData,
      }
      setLeads((prev) => [newLead, ...prev])
      showNotification(`Recorded RFQ Lead from ${newLead.org}`)
    }

    setActiveModal(null)
    setEditingItem(null)
  }

  const handleDeleteLead = (id: string, org: string) => {
    if (window.confirm(`Delete RFQ Lead from "${org}"?`)) {
      setLeads((prev) => prev.filter((l) => l.id !== id))
      showNotification(`Deleted RFQ Lead #${id}`)
    }
  }

  const handleLeadStatusChange = (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    )
    showNotification(`Lead #${id} status updated to ${newStatus}`)
  }

  // Filtered queries
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.area.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch)
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter
    return matchesSearch && matchesStatus
  })

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.model.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.specs.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.id.toLowerCase().includes(inventorySearch.toLowerCase())
    const matchesCondition =
      inventoryConditionFilter === 'All' || item.condition === inventoryConditionFilter
    return matchesSearch && matchesCondition
  })

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.id.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.org.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.contact.toLowerCase().includes(leadSearch.toLowerCase())
    const matchesType = leadTypeFilter === 'All' || lead.type === leadTypeFilter
    return matchesSearch && matchesType
  })

  const unfulfilledOrdersCount = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length
  const totalStockUnits = inventory.reduce((acc, curr) => acc + curr.stock, 0)

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
      {/* Toast Notification Pill */}
      {notification && <div className="admin-toast">{notification}</div>}

      {/* Mobile Sidebar Backdrop Overlay */}
      <div
        className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Collapsible Admin Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div
            className="brand-info"
            onClick={isSidebarCollapsed ? toggleSidebar : undefined}
            style={{ cursor: isSidebarCollapsed ? 'pointer' : 'default' }}
            title={isSidebarCollapsed ? 'Click to expand sidebar' : undefined}
            role={isSidebarCollapsed ? 'button' : undefined}
            tabIndex={isSidebarCollapsed ? 0 : undefined}
            onKeyDown={isSidebarCollapsed ? (e) => e.key === 'Enter' && toggleSidebar() : undefined}
          >
            <span className="brand-logo">CW</span>
            <div className="brand-text">
              <div className="brand-title">Computer Wale</div>
              <div className="brand-sub">Raipur Hub Portal</div>
            </div>
          </div>

          <div className="sidebar-brand-actions">
            {!isSidebarCollapsed && (
              <button
                type="button"
                className="collapse-toggle-btn"
                onClick={toggleSidebar}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="toggle-chevron"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <button
              type="button"
              className="mobile-sidebar-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              title="Close Menu"
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="nav-menu">
          <button
            type="button"
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => switchTab('dashboard')}
            title="Operations Dashboard"
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Operations Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => switchTab('orders')}
            title={`Raipur Orders (${unfulfilledOrdersCount} pending)`}
          >
            <span className="nav-icon">
              📦
              {unfulfilledOrdersCount > 0 && (
                <span className="nav-badge-pill">{unfulfilledOrdersCount}</span>
              )}
            </span>
            <span className="nav-label">
              Raipur Orders ({unfulfilledOrdersCount})
            </span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => switchTab('inventory')}
            title={`Laptop Inventory (${totalStockUnits} Units)`}
          >
            <span className="nav-icon">💻</span>
            <span className="nav-label">Laptop Inventory ({totalStockUnits} Units)</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => switchTab('leads')}
            title={`Bulk & Tender RFQs (${leads.length})`}
          >
            <span className="nav-icon">🏢</span>
            <span className="nav-label">Bulk & Tender RFQs ({leads.length})</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="store-pill" title="Pandri Store Active">
            <span className="store-icon">📍</span>
            <span className="store-text">Pandri Store Active</span>
          </div>
          <button
            type="button"
            className="logout-btn"
            onClick={() => setIsLoggedIn(false)}
            title="Sign Out"
          >
            <DoorIcon size={15} />
            <span className="logout-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="main-viewport">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              title="Open menu"
            >
              <span className="mobile-toggle-line" />
              <span className="mobile-toggle-line" />
              <span className="mobile-toggle-line" />
            </button>
            <div className="topbar-title-block">
              <h1 className="topbar-title">
                {activeTab === 'dashboard' && 'Operations Overview'}
                {activeTab === 'orders' && 'Raipur Orders'}
                {activeTab === 'inventory' && 'Laptop Inventory'}
                {activeTab === 'leads' && 'Commercial RFQ Leads'}
              </h1>
              <div className="topbar-meta">Pandri Dispatch Desk · Raipur, CG</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-user">
              <span className="user-badge">Store Manager</span>
              <span className="user-name">Rajesh Sharma</span>
            </div>
            <button
              type="button"
              className="topbar-logout-btn"
              onClick={() => setIsLoggedIn(false)}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <DoorIcon size={14} />
            </button>
          </div>
        </header>

        {/* TAB 1: OPERATIONS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="content-wrap">
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Total Orders</span>
                <span className="metric-val">{orders.length}</span>
                <span className="metric-trend text-green">Live dispatch desk</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Raipur Dispatches Pending</span>
                <span className="metric-val">{unfulfilledOrdersCount}</span>
                <span className="metric-trend text-amber">Active fulfillment queue</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Units in Store (Pandri)</span>
                <span className="metric-val">{totalStockUnits}</span>
                <span className="metric-trend text-blue">Across {inventory.length} laptop models</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Active RFQ Leads</span>
                <span className="metric-val">{leads.length}</span>
                <span className="metric-trend text-green">{leads.reduce((sum, l) => sum + l.qty, 0)} Units in demand</span>
              </div>
            </div>

            <div className="card-panel">
              <div className="panel-header">
                <h2>Recent Raipur Dispatches</h2>
                <button type="button" className="link-btn" onClick={() => switchTab('orders')}>
                  Manage All Orders →
                </button>
              </div>

              <div className="table-responsive-container">
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
                    {orders.slice(0, 5).map((order) => (
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
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header-toolbar">
                <div className="toolbar-left">
                  <h2>Raipur Order Fulfillment ({filteredOrders.length})</h2>
                  <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search order #, customer, area..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn-primary-sm"
                  onClick={() => {
                    setEditingItem(null)
                    setActiveModal('add-order')
                  }}
                >
                  + Create Order
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="ops-table">
                  <thead>
                    <tr>
                      <th>Order # & Tag</th>
                      <th>Customer & Phone</th>
                      <th>Delivery Area & Slot</th>
                      <th>Amount</th>
                      <th>Rider Assigned</th>
                      <th>Fulfillment Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="empty-table-cell">
                          No orders match your search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id}>
                          <td>
                            <strong>{o.id}</strong>
                            {o.label && <span className="order-tag-label">{o.label}</span>}
                          </td>
                          <td>
                            <div>{o.customer}</div>
                            <small className="text-muted">{o.phone}</small>
                          </td>
                          <td>
                            <div>{o.area}</div>
                            <small className="text-muted">{o.slot}</small>
                          </td>
                          <td>
                            <strong>₹{o.amount.toLocaleString()}</strong>
                          </td>
                          <td>{o.rider}</td>
                          <td>
                            <select
                              value={o.status}
                              onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                              className={`status-select status-select-${o.status.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Packed">Packed</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => {
                                  setEditingItem(o)
                                  setActiveModal('edit-order')
                                }}
                                title="Edit order details"
                              >
                                <PencilIcon size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteOrder(o.id)}
                                title="Delete order"
                              >
                                <TrashIcon size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header-toolbar">
                <div className="toolbar-left">
                  <h2>Laptop Catalog & Physical Stock in Raipur ({filteredInventory.length})</h2>
                  <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search model, specs..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select
                    value={inventoryConditionFilter}
                    onChange={(e) => setInventoryConditionFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Conditions</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Pre-owned">Pre-owned</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn-primary-sm"
                  onClick={() => {
                    setEditingItem(null)
                    setActiveModal('add-inventory')
                  }}
                >
                  + Add Laptop
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="ops-table">
                  <thead>
                    <tr>
                      <th>Model & Code</th>
                      <th>Condition & Grade</th>
                      <th>Specifications</th>
                      <th>Price</th>
                      <th>Pandri Stock Units</th>
                      <th>Store Warranty</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="empty-table-cell">
                          No laptop inventory found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.model}</strong>
                            <div><small className="text-muted">{item.id}</small></div>
                          </td>
                          <td>
                            <span
                              className={`badge-grade ${
                                item.condition === 'Brand New' ? 'badge-new' : ''
                              }`}
                            >
                              {item.grade}
                            </span>
                            <span className="condition-text">{item.condition}</span>
                          </td>
                          <td>{item.specs}</td>
                          <td>
                            <strong>₹{item.price.toLocaleString()}</strong>
                          </td>
                          <td>
                            <div className="stock-stepper-cell">
                              <button
                                type="button"
                                className="stock-btn"
                                onClick={() => handleStockChange(item.id, -1)}
                                disabled={item.stock <= 0}
                                title="Decrease stock"
                              >
                                −
                              </button>
                              <span
                                className={`stock-count ${
                                  item.stock <= 2 ? 'text-amber font-bold' : 'text-green font-bold'
                                }`}
                              >
                                {item.stock} {item.stock <= 2 ? '(Low)' : 'Units'}
                              </span>
                              <button
                                type="button"
                                className="stock-btn"
                                onClick={() => handleStockChange(item.id, 1)}
                                title="Increase stock"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>{item.warranty}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => {
                                  setEditingItem(item)
                                  setActiveModal('edit-inventory')
                                }}
                                title="Edit item specifications"
                              >
                                <PencilIcon size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteInventory(item.id, item.model)}
                                title="Delete laptop from inventory"
                              >
                                <TrashIcon size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BULK & TENDER RFQ LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="content-wrap">
            <div className="card-panel">
              <div className="panel-header-toolbar">
                <div className="toolbar-left">
                  <h2>Commercial & Government Quotation Requests ({filteredLeads.length})</h2>
                  <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search organization, contact..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select
                    value={leadTypeFilter}
                    onChange={(e) => setLeadTypeFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Tracks</option>
                    <option value="Bulk">Bulk</option>
                    <option value="Government">Government</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn-primary-sm"
                  onClick={() => {
                    setEditingItem(null)
                    setActiveModal('add-lead')
                  }}
                >
                  + New RFQ Request
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="ops-table">
                  <thead>
                    <tr>
                      <th>Lead #</th>
                      <th>Organization & Notes</th>
                      <th>Enquiry Track</th>
                      <th>Qty Needed</th>
                      <th>Contact Officer</th>
                      <th>Status Label</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="empty-table-cell">
                          No RFQ leads found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((l) => (
                        <tr key={l.id}>
                          <td><strong>{l.id}</strong></td>
                          <td>
                            <div><strong>{l.org}</strong></div>
                            {l.notes && <small className="text-muted">{l.notes}</small>}
                          </td>
                          <td>
                            <span className={`lead-tag lead-${l.type.toLowerCase()}`}>{l.type}</span>
                          </td>
                          <td>
                            <strong className="text-blue">{l.qty} Units</strong>
                          </td>
                          <td>
                            <div>{l.contact}</div>
                            <small className="text-muted">{l.date}</small>
                          </td>
                          <td>
                            <select
                              value={l.status}
                              onChange={(e) => handleLeadStatusChange(l.id, e.target.value as Lead['status'])}
                              className="status-select"
                            >
                              <option value="Pending Quotation">Pending Quotation</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => {
                                  setEditingItem(l)
                                  setActiveModal('edit-lead')
                                }}
                                title="Edit RFQ Lead"
                              >
                                <PencilIcon size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteLead(l.id, l.org)}
                                title="Delete RFQ Lead"
                              >
                                <TrashIcon size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Quick Thumb Navigation Bar */}
        <nav className="mobile-admin-bottom-nav" aria-label="Mobile navigation">
          <button
            type="button"
            className={`bottom-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => switchTab('dashboard')}
          >
            <span className="bottom-nav-icon">📊</span>
            <span className="bottom-nav-label">Overview</span>
          </button>
          <button
            type="button"
            className={`bottom-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => switchTab('orders')}
          >
            <span className="bottom-nav-icon">
              📦
              {unfulfilledOrdersCount > 0 && (
                <span className="bottom-nav-badge">{unfulfilledOrdersCount}</span>
              )}
            </span>
            <span className="bottom-nav-label">Orders</span>
          </button>
          <button
            type="button"
            className={`bottom-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => switchTab('inventory')}
          >
            <span className="bottom-nav-icon">💻</span>
            <span className="bottom-nav-label">Inventory</span>
          </button>
          <button
            type="button"
            className={`bottom-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => switchTab('leads')}
          >
            <span className="bottom-nav-icon">🏢</span>
            <span className="bottom-nav-label">Leads</span>
          </button>
        </nav>
      </main>

      {/* POPUP MODAL DIALOGS */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => { setActiveModal(null); setEditingItem(null) }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {activeModal === 'add-inventory' && 'Add Laptop to Inventory'}
                {activeModal === 'edit-inventory' && `Edit Laptop "${editingItem?.model}"`}
                {activeModal === 'add-order' && 'Create Raipur Dispatch Order'}
                {activeModal === 'edit-order' && `Edit Order #${editingItem?.id}`}
                {activeModal === 'add-lead' && 'Add Commercial RFQ Lead'}
                {activeModal === 'edit-lead' && `Edit Lead #${editingItem?.id}`}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => { setActiveModal(null); setEditingItem(null) }}
              >
                ✕
              </button>
            </div>

            {/* INVENTORY FORM */}
            {(activeModal === 'add-inventory' || activeModal === 'edit-inventory') && (
              <form onSubmit={handleSaveInventory} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Laptop Model</label>
                    <input
                      name="model"
                      defaultValue={editingItem?.model || ''}
                      placeholder="e.g. Dell Latitude 5420"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Condition</label>
                    <select name="condition" defaultValue={editingItem?.condition || 'Refurbished'}>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Brand New">Brand New</option>
                      <option value="Pre-owned">Pre-owned</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Grade Label</label>
                    <select name="grade" defaultValue={editingItem?.grade || 'Grade A'}>
                      <option value="Grade A">Grade A</option>
                      <option value="Grade B">Grade B</option>
                      <option value="Grade C">Grade C</option>
                      <option value="Brand New">Brand New</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={editingItem?.price || 25000}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Hardware Specifications</label>
                  <input
                    name="specs"
                    defaultValue={editingItem?.specs || ''}
                    placeholder="e.g. i5-11th · 16GB · 512GB SSD"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock Count</label>
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      defaultValue={editingItem?.stock ?? 5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Store Warranty</label>
                    <input
                      name="warranty"
                      defaultValue={editingItem?.warranty || '6 Months'}
                      placeholder="e.g. 6 Months, 1 Year OEM"
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => { setActiveModal(null); setEditingItem(null) }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {activeModal === 'edit-inventory' ? 'Save Changes' : 'Add Laptop'}
                  </button>
                </div>
              </form>
            )}

            {/* ORDER FORM */}
            {(activeModal === 'add-order' || activeModal === 'edit-order') && (
              <form onSubmit={handleSaveOrder} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      name="customer"
                      defaultValue={editingItem?.customer || ''}
                      placeholder="e.g. Rajesh Kumar"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      name="phone"
                      defaultValue={editingItem?.phone || '+91 '}
                      placeholder="+91 98765 00000"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Raipur Area / Zone</label>
                    <input
                      name="area"
                      defaultValue={editingItem?.area || 'Pandri, Raipur'}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Slot</label>
                    <select name="slot" defaultValue={editingItem?.slot || 'Evening (4-8 PM)'}>
                      <option value="Morning (10-1 PM)">Morning (10-1 PM)</option>
                      <option value="Afternoon (1-4 PM)">Afternoon (1-4 PM)</option>
                      <option value="Evening (4-8 PM)">Evening (4-8 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Order Amount (₹)</label>
                    <input
                      name="amount"
                      type="number"
                      defaultValue={editingItem?.amount || 25000}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Order Tag / Label</label>
                    <select name="label" defaultValue={editingItem?.label || 'COD'}>
                      <option value="COD">COD</option>
                      <option value="Prepaid">Prepaid</option>
                      <option value="Express">Express</option>
                      <option value="Store Pickup">Store Pickup</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Assigned Rider</label>
                    <input
                      name="rider"
                      defaultValue={editingItem?.rider || 'Unassigned'}
                      placeholder="e.g. Ramesh Sahu"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fulfillment Status</label>
                    <select name="status" defaultValue={editingItem?.status || 'Confirmed'}>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => { setActiveModal(null); setEditingItem(null) }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {activeModal === 'edit-order' ? 'Save Order' : 'Create Order'}
                  </button>
                </div>
              </form>
            )}

            {/* LEAD FORM */}
            {(activeModal === 'add-lead' || activeModal === 'edit-lead') && (
              <form onSubmit={handleSaveLead} className="modal-form">
                <div className="form-group">
                  <label>Organization / Entity</label>
                  <input
                    name="org"
                    defaultValue={editingItem?.org || ''}
                    placeholder="e.g. Raipur Engineering College"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Enquiry Track</label>
                    <select name="type" defaultValue={editingItem?.type || 'Bulk'}>
                      <option value="Bulk">Bulk</option>
                      <option value="Government">Government</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity Required</label>
                    <input
                      name="qty"
                      type="number"
                      min="1"
                      defaultValue={editingItem?.qty || 20}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person & Phone</label>
                    <input
                      name="contact"
                      defaultValue={editingItem?.contact || ''}
                      placeholder="e.g. Mr. Sharma (+91 98765...)"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quotation Status</label>
                    <select name="status" defaultValue={editingItem?.status || 'Pending Quotation'}>
                      <option value="Pending Quotation">Pending Quotation</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes / Requirements</label>
                  <textarea
                    name="notes"
                    defaultValue={editingItem?.notes || ''}
                    placeholder="Specific specs or tender specifications..."
                    rows={3}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => { setActiveModal(null); setEditingItem(null) }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {activeModal === 'edit-lead' ? 'Save RFQ' : 'Submit RFQ'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
