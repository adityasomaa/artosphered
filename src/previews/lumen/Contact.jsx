import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from './data'
import { BRAND, CONTACT } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const initialForm = {
  name: '',
  email: '',
  topic: '',
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
    if (!form.topic) e.topic = 'Please select a topic'
    if (!form.message.trim()) e.message = 'Please tell us a bit about what you have in mind'
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
    setSent(true)
  }

  return (
    <>
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>Get in touch</p>
        <h1 data-reveal>
          {/* no apostrophe — use entity */}
          Let&#39;s talk<em>.</em>
        </h1>
      </div>

      <section className={s.section} style={{ paddingTop: 0 }}>
        <p className={s.lead} data-reveal>{CONTACT.blurb}</p>

        <div className={s.contactGrid}>
          {/* FORM */}
          <div>
            {sent ? (
              <div className={s.success} data-reveal>
                <div className={s.mark}>&#10003;</div>
                <h3>Message received.</h3>
                <p>
                  We read every message personally. You&#39;ll hear from us within one
                  working day &#8212; usually sooner.
                </p>
                <Link to={`${BASE}/culture-report`} className={s.btn}>
                  Read the archive
                </Link>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit} noValidate>
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
                      <span style={{ fontSize: 12, color: 'var(--amber)', marginTop: 4 }}>
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
                      <span style={{ fontSize: 12, color: 'var(--amber)', marginTop: 4 }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={s.field}>
                  <label htmlFor="topic">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    aria-invalid={!!errors.topic}
                  >
                    <option value="">Select a topic&#8230;</option>
                    {CONTACT.topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.topic && (
                    <span style={{ fontSize: 12, color: 'var(--amber)', marginTop: 4 }}>
                      {errors.topic}
                    </span>
                  )}
                </div>

                <div className={s.field}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="A story pitch, an event you want covered, a project you have in mind&#8230;"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span style={{ fontSize: 12, color: 'var(--amber)', marginTop: 4 }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <div>
                  <button type="submit" className={`${s.btn} ${s.btnFilled}`}>
                    Send message
                  </button>
                </div>

                <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                  We respond personally to every message. No bots, no auto-replies.
                </p>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className={s.studioInfo} data-reveal data-reveal-delay="120">
            <div className={s.infoBlock}>
              <h4>Email</h4>
              <p>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </p>
            </div>
            <div className={s.infoBlock}>
              <h4>Instagram</h4>
              <p>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {BRAND.instagram}
                </a>
              </p>
            </div>
            <div className={s.infoBlock}>
              <h4>Cities we cover</h4>
              <p>
                {BRAND.cities.map((c, i) => (
                  <span key={c}>
                    {c}{i < BRAND.cities.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div className={s.infoBlock}>
              <h4>What we accept</h4>
              <p>
                Story pitches &middot; Event invitations &middot; Brand
                partnerships &middot; Creative commissions
              </p>
            </div>
            <div className={s.mapGraphicWrap}>
              <Graphic
                seed="aro-mo-contact-map"
                tone="warm"
                style={{ width: '100%', height: '100%' }}
                label="Global Network"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
