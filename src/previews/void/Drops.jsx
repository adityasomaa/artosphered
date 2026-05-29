import { useState, useEffect, useCallback } from 'react'
import s from './styles.module.css'
import { NFTS, NFT_TRAITS } from './data.js'

const RARITIES = ['All', 'Legendary', 'Epic', 'Rare', 'Common']

// ---- Traits Modal ----
function TraitsModal({ nft, onClose }) {
  const traits = NFT_TRAITS[nft.id] || []

  // Esc key close
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className={s.modalBackdrop} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={s.modal} role="dialog" aria-modal="true" aria-label={`${nft.name} details`}>
        <div className={s.modalGrid}>
          <div className={s.modalImage}>
            <img
              src={`https://picsum.photos/seed/${nft.seed}/500/500`}
              alt={nft.name}
              width={500}
              height={500}
            />
          </div>
          <div className={s.modalContent}>
            <div className={s.modalHeader}>
              <div>
                <div style={{ marginBottom: 8 }}>
                  <span className={`${s.badge} ${s[`badge${nft.rarity}`]}`}>{nft.rarity}</span>
                </div>
                <div className={s.modalTitle}>{nft.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
                  #{nft.id.toString().padStart(4, '0')}
                </div>
              </div>
              <button className={s.modalClose} onClick={onClose} aria-label="Close">×</button>
            </div>

            <div className={s.modalPriceRow}>
              <span className={s.modalPrice}>{nft.price} Ξ</span>
              <span className={s.modalPriceFiat}>
                ≈ ${(parseFloat(nft.price) * 3241).toFixed(0).toLocaleString()} USD
              </span>
            </div>

            <div className={s.modalSection}>
              <div className={s.rankBadge}>
                Rarity Rank <span className={s.rankNumber}>#{nft.rank}</span>
                <span style={{ color: 'var(--text3)', fontSize: 10 }}>/ 5,000</span>
              </div>
            </div>

            <div className={s.modalSection}>
              <div className={s.modalSectionTitle}>Traits</div>
              <div className={s.traitsList}>
                {traits.map(t => (
                  <div key={t.type} className={s.traitChip}>
                    <div className={s.traitType}>{t.type}</div>
                    <div className={s.traitValue}>{t.value}</div>
                    <div className={s.traitRarity}>{t.rarity} have this</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- NFT Drop Card ----
function DropCard({ nft, onClick }) {
  return (
    <div className={s.nftCard} onClick={() => onClick(nft)} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(nft) }}>
      <div className={s.nftImage}>
        <img
          src={`https://picsum.photos/seed/${nft.seed}/280/280`}
          alt={nft.name}
          loading="lazy"
          width={280}
          height={280}
        />
        <div className={s.nftImageOverlay}>
          <span className={`${s.badge} ${s[`badge${nft.rarity}`]}`}>{nft.rarity}</span>
        </div>
      </div>
      <div className={s.nftInfo}>
        <div className={s.nftName}>{nft.name}</div>
        <div className={s.nftMeta}>
          <span className={s.nftPrice}>{nft.price} Ξ</span>
          <span className={s.nftId}>Rank #{nft.rank}</span>
        </div>
      </div>
    </div>
  )
}

export default function Drops() {
  const [rarity, setRarity] = useState('All')
  const [sort, setSort] = useState('rank')
  const [selected, setSelected] = useState(null)

  const filtered = NFTS
    .filter(n => rarity === 'All' || n.rarity === rarity)
    .sort((a, b) => {
      if (sort === 'price-asc') return parseFloat(a.price) - parseFloat(b.price)
      if (sort === 'price-desc') return parseFloat(b.price) - parseFloat(a.price)
      if (sort === 'rank') return a.rank - b.rank
      if (sort === 'id') return a.id - b.id
      return 0
    })

  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      <div className={s.pageHeader}>
        <div className={s.container}>
          <div className={s.sectionLabel} data-reveal>Collection</div>
          <h1 className={s.sectionTitle} data-reveal>VOID GENESIS Drops</h1>
          <p className={s.sectionSubtitle} data-reveal>
            5,000 unique entities. Each algorithmically generated, each cryptographically unique. Filter by rarity, sort by price, click to inspect traits.
          </p>
        </div>
      </div>

      <div className={s.container}>
        <div className={s.filterBar}>
          <span className={s.filterLabel}>Filter:</span>
          {RARITIES.map(r => (
            <button
              key={r}
              className={`${s.filterBtn} ${rarity === r ? s.filterBtnActive : ''}`}
              onClick={() => setRarity(r)}
            >
              {r}
            </button>
          ))}
          <select
            className={s.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label="Sort by"
          >
            <option value="rank">Sort: Rarity Rank</option>
            <option value="price-desc">Sort: Price ↓</option>
            <option value="price-asc">Sort: Price ↑</option>
            <option value="id">Sort: ID</option>
          </select>
        </div>

        <div className={s.dropsCount}>
          Showing {filtered.length} of {NFTS.length} entities
          {rarity !== 'All' && ` — ${rarity}`}
        </div>

        <div className={s.dropsGrid}>
          {filtered.map((nft, i) => (
            <div key={nft.id} data-reveal data-reveal-delay={Math.min(i * 40, 300)}>
              <DropCard nft={nft} onClick={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {selected && <TraitsModal nft={selected} onClose={handleClose} />}
    </>
  )
}
