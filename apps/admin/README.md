# Computer Wale - Store Operations and Dispatch Portal

Store operations, local dispatch management, inventory control, and commercial quotation desk for Computer Wale's primary hub in Raipur, Chhattisgarh.

---

## Overview

The Admin Operations Portal provides the daily management console for the Pandri (Raipur) flagship store. It handles hyper-local same-day dispatch routing across Raipur pincodes, inventory tracking for certified refurbished (Grade A, B, C) and brand-new laptops, and lead management for institutional/bulk procurement requests.

---

## Key Features and Functional Modules

### 1. Operations Dashboard
- Live operational metrics: Total Orders, Raipur Dispatches Pending, Units in Store at Pandri, and Active RFQ Leads with aggregate unit demand.
- Visual summary cards highlighting urgent dispatches, stock alerts, and commercial quotation pipelines.
- Fast navigation shortcuts into individual operational desks.

### 2. Raipur Order Fulfillment Desk
- Manages hyper-local Raipur deliveries across key areas (Pandri, Telibandha, Shankar Nagar, Civil Lines, Devendra Nagar, etc.).
- Delivery slot handling: Morning (10:00 AM - 1:00 PM) and Evening (4:00 PM - 8:00 PM).
- Rider assignment and doorstep dispatch tracking (assigned riders such as Ramesh Sahu, Suresh Yadav, or Unassigned queue).
- Workflow progression: Confirmed -> Packed -> Out for Delivery -> Delivered (or Cancelled).
- Fast payment labels: Cash on Delivery (COD) with doorstep testing, Prepaid, and Express.
- Full search capabilities (Order ID, customer name, area, phone number) and status filter tab.
- Modals for creating new store orders and editing existing dispatch details.

### 3. Laptop Inventory Management Desk
- Granular tracking of refurbished, pre-owned, and brand-new laptop units.
- Grading system attributes: Grade A (Mint/Like New), Grade B (Light cosmetic wear), Grade C (Functional with visible wear), and Brand New.
- Hardware specifications breakdown (CPU generation, RAM capacity, SSD/HDD configuration, battery health health check).
- Stock level steppers: One-click increment and decrement controls for store units.
- Warranty tracking: 3-month store warranty, 6-month certified warranty, or 1-year OEM manufacturer warranty.
- Search by model name, ID, or hardware specifications; filter by condition.
- Add Laptop and Edit Inventory modal dialogs with instant stock validation.

### 4. Commercial and Government RFQ Leads Desk
- Lead qualification for B2B bulk buyers, educational institutions, coaching centers, and Chhattisgarh government departments.
- Lead classification: Bulk (5-500 units), Government (GeM portal bids), Corporate, and Education.
- Review workflow: Pending Quotation -> Under Review -> Approved -> Rejected.
- Technical requirements recording (custom OS image deployment, GST invoice requirements, tender compliance).
- Search by organization or contact person; filter by lead category.
- Full modal forms for adding new inquiries and updating lead statuses.

### 5. Store UI and Usability Enhancements
- Collapsible sidebar with persistent state saved in browser localStorage (`cw_admin_sidebar_collapsed`).
- High-contrast visual tokens tailored for store counter terminals.
- In-app notification toast alerts confirming inventory adjustments, status updates, and dispatch edits.
- Accessible SVG iconography and modal dialogs with escape/overlay controls.

---

## Technical Stack

- Framework: React 19
- Language: TypeScript
- Build Tool: Vite
- Linter: Oxlint
- Styling: Custom Vanilla CSS (`App.css`) with CSS custom properties, grid layouts, and responsive data tables

---

## Directory Structure

```text
apps/admin/
├── src/
│   ├── assets/              # SVG icons and static branding assets
│   ├── App.css              # Operations theme, table styles, modals, layout
│   ├── App.tsx              # Single-page application containing all 4 operational desks
│   ├── index.css            # Base typography and CSS resets
│   └── main.tsx             # React root rendering entry point
├── package.json             # Workspace dependencies and scripts
├── tsconfig.json            # TypeScript project configuration
├── tsconfig.app.json        # TypeScript compiler options for admin app
└── vite.config.ts           # Vite configuration (port 5174 when launched from root)
```

---

## Data Models

### Order Interface
```typescript
interface Order {
  id: string              // e.g., "CW-98241"
  customer: string        // Customer full name
  phone: string           // Contact mobile number
  area: string            // Raipur neighborhood / locality
  slot: string            // "Morning (10-1 PM)" | "Evening (4-8 PM)"
  amount: number          // Total order value in INR
  status: 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
  rider: string           // Assigned Raipur delivery agent
  label?: string          // "COD" | "Prepaid" | "Express"
}
```

### Inventory Item Interface
```typescript
interface InventoryItem {
  id: string              // e.g., "INV-101"
  model: string           // Laptop make and model (e.g., "Dell Latitude 5420")
  condition: 'Refurbished' | 'Brand New' | 'Pre-owned'
  grade: 'Grade A' | 'Grade B' | 'Grade C' | 'Brand New'
  specs: string           // CPU, RAM, SSD, Display summary
  price: number           // Unit selling price in INR
  stock: number           // Available store quantity
  warranty: string        // Warranty duration and terms
}
```

### RFQ Lead Interface
```typescript
interface Lead {
  id: string              // e.g., "RFQ-401"
  org: string             // Organization or department name
  type: 'Bulk' | 'Government' | 'Corporate' | 'Education'
  qty: number             // Quantity of laptops requested
  contact: string         // Contact person and phone
  date: string            // Timestamp or submission date
  status: 'Pending Quotation' | 'Under Review' | 'Approved' | 'Rejected'
  notes?: string          // Technical and imaging specifications
}
```

---

## Running Locally

### From the Repository Root
```bash
# Start the Admin Operations Portal
npm run dev:admin

# The portal will be accessible at:
# http://localhost:5174
```

### Directly from `apps/admin`
```bash
cd apps/admin

# Install dependencies (if not installed at workspace root)
npm install

# Start Vite dev server
npm run dev

# Run Oxlint
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Operational Hub Details

- Primary Dispatch Facility: Pandri IT Park Road, Raipur, Chhattisgarh (492002)
- Same-Day Delivery Coverage: Raipur Municipal Corporation pincodes 492001 to 492010
- Standard Dispatch Hours:
  - Morning Slot: 10:00 AM to 1:00 PM
  - Evening Slot: 4:00 PM to 8:00 PM
