import { useState, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import s from './styles.module.css'
import { COLLECTION } from './data.js'

const GAS_ESTIMATE = 0.003

function generateTokenIds(qty) {
  const start = COLLECTION.minted + 1
  return Array.from({ length: qty }, (_, i) => start + i)
}

export default function Mint() {
  const { wallet, toggleWallet } = useOutletContext()

  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [mintedTokens, setMintedTokens] = useState([])

  const mintPrice = COLLECTION.mintPrice
  const remaining = COLLECTION.supply - COLLECTION.minted
  const supplyPct = Math.round((COLLECTION.minted / COLLECTION.supply) * 100)

  const total = (qty * mintPrice).toFixed(4)
  const totalWithGas = (qty * mintPrice + GAS_ESTIMATE).toFixed(4)

  const handleQty = useCallback((delta) => {
    setQty(q => Math.min(COLLECTION.maxPerWallet, Math.max(1, q + delta)))
  }, [])

  const handleMint = useCallback(async () => {
    if (!wallet.connected || status === 'loading') return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 2400))
    const tokens = generateTokenIds(qty)
    setMintedTokens(tokens)
    setStatus('success')
  }, [wallet.connected, status, qty])

  const handleReset = useCallback(() => {
    setStatus('idle')
    setMintedTokens([])
    setQty(1)
  }, [])

  return (
    <section className={s.mintPage}>
      <div className={s.container}>
        <div className={s.sectionLabel} data-reveal>Mint</div>
        <h1 className={s.sectionTitle} data-reveal>Claim Your Entity</h1>
        <p className={s.sectionSubtitle} data-reveal>
          Each mint is a cryptographic event. Your entity is generated, revealed, and yours — forever on-chain.
        </p>

        <div className={s.mintLayout}>
          {/* Left — Art Panel */}
          <div className={s.mintArtPanel} data-reveal>
            <div className={s.mintArtFrame}>
              <img
                src="https://picsum.photos/seed/void-mint-hero/600/600"
                alt="VOID GENESIS Mint Preview"
                loading="lazy"
                width={600}
                height={600}
              />
              <div className={s.mintArtOverlay}>
                <div>
                  <div className={s.mintArtTitle}>VOID GENESIS</div>
                  <div className={s.mintArtSub}>Your entity awaits in the void</div>
                </div>
              </div>
            </div>

            <div className={s.mintSupplyRow}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>
                  Supply Remaining
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
                  {remaining.toLocaleString()} / {COLLECTION.supply.toLocaleString()}
                </span>
              </div>
              <div className={s.mintSupplyBar}>
                <div className={s.mintSupplyFill} style={{ width: `${supplyPct}%` }} />
              </div>
              <div className={s.mintSupplyMeta}>
                <span>{supplyPct}% minted</span>
                <span>{(COLLECTION.supply - COLLECTION.minted).toLocaleString()} left</span>
              </div>
            </div>

            {/* Collection info */}
            <div style={{ marginTop: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Mint Price', `${mintPrice} ETH per token`],
                ['Max per Wallet', `${COLLECTION.maxPerWallet} tokens`],
                ['Contract', '0x4a3B…d0c8'],
                ['Network', 'Ethereum Mainnet'],
                ['Standard', 'ERC-721A'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text3)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mint Panel */}
          <div className={s.mintPanel} data-reveal data-reveal-delay="100">
            {/* Wallet check */}
            {!wallet.connected ? (
              <div className={s.mintWalletAlert}>
                <span className={s.mintWalletAlertIcon} role="img" aria-label="wallet">⬡</span>
                <div className={s.mintWalletAlertTitle}>Connect Your Wallet</div>
                <p className={s.mintWalletAlertText}>
                  You need a connected wallet to mint. Connect MetaMask, WalletConnect, or any Ethereum-compatible wallet to proceed.
                </p>
                <button className={s.btnPrimary} onClick={toggleWallet} style={{ width: '100%', justifyContent: 'center' }}>
                  Connect Wallet
                </button>
              </div>
            ) : status === 'success' ? (
              /* Mint Success */
              <div className={s.mintSuccess}>
                <span className={s.mintSuccessIcon} role="img" aria-label="success">✦</span>
                <div className={s.mintSuccessTitle}>Mint Successful!</div>
                <p className={s.mintSuccessText}>
                  Congratulations — you now own {mintedTokens.length} VOID GENESIS {mintedTokens.length === 1 ? 'entity' : 'entities'}. Your tokens will appear in your wallet within a few minutes.
                </p>
                <div className={s.mintSuccessTokens}>
                  {mintedTokens.map(id => (
                    <span key={id} className={s.mintSuccessToken}>
                      #{id.toString().padStart(4, '0')}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className={s.btnOutline} onClick={handleReset}>Mint More</button>
                  <a href="#" className={s.btnOutline}>View on OpenSea</a>
                </div>
              </div>
            ) : (
              /* Mint Form */
              <div className={s.mintCard}>
                <div className={s.mintCardTitle}>Mint VOID GENESIS</div>

                {/* Connected address */}
                <div className={s.mintConnectedBadge}>
                  <span className={s.mintConnectedDot} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)}
                  </span>
                  <span style={{ color: 'var(--text3)', fontSize: 11 }}>
                    {wallet.balance} ETH
                  </span>
                </div>

                {/* Price */}
                <div className={s.mintPriceInfo}>
                  <span className={s.mintPriceLabel}>Price per token</span>
                  <span className={s.mintPriceValue}>{mintPrice} ETH</span>
                </div>

                {/* Quantity Stepper */}
                <div className={s.quantityStepper}>
                  <label className={s.quantityLabel}>
                    Quantity <span style={{ color: 'var(--text3)', fontSize: 12 }}>(max {COLLECTION.maxPerWallet})</span>
                  </label>
                  <div className={s.quantityControl}>
                    <button
                      className={s.quantityBtn}
                      onClick={() => handleQty(-1)}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={s.quantityValue}>{qty}</span>
                    <button
                      className={s.quantityBtn}
                      onClick={() => handleQty(1)}
                      disabled={qty >= COLLECTION.maxPerWallet}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className={s.costBreakdown}>
                  <div className={s.costRow}>
                    <span className={s.costLabel}>{qty} × {mintPrice} ETH</span>
                    <span className={s.costValue}>{total} ETH</span>
                  </div>
                  <div className={s.costRow}>
                    <span className={s.costLabel}>Est. gas fee</span>
                    <span className={s.costValue} style={{ color: 'var(--text3)' }}>~{GAS_ESTIMATE} ETH</span>
                  </div>
                  <div className={s.costDivider} />
                  <div className={s.costRow}>
                    <span className={s.costTotalLabel}>Total</span>
                    <span className={s.costTotalValue}>{totalWithGas} ETH</span>
                  </div>
                </div>

                {/* Mint Button */}
                <button
                  className={`${s.mintBtn} ${status === 'loading' ? s.mintBtnLoading : ''}`}
                  onClick={handleMint}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className={s.spinIcon}>◌</span>
                      Minting…
                    </>
                  ) : (
                    `Mint ${qty} ${qty === 1 ? 'Entity' : 'Entities'} — ${totalWithGas} ETH`
                  )}
                </button>

                <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', lineHeight: 1.6 }}>
                  By minting you agree to our Terms of Service. Transactions are irreversible once confirmed on-chain. Metadata reveals within 48 hours of mint completion.
                </p>
              </div>
            )}

            {/* FAQ accordions */}
            <div style={{ marginTop: 8 }}>
              {[
                ['What is VOID GENESIS?', '5,000 algorithmically generated entities on Ethereum. Each token is unique, provably rare, and grants access to the VOID DAO and exclusive holder benefits.'],
                ['When does minting close?', 'Minting is open until the collection sells out. Once all 5,000 entities are minted, no new tokens will ever be created.'],
                ['How is rarity determined?', 'Each entity has 6 trait categories with varying rarity weights. Traits are randomly assigned at mint time using a verifiable on-chain entropy source. Rarity rankings are published 48h post-sellout.'],
              ].map(([q, a]) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, paddingBottom: 16 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
          {question}
        </span>
        <span style={{ color: 'var(--green)', fontSize: 18, fontFamily: 'monospace', flexShrink: 0, marginLeft: 12, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
          {answer}
        </p>
      )}
    </div>
  )
}
