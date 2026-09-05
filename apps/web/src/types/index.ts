
export type Condition = 'new' | 'refurbished' | 'second-hand'

export type Grade = 'A' | 'B' | 'C' | null 

export interface Product {
  id: string
  slug: string
  brand: string
  model: string
  condition: Condition
  grade: Grade
  
  specSummary: string
  specs: ProductSpecs
  mrp: number        
  price: number      
  stock: number      
  images: string[]   
  warrantyMonths: number
  warrantyIncludes: string[]  
  batteryHealth?: number      
  cosmeticDetails?: string    
  deliveryEligible: boolean   
  featured: boolean           
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

export interface GradeDefinition {
  grade: 'A' | 'B' | 'C'
  cosmeticCondition: string
  batteryHealthMin: number   
  warranty: string
  typicalSavings: string     
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

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
  timestamp?: string   
  riderName?: string   
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

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
}

export interface StoreLocation {
  id: string
  name: string
  city: 'Raipur' | 'Ambikapur'
  address: string
  phone: string
  hours: string
  deliveryAvailable: boolean  
  mapUrl?: string
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

export interface AsyncState<T> {
  status: AsyncStatus
  data: T | null
  error?: string
}

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
