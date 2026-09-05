import { type ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './MobileFilterSheet.module.css'

interface MobileFilterSheetProps {
  open: boolean
  onClose: () => void
  onApply: () => void
  onClear: () => void
  children: ReactNode
  activeFilterCount?: number
}

export function MobileFilterSheet({ open, onClose, onApply, onClear, children, activeFilterCount = 0 }: MobileFilterSheetProps) {
  return (
    <>
      {open && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}
      <div
        className={clsx(styles.sheet, open && styles.sheetOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Filter laptops"
      >
        {}
        <div className={styles.handle} />

        {}
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          {activeFilterCount > 0 && (
            <button className={styles.clearBtn} onClick={onClear}>
              Clear all ({activeFilterCount})
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">×</button>
        </div>

        {}
        <div className={styles.body}>{children}</div>

        {}
        <div className={styles.footer}>
          <button className={styles.applyBtn} onClick={() => { onApply(); onClose() }}>
            Apply Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>
      </div>
    </>
  )
}
