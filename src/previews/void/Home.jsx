import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './styles.module.css'
import { COLLECTION, NFTS, AS_SEEN } from './data.js'

const BASE = '/p/void'

// ---- CountUp ----
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const startVal = 0

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(startVal + (target - startVal) * ease))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return count
}

// ---- Animated Progress Bar ----
function MintProgressSection() {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(COLLECTION.minted, 2400, triggered)
  const pct = Math.round((COLLECTION.minted / COLLECTION.supply) * 100)

  return (
    <section className={s.mintProgress} ref={ref}>
      <div className={s.container}>
        <div className={s.mintProgressCard} data-reveal>
          <div className={s.mintProgressHeader}>
            <div>
              <div className={s.mintProgressNumbers}>
                <span className={s.mintCount}>{count.toLocaleString()}</span>
                <span className={s.mintTotal}>/ {COLLECTION.supply.toLocaleString()}</span>
              </div>
              <div className={s.mintLabel}>Tokens Minted</div>
            </div>
            <div className={s.mintStatsRow}>
              <div className={s.mintStat}>
                <span className={s.mintStatValue}>{COLLECTION.holders.toLocaleString()}</span>
                <span className={s.mintStatLabel}>Holders</span>
              </div>
              <div className={s.mintStat}>
                <span className={s.mintStatValue}>{COLLECTION.floorPrice} Ξ</span>
                <span className={s.mintStatLabel}>Floor</span>
              </div>
              <div className={s.mintStat}>
                <span className={s.mintStatValue}>{pct}%</span>
                <span className={s.mintStatLabel}>Minted</span>
              </div>
            </div>
          </div>
          <div className={s.progressBarTrack}>
            <div
              className={s.progressBarFill}
              style={{ width: triggered ? `${pct}%` : '0%' }}
            />
          </div>
          <div className={s.progressPercent}>
            <span>0</span>
            <span>{pct}% minted — {(COLLECTION.supply - COLLECTION.minted).toLocaleString()} remaining</span>
            <span>{COLLECTION.supply.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- NFT Card ----
function NftCard({ nft, featured }) {
  const size = featured ? 300 : 260
  return (
    <div className={s.nftCard}>
      <div className={s.nftImage}>
        <img
          src={`https://picsum.photos/seed/${nft.seed}/${size}/${size}`}
          alt={nft.name}
          loading="lazy"
          width={size}
          height={size}
        />
        <div className={s.nftImageOverlay}>
          <span className={`${s.badge} ${s[`badge${nft.rarity}`]}`}>{nft.rarity}</span>
        </div>
      </div>
      <div className={s.nftInfo}>
        <div className={s.nftName}>{nft.name}</div>
        <div className={s.nftMeta}>
          <span className={s.nftPrice}>{nft.price} Ξ</span>
          <span className={s.nftId}>#{nft.id.toString().padStart(4, '0')}</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className={s.hero}>
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={s.container}>
          <div className={s.heroContent}>
            <div className={s.heroEyebrow}>Collection — 5,000 Unique Entities</div>
            <h1 className={s.heroTitle}>
              VOID
              <span className={s.heroTitleAccent}>GENESIS</span>
            </h1>
            <p className={s.heroSub}>
              5,000 generative entities born from the void. Rare by design, scarce by protocol, legendary by choice. Own a piece of the most anticipated Web3 collection of 2024.
            </p>
            <div className={s.heroCtas}>
              <Link to={`${BASE}/mint`} className={s.btnPrimary}>Mint Now — 0.08 Ξ</Link>
              <Link to={`${BASE}/drops`} className={s.btnOutline}>View Collection</Link>
            </div>
            <div className={s.heroMeta}>
              <span>ERC-721A</span>
              <span className={s.heroMetaDot} />
              <span>Ethereum Mainnet</span>
              <span className={s.heroMetaDot} />
              <span>IPFS Metadata</span>
              <span className={s.heroMetaDot} />
              <span>CertiK Audited</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Mint Progress ---- */}
      <MintProgressSection />

      {/* ---- Stats ---- */}
      <section className={s.statsRow}>
        <div className={s.container}>
          <div className={s.statsGrid}>
            <div className={s.statCard} data-reveal data-reveal-delay="0">
              <span className={`${s.statValue} ${s.statValueAccent}`}>5,000</span>
              <span className={s.statName}>Total Supply</span>
              <span className={s.statChange}>ERC-721A</span>
            </div>
            <div className={s.statCard} data-reveal data-reveal-delay="100">
              <span className={s.statValue}>0.38 Ξ</span>
              <span className={s.statName}>Floor Price</span>
              <span className={s.statChange}>↑ +12.4% 24h</span>
            </div>
            <div className={s.statCard} data-reveal data-reveal-delay="200">
              <span className={s.statValue}>1,842 Ξ</span>
              <span className={s.statName}>Total Volume</span>
              <span className={s.statChange}>↑ All time</span>
            </div>
            <div className={s.statCard} data-reveal data-reveal-delay="300">
              <span className={s.statValue}>2,841</span>
              <span className={s.statName}>Unique Holders</span>
              <span className={s.statChange}>56.8% distributed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Featured NFTs ---- */}
      <section className={s.featuredSection}>
        <div className={s.container}>
          <div className={s.sectionLabel} data-reveal>Featured Drops</div>
          <h2 className={s.sectionTitle} data-reveal>Rare Entities</h2>
          <p className={s.sectionSubtitle} data-reveal>
            Hand-picked from the collection — the rarest entities, each with unique traits and on-chain provenance.
          </p>
          <div className={s.featuredGrid}>
            {NFTS.slice(0, 4).map((nft, i) => (
              <div key={nft.id} data-reveal data-reveal-delay={i * 80}>
                <NftCard nft={nft} featured />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <Link to={`${BASE}/drops`} className={s.btnOutline} data-reveal>
              View All {NFTS.length}+ Drops →
            </Link>
          </div>
        </div>
      </section>

      {/* ---- As Seen In ---- */}
      <section className={s.asSeenSection}>
        <div className={s.container}>
          <div className={s.asSeenLabel}>As featured in</div>
          <div className={s.asSeenLogos}>
            {AS_SEEN.map(name => (
              <span key={name} className={s.asSeenLogo}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className={s.ctaSection}>
        <div className={s.container}>
          <div className={s.ctaCard} data-reveal>
            <h2 className={s.ctaTitle}>Ready to Enter the Void?</h2>
            <p className={s.ctaSubtitle}>
              783 tokens remain. Once they are gone, they are gone forever. The void does not wait.
            </p>
            <div className={s.ctaButtons}>
              <Link to={`${BASE}/mint`} className={s.btnPrimary}>Mint Your Entity</Link>
              <Link to={`${BASE}/roadmap`} className={s.btnOutline}>See the Roadmap</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
