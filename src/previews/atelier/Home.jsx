import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from './data'
import s from './styles.module.css'

const MARQUEE_ITEMS = [
  'Handcrafted',
  'Sustainable',
  'Made-to-order',
  'Ethical Sourcing',
  'Lifetime Repair',
  'Single-origin Fibres',
  'Artisan Heritage',
  'Zero Landfill',
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={s.hero} aria-label="Hero">
        <div className={s.heroLeft}>
          <p className={s.heroEyebrow} data-reveal="fade">Fall / Winter 2026</p>
          <h1 className={s.heroTitle} data-reveal>
            The Art of<br />
            <em>Quiet</em><br />
            Dressing.
          </h1>
          <p className={s.heroManifesto} data-reveal data-reveal-delay="100">
            We believe clothing should outlast seasons, outlast trends, outlast
            the moment of purchase. Every ATELIER piece is made once, made
            completely, and made to be worn for decades.
          </p>
          <div className={s.heroActions} data-reveal data-reveal-delay="180">
            <Link to={`${BASE}/collections`} className={s.btnPrimary}>
              Explore FW26
            </Link>
            <Link to={`${BASE}/lookbook`} className={s.btnGhost}>
              View Lookbook
            </Link>
          </div>
        </div>

        <div className={s.heroRight}>
          <img
            src="https://picsum.photos/seed/atelier-hero-fw26/900/1200"
            alt="ATELIER FW26 — editorial hero look"
            width={900}
            height={1200}
            loading="eager"
          />
          <span className={s.heroSeasonTag}>FW26 — Fragments of Silence</span>
        </div>
      </section>

      {/* ── Featured Collection split ─────────────────────── */}
      <section className={s.featuredSplit} aria-label="Featured Collection">
        <div className={s.featuredMedia}>
          <img
            src="https://picsum.photos/seed/atelier-featured-1/800/900"
            alt="Camel overcoat — featured piece"
            width={800}
            height={900}
            loading="lazy"
          />
        </div>
        <div className={s.featuredBody}>
          <p className={s.sectionEyebrow} data-reveal="fade">Featured — Outerwear</p>
          <h2 className={s.sectionTitle} data-reveal>
            The Coat as<br />Architecture
          </h2>
          <p className={s.sectionBody} data-reveal data-reveal-delay="80">
            Our double-faced camel hair overcoat begins with fleece selected
            personally in Outer Mongolia. It is woven at a family mill outside
            Biella, then cut and constructed over six weeks by a single tailor
            at our Lyon atelier.
          </p>
          <p className={s.sectionBody} data-reveal data-reveal-delay="140" style={{ marginBottom: 0, marginTop: '-16px' }}>
            The result is a coat that holds its shape across decades — one that
            improves with wear, softening at the collar and sleeve, acquiring
            character it could never have left the atelier with.
          </p>
          <div data-reveal data-reveal-delay="200" style={{ marginTop: '40px' }}>
            <Link to={`${BASE}/collections`} className={s.btnPrimary}>
              Shop Outerwear
            </Link>
          </div>
        </div>
      </section>

      {/* ── Second split (reversed) ───────────────────────── */}
      <section className={s.featuredSplit} aria-label="Knitwear Feature">
        <div className={`${s.featuredBody} ${s.reverse}`}>
          <p className={s.sectionEyebrow} data-reveal="fade">FW26 — Knitwear</p>
          <h2 className={s.sectionTitle} data-reveal>
            Warmth as<br />
            Philosophy
          </h2>
          <p className={s.sectionBody} data-reveal data-reveal-delay="80">
            Our knitwear programme draws from a single source: a family flock
            of Shetland sheep on a 400-acre island farm. The fleece is sheared
            once a year, sorted by hand, and spun in our own mill. From sheep
            to shoulder, every yard of yarn carries provenance.
          </p>
          <div data-reveal data-reveal-delay="160" style={{ marginTop: '40px' }}>
            <Link to={`${BASE}/collections`} className={s.btnSecondary}>
              View Knitwear
            </Link>
          </div>
        </div>
        <div className={s.featuredMedia}>
          <img
            src="https://picsum.photos/seed/atelier-knit-hero/800/900"
            alt="Ribbed cashmere turtleneck editorial"
            width={800}
            height={900}
            loading="lazy"
          />
        </div>
      </section>

      {/* ── Editorial story ───────────────────────────────── */}
      <section className={s.editorial} aria-label="Our Approach">
        <div>
          <h2 className={s.editorialLabel} data-reveal="left">
            How we<br />make<br />things.
          </h2>
        </div>
        <div className={s.editorialContent}>
          {[
            {
              title: 'The Cloth',
              body: 'We source every fibre with the maker in mind and the wearer in mind after that. No blend obscures origins. No material is chosen for cost alone. If we cannot trace the fleece to a specific farm or the silk to a specific reel, we do not use it.',
            },
            {
              title: 'The Cut',
              body: 'Every pattern is drawn by hand in our Lyon maison. We cut in pairs — no assembly-line logic here. Each piece is cut by the person who will construct it, a practice that has vanished from almost every other house.',
            },
            {
              title: 'The Finish',
              body: 'Seams are pressed individually. Hems are weighted by hand. The inside of an ATELIER garment receives the same attention as the outside, because we believe what you do not see shapes what you feel.',
            },
            {
              title: 'The After',
              body: 'Every piece we sell is covered by our Lifetime Repair Programme. When a coat wears at the elbow, when a seam loosens after fifteen years, send it back. We will restore it. No charge. No question.',
            },
          ].map((item) => (
            <div key={item.title} className={s.editorialItem} data-reveal>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────── */}
      <div className={s.marqueeWrap} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {doubled.map((item, i) => (
            <span key={i} className={s.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className={s.newsletter} aria-label="Newsletter">
        <p className={s.sectionEyebrow} data-reveal="fade">Letters from the Atelier</p>
        <h2 className={s.sectionTitle} data-reveal style={{ color: 'var(--ivory)' }}>
          The Private List
        </h2>
        <p className={s.sectionBody} data-reveal data-reveal-delay="80">
          Seasonal notes on craft, material, and new work. Invitations to
          private appointments and events. No more than four letters a year.
        </p>
        {subscribed ? (
          <p className={s.newsletterSuccess} data-reveal="fade">
            Thank you — your first letter will arrive with the season.
          </p>
        ) : (
          <form
            className={s.newsletterForm}
            onSubmit={handleSubscribe}
            data-reveal
            data-reveal-delay="120"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s.newsletterInput}
              required
              aria-label="Email address"
            />
            <button type="submit" className={s.newsletterBtn}>
              Subscribe
            </button>
          </form>
        )}
      </section>
    </>
  )
}
