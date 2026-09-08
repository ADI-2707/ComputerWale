import { useState, useCallback } from 'react'
import { Link } from 'react-router'
import styles from './PincodeChecker.module.css'
import { checkPincode } from '../../../lib/mockData'
import type { PincodeCheckStatus } from '../../../types'

interface PincodeCheckerProps {
  onPincodeChecked?: (pincode: string, deliverable: boolean) => void
  defaultPincode?: string
}


export function PincodeChecker({ onPincodeChecked, defaultPincode = '' }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState(defaultPincode)
  const [status, setStatus] = useState<PincodeCheckStatus>('idle')
  const [result, setResult] = useState<{ area?: string; sameDay?: boolean } | null>(null)

  const verifyPincode = useCallback((code: string) => {
    const trimmed = code.trim()
    if (!/^\d{6}$/.test(trimmed)) {
      setStatus('invalid-format')
      return
    }
    setStatus('checking')

    setTimeout(() => {
      const res = checkPincode(trimmed)
      if (!res.valid) {
        setStatus('invalid-format')
        return
      }
      if (res.deliverable) {
        setStatus('deliverable')
        setResult({ area: res.area, sameDay: res.sameDay })
        onPincodeChecked?.(trimmed, true)
      } else {
        setStatus('not-deliverable')
        setResult(null)
        onPincodeChecked?.(trimmed, false)
      }
    }, 350)
  }, [onPincodeChecked])

  const handleCheck = () => {
    verifyPincode(pincode)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.labelGroup}>
          <svg className={styles.pinIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className={styles.label}>Check delivery &amp; doorstep testing</span>
        </div>
        <span className={styles.regionBadge}>Raipur &amp; nearby</span>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={e => {
              setPincode(e.target.value.replace(/\D/g, ''))
              if (status !== 'idle') setStatus('idle')
            }}
            onKeyDown={handleKeyDown}
            className={`${styles.input} ${status === 'invalid-format' ? styles.inputError : ''}`}
            aria-label="Pincode"
            aria-invalid={status === 'invalid-format'}
            aria-describedby="pincode-result"
          />
          {pincode.length > 0 && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setPincode('')
                setStatus('idle')
                setResult(null)
              }}
              aria-label="Clear pincode"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          className={styles.checkBtn}
          onClick={handleCheck}
          disabled={status === 'checking' || pincode.length !== 6}
          aria-label="Check delivery"
        >
          {status === 'checking' ? (
            <>
              <span className={styles.btnSpinner} aria-hidden="true" />
              <span>Checking…</span>
            </>
          ) : (
            'Check'
          )}
        </button>
      </div>

      <div id="pincode-result" aria-live="polite" className={styles.resultContainer}>
        {status === 'invalid-format' && (
          <div className={`${styles.result} ${styles.error}`}>
            <svg className={styles.resultIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Please enter a valid 6-digit Indian pincode.</span>
          </div>
        )}
        {status === 'deliverable' && result && (
          <div className={`${styles.result} ${styles.success}`}>
            <div className={styles.successHeader}>
              <svg className={styles.resultIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <strong>Deliverable to {result.area ?? 'Raipur'} ({pincode})</strong>
            </div>
            <div className={styles.successDetails}>
              <span className={styles.deliveryBadge}>
                {result.sameDay ? '⚡ Same-Day / Next-Day Delivery' : '🚚 Standard Next-Day Delivery'}
              </span>
              <span className={styles.testingBadge}>✓ Doorstep inspection &amp; testing available</span>
            </div>
          </div>
        )}
        {status === 'not-deliverable' && (
          <div className={`${styles.result} ${styles.warning}`}>
            <div className={styles.warningHeader}>
              <svg className={styles.resultIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <strong>Outside our direct doorstep courier zone</strong>
            </div>
            <p className={styles.warningText}>
              Doorstep delivery for {pincode} isn't currently automated, but units can be picked up directly or dispatched via custom courier from our experience centers:
            </p>
            <div className={styles.storeContacts}>
              <a href="tel:+919876543210" className={styles.storeContactPill}>
                📞 Raipur Store (+91 98765 43210)
              </a>
              <a href="tel:+919876543211" className={styles.storeContactPill}>
                📞 Ambikapur Store (+91 98765 43211)
              </a>
              <Link to="/stores" className={styles.storesLink}>
                View Store Locations &amp; Timings →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
