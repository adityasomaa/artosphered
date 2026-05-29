import { useState } from 'react'
import s from './styles.module.css'

const ENQUIRY_TYPES = [
  'Made-to-order Appointment',
  'Private Shopping',
  'Press & Editorial',
  'Wholesale Enquiry',
  'Repair & Restoration',
  'General Enquiry',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    enquiryType: '',
    preferredDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.enquiryType) e.enquiryType = 'Please select an enquiry type.'
    if (!form.message.trim()) e.message = 'Please include a message.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) {
      setErrors(e2)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className={s.contactPage}>
      {/* ── Left: form ─────────────────────────────────── */}
      <div className={s.contactRight}>
        <p className={s.sectionEyebrow} data-reveal="fade">Get in Touch</p>
        <h1 className={s.pageTitle} data-reveal style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginBottom: '8px' }}>
          Book an<br />Appointment
        </h1>
        <p className={s.pageSub} data-reveal data-reveal-delay="80" style={{ marginBottom: '40px' }}>
          Every ATELIER client is received by appointment. We do not believe in
          browsing. We believe in conversation, and in finding the right piece
          for the right person.
        </p>

        {submitted ? (
          <div className={s.contactSuccess} data-reveal="fade">
            <span className={s.successCheck} aria-hidden="true">◆</span>
            <h3>We will be in touch.</h3>
            <p>
              Your enquiry has been received. One of our maison team will
              respond within one working day to confirm your appointment and
              discuss your requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate data-reveal data-reveal-delay="100">
            <div className={s.formRow}>
              <FormGroup
                label="Full Name"
                error={errors.name}
              >
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={s.formInput}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
              </FormGroup>

              <FormGroup
                label="Email Address"
                error={errors.email}
              >
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={s.formInput}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
              </FormGroup>
            </div>

            <FormGroup
              label="Nature of Enquiry"
              error={errors.enquiryType}
            >
              <select
                name="enquiryType"
                value={form.enquiryType}
                onChange={handleChange}
                className={s.formSelect}
                aria-required="true"
                aria-invalid={!!errors.enquiryType}
              >
                <option value="">Select enquiry type</option>
                {ENQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Preferred Date (optional)">
              <input
                type="date"
                name="preferredDate"
                value={form.preferredDate}
                onChange={handleChange}
                className={s.formInput}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormGroup>

            <FormGroup
              label="Your Message"
              error={errors.message}
            >
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className={s.formTextarea}
                placeholder="Tell us what brings you to ATELIER, and how we can help."
                rows={5}
                aria-required="true"
                aria-invalid={!!errors.message}
              />
            </FormGroup>

            <button type="submit" className={s.contactSubmit}>
              Send Enquiry
            </button>
          </form>
        )}
      </div>

      {/* ── Right: boutique addresses ──────────────────── */}
      <div className={s.contactLeft}>
        <p className={s.sectionEyebrow} data-reveal="fade">Find Us</p>
        <h2 className={s.sectionTitle} data-reveal style={{ marginBottom: '48px' }}>
          Our Maisons
        </h2>

        <div className={s.boutiqueList}>
          {[
            {
              city: 'Lyon',
              address: '14 Rue Auguste Comte\n69002 Lyon, France',
              hours: 'Mon–Sat: 10:00–18:30\nSun: Closed',
              phone: '+33 4 72 00 00 00',
              tag: 'Maison Principale',
            },
            {
              city: 'London',
              address: '32 Mount Street\nMayfair, London W1K 2SH',
              hours: 'Mon–Sat: 10:00–18:00\nSun: 12:00–17:00',
              phone: '+44 20 7000 0000',
              tag: 'London Boutique',
            },
            {
              city: 'New York',
              address: '814 Madison Avenue\nNew York, NY 10065',
              hours: 'Mon–Sat: 10:00–18:00\nSun: 12:00–17:00',
              phone: '+1 212 000 0000',
              tag: 'New York Maison',
            },
          ].map((b, i) => (
            <div key={b.city} className={s.boutique} data-reveal data-reveal-delay={i * 80}>
              <p
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  margin: '0 0 6px',
                }}
              >
                {b.tag}
              </p>
              <h4>{b.city}</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{b.address}</p>
              <div className={s.boutiqueDivider} />
              <p style={{ whiteSpace: 'pre-line', fontSize: '0.82rem' }}>{b.hours}</p>
              <p style={{ marginTop: '6px' }}>
                <a
                  href={`tel:${b.phone.replace(/\s/g, '')}`}
                  style={{ color: 'var(--ink-muted)', textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  {b.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        <div className={s.pressContact} data-reveal>
          <h5>Press & Editorial</h5>
          <a href="mailto:press@atelier.co">press@atelier.co</a>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--ink-muted)',
              marginTop: '6px',
              lineHeight: 1.6,
            }}
          >
            For editorial requests, image permissions, and press appointments.
            We respond to press enquiries within two working days.
          </p>
        </div>
      </div>
    </div>
  )
}

function FormGroup({ label, error, children }) {
  return (
    <div className={s.formGroup}>
      <label className={s.formLabel}>{label}</label>
      {children}
      {error && (
        <p
          role="alert"
          style={{ color: '#b94040', fontSize: '0.75rem', margin: '6px 0 0', letterSpacing: '0.05em' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
