import { useState, useCallback } from 'react'
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

  const handleCheck = useCallback(() => {
    const trimmed = pincode.trim()
    if (!/^\d{6}$/.test(trimmed)) {
      setStatus('invalid-format')
      return
    }
    setStatus('checking')
    // Simulate a short async check (real: API call)
    setTimeout(() => {
      const res = checkPincode(trimmed)
      if (!res.valid) { setStatus('invalid-format'); return }
      if (res.deliverable) {
        setStatus('deliverable')
        setResult({ area: res.area, sameDay: res.sameDay })
        onPincodeChecked?.(trimmed, true)
      } else {
        setStatus('not-deliverable')
        setResult(null)
        onPincodeChecked?.(trimmed, false)
      }
    }, 400)
  }, [pincode, onPincodeChecked])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Check delivery to your pincode</p>
      <div className={styles.inputRow}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          value={pincode}
          onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setStatus('idle') }}
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${status === 'invalid-format' ? styles.inputError : ''}`}
          aria-label="Pincode"
          aria-invalid={status === 'invalid-format'}
          aria-describedby="pincode-result"
        />
        <button
          className={styles.checkBtn}
          onClick={handleCheck}
          disabled={status === 'checking' || pincode.length !== 6}
          aria-label="Check delivery"
        >
          {status === 'checking' ? 'Checking…' : 'Check'}
        </button>
      </div>

      <div id="pincode-result" aria-live="polite">
        {status === 'invalid-format' && (
          <p className={`${styles.result} ${styles.error}`}>
            Enter a valid 6-digit pincode.
          </p>
        )}
        {status === 'deliverable' && result && (
          <p className={`${styles.result} ${styles.success}`}>
            ✓ Delivers to {result.area ?? 'your area'} —{' '}
            {result.sameDay ? 'same-day or next-day available' : 'next-day delivery'}
          </p>
        )}
        {status === 'not-deliverable' && (
          <p className={`${styles.result} ${styles.warning}`}>
            Outside the Raipur delivery zone. Visit or call the Raipur store (+91 98765 43210) or
            the Ambikapur store (+91 98765 43211) to buy in person.
          </p>
        )}
      </div>
    </div>
  )
}
