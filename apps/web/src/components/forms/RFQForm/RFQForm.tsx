import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from './RFQForm.module.css'
import type { EnquiryType } from '../../../types'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'

const schema = z.object({
  orgName: z.string().min(2, 'Organisation name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  quantity: z.number({ invalid_type_error: 'Enter a number' }).min(1, 'Minimum 1 unit').max(10000),
  specNeeds: z.string().min(10, 'Describe your spec needs (min 10 characters)'),
  gstNumber: z.string().optional(),
  tenderRef: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface RFQFormProps {
  enquiryType: EnquiryType
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export function RFQForm({ enquiryType }: RFQFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [refNumber, setRefNumber] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('submitting')
    try {
      
      await new Promise(res => setTimeout(res, 1200))
      const ref = `CW-${enquiryType.toUpperCase().slice(0, 1)}-${Date.now().toString().slice(-6)}`
      setRefNumber(ref)
      setSubmitStatus('success')
      console.log('RFQ submitted:', { ...data, enquiryType })
    } catch {
      setSubmitStatus('error')
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className={styles.successPanel} role="alert">
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Enquiry received</h3>
        <p className={styles.successBody}>
          Reference: <strong>{refNumber}</strong>
        </p>
        <p className={styles.successBody}>
          Our team will call you within 1 business day to discuss your requirements.
        </p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitStatus === 'error' && (
        <div className={styles.formError} role="alert">
          Couldn't submit — check your connection and try again.
        </div>
      )}

      <div className={styles.row}>
        <Input
          label="Organisation / Company name *"
          {...register('orgName')}
          errorText={errors.orgName?.message}
          placeholder="e.g. Raipur Municipal Corporation"
          id="rfq-org-name"
        />
        <Input
          label="Contact person name *"
          {...register('contactName')}
          errorText={errors.contactName?.message}
          placeholder="Your full name"
          id="rfq-contact-name"
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Mobile number *"
          variant="tel"
          {...register('phone')}
          errorText={errors.phone?.message}
          placeholder="10-digit mobile"
          id="rfq-phone"
        />
        <Input
          label="Email address *"
          variant="email"
          {...register('email')}
          errorText={errors.email?.message}
          placeholder="you@organisation.com"
          id="rfq-email"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="rfq-quantity" className={styles.label}>
            Quantity required *
          </label>
          <input
            id="rfq-quantity"
            type="number"
            className={`${styles.numInput} ${errors.quantity ? styles.numInputError : ''}`}
            {...register('quantity', { valueAsNumber: true })}
            min={1}
            max={10000}
            placeholder="e.g. 50"
          />
          {errors.quantity && <p className={styles.fieldError}>{errors.quantity.message}</p>}
        </div>

        {enquiryType === 'government' && (
          <Input
            label="Tender / Allotment reference"
            {...register('tenderRef')}
            errorText={errors.tenderRef?.message}
            placeholder="Tender no. or reference (if applicable)"
            id="rfq-tender-ref"
          />
        )}
      </div>

      <div className={styles.fullRow}>
        <label htmlFor="rfq-spec-needs" className={styles.label}>
          Specification requirements *
        </label>
        <textarea
          id="rfq-spec-needs"
          className={`${styles.textarea} ${errors.specNeeds ? styles.textareaError : ''}`}
          {...register('specNeeds')}
          placeholder="e.g. Core i5 11th gen, 16GB RAM, 512GB SSD, Windows 11 Pro, ≥Grade A refurbished — for office use"
          rows={4}
        />
        {errors.specNeeds && <p className={styles.fieldError}>{errors.specNeeds.message}</p>}
      </div>

      <Input
        label="GST number (optional)"
        {...register('gstNumber')}
        errorText={errors.gstNumber?.message}
        placeholder="22AAAAA0000A1Z5"
        id="rfq-gst"
        helperText="Required for GST invoice. Can also be shared later."
      />

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={submitStatus === 'submitting'}
          disabled={submitStatus === 'submitting'}
        >
          Submit Enquiry
        </Button>
        <p className={styles.disclaimer}>
          No payment required. Our team will contact you with a detailed quote.
        </p>
      </div>
    </form>
  )
}
