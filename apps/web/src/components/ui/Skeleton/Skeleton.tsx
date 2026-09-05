import { clsx } from 'clsx'
import styles from './Skeleton.module.css'

type SkeletonVariant = 'text' | 'card' | 'table-row' | 'circle' | 'image'

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string
  height?: string
  lines?: number   
  className?: string
}

export function Skeleton({ variant = 'text', width, height, lines = 1, className }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={clsx(styles.textGroup, className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={styles.textLine}
            style={{ width: i === lines - 1 ? '65%' : width ?? '100%' }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={clsx(styles.card, className)}>
        <div className={styles.cardImage} />
        <div className={styles.cardBody}>
          <div className={clsx(styles.textLine, styles.wide)} />
          <div className={clsx(styles.textLine, styles.medium)} />
          <div className={clsx(styles.textLine, styles.narrow)} />
          <div className={styles.cardFooter}>
            <div className={clsx(styles.textLine, styles.price)} />
            <div className={clsx(styles.textLine, styles.btn)} />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'table-row') {
    return (
      <div className={clsx(styles.tableRow, className)}>
        {[60, 100, 80, 60, 40].map((w, i) => (
          <div key={i} className={styles.cell} style={{ width: `${w}px` }} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={clsx(styles.base, variant === 'circle' && styles.circle, variant === 'image' && styles.image, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
