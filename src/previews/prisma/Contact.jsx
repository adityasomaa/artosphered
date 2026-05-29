import { useState } from 'react'
import { BRAND, CONTACT } from '../../shared/content.js'
import s from './styles.module.css'

export default function Contact() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 52 }} data-reveal>
          <div className={s.eyebrow}>Say hello &#10022;</div>
          <h1 className={s.h2}>Get in Touch</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            {CONTACT.blurb}
          </p>
        </div>

        <div className={s.contactGrid} data-reveal>
          {/* Enquiry form */}
          <EnquiryForm />

          {/* Contact info */}
          <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <div className={s.infoPanel}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', margin: '0 0 14px' }}>
                Email us
              </h3>
              <a
                href={'mailto:' + BRAND.email}
                style={{ color: 'var(--p-accent)', fontSize: '0.95rem', display: 'block' }}
              >
                {BRAND.email}
              </a>
              <p style={{ color: 'var(--p-muted)', fontSize: '0.85rem', marginTop: 8, lineHeight: 1.6 }}>
                We read every message and respond within one business day.
              </p>
            </div>

            <div className={s.infoPanel}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', margin: '0 0 14px' }}>
                Instagram
              </h3>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--p-magenta)', fontSize: '0.95rem', display: 'block' }}
              >
                {BRAND.instagram}
              </a>
              <p style={{ color: 'var(--p-muted)', fontSize: '0.85rem', marginTop: 8, lineHeight: 1.6 }}>
                Follow the archive in real time &mdash; cities, shows, stories.
              </p>
            </div>

            <div className={s.infoPanel}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', margin: '0 0 14px' }}>
                Cities
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {BRAND.cities.map((city) => (
                  <span
                    key={city}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--p-muted)',
                      padding: '5px 12px',
                      borderRadius: 100,
                      background: 'rgba(255,245,235,0.05)',
                      border: '1px solid rgba(255,224,188,0.13)',
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className={s.infoPanel}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', margin: '0 0 14px' }}>
                Established
              </h3>
              <p style={{ color: 'var(--p-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                ARTOSPHERED has been documenting creative culture since {BRAND.est}.
                <br />
                <span style={{ color: 'var(--p-accent)' }}>{BRAND.intersect}.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
          <span style={{ fontSize: '1.5rem' }}>&#10003;</span>
          <div>
            <div style={{ fontWeight: 700 }}>Message received &#10022;</div>
            <div style={{ fontSize: '0.88rem', marginTop: 4, opacity: 0.85 }}>
              We read everything and will reply within one business day.
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
          <label className={s.label} htmlFor="p-name">Your name</label>
          <input
            id="p-name"
            type="text"
            required
            placeholder="Name"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}
          />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="p-email">Email</label>
          <input
            id="p-email"
            type="email"
            required
            placeholder="you@example.com"
            className={s.input}
            style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}
          />
        </div>
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="p-topic">Topic</label>
        <select
          id="p-topic"
          className={s.input}
          style={{ borderRadius: 'var(--radius-sm)', padding: '12px 16px', appearance: 'none' }}
        >
          {CONTACT.topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="p-message">Message</label>
        <textarea
          id="p-message"
          required
          rows={5}
          placeholder="Tell us about your project or idea..."
          className={`${s.input} ${s.textarea}`}
          style={{ borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}
        />
      </div>

      <button type="submit" className={`${s.btn} ${s.btnPrimary}`} style={{ alignSelf: 'flex-start' }}>
        Send message &rarr;
      </button>
    </form>
  )
}
