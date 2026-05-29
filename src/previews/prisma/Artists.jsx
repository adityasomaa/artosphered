import { ARTISTS } from './data.js'
import s from './styles.module.css'

export default function Artists() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 52 }} data-reveal>
          <div className={s.eyebrow}>Represented</div>
          <h1 className={s.h2}>Our Artists</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            PRISMA works with artists who operate at the edges of their disciplines — pushing
            material, concept and audience beyond the expected.
          </p>
        </div>

        {/* Intro glass band */}
        <div
          className={s.glass}
          style={{ padding: 'clamp(24px, 4vw, 44px)', marginBottom: 52, display: 'grid', gap: 16 }}
          data-reveal
        >
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 className={s.h3}>Studio Visits & Open Hours</h2>
              <p style={{ color: 'var(--p-muted)', marginTop: 8, maxWidth: '54ch', lineHeight: 1.7 }}>
                On the last Saturday of each month, represented artists open their London studios
                to PRISMA members. Bookings open 3 weeks in advance. Free for members, £12 for
                non-members.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[
                { n: '8', l: 'Artists in residence' },
                { n: '3', l: 'Active commissions' },
                { n: '14', l: 'Countries of origin' },
              ].map((st) => (
                <div key={st.l} style={{ textAlign: 'center' }}>
                  <div className={s.statNum} style={{ fontSize: '2rem' }}>{st.n}</div>
                  <div className={s.statLabel}>{st.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artist grid */}
        <div className={s.gridArtists}>
          {ARTISTS.map((ar, i) => (
            <article
              key={ar.id}
              className={s.artistCard}
              data-reveal
              data-reveal-delay={i * 70}
            >
              <div className={s.artistMedia}>
                <img
                  src={`https://picsum.photos/seed/${ar.seed}/400/400`}
                  alt={`Portrait of ${ar.name}`}
                  loading="lazy"
                  width={400}
                  height={400}
                  sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className={s.artistBody}>
                <div className={s.artistName}>{ar.name}</div>
                <div className={s.artistDisc}>{ar.discipline}</div>
                <div style={{ color: 'var(--p-muted)', fontSize: '0.75rem', marginTop: 3, letterSpacing: '0.04em' }}>
                  {ar.origin}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bio showcase — first artist featured large */}
        <div style={{ marginTop: 72 }}>
          <div className={s.eyebrow} style={{ marginBottom: 28 }}>Artist Spotlight</div>
          <div className={s.featured} data-reveal>
            <div className={s.featuredMedia}>
              <img
                src={`https://picsum.photos/seed/${ARTISTS[0].seed}/800/600`}
                alt={ARTISTS[0].name}
                loading="lazy"
                width={800}
                height={600}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div className={s.featuredBody}>
              <div className={s.eyebrow}>Spotlight</div>
              <h2 className={s.h3}>{ARTISTS[0].name}</h2>
              <div className={s.featuredMeta}>
                <span>{ARTISTS[0].discipline}</span>
                <span>·</span>
                <span>{ARTISTS[0].origin}</span>
              </div>
              <div className={s.prose}>
                <p>{ARTISTS[0].bio}</p>
                <p>
                  Currently showing in Gallery I & II with "Luminous Void" — an immersive
                  environment built from 4,800 hand-blown glass spheres and a generative
                  audio score that responds to the density of visitors in real time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Press quote glass panel */}
        <div
          className={s.glass}
          style={{
            marginTop: 52,
            padding: 'clamp(28px, 5vw, 56px)',
            textAlign: 'center',
            display: 'grid',
            gap: 18,
          }}
          data-reveal
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            lineHeight: 1.3,
            maxWidth: '60ch',
            margin: '0 auto',
          }}>
            "PRISMA has done more to redefine what a gallery can be than anywhere else in
            Europe this decade."
          </p>
          <p style={{ color: 'var(--p-muted)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            — ART REVIEW, 2025 Power 100
          </p>
        </div>
      </div>
    </section>
  )
}
