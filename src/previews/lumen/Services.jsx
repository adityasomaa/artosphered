import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE, SERVICES, FAQS } from './data'
import s from './styles.module.css'

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={open ? `${s.faq} ${s.faqOpen}` : s.faq}>
      <button
        type="button"
        className={s.faqQ}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.q}
        <span className={s.faqIcon} aria-hidden="true">+</span>
      </button>
      <div
        className={s.faqA}
        id={`faq-answer-${index}`}
        aria-hidden={!open}
      >
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      {/* PAGE HEADER */}
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>What we offer</p>
        <h1 data-reveal>
          Services &amp; <em>pricing.</em>
        </h1>
      </div>

      {/* LEAD */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <p className={s.lead} data-reveal>
          Three ways to work together — each shaped around the quality of light,
          not the volume of files. Every package includes our full post-production
          process and direct communication with Mara from enquiry to delivery.
        </p>

        {/* PACKAGES */}
        <div className={s.pkgGrid}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.name}
              className={svc.featured ? `${s.pkg} ${s.pkgFeatured}` : s.pkg}
              data-reveal
              data-reveal-delay={String(i * 100)}
            >
              <div className={s.pkgTag}>{svc.tag}</div>
              <h3>{svc.name}</h3>
              <div className={s.pkgPrice}>
                {svc.price}
                {' '}
                <small>{svc.unit}</small>
              </div>
              <p className={s.pkgDesc}>{svc.desc}</p>
              <ul className={s.pkgList}>
                {svc.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={`${BASE}/contact`} className={svc.featured ? `${s.btn} ${s.btnFilled}` : s.btn}>
                Enquire now
              </Link>
            </div>
          ))}
        </div>

        {/* CUSTOM NOTE */}
        <div
          data-reveal
          style={{
            marginTop: 48,
            padding: 'clamp(28px, 4vw, 48px)',
            borderLeft: '3px solid var(--gold-dim)',
            background: 'var(--black-2)',
          }}
        >
          <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2.5vw, 26px)', color: 'var(--cream)' }}>
            Every job is a conversation before it's a quote. If you have a vision
            that doesn't fit neatly into a package, tell us — we'll build
            something around it.
          </p>
          <p className={s.signature} style={{ marginTop: 20 }}>— Mara</p>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* HOW IT WORKS */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>The process</p>
        <h2 className={s.h2} data-reveal>How we work together</h2>
        <div className={s.svcTeaser} style={{ marginTop: 44 }}>
          {[
            { n: '01', title: 'Enquire', body: 'Fill in the contact form or drop us a line. We typically respond within 24 hours with availability and an invitation to talk.' },
            { n: '02', title: 'Consult', body: 'A 30-minute call — no charge, no pressure. We talk about the story you want told, the light conditions, the feel. We might push back on ideas we think won’t serve you.' },
            { n: '03', title: 'Shoot', body: 'On the day, we arrive early, scout the light, and disappear into the background. Our goal is that you forget we’re there.' },
            { n: '04', title: 'Deliver', body: 'Your hand-graded gallery lands in a private online archive. We walk you through it together before handing over the full-resolution files.' },
          ].map((step, i) => (
            <div key={step.n} className={s.svcCell} data-reveal data-reveal-delay={String(i * 80)}>
              <span className={s.svcNum}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={s.hairline} />

      {/* FAQ */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>Common questions</p>
        <h2 className={s.h2} data-reveal>FAQ</h2>
        <div className={s.faqWrap}>
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 56 }} data-reveal>
          <p className={s.lead} style={{ marginBottom: 28 }}>
            Still have questions? We're a real studio run by real people — not a
            booking algorithm.
          </p>
          <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnFilled}`}>
            Ask us directly
          </Link>
        </div>
      </section>
    </>
  )
}
