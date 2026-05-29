import { Link } from 'react-router-dom'
import { SERVICES, BRAND } from '../../shared/content'
import s from './styles.module.css'

const BASE = '/p/pulse'

const ACCENT_COLORS = ['var(--hot)', 'var(--cyan)', 'var(--violet)', 'var(--hot)']

export default function Services() {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>Creative Services</div>
          <h1 className={s.sectionTitle}>Work With Us</h1>
          <p className={s.sectionSub}>
            We connect brands and institutions with the creative communities we document
            &mdash; authentically, not extractively.
          </p>
        </div>

        <div className={s.servicesGrid}>
          {SERVICES.map((sv, i) => (
            <div
              key={sv.id}
              className={`${s.serviceBlock} ${s.reveal}`}
              data-reveal
              data-reveal-delay={i * 90}
              style={{ '--svc-accent': ACCENT_COLORS[i] }}
            >
              <div className={s.svcIndex} aria-hidden="true">0{i + 1}</div>
              <h2 className={s.svcTitle}>{sv.title}</h2>
              <p className={s.svcDesc}>{sv.desc}</p>
              <ul className={s.svcItems}>
                {sv.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`${s.ctaBand} ${s.reveal}`} data-reveal style={{ marginTop: 48 }}>
          <div className={s.eyebrow}>Start a Conversation</div>
          <h2>Ready to collaborate?</h2>
          <p>
            Pitch a story, invite us to your event, or start a creative project.
            We read everything.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`${BASE}/contact`} className={s.btn}>Get in Touch</Link>
            <a
              href={`mailto:${BRAND.email}`}
              className={`${s.btn} ${s.btnGhost}`}
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
