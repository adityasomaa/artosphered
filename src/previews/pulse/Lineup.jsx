import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ARTISTS, DAYS } from './data'
import s from './styles.module.css'

const BASE = '/p/pulse'
const ALL = 'All'
const FILTERS = [ALL, ...DAYS]

export default function Lineup() {
  const [active, setActive] = useState(ALL)

  const visible = active === ALL ? ARTISTS : ARTISTS.filter((a) => a.day === active)

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>2026 Lineup</div>
          <h1 className={s.sectionTitle}>The Artists</h1>
          <p className={s.sectionSub}>
            From Mainstage anthems to underground Pit sets — PULSE 2026 brings together
            12 of the most electrifying acts on the circuit right now. Pick your night.
          </p>
        </div>

        <div className={`${s.filterBar} ${s.reveal}`} data-reveal>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={
                active === f
                  ? `${s.filterBtn} ${s.filterBtnActive}`
                  : s.filterBtn
              }
              onClick={() => setActive(f)}
            >
              {f === ALL ? 'All Days' : `${f === 'Fri' ? 'Friday' : f === 'Sat' ? 'Saturday' : 'Sunday'} ${f === 'Fri' ? 'Aug 15' : f === 'Sat' ? 'Aug 16' : 'Aug 17'}`}
            </button>
          ))}
        </div>

        <div className={s.lineupGrid}>
          {visible.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }} className={`${s.reveal}`} data-reveal>
          <p className={s.sectionSub} style={{ marginBottom: 22, marginInline: 'auto' }}>
            Ready to join the crowd?
          </p>
          <Link to={`${BASE}/tickets`} className={s.btn}>Get Your Ticket</Link>
        </div>
      </div>
    </section>
  )
}

function ArtistCard({ artist, index }) {
  const cardClass = artist.headliner
    ? `${s.artistCard} ${s.artistCardHead}`
    : s.artistCard

  return (
    <div
      className={`${cardClass} ${s.reveal}`}
      data-reveal
      data-reveal-delay={Math.min(index * 50, 400)}
    >
      {artist.headliner && (
        <span className={s.headlinerBadge}>Headliner</span>
      )}
      <img
        src={`https://picsum.photos/seed/${artist.seed}/400/533`}
        alt={artist.name}
        loading="lazy"
        width={400}
        height={533}
      />
      <div className={s.artistInfo}>
        <div className={s.artistTag}>
          {artist.day === 'Fri' ? 'Friday' : artist.day === 'Sat' ? 'Saturday' : 'Sunday'} · {artist.stage}
        </div>
        <div className={s.artistName}>{artist.name}</div>
      </div>
    </div>
  )
}
