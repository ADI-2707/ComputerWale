import styles from './StockIndicator.module.css'

interface StockIndicatorProps {
  stock: number
  lowThreshold?: number
}

export function StockIndicator({ stock, lowThreshold = 3 }: StockIndicatorProps) {
  if (stock === 0) {
    return <p className={`${styles.indicator} ${styles.outOfStock}`}>Out of stock</p>
  }
  if (stock <= lowThreshold) {
    return <p className={`${styles.indicator} ${styles.lowStock}`}>Only {stock} left in Raipur stock</p>
  }
  return <p className={`${styles.indicator} ${styles.inStock}`}>In stock · Raipur</p>
}
