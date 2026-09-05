import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Customer, Address } from '../types'

interface AuthStore {
  user: Customer | null
  isAuthenticated: boolean
  login: (email: string, name?: string, phone?: string) => void
  logout: () => void
  addAddress: (address: Address) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, name = 'Valued Customer', phone = '+91 98765 43210') => {
        const dummyUser: Customer = {
          id: 'cust_' + Math.random().toString(36).substring(2, 9),
          name,
          email,
          phone,
          addresses: [
            {
              name,
              phone,
              line1: 'Near Magneto Mall, Labhandi',
              city: 'Raipur',
              pincode: '492001',
              state: 'Chhattisgarh',
            },
          ],
        }
        set({ user: dummyUser, isAuthenticated: true })
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      addAddress: (address: Address) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, address],
            },
          }
        })
      },
    }),
    {
      name: 'cw_auth_storage',
    }
  )
)
