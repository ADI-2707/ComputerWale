import { create } from 'zustand'
import type { Condition, Grade, SortOption, FilterState } from '../types'

interface FilterStore extends FilterState {
  setCondition: (conditions: Condition[]) => void
  toggleCondition: (condition: Condition) => void
  toggleBrand: (brand: string) => void
  toggleGrade: (grade: Grade) => void
  toggleRam: (ram: string) => void
  setPriceRange: (range: [number, number]) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void
  getActiveFilterCount: () => number
}

const DEFAULT_FILTERS: FilterState = {
  condition: [],
  brands: [],
  grades: [],
  ramOptions: [],
  priceRange: [15000, 150000],
  sort: 'newest',
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_FILTERS,

  setCondition: (condition) => set({ condition }),

  toggleCondition: (cond) =>
    set((state) => ({
      condition: state.condition.includes(cond)
        ? state.condition.filter((c) => c !== cond)
        : [...state.condition, cond],
    })),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  toggleGrade: (grade) =>
    set((state) => ({
      grades: state.grades.includes(grade)
        ? state.grades.filter((g) => g !== grade)
        : [...state.grades, grade],
    })),

  toggleRam: (ram) =>
    set((state) => ({
      ramOptions: state.ramOptions.includes(ram)
        ? state.ramOptions.filter((r) => r !== ram)
        : [...state.ramOptions, ram],
    })),

  setPriceRange: (priceRange) => set({ priceRange }),

  setSort: (sort) => set({ sort }),

  resetFilters: () => set({ ...DEFAULT_FILTERS }),

  getActiveFilterCount: () => {
    const s = get()
    let count = 0
    if (s.condition.length > 0) count += s.condition.length
    if (s.brands.length > 0) count += s.brands.length
    if (s.grades.length > 0) count += s.grades.length
    if (s.ramOptions.length > 0) count += s.ramOptions.length
    if (s.priceRange[0] > DEFAULT_FILTERS.priceRange[0] || s.priceRange[1] < DEFAULT_FILTERS.priceRange[1]) {
      count += 1
    }
    return count
  },
}))
