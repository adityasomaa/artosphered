import { Link } from 'react-router-dom'
import { BASE } from './data'
import { SERVICES } from '../../shared/content'
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

      {/* SERVICES — cinematic full sections */}
      {SERVICES.map((svc, i) => (
        <section key={svc.id} className={s.svcSection} data-alt={i % 2 === 1}>
          <div className={s.svcSectionInner}>
            <div className={s.svcSectionImg}>
              <img
                src={`https://picsum.photos/seed/aro-svc-${i + 1}/1000/800`}
                alt={svc.title}
                loading="lazy"
                width="1000"
                height="800"
                sizes="(max-width: 860px) 100vw, 50vw"
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
        <img
          className={s.ctaBg}
          src="https://picsum.photos/seed/aro-svc-cta/1920/900"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
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
