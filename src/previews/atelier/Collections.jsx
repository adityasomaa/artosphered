import { useState, useEffect, useCallback } from 'react'
import { PRODUCTS } from './data'
import s from './styles.module.css'

const CATEGORIES = ['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Accessories']

function formatPrice(n) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n)
}

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [quickView, setQuickView] = useState(null) // product
  const [toast, setToast] = useState(null)

  const filtered = PRODUCTS
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return a.id - b.id
    })

  function openQuickView(product) {
    setQuickView(product)
    document.body.style.overflow = 'hidden'
  }

  function closeQuickView() {
    setQuickView(null)
    document.body.style.overflow = ''
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Close modal on Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeQuickView()
  }, [])

  useEffect(() => {
    if (quickView) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [quickView, handleKeyDown])

  return (
    <div className={s.collectionsPage}>
      <div className={s.pageHeader}>
        <p className={s.sectionEyebrow} data-reveal="fade">FW26 Collection</p>
        <h1 className={s.pageTitle} data-reveal>Fragments of Silence</h1>
        <p className={s.pageSub} data-reveal data-reveal-delay="80">
          Seventy-two pieces. Each made once. Each made completely. A collection
          that refuses the noise of the season in favour of the singular,
          enduring garment.
        </p>
      </div>

      {/* Filter + Sort bar */}
      <div className={s.filterBar} data-reveal>
        <div className={s.filterBtns} role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={activeCategory === cat ? `${s.filterBtn} ${s.filterBtnActive}` : s.filterBtn}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className={s.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className={s.productGrid} role="list">
        {filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={openQuickView}
            revealDelay={Math.min(i * 60, 300)}
          />
        ))}
      </div>

      {/* Quick-view modal */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={closeQuickView}
          onAddToCart={(name, size) => {
            closeQuickView()
            showToast(`${name} (${size}) added to your selection`)
          }}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div className={s.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, onQuickView, revealDelay }) {
  return (
    <article
      className={s.productCard}
      role="listitem"
      data-reveal
      data-reveal-delay={revealDelay}
    >
      <div
        className={s.productMedia}
        onClick={() => onQuickView(product)}
        role="button"
        tabIndex={0}
        aria-label={`Quick view ${product.name}`}
        onKeyDown={(e) => e.key === 'Enter' && onQuickView(product)}
      >
        <img
          className={s.productImg}
          src={`https://picsum.photos/seed/${product.seed}/600/800`}
          alt={product.name}
          width={600}
          height={800}
          loading="lazy"
        />
        <img
          className={s.productImgHover}
          src={`https://picsum.photos/seed/${product.seed2}/600/800`}
          alt={`${product.name} — alternate view`}
          width={600}
          height={800}
          loading="lazy"
          aria-hidden="true"
        />
        <div className={s.productQuickView}>Quick View</div>
      </div>
      <p className={s.productCategory}>{product.category}</p>
      <h3 className={s.productName}>{product.name}</h3>
      <p className={s.productPrice}>{formatPrice(product.price)}</p>
    </article>
  )
}

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)

  function handleAdd() {
    if (!selectedSize) {
      setSelectedSize(product.sizes[0])
      return
    }
    onAddToCart(product.name, selectedSize)
  }

  return (
    <div
      className={s.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div className={`${s.modal} ${s.modalRelative}`}>
        <button
          type="button"
          className={s.modalClose}
          onClick={onClose}
          aria-label="Close quick view"
        >
          ×
        </button>
        <div className={s.modalMedia}>
          <img
            src={`https://picsum.photos/seed/${product.seed}/700/900`}
            alt={product.name}
            width={700}
            height={900}
            loading="lazy"
          />
        </div>
        <div className={s.modalBody}>
          <p className={s.modalCategory}>{product.category}</p>
          <h2 className={s.modalName}>{product.name}</h2>
          <p className={s.modalPrice}>{formatPrice(product.price)}</p>
          <p className={s.modalDesc}>{product.description}</p>

          <p className={s.sizeLabel}>Select Size</p>
          <div className={s.sizeGrid}>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                className={selectedSize === sz ? `${s.sizeBtn} ${s.sizeBtnActive}` : s.sizeBtn}
                onClick={() => setSelectedSize(sz)}
                aria-pressed={selectedSize === sz}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={s.addToCart}
            onClick={handleAdd}
          >
            {selectedSize ? `Add to Selection — ${selectedSize}` : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  )
}
