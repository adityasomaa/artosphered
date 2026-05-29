import { useState } from 'react'
import { TICKETS } from './data'
import s from './styles.module.css'

export default function Tickets() {
  // qty state: { [ticketId]: number }
  const [qty, setQty] = useState(() =>
    Object.fromEntries(TICKETS.map((t) => [t.id, 0]))
  )
  const [checked, setChecked] = useState(false)

  const setQ = (id, delta) =>
    setQty((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(10, prev[id] + delta)),
    }))

  const lineItems = TICKETS.filter((t) => qty[t.id] > 0).map((t) => ({
    ...t,
    qty: qty[t.id],
    subtotal: t.price * qty[t.id],
  }))

  const total = lineItems.reduce((sum, li) => sum + li.subtotal, 0)
  const hasItems = lineItems.length > 0

  function handleCheckout(e) {
    e.preventDefault()
    setChecked(true)
  }

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>PULSE 2026 Passes</div>
          <h1 className={s.sectionTitle}>Get Your Ticket</h1>
          <p className={s.sectionSub}>
            Four tiers. One unforgettable festival. Add to your order using the
            steppers below — your live total updates instantly.
          </p>
        </div>

        {checked ? (
          <CheckoutSuccess onReset={() => setChecked(false)} />
        ) : (
          <div className={s.ticketLayout}>
            {/* Cards */}
            <div className={s.ticketGrid}>
              {TICKETS.map((t, i) => (
                <div
                  key={t.id}
                  className={`${s.ticketCard} ${t.featured ? s.ticketFeatured : ''} ${s.reveal}`}
                  data-reveal
                  data-reveal-delay={i * 80}
                >
                  {t.featured && <div className={s.ticketBadge}>Most Popular</div>}
                  <div className={s.ticketName}>{t.name}</div>
                  <div className={s.ticketPrice}>
                    €{t.price}
                    <small> / person</small>
                  </div>
                  <p className={s.ticketBlurb}>{t.blurb}</p>
                  <ul className={s.perks}>
                    {t.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                  <div className={s.stepper}>
                    <button
                      type="button"
                      className={s.stepBtn}
                      aria-label={`Remove one ${t.name}`}
                      onClick={() => setQ(t.id, -1)}
                      disabled={qty[t.id] === 0}
                    >
                      −
                    </button>
                    <span className={s.stepQty} aria-live="polite">
                      {qty[t.id]}
                    </span>
                    <button
                      type="button"
                      className={s.stepBtn}
                      aria-label={`Add one ${t.name}`}
                      onClick={() => setQ(t.id, +1)}
                      disabled={qty[t.id] === 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className={`${s.summary} ${s.reveal}`} data-reveal>
              <h3>Order Summary</h3>

              {!hasItems ? (
                <p className={s.summaryEmpty}>
                  Select tickets using the + buttons to build your order. Prices
                  rise closer to the festival — lock in early.
                </p>
              ) : (
                lineItems.map((li) => (
                  <div key={li.id} className={s.summaryRow}>
                    <span>
                      {li.name} × {li.qty}
                    </span>
                    <span>€{li.subtotal}</span>
                  </div>
                ))
              )}

              <div className={s.summaryTotal}>
                <span className="lbl" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
                <span
                  className="val"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '2rem',
                    color: hasItems ? 'var(--hot)' : 'var(--muted)',
                    textShadow: hasItems ? 'var(--glow-hot)' : 'none',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                  aria-live="polite"
                >
                  €{total}
                </span>
              </div>

              <button
                type="button"
                className={s.btn}
                style={{ width: '100%', justifyContent: 'center', marginTop: 18, opacity: hasItems ? 1 : 0.45, cursor: hasItems ? 'pointer' : 'not-allowed' }}
                onClick={hasItems ? handleCheckout : undefined}
                disabled={!hasItems}
                aria-disabled={!hasItems}
              >
                Secure My Tickets
              </button>

              <p
                style={{
                  marginTop: 14,
                  fontSize: '0.78rem',
                  color: 'var(--muted)',
                  lineHeight: 1.55,
                  textAlign: 'center',
                }}
              >
                Tickets are non-refundable but fully transferable. Secure checkout via Stripe.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

function CheckoutSuccess({ onReset }) {
  return (
    <div className={s.reveal} data-reveal>
      <div className={s.success} style={{ maxWidth: 540, margin: '0 auto' }}>
        <div
          style={{
            fontSize: '3rem',
            marginBottom: 16,
            filter: 'drop-shadow(0 0 12px var(--cyan))',
          }}
          aria-hidden="true"
        >
          ✦
        </div>
        <h3>You're in the crowd.</h3>
        <p>
          Your PULSE 2026 tickets are confirmed. Check your inbox for your order
          confirmation and e-tickets. See you at Meridian Fields — Aug 15–17, Lisbon.
        </p>
        <button
          type="button"
          className={s.btn}
          style={{ marginTop: 22, boxShadow: 'var(--glow-cyan)', background: 'linear-gradient(90deg, var(--cyan), var(--violet))' }}
          onClick={onReset}
        >
          Order More Tickets
        </button>
      </div>
    </div>
  )
}
