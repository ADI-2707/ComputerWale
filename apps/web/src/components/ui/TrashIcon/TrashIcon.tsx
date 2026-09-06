import { useState } from 'react'
import { clsx } from 'clsx'
import styles from './TrashIcon.module.css'

interface TrashIconProps {
  size?: number
  className?: string
  open?: boolean
}

export function TrashIcon({ size = 18, className, open = false }: TrashIconProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <svg
      className={clsx(styles.icon, (open || hovered) && styles.open, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >

      <g className={styles.lid}>
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </g>

      <g className={styles.body}>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </g>
    </svg>
  )
}

