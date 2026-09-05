import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import styles from './Cart.module.css'
import { useCartStore } from '../../state/cartStore'
import { QuantityStepper } from '../../components/forms/QuantityStepper'
import { GradeBadge } from '../../components/product/GradeBadge'
import { Button } from '../../components/ui/Button'
import { TrashIcon } from '../../components/ui/TrashIcon'
import { formatPrice } from '../../lib/mockData'

export default function Cart() {
  const navigate = useNavigate()
  const [hoveredDeleteId, setHoveredDeleteId] = useState<string | null>(null)
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getItemCount } = useCartStore()

  const subtotal = getSubtotal()
  const itemCount = getItemCount()

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyCard}>
          <div className={styles.emptyIcon}>🛒</div>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <p className={styles.emptyText}>
            Browse our verified refurbished, 2nd hand, and new laptops with local Raipur store warranty.
          </p>
          <Link to="/laptops">
            <Button variant="primary" size="lg">
              Explore All Laptops
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart ({itemCount} items)</h1>
        <button type="button" onClick={clearCart} className={styles.clearBtn}>
          Clear Cart
        </button>
      </div>

      <div className={styles.cartGrid}>
        {}
        <div className={styles.itemsList}>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className={styles.cartItem}>
              <div className={styles.itemImageWrap}>
                <img
                  src={product.images[0] || '/hero-laptops.jpg'}
                  alt={product.model}
                  className={styles.itemImage}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = '/hero-laptops.jpg'
                  }}
                />
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.itemHeaderRow}>
                  <div>
                    <span className={styles.itemBrand}>{product.brand}</span>
                    <Link to={`/laptops/${product.slug}`} className={styles.itemTitleLink}>
                      <h3 className={styles.itemTitle}>{product.model}</h3>
                    </Link>
                  </div>
                  <GradeBadge grade={product.grade} condition={product.condition} />
                </div>

                <p className={styles.itemSpecs}>{product.specSummary}</p>

                <div className={styles.itemActionsRow}>
                  <div className={styles.stepperWrap}>
                    <QuantityStepper
                      value={quantity}
                      min={1}
                      max={product.stock}
                      onChange={(newQty) => updateQuantity(product.id, newQty)}
                      bulkThreshold={5}
                    />
                  </div>

                  <div className={styles.priceWrap}>
                    <span className={styles.itemUnitPrice}>{formatPrice(product.price)} each</span>
                    <span className={styles.itemTotalPrice}>{formatPrice(product.price * quantity)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    onMouseEnter={() => setHoveredDeleteId(product.id)}
                    onMouseLeave={() => setHoveredDeleteId(null)}
                    className={styles.removeBtn}
                    aria-label={`Delete ${product.model} from cart`}
                  >
                    <TrashIcon size={16} open={hoveredDeleteId === product.id} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {}
          <div className={styles.deliveryNotice}>
            <div className={styles.deliveryIcon}>🛵</div>
            <div>
              <div className={styles.deliveryHeading}>Raipur Fast Delivery</div>
              <div className={styles.deliverySub}>
                Orders placed before 2:00 PM for Raipur pincodes (492001–492010) are eligible for same-day delivery by
                our store rider.
              </div>
            </div>
          </div>
        </div>

        {}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({itemCount} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Estimated Delivery</span>
                <span className={styles.freeBadge}>FREE (Raipur)</span>
              </div>
              <div className={styles.summaryRow}>
                <span>GST (18% Included)</span>
                <span className={styles.gstIncluded}>Included</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>

            {itemCount >= 5 && (
              <div className={styles.bulkNotice}>
                <span>Buying 5 or more units?</span>
                <Link to="/bulk" className={styles.bulkLink}>
                  Request Commercial Pricing →
                </Link>
              </div>
            )}

            <div className={styles.paymentBadges}>
              <span>✓ Pay on Delivery (Cash/Card/UPI)</span>
              <span>✓ 7-Day Replacement Guarantee</span>
              <span>✓ Physical Store in Pandri, Raipur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
