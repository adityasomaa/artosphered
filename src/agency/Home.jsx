import { Link } from 'react-router-dom'
import { PREVIEWS } from '../shared/previews'
import { BRAND } from '../shared/content'
import PreviewCard from './PreviewCard'
import CountUp from './CountUp'

const MARQUEE = ['Culture Report', 'Art & Design', 'Event Coverage', 'Fashion', ...BRAND.cities]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="ag-hero">
        <span className="ag-hero-blob ag-blob-1" />
        <span className="ag-hero-blob ag-blob-2" />
        <div className="ag-container">
          <p className="ag-eyebrow" data-reveal>Redesign Proposal · ARTOSPHERED</p>
          <h1 data-reveal data-reveal-delay="80">
            Five ways to<br />rebuild <span className="grad">the archive.</span>
          </h1>
          <p className="ag-lead" data-reveal data-reveal-delay="160">
            ARTOSPHERED documents art, fashion and contemporary culture across cities. Here are{' '}
            <strong style={{ color: 'var(--ink)' }}>five complete redesign directions</strong> for the site —
            same brand, same content, five distinct worlds. Each is a fully navigable build with five pages.
          </p>
          <div className="ag-hero-actions" data-reveal data-reveal-delay="240">
            <Link to="/work" className="ag-btn ag-btn-primary">Explore the 5 directions →</Link>
            <Link to="/contact" className="ag-btn ag-btn-ghost">Start a project</Link>
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
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={5} /></div><div className="ag-stat-label">Redesign directions</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={25} suffix="+" /></div><div className="ag-stat-label">Pages designed</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={8} /></div><div className="ag-stat-label">Cities documented</div></div>
          <div className="ag-stat"><div className="ag-stat-num"><CountUp end={100} suffix="%" /></div><div className="ag-stat-label">Responsive</div></div>
        </div>
      </section>

      {/* WORK */}
      <section className="ag-section ag-container">
        <div className="ag-section-head">
          <div>
            <p className="ag-eyebrow" data-reveal>The directions</p>
            <h2 className="ag-h2" data-reveal data-reveal-delay="80">Five worlds,<br />one archive.</h2>
          </div>
          <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ maxWidth: '40ch' }}>
            Same ARTOSPHERED content, five visual treatments. Each is a fully built, navigable redesign with five pages. Click any card to explore it live.
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
          <h2 className="ag-h2" style={{ margin: '0 auto 1.4rem', maxWidth: '18ch' }}>Pick a direction and we’ll make it real.</h2>
          <p className="ag-lead" style={{ margin: '0 auto 2rem' }}>Tell us which world fits ARTOSPHERED best and we’ll send back a full plan within 48 hours.</p>
          <Link to="/contact" className="ag-btn ag-btn-primary">Start a project →</Link>
        </div>
      </section>
    </>
  )
}
