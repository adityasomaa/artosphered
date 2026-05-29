import { PREVIEWS } from '../shared/previews'
import PreviewCard from './PreviewCard'

export default function Work() {
  return (
    <>
      <section className="ag-pagehead ag-container">
        <p className="ag-eyebrow" data-reveal>The demos · 5 sites · 25 pages</p>
        <h1 data-reveal data-reveal-delay="80">Explore the work.</h1>
        <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ marginTop: '1.4rem' }}>
          Five complete, production-grade demo sites — each with its own identity, five pages and unique
          interactions. This is the standard of what we’ll build for your brand.
        </p>
      </section>

      <section className="ag-container" style={{ paddingBottom: 'clamp(4rem,12vw,9rem)' }}>
        <div className="ag-work-grid">
          {PREVIEWS.map((p, i) => <PreviewCard key={p.slug} preview={p} index={i} />)}
        </div>
      </section>
    </>
  )
}
