# Computer Wale - Consumer and Commercial Storefront

Official web application and customer storefront for Computer Wale, Chhattisgarh's specialist for certified refurbished, verified pre-owned, and brand-new laptops.

---

## Overview

The Computer Wale web storefront provides an e-commerce and institutional quotation platform tailored for the Chhattisgarh region. Operating primarily out of the Pandri (Raipur) flagship hub and the Ambikapur experience center, the storefront bridges digital ordering with physical reassurance through transparent diagnostics, doorstep testing before payment, and specialized B2B/Government procurement channels.

---

## Customer Tracks

The storefront is engineered to serve three distinct customer segments:

1. Retail and Individual Buyers:
   - Full catalog discovery with 32-point inspection certificates.
   - Pincode verification for same-day delivery across Raipur.
   - Doorstep testing before payment with Cash on Delivery (COD) and UPI.

2. Commercial and Bulk Clients (Offices, BPOs, Coaching Institutes):
   - Tiered bulk discounts for orders from 5 to 500+ units.
   - Custom OS image flashing and software provisioning details.
   - GST 18% tax invoice with Input Tax Credit (ITC) calculation.
   - Dedicated commercial Request for Quotation (RFQ) desk.

3. Government and Public Sector Undertakings (PSUs):
   - Government e-Marketplace (GeM) registration and compliance credentials.
   - ISO/BIS standard documentation and OEM authorization matrix.
   - Institutional tender submission and quotation workflows.

---

## Key Features

### Transparent Refurbished Grading System
Every laptop listing explicitly identifies physical and operational condition:
- Grade A (Like New): Pristine chassis, zero dead pixels, minimum 85% battery health, 6-month warranty.
- Grade B (Very Good): Light cosmetic wear on outer shell, clean display, minimum 75% battery health, 3-month warranty.
- Grade C (Value / Fair): Noticeable surface scratches, fully functional hardware, minimum 65% battery health, budget-friendly pricing.
- Brand New: Factory-sealed with 1-year OEM manufacturer warranty.

### 32-Point Quality Diagnostic Check
Detailed product pages show test results covering:
- Processor stress and thermal throttling tests.
- RAM memory integrity checks.
- SSD read/write health and SMART status.
- Screen uniformity and dead pixel analysis.
- Keyboard matrix, trackpad responsiveness, and webcam clarity.
- Port verification (USB, Type-C, HDMI, audio jack, charging port).
- Battery cycle count and discharge stability.

### Raipur Hyper-Local Delivery Integration
- Integrated pincode verification for Raipur Municipal Corporation codes (492001 through 492010).
- Delivery slot selection at checkout:
  - Morning Slot: 10:00 AM to 1:00 PM
  - Evening Slot: 4:00 PM to 8:00 PM
- Free store dispatch from the Pandri hub with doorstep inspection option.

### Cart and Checkout Flow
- Real-time subtotal, GST 18% breakdown, and local Raipur delivery fees calculation.
- Doorstep Cash on Delivery (inspect laptop before paying) or instant online UPI payment.
- Seamless order submission generating unique tracking IDs (e.g., CW-98241).

### Order Tracking and Delivery Timeline
- 4-stage visual inspection and dispatch progress tracker:
  1. Order Confirmed
  2. 32-Point Quality Diagnostics Passed
  3. Packed at Pandri Hub
  4. Out for Delivery / Doorstep Testing
- Assigned rider contact name and phone number for direct coordination.

### Customer Account Dashboard
- 1-click demo login for instant demonstration.
- Order history tracking with live fulfillment statuses.
- Saved delivery addresses management.
- Warranty certificate lookup and serial number verification.

---

## Application Routes

| Route | View Component | Description |
|---|---|---|
| `/` | Home | Hero section, 3-track selector, featured laptops, grading explainer, store strip |
| `/laptops` | Laptops | Multi-facet catalog filtering, sorting, search bar, and product card grid |
| `/laptops/:slug` | ProductDetail | Specs table, battery health, 32-point diagnostics, Raipur pincode check, Add to Cart |
| `/bulk` | Bulk | B2B tier pricing, custom OS deployment details, and corporate RFQ inquiry form |
| `/government` | Government | GeM credentials, compliance documentation, and government tender RFQ form |
| `/cart` | Cart | Line item management, quantity steppers, subtotal breakdown, Raipur delivery guarantee |
| `/checkout` | Checkout | Address input, Raipur delivery slot picker (morning/evening), payment method selection |
| `/track` | TrackOrder | Order ID search, 4-stage milestone progress bar, assigned rider details |
| `/track-order` | TrackOrder | Alias route for order tracking |
| `/stores` | Stores | Pandri (Raipur) flagship and Ambikapur store addresses, timings, and bench amenities |
| `/account` | Account | 1-click demo login, active orders, saved addresses, warranty certificate verification |
| `/account/:tab` | Account | Deep link into specific account tabs (orders, addresses, warranty) |
| `*` | NotFound | Custom 404 fallback page directing back to the main catalog |

---

## State Management Architecture

State is decoupled into focused Zustand stores:

1. `cartStore`:
   - Line items, quantities, subtotal, and tax computations.
   - Persistent synchronization with browser localStorage (`cw_cart_state`).
   - Drawer toggle and item removal actions.

2. `filterStore`:
   - Multi-facet filter criteria: condition, grade, brand, RAM capacity, price range.
   - Search query strings and sorting parameters (price ascending, price descending, popularity).
   - Reset and individual facet toggle handlers.

3. `authStore`:
   - User authentication state with persistent demo account capabilities.
   - Saved shipping addresses and customer profile details.

---

## Technology Stack

- Framework: React 19
- Language: TypeScript
- Routing: React Router v7
- State Management: Zustand 5
- Forms & Validation: React Hook Form with Zod schemas
- Build Tool: Vite
- Design System: Custom CSS tokens, responsive layouts, glassmorphic headers, accessible contrast ratios

---

## Directory Structure

```text
apps/web/
├── public/                  # Product imagery, brand marks, and favicon
├── src/
│   ├── assets/              # Static SVG icons and product graphics
│   ├── components/
│   │   ├── common/          # ScrollToTop, Breadcrumbs, SectionHeadings
│   │   ├── forms/           # RFQ inquiry forms, PincodeChecker, ContactForm
│   │   ├── layout/          # Navbar, Footer, MobileNav
│   │   ├── product/         # ProductCard, GradeBadge, SpecTable, DiagnosticsChecklist
│   │   └── ui/              # Button, Input, Modal, Badge, Card, Stepper
│   ├── hooks/               # Custom React hooks (debounce, window size)
│   ├── lib/
│   │   └── mockData.ts      # 10-laptop catalog, store branches, delivery zones
│   ├── pages/               # 10 production pages + index barrel export
│   ├── state/               # Zustand stores (cartStore, filterStore, authStore)
│   ├── styles/              # Design tokens, variables, responsive typography
│   ├── types/               # Domain interfaces (Product, Order, GradeDefinition, Store)
│   ├── App.tsx              # Application shell with React Router configuration
│   └── main.tsx             # Application bootstrap and DOM mounting
├── package.json             # App dependencies and scripts
├── tsconfig.json            # Base TypeScript configuration
├── tsconfig.app.json        # TypeScript configuration for web app
└── vite.config.ts           # Vite configuration
```

---

## Running Locally

### From the Repository Root
```bash
# Start the Web Storefront dev server
npm run dev

# The web storefront will be accessible at:
# http://localhost:5173
```

### Directly from `apps/web`
```bash
cd apps/web

# Install dependencies (if not installed at workspace root)
npm install

# Start Vite dev server
npm run dev

# Run TypeScript typecheck
npm run typecheck

# Run linter
npm run lint

# Run unit tests
npm run test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Physical Store Locations

### Raipur Flagship Experience Hub
- Address: Shop No. 12, IT Park Road, Pandri, Raipur, Chhattisgarh (492002)
- Same-day dispatch zone: Raipur pincodes 492001 through 492010
- Phone: +91 98765 43210
- Timings: 10:00 AM - 8:30 PM (Open 7 days a week)

### Ambikapur Branch
- Address: Near Gandhi Chowk, Station Road, Ambikapur, Chhattisgarh (497001)
- Walk-in diagnostic and testing bench
- Phone: +91 98765 43211
- Timings: 10:30 AM - 8:00 PM (Monday - Saturday)
