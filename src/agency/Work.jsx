import { PREVIEWS } from '../shared/previews'
import PreviewCard from './PreviewCard'

export default function Work() {
  return (
    <>
      <section className="ag-pagehead ag-container">
        <p className="ag-eyebrow" data-reveal>5 directions · 25 pages</p>
        <h1 data-reveal data-reveal-delay="80">Redesigning<br />ARTOSPHERED.</h1>
        <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ marginTop: '1.4rem' }}>
          Five complete redesign directions for the cultural archive — same brand and content, each with its
          own identity, five pages, smooth scrolling, a signature loader and unique interactions.
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
