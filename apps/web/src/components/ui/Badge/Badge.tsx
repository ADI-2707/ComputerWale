import { clsx } from 'clsx'
import styles from './Badge.module.css'
import type { Grade, Condition, OrderStatus } from '../../../types'

type BadgeVariant = 'grade-a' | 'grade-b' | 'grade-c' | 'new' | 'condition' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  label?: string
  grade?: Grade
  condition?: Condition
  status?: OrderStatus
  className?: string
}

const GRADE_MAP: Record<NonNullable<Grade>, BadgeVariant> = {
  A: 'grade-a',
  B: 'grade-b',
  C: 'grade-c',
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  packed: 'Packed',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  returned: 'Returned',
  issue: 'Issue',
}

export function Badge({ variant, label, grade, condition, status, className }: BadgeProps) {
  // Auto-derive variant from grade/condition/status if not passed
  const resolvedVariant: BadgeVariant = variant
    ?? (grade ? GRADE_MAP[grade] : undefined)
    ?? (condition === 'new' ? 'new' : condition ? 'condition' : undefined)
    ?? (status ? (status === 'delivered' ? 'success' : status === 'issue' || status === 'returned' ? 'error' : 'info') : undefined)
    ?? 'info'

  const resolvedLabel = label
    ?? (grade ? `Grade ${grade}` : undefined)
    ?? (condition === 'new' ? 'New' : condition === 'refurbished' ? 'Refurbished' : condition === 'second-hand' ? '2nd Hand' : undefined)
    ?? (status ? STATUS_LABEL[status] : undefined)
    ?? ''

  return (
    <span className={clsx(styles.badge, styles[resolvedVariant], className)}>
      {resolvedLabel}
    </span>
  )
}
