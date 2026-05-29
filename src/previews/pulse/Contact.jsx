import { useState } from 'react'
import { BRAND, CONTACT } from '../../shared/content'
import s from './styles.module.css'

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
          <h1 className={s.sectionTitle}>Contact</h1>
          <p className={s.sectionSub}>{CONTACT.blurb}</p>
        </div>

        <div className={s.contactLayout}>
          {/* Form column */}
          <div className={s.reveal} data-reveal>
            {submitted ? (
              <div className={s.success}>
                <div
                  style={{ fontSize: '3rem', marginBottom: 16, filter: 'drop-shadow(0 0 14px var(--cyan))' }}
                  aria-hidden="true"
                >
                  &#x25CE;
                </div>
                <h3>Message received.</h3>
                <p>
                  Thanks for reaching out, {form.name.split(' ')[0]}. We read everything and will
                  get back to you at{' '}
                  <strong style={{ color: 'var(--ink)' }}>{form.email}</strong>.
                </p>
                <button
                  type="button"
                  className={s.btn}
                  style={{ marginTop: 22 }}
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', topic: '', message: '' })
                  }}
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
                    <option value="">Select a topic&#x2026;</option>
                    {CONTACT.topics.map((t) => (
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
                    placeholder="Tell us what you have in mind&#x2026;"
                    value={form.message}
                    onChange={handleChange}
                    style={errors.message ? { borderColor: 'var(--hot)' } : {}}
                  />
                  {errors.message && (
                    <span style={{ color: 'var(--hot)', fontSize: '0.78rem' }}>{errors.message}</span>
                  )}
                </div>

                <button type="submit" className={s.btn}>Send Message</button>
              </form>
            )}
          </div>

          {/* Info column */}
          <div>
            <div className={`${s.infoCard} ${s.reveal}`} data-reveal>
              <h3>Direct</h3>
              <p>
                <a
                  href={`mailto:${BRAND.email}`}
                  style={{ color: 'var(--cyan)', textDecoration: 'underline' }}
                >
                  {BRAND.email}
                </a>
                <br />
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--cyan)', textDecoration: 'underline' }}
                >
                  {BRAND.instagram}
                </a>
              </p>
            </div>

            <div className={`${s.infoCard} ${s.reveal}`} data-reveal data-reveal-delay="100">
              <h3>Cities We Cover</h3>
              <div className={s.socials} style={{ marginTop: 12 }}>
                {BRAND.cities.map((city) => (
                  <span key={city} className={s.socialChip}>{city}</span>
                ))}
              </div>
            </div>

            <div className={`${s.infoCard} ${s.reveal}`} data-reveal data-reveal-delay="180">
              <h3>What We Do</h3>
              <p>
                Editorial storytelling, event documentation, creative direction, and community
                partnerships. We work with brands, institutions and independent creators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
