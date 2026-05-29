import { useState } from 'react'
import { BRAND, CONTACT } from '../../shared/content.js'
import s from './styles.module.css'

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', topic: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!fields.name.trim()) errs.name = 'Required'
    if (!fields.email.trim() || !fields.email.includes('@')) errs.email = 'Valid email required'
    if (!fields.topic) errs.topic = 'Select a topic'
    if (!fields.message.trim()) errs.message = 'Required'
    return errs
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
    <div className={s.innerPage}>
      <div className={s.container}>

        <div className={s.pageHeader}>
          <div className={s.pageHeaderMeta}>
            <span className={s.blockLabel}>// CONTACT</span>
          </div>
          <h1 className={s.pageTitle}>Get in Touch</h1>
          <p className={s.pageSubtitle}>{CONTACT.blurb}</p>
        </div>

        <div className={s.contactLayout}>

          {/* Terminal form */}
          <div className={s.contactForm}>
            {submitted ? (
              <div className={s.successState} data-reveal>
                <div className={s.successPrompt}>
                  <span className={s.successIcon}>&#10003;</span>
                  <span className={s.blockLabel}>MESSAGE RECEIVED</span>
                </div>
                <p className={s.successText}>
                  We read everything. You will hear from us shortly.
                </p>
                <div className={s.successMeta}>
                  <span className={s.blockLabel}>REF: {Date.now().toString(36).toUpperCase()}</span>
                </div>
                <button
                  className={s.btnOutline}
                  style={{ marginTop: '24px' }}
                  onClick={() => { setSubmitted(false); setFields({ name: '', email: '', topic: '', message: '' }) }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className={s.terminalForm} onSubmit={handleSubmit} noValidate>
                <div className={s.formField}>
                  <label className={s.formLabel} htmlFor="name">
                    <span className={s.loaderPrompt}>&gt; </span>NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`${s.formInput} ${errors.name ? s.formInputError : ''}`}
                    value={fields.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  {errors.name && <span className={s.formError}>{errors.name}</span>}
                </div>

                <div className={s.formField}>
                  <label className={s.formLabel} htmlFor="email">
                    <span className={s.loaderPrompt}>&gt; </span>EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`${s.formInput} ${errors.email ? s.formInputError : ''}`}
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="your@email.com"
                  />
                  {errors.email && <span className={s.formError}>{errors.email}</span>}
                </div>

                <div className={s.formField}>
                  <label className={s.formLabel} htmlFor="topic">
                    <span className={s.loaderPrompt}>&gt; </span>TOPIC
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className={`${s.formSelect} ${errors.topic ? s.formInputError : ''}`}
                    value={fields.topic}
                    onChange={handleChange}
                  >
                    <option value="">-- SELECT --</option>
                    {CONTACT.topics.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.topic && <span className={s.formError}>{errors.topic}</span>}
                </div>

                <div className={s.formField}>
                  <label className={s.formLabel} htmlFor="message">
                    <span className={s.loaderPrompt}>&gt; </span>MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={`${s.formTextarea} ${errors.message ? s.formInputError : ''}`}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                  />
                  {errors.message && <span className={s.formError}>{errors.message}</span>}
                </div>

                <button type="submit" className={s.btnPrimary}>
                  Send Message &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className={s.contactInfo}>
            <div className={s.contactInfoBlock}>
              <span className={s.blockLabel}>DIRECT CONTACT</span>
              <a href={`mailto:${BRAND.email}`} className={s.contactInfoLink}>
                {BRAND.email}
              </a>
            </div>

            <div className={s.contactInfoBlock}>
              <span className={s.blockLabel}>INSTAGRAM</span>
              <a
                href={BRAND.instagramUrl}
                className={s.contactInfoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BRAND.instagram}
              </a>
            </div>

            <div className={s.contactInfoBlock}>
              <span className={s.blockLabel}>CITIES ACTIVE</span>
              <div className={s.cityList}>
                {BRAND.cities.map(c => (
                  <span key={c} className={s.cityTag}>{c.toUpperCase()}</span>
                ))}
              </div>
            </div>

            <div className={s.contactInfoBlock}>
              <span className={s.blockLabel}>TOPICS WE COVER</span>
              <ul className={s.topicList}>
                {CONTACT.topics.map(t => (
                  <li key={t} className={s.topicItem}>
                    <span className={s.serviceItemArrow}>&rarr;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
