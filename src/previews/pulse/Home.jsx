import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FESTIVAL_DATE,
  FESTIVAL_INFO,
  ARTISTS,
  MARQUEE,
} from './data'
import s from './styles.module.css'

const BASE = '/p/pulse'

// --- countdown ---
function useCountdown(targetISO) {
  const [diff, setDiff] = useState(() => calcDiff(targetISO))

  useEffect(() => {
    const id = setInterval(() => setDiff(calcDiff(targetISO)), 1000)
    return () => clearInterval(id)
  }, [targetISO])

  return diff
}

function calcDiff(targetISO) {
  const ms = new Date(targetISO) - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 }
  const secs = Math.floor(ms / 1000)
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

// gallery items
const GALLERY = [
  { seed: 'pulse-g1', w: 400, h: 300, cls: '' },
  { seed: 'pulse-g2', w: 400, h: 600, cls: s.gTall },
  { seed: 'pulse-g3', w: 800, h: 300, cls: s.gWide },
  { seed: 'pulse-g4', w: 400, h: 300, cls: '' },
  { seed: 'pulse-g5', w: 800, h: 300, cls: s.gWide },
  { seed: 'pulse-g6', w: 400, h: 300, cls: '' },
  { seed: 'pulse-g7', w: 400, h: 300, cls: '' },
]

const HEADLINERS = ARTISTS.filter((a) => a.headliner)

export default function Home() {
  const { days, hours, mins, secs } = useCountdown(FESTIVAL_DATE)

  // marquee: duplicate for seamless loop
  const marqueeItems = [...MARQUEE, ...MARQUEE]

  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.heroKicker}>Aug 15 – 17 · Lisbon, Portugal</span>
          <h1 className={`${s.heroTitle} ${s.display}`}>PULSE</h1>
          <div className={s.heroMeta}>
            <span>
              <span className={s.heroDot} />
              {FESTIVAL_INFO.dates}
            </span>
            <span>
              <span className={s.heroDot} style={{ background: 'var(--cyan)' }} />
              {FESTIVAL_INFO.location}
            </span>
            <span>
              <span className={s.heroDot} style={{ background: 'var(--violet)' }} />
              12 Artists · 4 Stages
            </span>
          </div>
          <div className={s.heroCtas}>
            <Link to={`${BASE}/tickets`} className={s.btn}>Get Tickets</Link>
            <Link to={`${BASE}/lineup`} className={`${s.btn} ${s.btnGhost}`}>Full Lineup</Link>
          </div>

          {/* Countdown */}
          <div className={s.countdown} aria-label="Countdown to festival">
            {[
              { val: days, label: 'Days' },
              { val: hours, label: 'Hours' },
              { val: mins, label: 'Mins' },
              { val: secs, label: 'Secs' },
            ].map(({ val, label }) => (
              <div key={label} className={s.countCell}>
                <div className={s.countNum}>{pad(val)}</div>
                <div className={s.countLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className={s.marquee} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {marqueeItems.map((name, i) => (
            <span key={`${name}-${i}`}>
              {i % 3 === 1 ? <em>{name}</em> : name}
            </span>
          ))}
        </div>
      </div>

      {/* HEADLINERS */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Headliners</div>
            <h2 className={s.sectionTitle}>This Year's Main Acts</h2>
            <p className={s.sectionSub}>
              Three nights, three legends. Nova Raye, Delta Wave, and Phantom 808 headline
              Meridian Fields' biggest stage — expect full-throttle sets that shake the ground.
            </p>
          </div>
          <div className={s.headliners}>
            {HEADLINERS.map((a, i) => (
              <div
                key={a.id}
                className={`${s.headCard} ${s.reveal}`}
                data-reveal
                data-reveal-delay={i * 100}
              >
                <img
                  src={`https://picsum.photos/seed/${a.seed}/600/750`}
                  alt={a.name}
                  loading="lazy"
                  width={600}
                  height={750}
                />
                <div className={s.headCaption}>
                  <div className={s.tag}>{a.day} · {a.stage}</div>
                  <h3>{a.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Atmosphere</div>
            <h2 className={s.sectionTitle}>Feel the Energy</h2>
          </div>
          <div className={s.gallery}>
            {GALLERY.map((g, i) => (
              <div
                key={g.seed}
                className={`${s.galleryItem} ${g.cls} ${s.reveal}`}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <img
                  src={`https://picsum.photos/seed/${g.seed}/${g.w}/${g.h}`}
                  alt={`Festival atmosphere ${i + 1}`}
                  loading="lazy"
                  width={g.w}
                  height={g.h}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={`${s.ctaBand} ${s.reveal}`} data-reveal>
            <div className={s.eyebrow}>Limited Availability</div>
            <h2>Secure Your Place Now</h2>
            <p>
              Every tier from Day Pass to Backstage. Prices rise as the festival
              approaches — lock in your pass today before they're gone.
            </p>
            <Link to={`${BASE}/tickets`} className={s.btn}>
              View Tickets & Prices
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
