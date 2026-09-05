import { useState, useRef } from 'react'
import { clsx } from 'clsx'
import styles from './ProductCard.module.css'
import type { Product } from '../../../types'
import { PriceBlock } from '../PriceBlock'
import { GradeBadge } from '../GradeBadge'
import { StockIndicator } from '../StockIndicator'

interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'list'
  defaultPincode?: string
}

export function ProductCard({ product, variant = 'grid', defaultPincode }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const isLowStock = product.stock > 0 && product.stock <= 3
  const isOutOfStock = product.stock === 0

  const deliveryLine = defaultPincode
    ? 'Delivers to Raipur by tomorrow'
    : 'Check delivery → enter your pincode'

  const handleClick = (e: React.MouseEvent) => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) {
      window.location.href = `/laptops/${product.slug}`
      return
    }
    
    e.preventDefault()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.href = `/laptops/${product.slug}`
    }
  }

  return (
    <div
      ref={cardRef}
      className={clsx(
        styles.card,
        variant === 'list' && styles.listVariant,
        expanded && styles.expanded,
        isOutOfStock && styles.outOfStock,
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
      aria-label={`${product.brand} ${product.model} — ₹${product.price.toLocaleString('en-IN')}`}
    >
      {}
      <div className={styles.imageWrap}>
        {!imgError ? (
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.model}`}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="10" width="40" height="26" rx="3" stroke="var(--blue-200)" strokeWidth="2"/>
              <path d="M14 40h20" stroke="var(--blue-200)" strokeWidth="2" strokeLinecap="round"/>
              <rect x="10" y="14" width="28" height="18" rx="1.5" fill="var(--blue-50)"/>
            </svg>
            <span>{product.brand}</span>
          </div>
        )}

        {}
        <div className={styles.badgeOverlay}>
          <GradeBadge grade={product.grade} condition={product.condition} />
        </div>

        {}
        {isLowStock && (
          <div className={styles.lowStockOverlay}>
            Only {product.stock} left
          </div>
        )}
      </div>

      {}
      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.model}>{product.model}</h3>
        <p className={styles.specSummary}>{product.specSummary}</p>

        <StockIndicator stock={product.stock} />

        <PriceBlock mrp={product.mrp} price={product.price} condition={product.condition} />

        {!isOutOfStock && (
          <a
            href={`/laptops/${product.slug}`}
            className={styles.viewBtn}
            onClick={e => e.stopPropagation()}
            aria-label={`View details for ${product.brand} ${product.model}`}
          >
            View details →
          </a>
        )}

        {isOutOfStock && (
          <button className={styles.notifyBtn} aria-label="Notify when in stock">
            Notify when in stock
          </button>
        )}
      </div>

      {}
      <div className={styles.expandPanel} aria-hidden={!expanded}>
        <div className={styles.expandInner}>
          {product.batteryHealth && (
            <div className={styles.expandRow}>
              <span className={styles.expandLabel}>Battery health</span>
              <span className={styles.expandValue}>{product.batteryHealth}%</span>
            </div>
          )}
          {product.cosmeticDetails && (
            <div className={styles.expandRow}>
              <span className={styles.expandLabel}>Cosmetic condition</span>
              <span className={styles.expandValue}>{product.cosmeticDetails}</span>
            </div>
          )}
          <div className={styles.expandRow}>
            <span className={styles.expandLabel}>Warranty</span>
            <span className={styles.expandValue}>
              {product.warrantyMonths} month{product.warrantyMonths !== 1 ? 's' : ''}
              {product.warrantyIncludes[0] ? ` · ${product.warrantyIncludes[0]}` : ''}
            </span>
          </div>
          <div className={styles.expandDelivery}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="5" r="2" stroke="var(--color-primary)" strokeWidth="1.2"/>
              <path d="M6 11C6 11 1.5 7.5 1.5 5a4.5 4.5 0 0 1 9 0c0 2.5-4.5 6-4.5 6z" stroke="var(--color-primary)" strokeWidth="1.2"/>
            </svg>
            {deliveryLine}
          </div>
          <a
            href={`/laptops/${product.slug}`}
            className={styles.conditionReportLink}
            onClick={e => e.stopPropagation()}
          >
            Full spec &amp; condition report →
          </a>
        </div>
      </div>
    </div>
  )
}
