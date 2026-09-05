import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

let lastAddProductTime = 0
let lastAddProductId = ''

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        const now = Date.now()
        // Prevent rapid double-invocation (e.g. trackpad bounce, synthetic events, StrictMode)
        if (product.id === lastAddProductId && now - lastAddProductTime < 500) {
          return
        }
        lastAddProductId = product.id
        lastAddProductTime = now

        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity: Math.min(quantity, product.stock) }],
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.product.id !== productId),
            }
          }
          return {
            items: state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i
            ),
          }
        })
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      },
    }),
    {
      name: 'cw_cart_storage',
    }
  )
)
