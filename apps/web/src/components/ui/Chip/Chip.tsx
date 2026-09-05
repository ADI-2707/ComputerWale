import { clsx } from 'clsx'
import styles from './Chip.module.css'

interface ChipProps {
  label: string
  selected?: boolean
  removable?: boolean
  onRemove?: () => void
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Chip({ label, selected = false, removable = false, onRemove, onClick, className, disabled = false }: ChipProps) {
  return (
    <span
      className={clsx(styles.chip, selected && styles.selected, disabled && styles.disabled, className)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-pressed={onClick ? selected : undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={!disabled && onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      {label}
      {removable && (
        <button
          className={styles.removeBtn}
          onClick={(e) => { e.stopPropagation(); onRemove?.() }}
          aria-label={`Remove ${label} filter`}
          tabIndex={0}
        >
          ×
        </button>
      )}
    </span>
  )
}
