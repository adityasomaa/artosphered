import { useState } from 'react'
import { ARTICLES, ARTICLE_CATS } from '../../shared/content.js'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

export default function CultureReport() {
  const [activeCat, setActiveCat] = useState('All')

  const filtered = activeCat === 'All'
    ? ARTICLES
    : ARTICLES.filter(function (a) { return a.cat === activeCat })

  return (
    <div className={s.innerPage}>
      <div className={s.container}>

        {/* Page header */}
        <div className={s.pageHeader}>
          <div className={s.pageHeaderMeta}>
            <span className={s.blockLabel}>// CULTURE REPORT</span>
            <span className={s.pageHeaderCount}>{filtered.length} ENTRIES</span>
          </div>
          <h1 className={s.pageTitle}>Archive Index</h1>
          <p className={s.pageSubtitle}>
            Editorial features, city dispatches and cultural analysis.
          </p>
        </div>

        {/* Filter bar */}
        <div className={s.filterBar}>
          <span className={s.filterBarLabel}>FILTER BY</span>
          {ARTICLE_CATS.map(function (cat) {
            return (
              <button
                key={cat}
                className={s.filterBtn + (activeCat === cat ? ' ' + s.filterBtnActive : '')}
                onClick={function () { setActiveCat(cat) }}
              >
                {cat.toUpperCase()}
              </button>
            )
          })}
        </div>

        {/* Archive table */}
        <div className={s.archiveTable} data-reveal>
          <table className={s.indexTable}>
            <thead>
              <tr className={s.indexThead}>
                <th className={s.thNo}>NO.</th>
                <th className={s.thDate}>DATE</th>
                <th className={s.thCity}>CITY</th>
                <th className={s.thCat}>CAT.</th>
                <th className={s.thRead}>READ</th>
                <th className={s.thTitle}>TITLE &amp; EXCERPT</th>
                <th className={s.thImg}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function (a, i) {
                return (
                  <tr key={a.id} className={s.indexRow + ' ' + s.indexRowExpandable}>
                    <td className={s.tdNo}>{String(i + 1).padStart(2, '0')}</td>
                    <td className={s.tdDate}>{a.date}</td>
                    <td className={s.tdCity}>{a.city.toUpperCase()}</td>
                    <td className={s.tdCat}>
                      <span className={s.catPill}>{a.cat.toUpperCase()}</span>
                    </td>
                    <td className={s.tdRead}>{a.read}</td>
                    <td className={s.tdTitleBlock}>
                      <span className={s.articleTitle}>{a.title}</span>
                      <span className={s.articleExcerpt}>{a.excerpt}</span>
                    </td>
                    <td className={s.tdImg}>
                      <Graphic
                        seed={'aro-ar-' + (i + 1)}
                        tone="amber"
                        className={s.thumbWrap}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={s.emptyState}>
              <span className={s.blockLabel}>NO ENTRIES MATCH THIS FILTER</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
