import { useEffect } from 'react'
import { clsx } from 'clsx'
import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'warning' | 'error' | 'info'

export interface ToastData {
  id: string
  variant: ToastVariant
  title: string
  message?: string
  duration?: number  // ms, default 5000
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void
}

const ICONS: Record<ToastVariant, string> = {
  success: '✓',
  warning: '!',
  error: '✕',
  info: 'i',
}

export function Toast({ id, variant, title, message, duration = 5000, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onDismiss])

  return (
    <div className={clsx(styles.toast, styles[variant])} role="alert" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">{ICONS[variant]}</span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastData[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null
  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
