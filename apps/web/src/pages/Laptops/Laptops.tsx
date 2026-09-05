import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import styles from './Laptops.module.css'
import { MOCK_PRODUCTS } from '../../lib/mockData'
import { ProductCard } from '../../components/product/ProductCard'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import { useFilterStore } from '../../state/filterStore'
import type { Condition, Grade, SortOption } from '../../types'

export default function Laptops() {
  const {
    condition,
    brands,
    grades,
    ramOptions,
    priceRange,
    sort,
    toggleCondition,
    toggleBrand,
    toggleGrade,
    toggleRam,
    setPriceRange,
    setSort,
    resetFilters,
    getActiveFilterCount,
  } = useFilterStore()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Unique lists from data
  const availableBrands = useMemo(() => {
    return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand))).sort()
  }, [])

  const availableRams = ['8 GB', '16 GB', '32 GB']

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Condition filter
      if (condition.length > 0 && !condition.includes(product.condition)) {
        return false
      }
      // Brand filter
      if (brands.length > 0 && !brands.includes(product.brand)) {
        return false
      }
      // Grade filter
      if (grades.length > 0) {
        if (!product.grade || !grades.includes(product.grade)) {
          return false
        }
      }
      // RAM filter
      if (ramOptions.length > 0) {
        const matchesRam = ramOptions.some((r) => product.specs.ram.includes(r.replace(' ', '')))
        if (!matchesRam) return false
      }
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'grade-asc') {
        const gradeWeight = { A: 1, B: 2, C: 3, null: 0 }
        return (gradeWeight[a.grade ?? 'null'] ?? 9) - (gradeWeight[b.grade ?? 'null'] ?? 9)
      }
      // newest default
      return 0
    })
  }, [condition, brands, grades, ramOptions, priceRange, sort])

  const activeCount = getActiveFilterCount()

  return (
    <div className={styles.container}>
      {/* Breadcrumb & Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span className={styles.currentCrumb}>Laptops</span>
        </div>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>All Laptops in Raipur</h1>
            <p className={styles.subtitle}>
              Verified refurbished, certified 2nd hand, and brand-new laptops with local Raipur warranty.
            </p>
          </div>

          <div className={styles.topControls}>
            <button
              type="button"
              className={styles.mobileFilterBtn}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>

            <div className={styles.sortWrapper}>
              <label htmlFor="sort-select" className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className={styles.sortSelect}
              >
                <option value="newest">Featured & Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="grade-asc">Grade: Best (A) First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {activeCount > 0 && (
          <div className={styles.activeBar}>
            <span className={styles.activeLabel}>Active Filters:</span>
            <div className={styles.activePills}>
              {condition.map((c) => (
                <Chip key={c} label={c.toUpperCase()} onRemove={() => toggleCondition(c)} removable selected />
              ))}
              {brands.map((b) => (
                <Chip key={b} label={b} onRemove={() => toggleBrand(b)} removable selected />
              ))}
              {grades.map((g) => (
                <Chip key={g} label={`Grade ${g}`} onRemove={() => toggleGrade(g)} removable selected />
              ))}
              {ramOptions.map((r) => (
                <Chip key={r} label={r} onRemove={() => toggleRam(r)} removable selected />
              ))}
              {(priceRange[0] > 15000 || priceRange[1] < 150000) && (
                <Chip
                  label={`₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`}
                  onRemove={() => setPriceRange([15000, 150000])}
                  removable
                  selected
                />
              )}
              <button type="button" onClick={resetFilters} className={styles.clearAllBtn}>
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.contentLayout}>
        {/* Desktop Sidebar Filters */}
        <aside className={`${styles.filterRail} ${mobileFiltersOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.railHeader}>
            <h2 className={styles.railTitle}>Filters</h2>
            {activeCount > 0 && (
              <button type="button" onClick={resetFilters} className={styles.resetBtn}>
                Reset All
              </button>
            )}
            <button
              type="button"
              className={styles.mobileCloseBtn}
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>

          {/* Condition Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterHeading}>Condition Tier</h3>
            <div className={styles.optionList}>
              {(['refurbished', 'second-hand', 'new'] as Condition[]).map((cond) => (
                <label key={cond} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={condition.includes(cond)}
                    onChange={() => toggleCondition(cond)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkText}>
                    {cond === 'refurbished' ? 'Refurbished (Graded)' : cond === 'second-hand' ? '2nd Hand' : 'Brand New'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Grade Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterHeading}>Refurbished Grade</h3>
            <div className={styles.optionList}>
              {(['A', 'B', 'C'] as Grade[]).map((grade) => (
                <label key={grade} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={grades.includes(grade)}
                    onChange={() => toggleGrade(grade)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkText}>Grade {grade}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterHeading}>Brand</h3>
            <div className={styles.optionList}>
              {availableBrands.map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkText}>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterHeading}>RAM</h3>
            <div className={styles.optionList}>
              {availableRams.map((ram) => (
                <label key={ram} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={ramOptions.includes(ram)}
                    onChange={() => toggleRam(ram)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkText}>{ram}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className={styles.filterSection}>
            <div className={styles.priceHeadingRow}>
              <h3 className={styles.filterHeading}>Max Price</h3>
              <span className={styles.priceValue}>₹{priceRange[1].toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="15000"
              max="150000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className={styles.rangeSlider}
            />
            <div className={styles.rangeLabels}>
              <span>₹15k</span>
              <span>₹1.5 Lakh</span>
            </div>
          </div>

          <div className={styles.mobileApplyWrap}>
            <Button variant="primary" fullWidth onClick={() => setMobileFiltersOpen(false)}>
              Show {filteredProducts.length} Results
            </Button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className={styles.mainGridArea}>
          <div className={styles.resultsInfo}>
            <span>
              Showing <strong>{filteredProducts.length}</strong> laptops
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h2 className={styles.emptyTitle}>No laptops match your filters</h2>
              <p className={styles.emptyText}>
                Try loosening your filter criteria or clearing all filters to see our full inventory in Raipur.
              </p>
              <Button variant="primary" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
