const STEPS = [
  ['01', 'Discovery', 'We dig into your brand, goals and audience. You share references; we map the scope, sitemap and success metrics.'],
  ['02', 'Design', 'Moodboards, then high-fidelity screens in Figma. We iterate together until every pixel feels right.'],
  ['03', 'Build', 'We engineer the site in React — responsive from day one, with motion, accessibility and speed baked in.'],
  ['04', 'Launch', 'QA across devices, a hamburger-menu pass for mobile & tablet, deploy, and a walkthrough so you own it.'],
  ['05', 'Grow', 'Post-launch we monitor analytics, run experiments and keep the site evolving with your business.'],
]

export default function Process() {
  return (
    <>
      <section className="ag-pagehead ag-container">
        <p className="ag-eyebrow" data-reveal>How we work</p>
        <h1 data-reveal data-reveal-delay="80">From idea to live<br />in five steps.</h1>
        <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ marginTop: '1.4rem' }}>
          A calm, collaborative process. You always know what’s happening and what comes next.
        </p>
      </section>

      <section className="ag-container ag-section" style={{ paddingTop: '2rem' }}>
        <div className="ag-steps">
          {STEPS.map(([n, t, d], i) => (
            <div className="ag-step" data-reveal data-reveal-delay={i * 60} key={n}>
              <div className="ag-step-num">{n}</div>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
