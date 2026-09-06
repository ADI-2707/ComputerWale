import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
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

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const isLowStock = product.stock > 0 && product.stock <= 3
  const isOutOfStock = product.stock === 0

  const handleClick = (e: React.MouseEvent) => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) {
      navigate(`/laptops/${product.slug}`)
      return
    }
    e.preventDefault()
    navigate(`/laptops/${product.slug}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/laptops/${product.slug}`)
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

        <div className={styles.badgeOverlay}>
          <GradeBadge grade={product.grade} condition={product.condition} />
        </div>

        {isLowStock && (
          <div className={styles.lowStockOverlay}>
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.headerMeta}>
          <p className={styles.brand}>{product.brand}</p>
          <StockIndicator stock={product.stock} />
        </div>

        <h3 className={styles.model}>{product.model}</h3>

        <PriceBlock mrp={product.mrp} price={product.price} condition={product.condition} />
      </div>

      <div className={styles.hoverDrawer} aria-hidden={!expanded}>
        <div className={styles.specsWrap}>
          <span className={styles.specsDot}>⚙</span>
          <p className={styles.specSummary}>{product.specSummary}</p>
        </div>

        {!isOutOfStock ? (
          <Link
            to={`/laptops/${product.slug}`}
            className={styles.viewBtn}
            onClick={e => {
              e.stopPropagation()
            }}
            aria-label={`View details for ${product.brand} ${product.model}`}
          >
            <span>View details</span>
            <span className={styles.arrowIcon}>→</span>
          </Link>
        ) : (
          <button
            className={styles.notifyBtn}
            onClick={e => e.stopPropagation()}
            aria-label="Notify when in stock"
          >
            Notify when in stock
          </button>
        )}
      </div>
    </div>
  )
}

