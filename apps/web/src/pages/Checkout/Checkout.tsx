import { useState } from 'react'
import { Link } from 'react-router'
import styles from './Checkout.module.css'
import { useCartStore } from '../../state/cartStore'
import { formatPrice, checkPincode } from '../../lib/mockData'
import { Button } from '../../components/ui/Button'

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCartStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [addressLine, setAddressLine] = useState('')
  const [pincode, setPincode] = useState('492001')
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery')
  const [slot, setSlot] = useState('same-day-evening')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'online'>('cod')
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const subtotal = getSubtotal()
  const pincodeCheck = checkPincode(pincode)

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and phone number.')
      return
    }
    if (deliveryType === 'delivery' && !addressLine.trim()) {
      setErrorMsg('Please enter your street address.')
      return
    }

    const generatedId = `CW-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderSuccessId(generatedId)
    clearCart()
  }

  if (orderSuccessId) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <span className={styles.orderBadge}>Order Confirmed</span>
          <h1 className={styles.successTitle}>Thank You, {name}!</h1>
          <p className={styles.successText}>
            Your order <strong>#{orderSuccessId}</strong> has been received and sent to our Pandri, Raipur packing desk.
          </p>

          <div className={styles.successDetails}>
            <div className={styles.detailRow}>
              <span>Fulfillment:</span>
              <strong>{deliveryType === 'pickup' ? 'Store Pickup (Pandri, Raipur)' : `Doorstep Delivery (${pincode})`}</strong>
            </div>
            {deliveryType === 'delivery' && (
              <div className={styles.detailRow}>
                <span>Assigned Slot:</span>
                <strong>
                  {slot === 'same-day-evening'
                    ? 'Today Evening (4:00 PM – 8:00 PM)'
                    : slot === 'same-day-morning'
                    ? 'Today Morning (10:00 AM – 1:00 PM)'
                    : 'Tomorrow Morning (10:00 AM – 1:00 PM)'}
                </strong>
              </div>
            )}
            <div className={styles.detailRow}>
              <span>Payment:</span>
              <strong>
                {paymentMethod === 'cod'
                  ? 'Cash / Card on Delivery'
                  : paymentMethod === 'upi'
                  ? 'UPI QR Scan on Delivery'
                  : 'Prepaid Online'}
              </strong>
            </div>
            <div className={styles.detailRow}>
              <span>Total Payable:</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <Link to={`/track-order?id=${orderSuccessId}`}>
              <Button variant="primary" size="lg">
                Track Your Delivery
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptySub}>Please add at least one laptop to your cart to proceed with checkout.</p>
        <Link to="/laptops">
          <Button variant="primary">Shop Laptops</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

      <form onSubmit={handleSubmitOrder} className={styles.checkoutGrid}>

        <div className={styles.formCol}>

          <div className={styles.sectionCard}>
            <h2 className={styles.cardHeading}>1. Contact Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email (for invoice copy)</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <h2 className={styles.cardHeading}>2. Delivery Option</h2>
            <div className={styles.deliveryToggle}>
              <label
                className={`${styles.toggleOption} ${deliveryType === 'delivery' ? styles.toggleActive : ''}`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="delivery"
                  checked={deliveryType === 'delivery'}
                  onChange={() => setDeliveryType('delivery')}
                />
                <div>
                  <strong>Doorstep Delivery</strong>
                  <span>Free same-day in Raipur</span>
                </div>
              </label>

              <label
                className={`${styles.toggleOption} ${deliveryType === 'pickup' ? styles.toggleActive : ''}`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  checked={deliveryType === 'pickup'}
                  onChange={() => setDeliveryType('pickup')}
                />
                <div>
                  <strong>Store Pickup</strong>
                  <span>Shop No. 12, Pandri, Raipur</span>
                </div>
              </label>
            </div>

            {deliveryType === 'delivery' ? (
              <div className={styles.addressFields}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Street Address & Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat / House No., Street, Landmark"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Raipur Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className={styles.input}
                    />
                    {pincodeCheck.deliverable && (
                      <span className={styles.pincodeValid}>
                        ✓ Deliverable to {pincodeCheck.area || 'Raipur'}
                      </span>
                    )}
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>City</label>
                    <input type="text" value="Raipur, Chhattisgarh" readOnly className={styles.inputDisabled} />
                  </div>
                </div>

                <div className={styles.slotPicker}>
                  <label className={styles.label}>Preferred Delivery Slot:</label>
                  <div className={styles.slotOptions}>
                    <label className={styles.slotRadio}>
                      <input
                        type="radio"
                        name="slot"
                        value="same-day-evening"
                        checked={slot === 'same-day-evening'}
                        onChange={(e) => setSlot(e.target.value)}
                      />
                      <span>Today Evening (4:00 PM – 8:00 PM)</span>
                    </label>
                    <label className={styles.slotRadio}>
                      <input
                        type="radio"
                        name="slot"
                        value="next-day-morning"
                        checked={slot === 'next-day-morning'}
                        onChange={(e) => setSlot(e.target.value)}
                      />
                      <span>Tomorrow Morning (10:00 AM – 1:00 PM)</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.pickupInfo}>
                <p>
                  <strong>Pickup location:</strong> Computer Wale, Shop No. 12, IT Park Road, Pandri, Raipur.
                  <br />
                  Ready within 30 minutes. You can physically test the laptop before making payment.
                </p>
              </div>
            )}
          </div>

          <div className={styles.sectionCard}>
            <h2 className={styles.cardHeading}>3. Payment Method</h2>
            <div className={styles.paymentMethods}>
              <label className={`${styles.paymentRadio} ${paymentMethod === 'cod' ? styles.methodActive : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div>
                  <strong>Cash / Card on Delivery</strong>
                  <span>Pay with cash or swipe your debit/credit card with our delivery rider.</span>
                </div>
              </label>

              <label className={`${styles.paymentRadio} ${paymentMethod === 'upi' ? styles.methodActive : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <div>
                  <strong>UPI on Delivery</strong>
                  <span>Scan Google Pay / PhonePe / Paytm QR upon device inspection at your doorstep.</span>
                </div>
              </label>

              <label className={`${styles.paymentRadio} ${paymentMethod === 'online' ? styles.methodActive : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                <div>
                  <strong>Prepay Online (Razorpay / Cards)</strong>
                  <span>Instant checkout with netbanking, credit cards, or UPI.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.orderSummaryCol}>
          <div className={styles.reviewCard}>
            <h2 className={styles.reviewHeading}>Order Summary</h2>

            <div className={styles.reviewItems}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className={styles.reviewItem}>
                  <div>
                    <div className={styles.reviewItemTitle}>
                      {product.brand} {product.model}
                    </div>
                    <div className={styles.reviewItemMeta}>
                      Qty: {quantity} · Grade {product.grade ?? 'New'}
                    </div>
                  </div>
                  <div className={styles.reviewItemPrice}>{formatPrice(product.price * quantity)}</div>
                </div>
              ))}
            </div>

            <div className={styles.calcRows}>
              <div className={styles.calcRow}>
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.calcRow}>
                <span>Local Raipur Delivery:</span>
                <span className={styles.freeText}>FREE</span>
              </div>
              <div className={`${styles.calcRow} ${styles.totalCalcRow}`}>
                <span>Total Amount:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Place Order ({formatPrice(subtotal)})
            </Button>

            <div className={styles.trustFooter}>
              <span>🛡️ 6-Month Raipur Warranty Included</span>
              <span>📦 Inspected before packing</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

