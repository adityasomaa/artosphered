import { Link } from 'react-router-dom'

/** A clickable case-study card for one demo preview. */
export default function PreviewCard({ preview, index = 0 }) {
  const { slug, name, kind, blurb, tags, accent, bg } = preview
  return (
    <Link
      to={`/p/${slug}`}
      className="ag-card"
      data-reveal
      data-reveal-delay={index * 80}
      style={{ '--card-accent': accent }}
    >
      <div
        className="ag-card-bg"
        style={{
          background: `radial-gradient(120% 120% at 80% 0%, ${accent}22, transparent 55%), linear-gradient(180deg, ${bg}, #060608)`,
        }}
      />
      <div className="ag-card-glow" />
      <span className="ag-card-open" aria-hidden>↗</span>
      <span className="ag-card-kind">{kind}</span>
      <h3 className="ag-card-name">{name}</h3>
      <p className="ag-card-blurb">{blurb}</p>
      <div className="ag-card-tags">
        {tags.map((t) => (
          <span key={t} className="ag-tag">{t}</span>
        ))}
      </div>
    </Link>
  )
}
