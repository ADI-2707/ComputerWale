import styles from './PriceBlock.module.css'
import type { Condition } from '../../../types'
import { formatPrice, discountPercent } from '../../../lib/mockData'

interface PriceBlockProps {
  mrp: number
  price: number
  condition: Condition
  emiMonths?: number
  size?: 'sm' | 'md' | 'lg'
}

export function PriceBlock({ mrp, price, condition, emiMonths = 12, size = 'md' }: PriceBlockProps) {
  const hasDiscount = condition !== 'new' && mrp > price
  const savings = mrp - price
  const discount = discountPercent(mrp, price)
  const emi = Math.ceil(price / emiMonths)

  return (
    <div className={`${styles.block} ${styles[size]}`}>
      <div className={styles.priceRow}>
        <span className={styles.price}>{formatPrice(price)}</span>
        {hasDiscount && (
          <>
            <span className={styles.mrp}>{formatPrice(mrp)}</span>
            <span className={styles.discountBadge}>{discount}% off</span>
          </>
        )}
      </div>
      {hasDiscount && (
        <p className={styles.savings}>You save {formatPrice(savings)}</p>
      )}
      <p className={styles.emi}>
        EMI from {formatPrice(emi)}/mo · No-cost EMI available
      </p>
    </div>
  )
}
