import { Link } from 'react-router-dom'
import { SERVICES, BRAND } from '../../shared/content'
import { BASE } from './data'
import s from './styles.module.css'

const HOW_WE_WORK = [
  {
    title: 'Reach Out',
    body: 'Send us a brief note about your project, your brand, and what you are hoping to create together. We read and respond to every message.',
  },
  {
    title: 'We Align',
    body: 'A short conversation to understand your needs, timeline, and vision. We will tell you honestly whether the fit is right and propose a scope.',
  },
  {
    title: 'We Make',
    body: 'Our team researches, writes, shoots, and art-directs. You stay in the loop at key points, but we drive the process with editorial rigour.',
  },
  {
    title: 'You Own It',
    body: 'Final deliverables are clean, publication-ready, and fully yours. We archive the work and remain available for follow-up and iteration.',
  },
]

export default function Services() {
  return (
    <div className={s.svPage}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className={s.svHero}>
        <div className={s.svHeroInner}>
          <div>
            <p className={s.sectionEyebrow} data-reveal="fade">Creative Services</p>
            <h1 className={s.svHeroTitle} data-reveal>
              Culture is<br />
              <em>our</em><br />
              craft.
            </h1>
          </div>
          <div data-reveal data-reveal-delay="80">
            <p className={s.svHeroSub}>
              ARTOSPHERED works with brands, institutions and cultural organisations
              that want to speak the language of the creative world authentically.
              We are journalists, directors, documentarians and community builders.
            </p>
            <Link to={`${BASE}/contact`} className={s.btnPrimary}>
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* ── Services list ────────────────────────────────── */}
      <div className={s.svServicesList}>
        {SERVICES.map((sv, i) => (
          <div
            key={sv.id}
            className={s.svServiceItem}
            data-reveal
            data-reveal-delay={i * 60}
          >
            <div>
              <div className={s.svServiceNum}>0{i + 1}</div>
              <h2 className={s.svServiceTitle}>{sv.title}</h2>
            </div>
            <div>
              <p className={s.svServiceDesc}>{sv.desc}</p>
              <div className={s.svServiceItems}>
                {sv.items.map((item) => (
                  <span key={item} className={s.svServiceItemTag}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── How we work ──────────────────────────────────── */}
      <div className={s.svHowWe}>
        <div className={s.svHowWeInner}>
          <h2 className={s.svHowWeLabel} data-reveal="left">
            How we<br />work.
          </h2>
          <div className={s.svHowWeSteps}>
            {HOW_WE_WORK.map((step, i) => (
              <div
                key={step.title}
                className={s.svHowWeStep}
                data-reveal
                data-reveal-delay={i * 80}
              >
                <span className={s.svHowWeStepNum}>0{i + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className={s.svCta}>
        <p className={s.sectionEyebrow} data-reveal="fade">Work With Us</p>
        <h2 className={s.svCtaTitle} data-reveal>
          Ready to build something?
        </h2>
        <p className={s.svCtaSub} data-reveal data-reveal-delay="80">
          Whether you have a brief or just an instinct, we would love to hear from you.
          Send us a message and we will take it from there.
        </p>
        <div data-reveal data-reveal-delay="140">
          <Link to={`${BASE}/contact`} className={s.btnPrimary}>
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
