import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import styles from './ProductDetail.module.css'
import { MOCK_PRODUCTS } from '../../lib/mockData'
import { GradeBadge } from '../../components/product/GradeBadge'
import { PriceBlock } from '../../components/product/PriceBlock'
import { StockIndicator } from '../../components/product/StockIndicator'
import { SpecTable } from '../../components/product/SpecTable'
import { PincodeChecker } from '../../components/forms/PincodeChecker'
import { QuantityStepper } from '../../components/forms/QuantityStepper'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../components/product/ProductCard'
import { useCartStore } from '../../state/cartStore'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) ?? MOCK_PRODUCTS[0]
  const [quantity, setQuantity] = useState(1)
  const [addedToast, setAddedToast] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
    }
  }, [])

  const handleAddToCart = () => {
    const now = Date.now()
    if (isAddingRef.current || now - lastAddRef.current < 700) return
    isAddingRef.current = true
    lastAddRef.current = now

    addItem(product, quantity)
    setJustAdded(true)

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setAddedToast(true)
    toastTimeoutRef.current = setTimeout(() => {
      setAddedToast(false)
    }, 4500)

    setTimeout(() => {
      setJustAdded(false)
      isAddingRef.current = false
    }, 1200)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate('/checkout')
  }

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {addedToast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.toastCheck}>✓</span>
          <span className={styles.toastText}>Added {quantity} item(s) to cart!</span>
          <Link to="/cart" className={styles.toastLink}>
            View Cart →
          </Link>
        </div>
      )}

      {}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/laptops">Laptops</Link>
        <span>/</span>
        <span className={styles.currentCrumb}>
          {product.brand} {product.model}
        </span>
      </nav>

      <div className={styles.grid}>
        {}
        <div className={styles.galleryCol}>
          <div className={styles.mainImageWrapper}>
            <img
              src={product.images[activeImgIndex] || product.images[0] || '/hero-laptops.jpg'}
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

          <div className={styles.thumbnails}>
            {[product.images[0] || '/hero-laptops.jpg', '/hero-laptops.jpg'].map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.thumbBtn} ${activeImgIndex === idx ? styles.activeThumb : ''}`}
                onClick={() => setActiveImgIndex(idx)}
              >
                <img src={img} alt="" className={styles.thumbImg} />
              </button>
            ))}
          </div>

          {}
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>🏢</div>
            <div>
              <div className={styles.trustTitle}>Physical Store Unit in Raipur</div>
              <div className={styles.trustSubtitle}>
                Ready for immediate pickup or same-day dispatch from Shop No. 12, Pandri IT Park Road, Raipur.
              </div>
            </div>
          </div>
        </div>

        {}
        <div className={styles.infoCol}>
          <div className={styles.titleSection}>
            <div className={styles.brandSubtitle}>{product.brand}</div>
            <h1 className={styles.title}>{product.model}</h1>
            <p className={styles.specSummary}>{product.specSummary}</p>
          </div>

          <div className={styles.metaRow}>
            <GradeBadge grade={product.grade} condition={product.condition} />
            <StockIndicator stock={product.stock} />
            {product.batteryHealth && (
              <span className={styles.batteryPill}>
                🔋 Battery: <strong>{product.batteryHealth}% Health</strong>
              </span>
            )}
          </div>

          <div className={styles.priceSection}>
            <PriceBlock mrp={product.mrp} price={product.price} condition={product.condition} size="lg" />
            <span className={styles.gstNote}>Includes GST & 6-Month Store Warranty</span>
          </div>

          {}
          <div className={styles.pincodeSection}>
            <PincodeChecker />
          </div>

          {}
          <div className={styles.actionSection}>
            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Quantity:</span>
              <QuantityStepper
                value={quantity}
                min={1}
                max={product.stock}
                onChange={setQuantity}
                bulkThreshold={5}
              />
            </div>

            <div className={styles.btnRow}>
              {quantity > 5 ? (
                <Link to={`/bulk?product=${encodeURIComponent(product.model)}&qty=${quantity}`} style={{ flex: 1 }}>
                  <Button variant="primary" size="lg" fullWidth>
                    Request Bulk Quote ({quantity} units)
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    type="button"
                    variant={justAdded ? "primary" : "outline"}
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={justAdded}
                    style={{ flex: 1 }}
                  >
                    {justAdded ? '✓ Added to Cart!' : 'Add to Cart'}
                  </Button>
                  <Button type="button" variant="primary" size="lg" onClick={handleBuyNow} style={{ flex: 1 }}>
                    Buy Now
                  </Button>
                </>
              )}
            </div>
          </div>

          {}
          <div className={styles.warrantyBox}>
            <h3 className={styles.warrantyTitle}>What is included:</h3>
            <ul className={styles.warrantyList}>
              <li>
                <strong>{product.warrantyMonths} Months Warranty:</strong> Comprehensive local coverage at our Pandri,
                Raipur service center.
              </li>
              {product.warrantyIncludes.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
              <li>Original charging adapter & power cord included.</li>
              <li>Pre-inspected 32-point quality checklist completed before packaging.</li>
            </ul>
          </div>
        </div>
      </div>

      {}
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

      {}
      {product.cosmeticDetails && (
        <section className={styles.cosmeticSection}>
          <h2 className={styles.sectionHeading}>Condition & Cosmetic Assessment</h2>
          <div className={styles.cosmeticCard}>
            <p className={styles.cosmeticText}>{product.cosmeticDetails}</p>
            <div className={styles.cosmeticNote}>
              Each device sold by Computer Wale is individually photographed and physically verified by our engineers in
              Raipur.
            </div>
          </div>
        </section>
      )}

      {}
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
