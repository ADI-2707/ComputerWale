import { useState, useEffect } from 'react'
import styles from './QuantityStepper.module.css'

interface QuantityStepperProps {
  value: number
  min?: number
  max?: number
  bulkThreshold?: number
  allowZero?: boolean
  onChange: (value: number) => void
  onBulkMode?: (isBulk: boolean) => void
}

export function QuantityStepper({
  value,
  min = 1,
  max = 500,
  bulkThreshold = 5,
  allowZero = false,
  onChange,
  onBulkMode,
}: QuantityStepperProps) {
  const isBulk = value > bulkThreshold
  const effectiveMin = allowZero ? 0 : min
  const [localInput, setLocalInput] = useState(String(value))

  useEffect(() => {
    setLocalInput(String(value))
  }, [value])

  const handleStep = (next: number) => {
    const clamped = Math.max(effectiveMin, Math.min(max, next))
    onChange(clamped)
    onBulkMode?.(clamped > bulkThreshold)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setLocalInput(raw)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed) && parsed >= effectiveMin) {
      const clamped = Math.min(max, parsed)
      onChange(clamped)
      onBulkMode?.(clamped > bulkThreshold)
    }
  }

  const handleBlur = () => {
    const parsed = parseInt(localInput, 10)
    if (isNaN(parsed) || parsed < effectiveMin) {
      setLocalInput(String(value))
    } else {
      const clamped = Math.max(effectiveMin, Math.min(max, parsed))
      setLocalInput(String(clamped))
      onChange(clamped)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.stepper} role="group" aria-label="Quantity">
        <button
          type="button"
          className={styles.btn}
          onClick={() => handleStep(value - 1)}
          disabled={!allowZero && value <= min}
          aria-label={allowZero && value <= 1 ? 'Remove item' : 'Decrease quantity'}
          title={allowZero && value <= 1 ? 'Remove item' : 'Decrease quantity'}
        >
          {allowZero && value === 1 ? '🗑' : '−'}
        </button>
        <input
          type="number"
          className={styles.input}
          value={localInput}
          min={effectiveMin}
          max={max}
          onChange={handleInputChange}
          onBlur={handleBlur}
          aria-label="Quantity"
        />
        <button
          type="button"
          className={styles.btn}
          onClick={() => handleStep(value + 1)}
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
