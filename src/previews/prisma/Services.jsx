import { Link } from 'react-router-dom'
import { SERVICES, BRAND } from '../../shared/content.js'
import s from './styles.module.css'

const BASE = '/p/prisma'

const ACCENT_COLORS = [
  'var(--p-accent)',
  'var(--p-magenta)',
  'var(--p-cyan)',
  'var(--p-lime)',
]

export default function Services() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 64 }} data-reveal>
          <div className={s.eyebrow}>Collaborate &#10022;</div>
          <h1 className={s.h2}>Creative Services</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            ARTOSPHERED works with brands, institutions and individuals who want to engage with culture authentically. We bring editorial intelligence, creative direction and a genuine community.
          </p>
        </div>

        {/* Services grid */}
        <div className={s.servicesGrid}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className={s.servicePanel}
              data-reveal
              data-reveal-delay={i * 100}
            >
              <div
                className={s.servicePanelAccent}
                style={{ background: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
              />
              <div
                className={s.serviceNumber}
                style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
              >
                0{i + 1}
              </div>
              <h3 className={s.h3} style={{ marginTop: 18 }}>{svc.title}</h3>
              <p style={{ color: 'var(--p-muted)', marginTop: 12, fontSize: '0.95rem', lineHeight: 1.75 }}>
                {svc.desc}
              </p>
              <ul className={s.serviceItems}>
                {svc.items.map((item) => (
                  <li key={item} className={s.serviceItem}>
                    <span
                      className={s.serviceItemDot}
                      style={{ background: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={s.newsletter} style={{ marginTop: 80 }} data-reveal>
          <div>
            <div className={s.eyebrow}>Ready to start? &#10022;</div>
            <h2 className={s.h2} style={{ marginTop: 8 }}>
              Let&apos;s make something
              <br />
              <span className={s.gradText}>that lasts.</span>
            </h2>
          </div>
          <p className={s.lead}>
            Every collaboration starts with a conversation. Tell us about your project and we will respond within one business day.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnPrimary}`}>
              Start a project &rarr;
            </Link>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnGlass}`}
            >
              {BRAND.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
