import s from './styles.module.css'

const HOURS = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday – Friday', hours: '10:00 – 19:00' },
  { day: 'Saturday', hours: '10:00 – 21:00' },
  { day: 'Sunday', hours: '11:00 – 18:00' },
  { day: 'Public holidays', hours: 'See website' },
]

const ADMISSION = [
  { type: 'Adult', price: '£18' },
  { type: 'Concession (student / senior / unwaged)', price: '£10' },
  { type: 'Family (2 adults + up to 2 children)', price: '£42' },
  { type: 'Children under 12', price: 'Free' },
  { type: 'Members', price: 'Free (all year)' },
]

const ACCESS = [
  { icon: '♿', title: 'Step-free access', desc: 'All galleries are accessible via lift. Step-free entrance on Meridian Street side.' },
  { icon: '🦻', title: 'Hearing loops', desc: 'Induction loops fitted in all gallery spaces and the lecture theatre.' },
  { icon: '👁', title: 'Audio description', desc: 'Audio-described tours run every Saturday at 13:00. Book 48 hours in advance.' },
  { icon: '🐕', title: 'Assistance dogs', desc: 'Assistance dogs are always welcome throughout the building.' },
]

export default function Visit() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {/* Header */}
        <div style={{ marginBottom: 52 }} data-reveal>
          <div className={s.eyebrow}>Plan Your Visit</div>
          <h1 className={s.h2}>Find Us</h1>
          <p className={s.lead} style={{ marginTop: 14 }}>
            PRISMA occupies a converted Victorian printworks in Clerkenwell, London — ten
            minutes from Barbican and Farringdon stations.
          </p>
        </div>

        {/* CSS map placeholder */}
        <div className={s.mapWrap} style={{ marginBottom: 52 }} data-reveal>
          <div className={s.mapRoad + ' ' + s.mapRoad1} />
          <div className={s.mapRoad + ' ' + s.mapRoad2} />
          <div className={s.mapRoad + ' ' + s.mapRoad3} />
          <div className={s.mapPin}>
            📍 14 Aperture Mews, EC1V
          </div>
          {/* Street labels */}
          <span style={{
            position: 'absolute', top: '34%', left: '6%',
            fontSize: '0.68rem', color: 'var(--p-muted)', letterSpacing: '0.1em',
            fontFamily: 'var(--font-grotesk)',
          }}>
            CLERKENWELL RD
          </span>
          <span style={{
            position: 'absolute', top: '20%', left: '44%',
            fontSize: '0.68rem', color: 'var(--p-muted)', letterSpacing: '0.1em',
            fontFamily: 'var(--font-grotesk)',
            writingMode: 'vertical-rl',
          }}>
            FARRINGDON RD
          </span>
        </div>

        {/* Info panels row */}
        <div className={s.infoGrid} style={{ marginBottom: 52 }}>
          {/* Hours */}
          <div className={s.infoPanel} data-reveal data-reveal-delay="0">
            <h3 className={s.h3}>Opening Hours</h3>
            {HOURS.map((row) => (
              <div key={row.day} className={s.hoursRow}>
                <span className={s.hoursDay}>{row.day}</span>
                <span style={{ fontWeight: 500, color: row.hours === 'Closed' ? 'var(--p-muted)' : 'var(--p-ink)' }}>
                  {row.hours}
                </span>
              </div>
            ))}
            <p style={{ color: 'var(--p-muted)', fontSize: '0.8rem', marginTop: 14, lineHeight: 1.65 }}>
              Last entry 45 minutes before closing. Late-night openings on the last Thursday of
              each month until 22:00.
            </p>
          </div>

          {/* Admission */}
          <div className={s.infoPanel} data-reveal data-reveal-delay="80">
            <h3 className={s.h3}>Admission</h3>
            {ADMISSION.map((row) => (
              <div key={row.type} className={s.hoursRow}>
                <span className={s.hoursDay} style={{ maxWidth: '60%' }}>{row.type}</span>
                <span style={{ fontWeight: 600, color: 'var(--p-accent)' }}>{row.price}</span>
              </div>
            ))}
            <p style={{ color: 'var(--p-muted)', fontSize: '0.8rem', marginTop: 14, lineHeight: 1.65 }}>
              Free entry for school groups with advance booking. Membership from £60/year includes
              unlimited visits + guest passes.
            </p>
          </div>

          {/* Getting here */}
          <div className={s.infoPanel} data-reveal data-reveal-delay="160">
            <h3 className={s.h3}>Getting Here</h3>
            <div style={{ display: 'grid', gap: 14, marginTop: 4 }}>
              {[
                { icon: '🚇', title: 'Underground', desc: 'Barbican (Circle, Hammersmith & City, Metropolitan) — 9 min walk. Farringdon (Elizabeth Line) — 10 min.' },
                { icon: '🚲', title: 'Cycle', desc: 'Santander docking station at Helmet Row, 80 m from the entrance. Indoor secure cycle store available.' },
                { icon: '🚗', title: 'Car', desc: 'No on-site parking. NCP Barbican 0.4 mi. Clerkenwell is in the ULEZ zone — check TfL for charges.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 14 }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                    <div style={{ color: 'var(--p-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginTop: 2 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className={s.divider} />

        {/* Accessibility */}
        <div style={{ marginTop: 52 }} data-reveal>
          <div className={s.eyebrow}>Inclusive access</div>
          <h2 className={s.h2} style={{ marginBottom: 32 }}>Accessibility</h2>
          <div className={s.infoGrid}>
            {ACCESS.map((item, i) => (
              <div key={item.title} className={s.infoPanel} data-reveal data-reveal-delay={i * 70}>
                <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{item.icon}</div>
                <h3 className={s.h3} style={{ fontSize: '1.05rem', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'var(--p-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities glass panel */}
        <div
          className={s.glass}
          style={{ padding: 'clamp(26px, 4vw, 48px)', marginTop: 52, display: 'grid', gap: 22 }}
          data-reveal
        >
          <h2 className={s.h3}>On-Site Facilities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { icon: '☕', name: 'Prism Café', desc: 'Open Tue–Sun, 09:00–18:30. Seasonal menus, specialty coffee, natural wine.' },
              { icon: '📚', name: 'Bookshop', desc: 'Curated art books, limited editions, exhibition catalogues and prints.' },
              { icon: '🎓', name: 'Learning Studio', desc: 'Workshops for all ages. Saturday family programme year-round.' },
              { icon: '🏛', name: 'Lecture Theatre', desc: '120-seat theatre hosting talks, screenings and symposia. Fully accessible.' },
            ].map((f) => (
              <div key={f.name} style={{ display: 'flex', gap: 14 }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{f.name}</div>
                  <div style={{ color: 'var(--p-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginTop: 4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
