import { useState } from 'react'
import { FAQ, SOCIALS } from './data'
import s from './styles.module.css'

const TOPICS = [
  'General Enquiry',
  'Ticket Support',
  'Press & Media',
  'Artist Bookings',
  'Sponsorship',
  'Accessibility',
  'Volunteering',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.topic) errs.topic = 'Please choose a topic'
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>Get in Touch</div>
          <h1 className={s.sectionTitle}>Contact Us</h1>
          <p className={s.sectionSub}>
            Questions, press passes, accessibility needs, partnership enquiries —
            we want to hear from you. Our team typically replies within 2 working days.
          </p>
        </div>

        <div className={s.contactLayout}>
          {/* Form column */}
          <div className={`${s.reveal}`} data-reveal>
            {submitted ? (
              <div className={s.success}>
                <div
                  style={{
                    fontSize: '3rem',
                    marginBottom: 16,
                    filter: 'drop-shadow(0 0 14px var(--cyan))',
                  }}
                  aria-hidden="true"
                >
                  ◉
                </div>
                <h3>Message received.</h3>
                <p>
                  Thanks for reaching out, {form.name.split(' ')[0]}. Our team will
                  respond to <strong style={{ color: 'var(--ink)' }}>{form.email}</strong> within
                  2 working days. See you on the dancefloor.
                </p>
                <button
                  type="button"
                  className={s.btn}
                  style={{ marginTop: 22 }}
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }) }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit} noValidate>
                <div className={s.field}>
                  <label htmlFor="cf-name" className={s.label}>Full Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className={s.input}
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    style={errors.name ? { borderColor: 'var(--hot)' } : {}}
                  />
                  {errors.name && (
                    <span style={{ color: 'var(--hot)', fontSize: '0.78rem' }}>{errors.name}</span>
                  )}
                </div>

                <div className={s.field}>
                  <label htmlFor="cf-email" className={s.label}>Email Address</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className={s.input}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    style={errors.email ? { borderColor: 'var(--hot)' } : {}}
                  />
                  {errors.email && (
                    <span style={{ color: 'var(--hot)', fontSize: '0.78rem' }}>{errors.email}</span>
                  )}
                </div>

                <div className={s.field}>
                  <label htmlFor="cf-topic" className={s.label}>Topic</label>
                  <select
                    id="cf-topic"
                    name="topic"
                    className={s.select}
                    value={form.topic}
                    onChange={handleChange}
                    style={errors.topic ? { borderColor: 'var(--hot)' } : {}}
                  >
                    <option value="">Select a topic…</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.topic && (
                    <span style={{ color: 'var(--hot)', fontSize: '0.78rem' }}>{errors.topic}</span>
                  )}
                </div>

                <div className={s.field}>
                  <label htmlFor="cf-message" className={s.label}>Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    className={s.textarea}
                    placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={handleChange}
                    style={errors.message ? { borderColor: 'var(--hot)' } : {}}
                  />
                  {errors.message && (
                    <span style={{ color: 'var(--hot)', fontSize: '0.78rem' }}>{errors.message}</span>
                  )}
                </div>

                <button type="submit" className={s.btn}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info column */}
          <div>
            <div className={`${s.infoCard} ${s.reveal}`} data-reveal>
              <h3>Venue</h3>
              <p>
                <strong style={{ color: 'var(--ink)' }}>Meridian Fields</strong><br />
                Parque das Nações, Lisbon, Portugal<br />
                15 min from Lisbon Oriente station.<br />
                Shuttle buses run every 20 min from the city centre.
              </p>
            </div>

            <div className={`${s.infoCard} ${s.reveal}`} data-reveal data-reveal-delay="100">
              <h3>Press & Media</h3>
              <p>
                Accredited press can apply via the form (select "Press &amp; Media").
                Accreditation opens 30 days before the festival. Photographer guidelines
                and hi-res assets available on request.
              </p>
            </div>

            <div className={`${s.infoCard} ${s.reveal}`} data-reveal data-reveal-delay="180">
              <h3>FAQ</h3>
              {FAQ.map((item) => (
                <div key={item.q} className={s.faqItem}>
                  <div className={s.faqQ}>{item.q}</div>
                  <div className={s.faqA}>{item.a}</div>
                </div>
              ))}
            </div>

            <div className={`${s.infoCard} ${s.reveal}`} data-reveal data-reveal-delay="240">
              <h3>Follow PULSE</h3>
              <div className={s.socials} style={{ marginTop: 12 }}>
                {SOCIALS.map((sc) => (
                  <a
                    key={sc.label}
                    href="#social"
                    className={s.socialChip}
                    onClick={(e) => e.preventDefault()}
                  >
                    <strong>{sc.label}</strong>
                    {sc.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
