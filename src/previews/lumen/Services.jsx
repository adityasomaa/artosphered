import { Link } from 'react-router-dom'
import { BASE } from './data'
import { SERVICES } from '../../shared/content'
import Graphic from '../../shared/Graphic'
import s from './styles.module.css'

export default function Services() {
  return (
    <>
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>What we offer</p>
        <h1 data-reveal>
          Creative <em>Services</em>
        </h1>
      </div>

      <section className={s.section} style={{ paddingTop: 0 }}>
        <p className={s.lead} data-reveal>
          ARTOSPHERED works with brands, institutions and independent creators who
          want to speak the language of culture &#8212; authentically, and without
          compromise.
        </p>
      </section>

      {/* SERVICES cinematic full sections */}
      {SERVICES.map((svc, i) => (
        <section key={svc.id} className={s.svcSection} data-alt={i % 2 === 1}>
          <div className={s.svcSectionInner}>
            <div className={s.svcSectionImg}>
              <Graphic
                seed={`aro-mo-svc-${i + 1}`}
                tone={i % 2 === 0 ? 'warm' : 'amber'}
                className={s.svcGraphic}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className={s.svcSectionContent} data-reveal>
              <span className={s.svcSectionNum}>0{i + 1}</span>
              <h2 className={s.svcSectionTitle}>{svc.title}</h2>
              <p className={s.svcSectionDesc}>{svc.desc}</p>
              <ul className={s.svcItemList}>
                {svc.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={`${BASE}/contact`} className={s.btn}>
                Enquire
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaBgGraphic}>
          <Graphic seed="aro-mo-svc-cta" tone="warm" style={{ width: '100%', height: '100%' }} />
        </div>
        <p className={s.eyebrow} data-reveal style={{ justifyContent: 'center' }}>
          Ready to collaborate?
        </p>
        <h2 className={s.ctaTitle} data-reveal>
          Every project starts<br />
          <em>with a conversation.</em>
        </h2>
        <div data-reveal>
          <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnFilled}`}>
            Start a project
          </Link>
        </div>
      </section>
    </>
  )
}
