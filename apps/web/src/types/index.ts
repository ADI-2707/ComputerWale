// =============================================================
// COMPUTER WALE — Shared TypeScript Types
// Used across components, pages, state stores, and mock data.
// =============================================================

// ── Product / Catalog ─────────────────────────────────────────

export type Condition = 'new' | 'refurbished' | 'second-hand'

export type Grade = 'A' | 'B' | 'C' | null // null = new (ungraded)

export interface Product {
  id: string
  slug: string
  brand: string
  model: string
  condition: Condition
  grade: Grade
  /** One-line spec summary for card display */
  specSummary: string
  specs: ProductSpecs
  mrp: number        // Maximum Retail Price (₹)
  price: number      // Selling price (₹)
  stock: number      // Units available in Raipur
  images: string[]   // URL array, first image is primary
  warrantyMonths: number
  warrantyIncludes: string[]  // e.g. ["Windows 11 Pro licensed", "Battery replacement warranty"]
  batteryHealth?: number      // Percentage, only for refurbished
  cosmeticDetails?: string    // Grade detail description
  deliveryEligible: boolean   // true = Raipur delivery, false = walk-in only
  featured: boolean           // CMS-driven, shown on homepage
}

export interface ProductSpecs {
  cpu: string
  ram: string
  storage: string
  display: string
  gpu?: string
  os?: string
  weight?: string
  batteryCapacity?: string
}

// ── Grade System ──────────────────────────────────────────────

export interface GradeDefinition {
  grade: 'A' | 'B' | 'C'
  cosmeticCondition: string
  batteryHealthMin: number   // % minimum
  warranty: string
  typicalSavings: string     // e.g. "35–50% vs new"
}

// ── Cart ──────────────────────────────────────────────────────

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// ── Order / Tracking ──────────────────────────────────────────

export type OrderStatus =
  | 'confirmed'
  | 'packed'
  | 'out_for_delivery'
  | 'delivered'
  | 'returned'
  | 'issue'

export interface OrderStatusStep {
  status: OrderStatus
  label: string
  timestamp?: string   // ISO string
  riderName?: string   // only for out_for_delivery
  riderPhone?: string
}

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  statusHistory: OrderStatusStep[]
  address: Address
  deliverySlot?: string
  total: number
  createdAt: string
}

// ── Address / Delivery ────────────────────────────────────────

export interface Address {
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  pincode: string
  state: string
}

export type PincodeCheckStatus =
  | 'idle'
  | 'checking'
  | 'deliverable'
  | 'not-deliverable'
  | 'invalid-format'

export interface DeliveryZone {
  pincode: string
  area: string
  city: string
  sameDayAvailable: boolean
}

// ── RFQ / Bulk & Govt ─────────────────────────────────────────

export type EnquiryType = 'bulk' | 'government'

export interface RFQLead {
  id?: string
  enquiryType: EnquiryType
  orgName: string
  contactName: string
  phone: string
  email: string
  quantity: number
  specNeeds: string
  gstNumber?: string
  tenderRef?: string
  submittedAt?: string
}

// ── Customer / Auth ───────────────────────────────────────────

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
}

// ── Store Locations ───────────────────────────────────────────

export interface StoreLocation {
  id: string
  name: string
  city: 'Raipur' | 'Ambikapur'
  address: string
  phone: string
  hours: string
  deliveryAvailable: boolean  // Raipur: true, Ambikapur: false
  mapUrl?: string
}

// ── UI State ──────────────────────────────────────────────────

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

export interface AsyncState<T> {
  status: AsyncStatus
  data: T | null
  error?: string
}

// ── Filter / Sort ─────────────────────────────────────────────

export interface FilterState {
  condition: Condition[]
  brands: string[]
  grades: Grade[]
  ramOptions: string[]
  priceRange: [number, number]
  sort: SortOption
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'grade-asc'
