import { useState } from 'react'
import { ARTICLES, ARTICLE_CATS } from '../../shared/content'
import s from './styles.module.css'

export default function CultureReport() {
  const [cat, setCat] = useState('All')

  const filtered = cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.cat === cat)

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>Culture Report</div>
          <h1 className={s.sectionTitle}>The Archive</h1>
          <p className={s.sectionSub}>
            Long-form features, interviews and city dispatches. Culture documented, not consumed.
          </p>
        </div>

        {/* Category filter */}
        <div className={`${s.filterBar} ${s.reveal}`} data-reveal>
          {ARTICLE_CATS.map((c) => (
            <button
              key={c}
              type="button"
              className={cat === c ? `${s.filterBtn} ${s.filterBtnActive}` : s.filterBtn}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className={s.crGrid}>
          {filtered.map((a, i) => (
            <article
              key={a.id}
              className={`${s.crCard} ${s.reveal}`}
              data-reveal
              data-reveal-delay={i * 60}
            >
              <div className={s.crImg}>
                <img
                  src={`https://picsum.photos/seed/${a.seed}/640/420`}
                  alt={a.title}
                  loading="lazy"
                  width={640}
                  height={420}
                  sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={s.crBody}>
                <div className={s.articleMeta}>
                  <span className={s.articleCat}>{a.cat}</span>
                  <span className={s.articleCity}>{a.city}</span>
                </div>
                <h2 className={s.crTitle}>{a.title}</h2>
                <p className={s.crExcerpt}>{a.excerpt}</p>
                <div className={s.articleFoot}>
                  <span>{a.date}</span>
                  <span>{a.read} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
