import { useState } from 'react'
import { SCHEDULE, DAYS } from './data'
import s from './styles.module.css'

const DAY_LABELS = {
  Fri: { short: 'Fri', long: 'Friday', date: 'Aug 15' },
  Sat: { short: 'Sat', long: 'Saturday', date: 'Aug 16' },
  Sun: { short: 'Sun', long: 'Sunday', date: 'Aug 17' },
}

const STAGE_COLORS = {
  Mainstage: 'var(--hot)',
  'Neon Tent': 'var(--cyan)',
  'The Pit': 'var(--violet)',
  'Sunset Deck': '#ffb830',
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Fri')
  const slots = SCHEDULE[activeDay] || []

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.sectionHead} ${s.reveal}`} data-reveal>
          <div className={s.eyebrow}>Aug 15 – 17, 2026</div>
          <h1 className={s.sectionTitle}>Set Times</h1>
          <p className={s.sectionSub}>
            Plan your festival. Tap a day to see full set times across all four stages.
            Clashes are inevitable — that's the PULSE way.
          </p>
        </div>

        {/* Stage legend */}
        <div
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}
          className={`${s.reveal}`}
          data-reveal
        >
          {Object.entries(STAGE_COLORS).map(([stage, color]) => (
            <div
              key={stage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.82rem',
                color: 'var(--muted)',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                }}
              />
              {stage}
            </div>
          ))}
        </div>

        {/* Day tabs */}
        <div className={`${s.tabs} ${s.reveal}`} data-reveal>
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={activeDay === day ? `${s.tab} ${s.tabActive}` : s.tab}
              onClick={() => setActiveDay(day)}
            >
              <span className={s.tabDay}>{DAY_LABELS[day].date}</span>
              {DAY_LABELS[day].long}
            </button>
          ))}
        </div>

        {/* Slots */}
        <div className={s.timetable}>
          {slots.map((slot, i) => (
            <div
              key={`${slot.time}-${slot.artist}`}
              className={`${s.slot} ${s.reveal}`}
              data-reveal
              data-reveal-delay={i * 60}
              style={{
                borderLeftColor: STAGE_COLORS[slot.stage] || 'var(--line)',
                borderLeftWidth: 3,
                borderLeftStyle: 'solid',
              }}
            >
              <div className={s.slotTime}>{slot.time}</div>
              <div className={s.slotArtist}>{slot.artist}</div>
              <div
                className={s.slotStage}
                style={{
                  borderColor: `${STAGE_COLORS[slot.stage]}55` || 'rgba(33,230,193,0.35)',
                  color: STAGE_COLORS[slot.stage] || 'var(--cyan)',
                }}
              >
                {slot.stage}
              </div>
            </div>
          ))}
        </div>

        {/* Info blurb */}
        <div
          style={{
            marginTop: 36,
            padding: '20px 24px',
            borderRadius: 14,
            border: '1px solid var(--line)',
            background: 'rgba(255,255,255,0.025)',
            color: 'var(--muted)',
            fontSize: '0.88rem',
            lineHeight: 1.6,
          }}
          className={`${s.reveal}`}
          data-reveal
        >
          <strong style={{ color: 'var(--ink)' }}>Gates open at 15:00 each day.</strong> Set
          times are subject to change. The full running order — including surprise b2b slots and
          secret sets — is posted at festival entrances and on the PULSE app.
        </div>
      </div>
    </section>
  )
}
