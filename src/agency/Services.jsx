import { Link } from 'react-router-dom'

const SERVICES = [
  ['◓', 'Web Design', 'Bespoke UI/UX, design systems, art direction and prototyping in Figma.'],
  ['✦', 'Development', 'Hand-built React / Next.js front-ends. Fast, accessible, SEO-ready.'],
  ['◈', 'Motion Design', 'Scroll-driven storytelling, GSAP animation and micro-interactions.'],
  ['❖', 'Brand & Identity', 'Logo systems, typography, colour and voice that carry across every touchpoint.'],
  ['◐', 'E-commerce', 'Conversion-focused stores with smooth carts, filtering and checkout.'],
  ['⬡', 'Care & Growth', 'Hosting, analytics, A/B tests and ongoing iteration after launch.'],
]

const PLANS = [
  {
    name: 'Launch',
    cost: '$1.8k',
    note: 'For a sharp single-page presence.',
    feats: ['1 page, fully responsive', 'Custom design', 'Basic animations', 'Contact form', '2-week delivery'],
  },
  {
    name: 'Studio',
    cost: '$4.5k',
    note: 'Our most popular — a full multi-page site.',
    feats: ['Up to 6 pages', 'Bespoke design system', 'Scroll & motion design', 'CMS integration', 'SEO + analytics', '1 month support'],
    featured: true,
  },
  {
    name: 'Signature',
    cost: "Let's talk",
    note: 'Flagship builds & e-commerce.',
    feats: ['Unlimited pages', 'Advanced 3D / WebGL', 'E-commerce & integrations', 'Performance tuning', 'Quarterly retainer'],
  },
]

export default function Services() {
  return (
    <>
      <section className="ag-pagehead ag-container">
        <p className="ag-eyebrow" data-reveal>Services & pricing</p>
        <h1 data-reveal data-reveal-delay="80">Everything you need,<br />under one roof.</h1>
      </section>

      <section className="ag-container ag-section" style={{ paddingTop: 0 }}>
        <div className="ag-feature-grid">
          {SERVICES.map(([ico, t, d], i) => (
            <div className="ag-feature" data-reveal data-reveal-delay={(i % 3) * 90} key={t}>
              <div className="ag-feature-ico">{ico}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ag-container ag-section" style={{ paddingTop: 0 }}>
        <div className="ag-section-head">
          <h2 className="ag-h2" data-reveal>Transparent pricing.</h2>
          <p className="ag-lead" data-reveal data-reveal-delay="120" style={{ maxWidth: '38ch' }}>
            Fixed-scope packages, no surprises. Every plan includes responsive layouts and a hamburger menu on mobile & tablet.
          </p>
        </div>
        <div className="ag-price-grid">
          {PLANS.map((p, i) => (
            <div className={`ag-price${p.featured ? ' featured' : ''}`} data-reveal data-reveal-delay={i * 100} key={p.name}>
              <span className="ag-price-name">{p.name}</span>
              <div className="ag-price-cost">{p.cost}</div>
              <p style={{ color: 'var(--ink-mute)', fontSize: '0.92rem' }}>{p.note}</p>
              <ul>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <Link to="/contact" className={`ag-btn ${p.featured ? 'ag-btn-primary' : 'ag-btn-ghost'}`} style={{ marginTop: 'auto', justifyContent: 'center' }}>
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
