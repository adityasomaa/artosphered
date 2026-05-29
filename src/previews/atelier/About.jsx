import { Link } from 'react-router-dom'
import { TIMELINE, BASE } from './data'
import s from './styles.module.css'

export default function About() {
  return (
    <div className={s.aboutPage}>
      {/* ── Hero ───────────────────────────────────────────── */}
      <div className={s.aboutHero}>
        <img
          className={s.aboutHeroBg}
          src="https://picsum.photos/seed/atelier-about-hero/1600/900"
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className={s.aboutHeroOverlay} aria-hidden="true" />
        <div className={s.aboutHeroContent}>
          <p className={s.sectionEyebrow} data-reveal="fade">The Maison</p>
          <h1 className={s.aboutHeroTitle} data-reveal>
            Made<br />in Lyon.
          </h1>
          <p className={s.aboutHeroSub} data-reveal data-reveal-delay="100">
            ATELIER was founded in 1987 with a simple conviction: that beautiful
            clothing could be made honestly, and that honesty could be beautiful.
            Thirty-seven years later, we have not revised that conviction.
          </p>
        </div>
      </div>

      {/* ── Brand story ──────────────────────────────────── */}
      <section className={s.brandStory} aria-label="Brand Story">
        <div className={s.brandStoryMedia}>
          <img
            src="https://picsum.photos/seed/atelier-story-atelier/800/900"
            alt="The ATELIER workroom in Lyon"
            width={800}
            height={900}
            loading="lazy"
          />
        </div>
        <div className={s.brandStoryBody}>
          <p className={s.sectionEyebrow} data-reveal="fade">Our Story</p>
          <h2 className={s.sectionTitle} data-reveal>
            A Room,<br />A Conviction
          </h2>
          <p className={s.sectionBody} data-reveal data-reveal-delay="80">
            Isabelle Faure did not set out to build a fashion house. She set out
            to make clothes that would last. The room on Rue Auguste Comte was
            small — a single window, a cutting table inherited from her
            grandmother, bolts of wool from a merchant she trusted.
          </p>
          <p className={s.sectionBody} data-reveal data-reveal-delay="140">
            The first collection had twelve pieces. The house now produces
            sixty to eighty pieces per season, each one still made in Lyon,
            each one still cut by a single tailor from start to finish. The room
            is larger now. The conviction has not changed.
          </p>
          <div data-reveal data-reveal-delay="200">
            <Link to={`${BASE}/collections`} className={s.btnGhost}>
              View Current Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── Heritage timeline ────────────────────────────── */}
      <section className={s.timeline} aria-label="Heritage Timeline">
        <h2 className={s.timelineTitle} data-reveal>Heritage</h2>
        <div className={s.timelineList}>
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className={s.timelineItem}
              data-reveal
              data-reveal-delay={i * 80}
            >
              <div className={s.timelineYear}>{item.year}</div>
              <div className={s.timelineContent}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Craft pillars ────────────────────────────────── */}
      <section className={s.craftSection} aria-label="Our Craft">
        {[
          {
            icon: '◆',
            title: 'Single-maker Construction',
            body: 'Each ATELIER garment is cut and constructed by one person from beginning to end. This practice, all but extinct in the industry, ensures that every decision about the cloth is made by a single pair of hands with full knowledge of the piece.',
          },
          {
            icon: '◆',
            title: 'Sustainable by Design',
            body: 'We produce only what is ordered. No stock. No waste. Surplus cloth returns to the mill as filling or is donated to training programmes. Our dyeworks operates on a zero-discharge system, filtering and reusing 96% of all water used.',
          },
          {
            icon: '◆',
            title: 'Lifetime Repair',
            body: 'Every garment we have ever sold is eligible for repair at no charge. We maintain a full archive of fabrics and a team of restorers in Lyon. An ATELIER coat from 1991 and one from 2026 are treated with the same attention.',
          },
        ].map((item) => (
          <div key={item.title} className={s.craftItem} data-reveal>
            <div className={s.craftIcon}>{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </section>

      {/* ── Materials & Sustainability ───────────────────── */}
      <section
        style={{ padding: '120px 48px', maxWidth: '1280px', margin: '0 auto' }}
        aria-label="Materials and Sustainability"
      >
        <div
          className={s.brandStory}
          style={{ minHeight: 'auto', gap: '64px' }}
        >
          <div>
            <p className={s.sectionEyebrow} data-reveal="fade">Materials</p>
            <h2 className={s.sectionTitle} data-reveal>
              Cloth with<br />Provenance
            </h2>
            <p className={s.sectionBody} data-reveal data-reveal-delay="80">
              Every fibre in every ATELIER garment is traceable to its source.
              Our cashmere comes from a flock of 1,200 Hircus goats on a plateau
              in Inner Mongolia, tended by the same family since 1963.
            </p>
            <p className={s.sectionBody} data-reveal data-reveal-delay="140">
              Our wools originate in Scotland — Shetland for knitwear, Cheviot
              for outerwear — and are spun at our own mill in the Borders, where
              we have operated since 2008. We dye with natural pigments where
              possible, and with certified low-impact synthetics where not.
            </p>
            <p className={s.sectionBody} data-reveal data-reveal-delay="200">
              We publish an annual Materials Report. Every source. Every process.
              Every certification. Not because regulation requires it, but
              because we believe our customers deserve to know what they are
              wearing.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <img
              src="https://picsum.photos/seed/atelier-material-1/500/600"
              alt="Cashmere fibres"
              width={500}
              height={600}
              loading="lazy"
              style={{ width: '100%', objectFit: 'cover', display: 'block' }}
              data-reveal="right"
            />
            <img
              src="https://picsum.photos/seed/atelier-material-2/500/600"
              alt="Wool weaving at the mill"
              width={500}
              height={600}
              loading="lazy"
              style={{ width: '100%', objectFit: 'cover', display: 'block', marginTop: '40px' }}
              data-reveal="right"
              data-reveal-delay="100"
            />
          </div>
        </div>
      </section>

      {/* ── Founder note ─────────────────────────────────── */}
      <section className={s.founderSection} aria-label="Founder Note">
        <div className={s.founderMedia}>
          <img
            src="https://picsum.photos/seed/atelier-founder-portrait/800/900"
            alt="Isabelle Faure, founder of ATELIER"
            width={800}
            height={900}
            loading="lazy"
          />
        </div>
        <div className={s.founderBody}>
          <p className={s.sectionEyebrow} data-reveal="fade">Founder's Note</p>
          <h2 className={s.sectionTitle} data-reveal style={{ color: 'var(--ivory)' }}>
            A Letter<br />from Isabelle
          </h2>
          <p className={s.founderQuote} data-reveal data-reveal-delay="80">
            "I have never wanted to make more clothes. I have always wanted to
            make better ones. There is a version of this house that could have
            grown much larger, much faster. I chose not to take it. I chose
            Lyon, and the table, and the cloth. I would choose the same again."
          </p>
          <p className={s.founderSig} data-reveal data-reveal-delay="160">
            — Isabelle Faure, Founder, ATELIER
          </p>
        </div>
      </section>
    </div>
  )
}
