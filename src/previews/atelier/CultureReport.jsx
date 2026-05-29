import { useState } from 'react'
import { ARTICLES, ARTICLE_CATS } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

export default function CultureReport() {
  const [activeCat, setActiveCat] = useState('All')

  const lead = ARTICLES[0]
  const rest = ARTICLES.slice(1)

  const filtered = activeCat === 'All'
    ? rest
    : rest.filter((a) => a.cat === activeCat)

  return (
    <div className={s.crPage}>
      {/* ── Masthead / Lead ────────────────────────────── */}
      <div className={s.crHero}>
        <div className={s.crHeroMast} data-reveal="fade">
          <h1 className={s.crHeroTitle}>Culture Report</h1>
          <span className={s.crHeroIssue}>Issue 01 &nbsp;/&nbsp; 2026</span>
        </div>

        <div className={s.crLeadGrid} data-reveal>
          <div className={s.crLeadImg} style={{ position: 'relative' }}>
            <Graphic
              seed="aro-ed-cr-lead"
              tone="amber"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              label={lead.cat}
            />
          </div>
          <div className={s.crLeadBody}>
            <div className={s.crLeadTag}>
              <span style={{ color: 'var(--gold)' }}>{lead.cat}</span>
              <span>{lead.city}</span>
            </div>
            <h2 className={s.crLeadTitle}>{lead.title}</h2>
            <p className={s.crLeadExcerpt}>{lead.excerpt}</p>
            <div className={s.crLeadMeta}>
              <span>{lead.read} read</span>
              <span>{lead.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      <div className={s.crBody}>
        {/* Category filter */}
        <div className={s.crFilter} role="group" aria-label="Filter by category">
          {ARTICLE_CATS.map((cat) => (
            <button
              key={cat}
              type="button"
              className={activeCat === cat
                ? `${s.crFilterBtn} ${s.crFilterBtnActive}`
                : s.crFilterBtn}
              onClick={() => setActiveCat(cat)}
              aria-pressed={activeCat === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div className={s.crGrid}>
          {filtered.map((article, i) => (
            <article
              key={article.id}
              className={s.crCard}
              data-reveal
              data-reveal-delay={Math.min(i * 70, 280)}
            >
              <div className={s.crCardImg} style={{ position: 'relative' }}>
                <Graphic
                  seed={`aro-ed-cr-${i + 1}`}
                  tone={i % 3 === 0 ? 'amber' : i % 3 === 1 ? 'holo' : 'warm'}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  label={article.cat}
                />
              </div>
              <div className={s.crCardCat}>
                <span style={{ color: 'var(--gold)' }}>{article.cat}</span>
                <span>{article.city}</span>
              </div>
              <h3 className={s.crCardTitle}>{article.title}</h3>
              <p className={s.crCardExcerpt}>{article.excerpt}</p>
              <div className={s.crCardMeta}>
                <span>{article.read} read</span>
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', textAlign: 'center', padding: '64px 0' }}>
            No stories in this category yet.
          </p>
        )}
      </div>
    </div>
  )
}
