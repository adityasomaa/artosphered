import { Link } from 'react-router-dom'
import { SERVICES } from '../../shared/content.js'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

const BASE = '/p/void'

export default function Services() {
  return (
    <div className={s.innerPage}>
      <div className={s.container}>

        <div className={s.pageHeader}>
          <div className={s.pageHeaderMeta}>
            <span className={s.blockLabel}>// CREATIVE SERVICES</span>
            <span className={s.pageHeaderCount}>{SERVICES.length} OFFERINGS</span>
          </div>
          <h1 className={s.pageTitle}>What We Offer</h1>
          <p className={s.pageSubtitle}>
            Strategic creative work for brands and institutions that want to speak the language of culture.
          </p>
        </div>

        <div className={s.servicesList}>
          {SERVICES.map(function (svc, i) {
            return (
              <div key={svc.id} className={s.serviceBlock} data-reveal>
                <div className={s.serviceBlockLeft}>
                  <span className={s.serviceNo}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={s.serviceBlockBody}>
                  <h2 className={s.serviceTitle}>{svc.title}</h2>
                  <p className={s.serviceDesc}>{svc.desc}</p>
                  <ul className={s.serviceItems}>
                    {svc.items.map(function (item) {
                      return (
                        <li key={item} className={s.serviceItem}>
                          <span className={s.serviceItemArrow}>&rarr;</span>
                          {item}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className={s.serviceBlockRight}>
                  <Graphic
                    seed={'aro-svc-' + (i + 1)}
                    tone="mono"
                    className={s.serviceImgWrap}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className={s.servicesCta} data-reveal>
          <div className={s.servicesCtaInner}>
            <span className={s.blockLabel}>START A PROJECT</span>
            <p className={s.servicesCtaText}>
              Ready to work with us? Tell us about your project and we will get back to you.
            </p>
            <Link to={BASE + '/contact'} className={s.btnPrimary}>
              Get in Touch &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
