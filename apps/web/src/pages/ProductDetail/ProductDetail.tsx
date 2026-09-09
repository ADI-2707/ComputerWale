import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { clsx } from 'clsx'
import styles from './ProductDetail.module.css'
import { MOCK_PRODUCTS } from '../../lib/mockData'
import { GradeBadge } from '../../components/product/GradeBadge'
import { PriceBlock } from '../../components/product/PriceBlock'
import { StockIndicator } from '../../components/product/StockIndicator'
import { SpecTable } from '../../components/product/SpecTable'
import { PincodeChecker } from '../../components/forms/PincodeChecker'
import { Button } from '../../components/ui/Button'
import { TrashIcon } from '../../components/ui/TrashIcon'
import { ProductCard } from '../../components/product/ProductCard'
import { useCartStore } from '../../state/cartStore'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) ?? MOCK_PRODUCTS[0]

  const cartItem = useCartStore((s) => s.items.find((i) => i.product.id === product.id))
  const cartQuantity = cartItem?.quantity || 0
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const [addedToast, setAddedToast] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [isBinHovered, setIsBinHovered] = useState(false)
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const convertingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAddingRef = useRef(false)
  const lastAddRef = useRef(0)

  const similarProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.condition === product.condition)
  ).slice(0, 3)

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
      if (convertingTimeoutRef.current) {
        clearTimeout(convertingTimeoutRef.current)
      }
    }
  }, [])

  const handleAddToCart = () => {
    const now = Date.now()
    if (isAddingRef.current || isConverting || now - lastAddRef.current < 600) return
    isAddingRef.current = true
    lastAddRef.current = now

    setIsConverting(true)
    addItem(product, 1)

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setAddedToast(true)
    toastTimeoutRef.current = setTimeout(() => {
      setAddedToast(false)
    }, 4500)

    if (convertingTimeoutRef.current) {
      clearTimeout(convertingTimeoutRef.current)
    }
    convertingTimeoutRef.current = setTimeout(() => {
      setIsConverting(false)
      isAddingRef.current = false
    }, 750)
  }

  const handleIncrement = () => {
    if (cartQuantity >= product.stock) return
    updateQuantity(product.id, cartQuantity + 1)
  }

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      updateQuantity(product.id, cartQuantity - 1)
    } else {
      removeItem(product.id)
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
      setAddedToast(false)
    }
  }

  const handleBuyNow = () => {
    if (cartQuantity === 0) {
      addItem(product, 1)
    }
    navigate('/checkout')
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : ['/hero-laptops.jpg']

  return (
    <div className={styles.container}>

      {addedToast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.toastCheck}>✓</span>
          <span className={styles.toastText}>Added to cart!</span>
          <Link to="/cart" className={styles.toastLink}>
            View Cart →
          </Link>
        </div>
      )}

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className={styles.crumbSep}>/</span>
        <Link to="/laptops">Laptops</Link>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.currentCrumb}>
          {product.brand} {product.model}
        </span>
      </nav>

      <div className={styles.grid}>

        <div className={styles.galleryCol}>
          <div className={styles.mainImageWrapper}>
            <img
              src={galleryImages[activeImgIndex] || galleryImages[0]}
              alt={`${product.brand} ${product.model}`}
              className={styles.mainImage}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = '/hero-laptops.jpg'
              }}
            />
            <div className={styles.badgeOverlay}>
              <GradeBadge grade={product.grade} condition={product.condition} />
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className={styles.thumbnails}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.thumbBtn} ${activeImgIndex === idx ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImgIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="" className={styles.thumbImg} />
                </button>
              ))}
            </div>
          )}

          <div className={styles.trustCard}>
            <div className={styles.trustIconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className={styles.trustBody}>
              <div className={styles.trustTitle}>Physical Store Unit in Raipur</div>
              <div className={styles.trustSubtitle}>
                Ready for immediate pickup or same-day dispatch from Shop No. 12, Pandri IT Park Road, Raipur.
              </div>
              <Link to="/stores" className={styles.trustLink}>
                Visit Pandri Experience Center →
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.infoCol}>
          <div className={styles.titleSection}>
            <div className={styles.brandBadge}>
              <span className={styles.brandDot} />
              {product.brand}
            </div>
            <h1 className={styles.title}>{product.model}</h1>
            <p className={styles.specSummary}>{product.specSummary}</p>
          </div>

          <div className={styles.metaRow}>
            <GradeBadge grade={product.grade} condition={product.condition} />
            <StockIndicator stock={product.stock} />
            {product.batteryHealth && (
              <span className={styles.batteryPill}>
                <span className={styles.batteryIcon}>🔋</span> Battery: <strong>{product.batteryHealth}% Health</strong>
              </span>
            )}
          </div>

          <div className={styles.priceSection}>
            <PriceBlock mrp={product.mrp} price={product.price} condition={product.condition} size="lg" />
            <span className={styles.gstNote}>
              <span className={styles.gstIcon}>✓</span> Includes 18% GST Invoice &amp; Store Warranty
            </span>
          </div>

          <div className={styles.pincodeSection}>
            <PincodeChecker />
          </div>

          <div className={styles.actionSection}>
            <div className={styles.btnRow}>
              <div
                className={clsx(
                  styles.cartActionWrapper,
                  (cartQuantity > 0 || isConverting) && styles.isStepper,
                  isConverting && styles.isConverting
                )}
              >
                <button
                  type="button"
                  className={clsx(
                    styles.addToCartBtn,
                    cartQuantity > 0 && !isConverting && styles.addToCartHidden,
                    isConverting && styles.addToCartConverting
                  )}
                  onClick={handleAddToCart}
                  disabled={cartQuantity > 0 || isConverting}
                  aria-hidden={cartQuantity > 0 && !isConverting}
                >
                  <div
                    className={clsx(
                      styles.cartIconWrapper,
                      isConverting && styles.cartDriving,
                      cartQuantity > 0 && !isConverting && styles.iconHidden
                    )}
                  >
                    <svg
                      className={styles.cartIcon}
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1" className={styles.cartWheel} />
                      <circle cx="20" cy="21" r="1" className={styles.cartWheel} />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span className={styles.cartSpeedTrail} aria-hidden="true">
                      <span className={styles.trailLine} />
                      <span className={styles.trailLine} />
                    </span>
                  </div>
                  <span
                    className={clsx(
                      styles.addToCartText,
                      isConverting && styles.textErasing,
                      cartQuantity > 0 && !isConverting && styles.textHidden
                    )}
                  >
                    Add to Cart
                  </span>
                </button>

                <div
                  className={clsx(
                    styles.stepperContent,
                    cartQuantity > 0 && !isConverting && styles.stepperVisible,
                    isConverting && styles.stepperRevealing
                  )}
                  aria-hidden={cartQuantity === 0 && !isConverting}
                >
                  <button
                    type="button"
                    className={clsx(
                      styles.inlineStepBtn,
                      cartQuantity === 1 && styles.inlineStepDelete,
                      isConverting && styles.stepItemRevealing
                    )}
                    onClick={handleDecrement}
                    onMouseEnter={() => setIsBinHovered(true)}
                    onMouseLeave={() => setIsBinHovered(false)}
                    disabled={cartQuantity === 0 || isConverting}
                    aria-label={cartQuantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
                    title={cartQuantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
                  >
                    {cartQuantity === 1 ? (
                      <TrashIcon size={17} open={isBinHovered} />
                    ) : (
                      <span className={styles.stepSymbol}>−</span>
                    )}
                  </button>

                  <div className={clsx(styles.qtyDisplay, isConverting && styles.qtyRevealing)}>
                    <span
                      key={cartQuantity}
                      className={styles.inlineStepQty}
                      aria-label={`Quantity in cart: ${cartQuantity}`}
                    >
                      {cartQuantity} in Cart
                    </span>
                  </div>

                  <button
                    type="button"
                    className={clsx(styles.inlineStepBtn, isConverting && styles.stepItemRevealing)}
                    onClick={handleIncrement}
                    disabled={cartQuantity >= product.stock || isConverting}
                    aria-label="Increase quantity"
                    title="Increase quantity"
                  >
                    <span className={styles.stepSymbol}>+</span>
                  </button>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleBuyNow}
                className={styles.buyNowBtn}
              >
                Buy Now
              </Button>
            </div>

            <div className={styles.guaranteeRow}>
              <div className={styles.guaranteeItem}>
                <svg className={styles.guaranteeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Same-Day Raipur Delivery</span>
              </div>
              <div className={styles.guaranteeItem}>
                <svg className={styles.guaranteeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{product.warrantyMonths}-Month Store Warranty</span>
              </div>
              <div className={styles.guaranteeItem}>
                <svg className={styles.guaranteeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Doorstep Inspection</span>
              </div>
            </div>

            {cartQuantity >= 5 && (
              <div className={styles.bulkCallout}>
                <span>Ordering {cartQuantity}+ units?</span>
                <Link to={`/bulk?product=${encodeURIComponent(product.model)}&qty=${cartQuantity}`} className={styles.bulkCalloutLink}>
                  Request Bulk Quote →
                </Link>
              </div>
            )}
          </div>

          <div className={styles.warrantyBox}>
            <h3 className={styles.warrantyTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              What is included in this package:
            </h3>
            <ul className={styles.warrantyList}>
              <li className={styles.warrantyListItem}>
                <span className={styles.warrantyCheck}>✓</span>
                <div>
                  <strong>{product.warrantyMonths} Months Warranty:</strong> Comprehensive hardware coverage at our Pandri, Raipur service center.
                </div>
              </li>
              {product.warrantyIncludes.map((inc, i) => (
                <li key={i} className={styles.warrantyListItem}>
                  <span className={styles.warrantyCheck}>✓</span>
                  <div>{inc}</div>
                </li>
              ))}
              <li className={styles.warrantyListItem}>
                <span className={styles.warrantyCheck}>✓</span>
                <div>Original certified charging adapter &amp; power cord included.</div>
              </li>
              <li className={styles.warrantyListItem}>
                <span className={styles.warrantyCheck}>✓</span>
                <div>Pre-inspected 32-point engineer quality checklist report included with box.</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.specsSection}>
        <h2 className={styles.sectionHeading}>Technical Specifications</h2>
        <div className={styles.specTableWrap}>
          <SpecTable
            specs={product.specs}
            warrantyMonths={product.warrantyMonths}
            warrantyIncludes={product.warrantyIncludes}
            batteryHealth={product.batteryHealth}
          />
        </div>
      </section>

      {product.cosmeticDetails && (
        <section className={styles.cosmeticSection}>
          <h2 className={styles.sectionHeading}>Condition &amp; Cosmetic Assessment</h2>
          <div className={styles.cosmeticCard}>
            <div className={styles.cosmeticBadge}>
              <span>✓</span> Inspected Condition
            </div>
            <p className={styles.cosmeticText}>{product.cosmeticDetails}</p>
            <div className={styles.cosmeticNote}>
              Each device sold by Computer Wale is individually photographed, tested, and physically verified by our engineers in Raipur.
            </div>
          </div>
        </section>
      )}

      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.sectionHeading}>Similar Laptops You Might Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

