import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from './data'
import s from './styles.module.css'

const SHOOT_TYPES = [
  'Portrait session',
  'Wedding — full day',
  'Wedding — half day',
  'Commercial / brand',
  'Editorial / magazine',
  'Other / not sure yet',
]

const initialForm = {
  name: '',
  email: '',
  shootType: '',
  date: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.shootType) e.shootType = 'Please select a shoot type'
    if (!form.message.trim()) e.message = 'Please tell us a little about your project'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    // Demo: simulate send
    setSent(true)
  }

  return (
    <>
      {/* PAGE HEADER */}
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>Get in touch</p>
        <h1 data-reveal>
          Let's make something <em>together.</em>
        </h1>
      </div>

      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.contactGrid}>
          {/* FORM COLUMN */}
          <div>
            {sent ? (
              <div className={s.success} data-reveal>
                <div className={s.mark}>✓</div>
                <h3>Message sent.</h3>
                <p>
                  Thank you — we'll review your enquiry and be in touch within
                  one working day. In the meantime, take a look at the work.
                </p>
                <Link to={`${BASE}/portfolio`} className={s.btn}>
                  View the portfolio
                </Link>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit} noValidate>
                {/* Name + Email */}
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Shoot type + Date */}
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label htmlFor="shootType">Type of shoot</label>
                    <select
                      id="shootType"
                      name="shootType"
                      value={form.shootType}
                      onChange={handleChange}
                      aria-invalid={!!errors.shootType}
                    >
                      <option value="">Select…</option>
                      {SHOOT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.shootType && (
                      <span style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>
                        {errors.shootType}
                      </span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label htmlFor="date">Preferred date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={s.field}>
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Location, mood, number of people, anything that comes to mind — the more we know, the better we can help."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <div>
                  <button type="submit" className={`${s.btn} ${s.btnFilled}`}>
                    Send enquiry
                  </button>
                </div>

                <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                  We respond to every enquiry personally, usually within 24 hours.
                  For urgent requests call{' '}
                  <a href="tel:+14155550192" style={{ color: 'var(--cream-dim)', textDecoration: 'none' }}>
                    +1 (415) 555 0192
                  </a>
                  .
                </p>
              </form>
            )}
          </div>

          {/* INFO COLUMN */}
          <div className={s.studioInfo} data-reveal data-reveal-delay="120">
            <div className={s.infoBlock}>
              <h4>Email</h4>
              <p>
                <a href="mailto:hello@lumenstudio.co">hello@lumenstudio.co</a>
              </p>
            </div>

            <div className={s.infoBlock}>
              <h4>Phone</h4>
              <p>
                <a href="tel:+14155550192">+1 (415) 555 0192</a>
              </p>
            </div>

            <div className={s.infoBlock}>
              <h4>Studio hours</h4>
              <p>
                Monday – Friday · 9 am – 6 pm PST<br />
                Weekends: shoot days &amp; emergencies only
              </p>
            </div>

            <div className={s.infoBlock}>
              <h4>Location</h4>
              <p>
                San Francisco, CA — available worldwide.<br />
                We travel for the work.
              </p>
            </div>

            <div className={s.infoBlock}>
              <h4>Response time</h4>
              <p>
                We reply to every message within one working day. Wedding
                enquiries for peak-season dates (May – October) fill fast —
                reach out early.
              </p>
            </div>

            <img
              className={s.mapImg}
              src="https://picsum.photos/seed/lumen-map-sf/680/340"
              alt="Studio location — San Francisco"
              loading="lazy"
              width="680"
              height="340"
            />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className={s.cta}>
        <img
          className={s.ctaBg}
          src="https://picsum.photos/seed/lumen-contact-bg/1920/800"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <p className={s.eyebrow} data-reveal style={{ justifyContent: 'center' }}>We're booking now</p>
        <h2 className={s.ctaTitle} data-reveal>
          Ready to start?<br /><em>So are we.</em>
        </h2>
      </section>
    </>
  )
}
