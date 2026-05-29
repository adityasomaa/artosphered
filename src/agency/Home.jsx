import { Link } from 'react-router-dom'
import { PREVIEWS } from '../shared/previews'
import PreviewCard from './PreviewCard'
import CountUp from './CountUp'

const MARQUEE = ['Photography', 'Art Galleries', 'Music & Events', 'Fashion', 'Web3', 'E-commerce', 'Hospitality', 'Startups']

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="ag-hero">
        <span className="ag-hero-blob ag-blob-1" />
        <span className="ag-hero-blob ag-blob-2" />
        <div className="ag-container">
          <p className="ag-eyebrow" data-reveal>Creative Web Studio · Est. 2026</p>
          <h1 data-reveal data-reveal-delay="80">
            We build websites<br />that <span className="grad">feel alive.</span>
          </h1>
          <p className="ag-lead" data-reveal data-reveal-delay="160">
            ARTOSPHERED designs and ships standout digital experiences for artists, brands and
            visionaries. Below are <strong style={{ color: 'var(--ink)' }}>five live demo sites</strong> — proof of exactly what we can deliver for you.
          </p>
          <div className="ag-hero-actions" data-reveal data-reveal-delay="240">
            <Link to="/work" className="ag-btn ag-btn-primary">View the 5 demos →</Link>
            <Link to="/contact" className="ag-btn ag-btn-ghost">Start your project</Link>
          </div>

          <div className="ag-marquee" data-reveal data-reveal-delay="320">
            <div className="ag-marquee-track">
              <span>{MARQUEE.map((m) => <span key={m}>{m} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>✦</em></span>)}</span>
              <span aria-hidden>{MARQUEE.map((m) => <span key={m + '2'}>{m} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>✦</em></span>)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ag-container">
        <div className="ag-stats" data-reveal>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={5} /></div><div className="ag-stat-label">Live demo sites</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={25} suffix="+" /></div><div className="ag-stat-label">Pages crafted</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={100} suffix="%" /></div><div className="ag-stat-label">Responsive</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={14} suffix="d" /></div><div className="ag-stat-label">Avg. delivery</div></div>
        </div>
      </section>

      {/* WORK */}
      <section className="ag-section ag-container">
        <div className="ag-section-head">
          <div>
            <p className="ag-eyebrow" data-reveal>Selected demos</p>
            <h2 className="ag-h2" data-reveal data-reveal-delay="80">Five worlds,<br />one studio.</h2>
          </div>
          <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ maxWidth: '40ch' }}>
            Each demo is a fully built, navigable site with five pages. Click any card to explore it live.
          </p>
        </div>
        <div className="ag-work-grid">
          {PREVIEWS.map((p, i) => <PreviewCard key={p.slug} preview={p} index={i} />)}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="ag-section ag-container">
        <p className="ag-eyebrow" data-reveal>What we do</p>
        <h2 className="ag-h2" data-reveal data-reveal-delay="80" style={{ marginBottom: '3rem' }}>End-to-end, in-house.</h2>
        <div className="ag-feature-grid">
          {[
            ['◓', 'Brand-led design', 'Custom visual identity, type systems and art direction tailored to your story — never a template.'],
            ['✦', 'Motion & interaction', 'Scroll-driven animation, micro-interactions and tactile transitions that make the site feel alive.'],
            ['◈', 'Engineering', 'Fast, accessible React builds. Responsive to the pixel, with hamburger nav on mobile & tablet.'],
          ].map(([ico, t, d], i) => (
            <div className="ag-feature" data-reveal data-reveal-delay={i * 90} key={t}>
              <div className="ag-feature-ico">{ico}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem' }} data-reveal>
          <Link to="/services" className="ag-btn ag-btn-ghost">All services & pricing →</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="ag-section ag-container">
        <div className="ag-cta-band" data-reveal>
          <p className="ag-eyebrow" style={{ justifyContent: 'center' }}>Ready when you are</p>
          <h2 className="ag-h2" style={{ margin: '0 auto 1.4rem', maxWidth: '16ch' }}>Your site could be the next demo.</h2>
          <p className="ag-lead" style={{ margin: '0 auto 2rem' }}>Tell us about your project and we’ll send back a concept within 48 hours.</p>
          <Link to="/contact" className="ag-btn ag-btn-primary">Start a project →</Link>
        </div>
      </section>
    </>
  )
}
