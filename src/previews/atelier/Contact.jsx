import { useState } from 'react'
import { BRAND, CONTACT } from '../../shared/content'
import s from './styles.module.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.topic) e.topic = 'Please select a topic.'
    if (!form.message.trim()) e.message = 'Please add a message.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className={s.aroContactPage}>
      {/* ── Left: brand info ─────────────────────────────── */}
      <div className={s.aroContactLeft}>
        <p className={s.sectionEyebrow} data-reveal="fade">Get in Touch</p>
        <h1 className={s.aroContactLeftTitle} data-reveal>
          We read<br />everything.
        </h1>
        <p className={s.aroContactLeftBlurb} data-reveal data-reveal-delay="80">
          {CONTACT.blurb}
        </p>

        <div className={s.aroContactDetails} data-reveal data-reveal-delay="120">
          <div className={s.aroContactDetailItem}>
            <div className={s.aroContactDetailLabel}>Email</div>
            <a href={`mailto:${BRAND.email}`} className={s.aroContactDetailValue}>
              {BRAND.email}
            </a>
          </div>
          <div className={s.aroContactDetailItem}>
            <div className={s.aroContactDetailLabel}>Instagram</div>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={s.aroContactDetailValue}
            >
              {BRAND.instagram}
            </a>
          </div>
          <div className={s.aroContactDetailItem}>
            <div className={s.aroContactDetailLabel}>Established</div>
            <span className={s.aroContactDetailValue}>{BRAND.est}</span>
          </div>
        </div>

        <div className={s.aroContactCities} data-reveal data-reveal-delay="160">
          {BRAND.cities.map((city) => (
            <span key={city} className={s.aroContactCityChip}>{city}</span>
          ))}
        </div>
      </div>

      {/* ── Right: form ──────────────────────────────────── */}
      <div className={s.aroContactRight}>
        <p className={s.sectionEyebrow} data-reveal="fade">Send a Message</p>

        {submitted ? (
          <div className={s.contactSuccess} data-reveal="fade">
            <span className={s.successCheck} aria-hidden="true">&#9670;</span>
            <h3>Message received.</h3>
            <p>
              Thank you for reaching out. We read everything and will be in touch
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate data-reveal data-reveal-delay="80">
            <div className={s.formRow}>
              <FormGroup label="Your Name" error={errors.name}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={s.formInput}
                  placeholder="Full name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
              </FormGroup>

              <FormGroup label="Email Address" error={errors.email}>
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

            <FormGroup label="Topic" error={errors.topic}>
              <select
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className={s.formSelect}
                aria-required="true"
                aria-invalid={!!errors.topic}
              >
                <option value="">Select a topic</option>
                {CONTACT.topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Message" error={errors.message}>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className={s.formTextarea}
                placeholder="Tell us what you have in mind."
                rows={5}
                aria-required="true"
                aria-invalid={!!errors.message}
              />
            </FormGroup>

            <button type="submit" className={s.contactSubmit}>
              Send Message
            </button>
          </form>
        )}
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
