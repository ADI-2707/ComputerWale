import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './Input.module.css'

type InputVariant = 'text' | 'number' | 'search' | 'email' | 'tel'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant?: InputVariant
  label?: string
  helperText?: string
  errorText?: string
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = 'text', label, helperText, errorText, prefixIcon, suffixIcon, containerClassName, className, id, ...props },
    ref,
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 8)}`
    const hasError = Boolean(errorText)

    return (
      <div className={clsx(styles.container, containerClassName)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={clsx(styles.inputWrapper, hasError && styles.error)}>
          {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            type={variant === 'search' ? 'search' : variant}
            className={clsx(styles.input, prefixIcon && styles.withPrefix, suffixIcon && styles.withSuffix, className)}
            aria-invalid={hasError}
            aria-describedby={errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {suffixIcon && <span className={styles.suffixIcon}>{suffixIcon}</span>}
        </div>
        {hasError && (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {errorText}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
