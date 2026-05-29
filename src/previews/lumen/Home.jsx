import { Link } from 'react-router-dom'
import { BASE, SERVICES } from './data'
import s from './styles.module.css'

const TEASERS = [
  { seed: 'lumen-home-1', cls: 't1', cap: 'Editorial — Smoke & Silk' },
  { seed: 'lumen-home-2', cls: 't2', cap: 'Travel — Lisbon' },
  { seed: 'lumen-home-3', cls: 't3', cap: 'Portrait — Quiet Study' },
  { seed: 'lumen-home-4', cls: 't4', cap: 'Wedding — The First Look' },
  { seed: 'lumen-home-5', cls: 't5', cap: 'Travel — Sea Road' },
  { seed: 'lumen-home-6', cls: 't6', cap: 'Editorial — Atelier No. 9' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <img
          className={s.heroImg}
          src="https://picsum.photos/seed/lumen-hero-cinematic/1920/1200"
          alt=""
          aria-hidden="true"
        />
        <div className={s.heroVignette} />
        <div className={s.heroInner}>
          <h1 className={s.heroTitle}>Light,<br /><em>framed.</em></h1>
          <p className={s.heroSub}>
            A cinematic photography studio chasing the soft, golden fall-off of
            real light — for portraits, weddings and brands who want to be remembered.
          </p>
          <div className={s.heroActions}>
            <Link to={`${BASE}/portfolio`} className={`${s.btn} ${s.btnFilled}`}>View the work</Link>
            <Link to={`${BASE}/contact`} className={s.btn}>Book a shoot</Link>
          </div>
        </div>
        <div className={s.scrollCue}>Scroll</div>
      </section>

      {/* MANIFESTO */}
      <section className={s.section}>
        <div className={s.manifesto}>
          <div data-reveal>
            <p className={s.eyebrow}>The studio</p>
            <h2 className={s.h2}>We don't take photographs. We keep light.</h2>
          </div>
          <div className={s.manifestoText} data-reveal data-reveal-delay="120">
            <p>
              Every frame begins with a feeling — the hush before a vow, the way
              afternoon spills across a face, the colour of a city at dusk. We shoot
              slowly, deliberately, and grade every image <em>by hand</em> so it reads
              like a still pulled from a film you half-remember.
            </p>
            <p className={s.signature}>— Mara Vance, founder</p>
          </div>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* TEASER GALLERY */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>Selected frames</p>
        <h2 className={s.h2} data-reveal>A year in light</h2>
        <div className={s.teaserGrid}>
          {TEASERS.map((t, i) => (
            <Link
              key={t.seed}
              to={`${BASE}/portfolio`}
              className={`${s.tile} ${s[t.cls]}`}
              data-reveal
              data-reveal-delay={String(i * 70)}
            >
              <img
                src={`https://picsum.photos/seed/${t.seed}/900/900`}
                alt={t.cap}
                loading="lazy"
                width="900"
                height="900"
              />
              <span className={s.tileCap}>{t.cap}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>What we do</p>
        <h2 className={s.h2} data-reveal>Three ways to work together</h2>
        <div className={s.svcTeaser}>
          {SERVICES.map((svc, i) => (
            <div key={svc.name} className={s.svcCell} data-reveal data-reveal-delay={String(i * 90)}>
              <span className={s.svcNum}>0{i + 1}</span>
              <h3>{svc.name}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }} data-reveal>
          <Link to={`${BASE}/services`} className={s.btn}>See packages & pricing</Link>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* TESTIMONIAL */}
      <section className={s.section}>
        <div className={s.testi} data-reveal>
          <blockquote>
            They didn't just photograph our wedding — they bottled the entire feeling
            of the day. We open the gallery and we're right back there.
          </blockquote>
          <p className={s.testiBy}>Eleni & Theo · married in Santorini</p>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <img
          className={s.ctaBg}
          src="https://picsum.photos/seed/lumen-cta-strip/1920/900"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <p className={s.eyebrow} data-reveal style={{ justifyContent: 'center' }}>Available now</p>
        <h2 className={s.ctaTitle} data-reveal>Let's make something<br /><em>worth keeping.</em></h2>
        <div data-reveal>
          <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnFilled}`}>Start a project</Link>
        </div>
      </section>
    </>
  )
}
