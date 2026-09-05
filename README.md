# Computer Wale — Refurbished & Branded Laptop Store

> **Official Website & Operations Monorepo**  
> Physical Experience Centers: **Raipur (Primary Hub)** + **Ambikapur**, Chhattisgarh  
> Certified Refurbished (Graded A/B/C) · Verified 2nd Hand · Brand-New Laptops

---

## 🌟 Overview & Product Framing

**Computer Wale** is Chhattisgarh’s trusted laptop specialist, addressing three distinct customer tracks:

| Customer Track | Core Need | Web Application Behavior |
|---|---|---|
| **Retail (Individuals)** | Browse, inspect 32-point diagnostics, buy 1 unit, local delivery | E-commerce catalog, Raipur delivery slot picker (morning/evening), doorstep testing |
| **Commercial / Bulk** | Offices, BPOs, coaching institutes needing 5–500 units | Custom OS imaging, GST 18% invoice with input credit, dedicated quote RFQ flow |
| **Government & PSUs** | Tender compliance, GeM bids, past performance verification | GeM credentials, ISO/BIS certification matrix, tender RFQ desk |

---

## 🏛️ Monorepo Architecture

```text
ComputerWale/
├── apps/
│   ├── web/                     # Consumer & Business storefront (Vite + React 19 + TypeScript)
│   │   ├── src/
│   │   │   ├── components/      # UI, layout, forms, and product cards
│   │   │   ├── pages/           # 10 production pages + router shell
│   │   │   ├── state/           # Zustand stores (cartStore, filterStore, authStore)
│   │   │   ├── styles/          # Tokens and CSS resets
│   │   │   ├── types/           # Shared domain TypeScript interfaces
│   │   │   └── lib/             # 10-laptop mock catalog & Raipur delivery logic
│   │   └── public/              # Hero product collage, SVG icons, favicon
│   └── admin/                   # Store operations & dispatch portal (Vite + React 19)
│       └── src/                 # Order dispatch table, rider assignment, stock monitor
├── packages/
│   └── design-tokens/           # Atomic tokens (colors, typography, spacing, elevations)
└── services/
    └── api/                     # Backend API services stub
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `>= 22.0.0`
- **npm**: `>= 10.0.0`

### Installation
Clone the repository and install dependencies at the workspace root:

```bash
git clone https://github.com/ADI-2707/ComputerWale.git
cd ComputerWale
npm install
```

### Running Locally

```bash
# Start Web Storefront (http://localhost:5173)
npm run dev

# Start Admin Operations Portal (http://localhost:5174)
npm run dev:admin

# Typecheck all packages and apps
npm run typecheck

# Production Build
npm run build
```

---

## 🧭 Web Storefront Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero collage, 3-track selector, featured laptops, grade explainer, delivery strip |
| `/laptops` | **Catalog Listing** | Multi-facet filter rail (Condition, Grade, Brand, RAM, Price), sorting, responsive grid |
| `/laptops/:slug` | **Product Detail** | Image preview, GradeBadge, PriceBlock, SpecTable, Raipur PincodeChecker, Add to Cart |
| `/bulk` | **Commercial Sales** | B2B wholesale pricing tiers, custom OS imaging info, corporate RFQ form |
| `/government` | **Government Supply** | GeM portal registration proof, BIS compliance matrix, institutional tender RFQ |
| `/cart` | **Shopping Cart** | Item management, QuantityStepper, Raipur local dispatch guarantee, summary sidebar |
| `/checkout` | **Checkout** | Customer info, Raipur same-day delivery slot selector (morning/evening), COD/UPI |
| `/track` | **Track Order** | Order search (`CW-98241`), 4-step inspection timeline, Raipur store rider contact |
| `/stores` | **Store Locations** | Pandri (Raipur) flagship & Ambikapur branch addresses, timings, and testing bench |
| `/account` | **Customer Account** | 1-click demo login, live orders, saved addresses, warranty certificate lookup |
| `*` | **404 Not Found** | Friendly fallback page directing back to catalog |

---

## 🎨 Design System & Philosophy

- **Color Palette**: Built around trust and clarity — Deep Slate `#0f172a`, International Brand Red-Orange `#e04b2b`, and Raipur verified green `#16a34a`.
- **Aesthetics**: Glassmorphic headers, card hover lifts, subtle borders, high-contrast typography (Inter / System font stack).
- **Accessibility & Performance**: `prefers-reduced-motion` compliance, semantic HTML5 landmarks, zero layout shifts, and responsive breakpoints from mobile (360px) to ultra-wide (1440px+).

---

## 🏪 Physical Store Locations

- **Raipur Flagship Experience Hub**:  
  Shop No. 12, IT Park Road, Pandri, Raipur, Chhattisgarh — 492002  
  *Delivery Hub: Same-day delivery across Raipur pincodes (492001–492010)*  
  Phone: `+91 98765 43210`

- **Ambikapur Branch**:  
  Near Gandhi Chowk, Station Road, Ambikapur, Chhattisgarh — 497001  
  *Walk-in testing & purchase center*  
  Phone: `+91 98765 43211`

---

## 📄 License
Private repository — © Computer Wale. All rights reserved.