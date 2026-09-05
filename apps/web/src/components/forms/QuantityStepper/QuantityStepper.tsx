import styles from './QuantityStepper.module.css'

interface QuantityStepperProps {
  value: number
  min?: number
  max?: number
  bulkThreshold?: number   // If qty > this, CTA swaps to "Request Bulk Quote"
  onChange: (value: number) => void
  onBulkMode?: (isBulk: boolean) => void
}

export function QuantityStepper({
  value,
  min = 1,
  max = 500,
  bulkThreshold = 5,
  onChange,
  onBulkMode,
}: QuantityStepperProps) {
  const isBulk = value > bulkThreshold

  const handleChange = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next))
    onChange(clamped)
    onBulkMode?.(clamped > bulkThreshold)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.stepper} role="group" aria-label="Quantity">
        <button
          className={styles.btn}
          onClick={() => handleChange(value - 1)}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          className={styles.input}
          value={value}
          min={min}
          max={max}
          onChange={e => handleChange(Number(e.target.value))}
          aria-label="Quantity"
        />
        <button
          className={styles.btn}
          onClick={() => handleChange(value + 1)}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      {isBulk && (
        <p className={styles.bulkNote}>
          Ordering {value}+ units? Your cart will switch to a <strong>Bulk Quote</strong> request.
        </p>
      )}
    </div>
  )
}
