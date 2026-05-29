import { useState } from 'react'
import { TICKET_TYPES } from './data.js'
import s from './styles.module.css'

export default function Contact() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 52 }} data-reveal>
          <div className={s.eyebrow}>Tickets & Enquiries</div>
          <h1 className={s.h2}>Book Your Visit</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            Reserve tickets online and collect at the door, or reach out with any question —
            our team responds within one business day.
          </p>
        </div>

        {/* Ticket selector */}
        <div style={{ marginBottom: 60 }}>
          <TicketSelector />
        </div>

        <hr className={s.divider} style={{ marginBottom: 60 }} />

        {/* Contact form + info */}
        <div className={s.eyebrow} style={{ marginBottom: 16 }} data-reveal>Get in touch</div>
        <h2 className={s.h2} style={{ marginBottom: 40 }} data-reveal>Enquiries</h2>

        <div className={s.contactGrid} data-reveal>
          {/* Form */}
          <EnquiryForm />

          {/* Contact info */}
          <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            {[
              {
                heading: 'General enquiries',
                lines: ['hello@prismagallery.art', '+44 207 123 4567'],
              },
              {
                heading: 'Press & media',
                lines: ['press@prismagallery.art', 'Response within 24 h'],
              },
              {
                heading: 'Curatorial & submissions',
                lines: ['Open call: Jan & Jul each year', 'submissions@prismagallery.art'],
              },
              {
                heading: 'Corporate & private hire',
                lines: ['events@prismagallery.art', 'The gallery is available for private hire Mon evenings'],
              },
            ].map((item) => (
              <div key={item.heading} className={s.infoPanel}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', margin: '0 0 10px' }}>
                  {item.heading}
                </h3>
                {item.lines.map((line) => (
                  <p key={line} style={{ color: 'var(--p-muted)', fontSize: '0.88rem', margin: '4px 0', lineHeight: 1.5 }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Ticket Selector ── */
function TicketSelector() {
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(TICKET_TYPES.map((t) => [t.id, 0]))
  )

  const [purchased, setPurchased] = useState(false)

  const adjust = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }))
  }

  const total = TICKET_TYPES.reduce((sum, t) => sum + t.price * quantities[t.id], 0)
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0)

  const lineItems = TICKET_TYPES.filter((t) => quantities[t.id] > 0)

  if (purchased) {
    return (
      <div data-reveal style={{ display: 'grid', gap: 20 }}>
        <div className={s.success}>
          <span style={{ fontSize: '1.5rem' }}>✓</span>
          <div>
            <div style={{ fontWeight: 700 }}>Booking confirmed!</div>
            <div style={{ fontSize: '0.88rem', marginTop: 4, opacity: 0.85 }}>
              Your e-tickets have been sent. Show them at the door (or collect from the box office).
            </div>
          </div>
        </div>
        <button
          className={`${s.btn} ${s.btnGlass}`}
          style={{ alignSelf: 'flex-start' }}
          onClick={() => {
            setPurchased(false)
            setQuantities(Object.fromEntries(TICKET_TYPES.map((t) => [t.id, 0])))
          }}
        >
          Book again
        </button>
      </div>
    )
  }

  return (
    <div className={s.ticketLayout} data-reveal>
      {/* Ticket type rows */}
      <div className={s.ticketList}>
        {TICKET_TYPES.map((ticket) => (
          <div key={ticket.id} className={s.ticketRow}>
            <div className={s.ticketInfo}>
              <h4>{ticket.label}</h4>
              <p>{ticket.desc}</p>
              <div className={s.ticketPrice}>
                {ticket.price === 0 ? 'Free' : `£${ticket.price}`}
              </div>
            </div>
            <div className={s.stepper}>
              <button
                className={s.stepBtn}
                onClick={() => adjust(ticket.id, -1)}
                disabled={quantities[ticket.id] === 0}
                aria-label={`Remove one ${ticket.label} ticket`}
              >
                −
              </button>
              <span className={s.stepQty} aria-live="polite">
                {quantities[ticket.id]}
              </span>
              <button
                className={s.stepBtn}
                onClick={() => adjust(ticket.id, 1)}
                aria-label={`Add one ${ticket.label} ticket`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary panel */}
      <div className={s.summary}>
        <h3 className={s.h3} style={{ fontSize: '1.15rem' }}>Order Summary</h3>

        {lineItems.length === 0 ? (
          <p style={{ color: 'var(--p-muted)', fontSize: '0.88rem' }}>
            Select tickets above to see your summary.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 4 }}>
            {lineItems.map((t) => (
              <div key={t.id} className={s.summaryRow}>
                <span>{t.label} × {quantities[t.id]}</span>
                <span>
                  {t.price === 0
                    ? 'Free'
                    : `£${(t.price * quantities[t.id]).toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={s.summaryTotal}>
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>

        {/* Date selector */}
        <div className={s.field} style={{ marginTop: 4 }}>
          <label className={s.label} htmlFor="visit-date">Visit date</label>
          <input
            id="visit-date"
            type="date"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '10px 14px' }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Session selector */}
        <div className={s.field}>
          <label className={s.label} htmlFor="visit-session">Session</label>
          <select
            id="visit-session"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '10px 14px', appearance: 'none' }}
          >
            <option value="am">Morning (10:00 – 13:00)</option>
            <option value="pm">Afternoon (13:00 – 17:00)</option>
            <option value="eve">Evening (17:00 – 19:00)</option>
          </select>
        </div>

        <button
          className={`${s.btn} ${s.btnPrimary}`}
          style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
          disabled={totalTickets === 0}
          onClick={() => totalTickets > 0 && setPurchased(true)}
        >
          {totalTickets === 0 ? 'Select tickets' : `Reserve ${totalTickets} ticket${totalTickets !== 1 ? 's' : ''} →`}
        </button>

        <p style={{ color: 'var(--p-muted)', fontSize: '0.75rem', textAlign: 'center' }}>
          Free cancellation up to 24 hours before your visit.
        </p>
      </div>
    </div>
  )
}

/* ── Enquiry Form ── */
function EnquiryForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <div className={s.success}>
          <span style={{ fontSize: '1.5rem' }}>✓</span>
          <div>
            <div style={{ fontWeight: 700 }}>Message received</div>
            <div style={{ fontSize: '0.88rem', marginTop: 4, opacity: 0.85 }}>
              A member of our team will reply within one business day.
            </div>
          </div>
        </div>
        <button
          className={`${s.btn} ${s.btnGlass}`}
          style={{ alignSelf: 'flex-start' }}
          onClick={() => setSent(false)}
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className={s.field}>
          <label className={s.label} htmlFor="first-name">First name</label>
          <input
            id="first-name"
            type="text"
            required
            placeholder="Elena"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}
          />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="last-name">Last name</label>
          <input
            id="last-name"
            type="text"
            required
            placeholder="Vassiliev"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}
          />
        </div>
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="enq-email">Email</label>
        <input
          id="enq-email"
          type="email"
          required
          placeholder="you@example.com"
          className={s.input}
          style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}
        />
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="enq-subject">Subject</label>
        <select
          id="enq-subject"
          className={s.input}
          style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px', appearance: 'none' }}
        >
          <option>General enquiry</option>
          <option>Press & media</option>
          <option>Membership</option>
          <option>Artist submission</option>
          <option>Private hire & events</option>
          <option>Accessibility support</option>
        </select>
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="enq-message">Message</label>
        <textarea
          id="enq-message"
          required
          rows={5}
          placeholder="How can we help?"
          className={`${s.input} ${s.textarea}`}
          style={{ borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}
        />
      </div>

      <button type="submit" className={`${s.btn} ${s.btnPrimary}`} style={{ alignSelf: 'flex-start' }}>
        Send message →
      </button>
    </form>
  )
}
