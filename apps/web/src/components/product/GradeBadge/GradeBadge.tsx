import { clsx } from 'clsx'
import styles from './GradeBadge.module.css'
import type { Grade, Condition } from '../../../types'

interface GradeBadgeProps {
  grade: Grade
  condition: Condition
  size?: 'sm' | 'md'
  className?: string
}

export function GradeBadge({ grade, condition, size = 'md', className }: GradeBadgeProps) {
  if (condition === 'new') {
    return <span className={clsx(styles.badge, styles.new, styles[size], className)}>New</span>
  }
  if (!grade) return null

  return (
    <span className={clsx(styles.badge, styles[`grade${grade}`], styles[size], className)}>
      Grade {grade}
    </span>
  )
}
