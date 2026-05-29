import { Link } from 'react-router-dom'
import { BASE, TIMELINE, GEAR } from './data'
import s from './styles.module.css'

const STATS = [
  { num: '9', label: 'Years shooting' },
  { num: '340+', label: 'Weddings covered' },
  { num: '12', label: 'Countries & counting' },
  { num: '4', label: 'Awards & features' },
]

const AWARDS = [
  { year: '2023', body: 'International Photography Awards', honour: 'Nominee — Portrait' },
  { year: '2022', body: 'Wedding Photojournalist Association', honour: 'Best Documentary Series' },
  { year: '2021', body: 'Rangefinder Magazine', honour: '"30 Rising Photographers to Watch"' },
  { year: '2019', body: 'National Geographic Traveler', honour: 'Shortlisted — Travel & Culture' },
]

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <div className={s.pageHead}>
        <p className={s.eyebrow} data-reveal>The person behind the lens</p>
        <h1 data-reveal>
          About <em>Mara.</em>
        </h1>
      </div>

      {/* BIO + PORTRAIT */}
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.aboutTop}>
          <div data-reveal>
            <img
              className={s.portrait}
              src="https://picsum.photos/seed/lumen-mara-portrait/720/960"
              alt="Mara Vance, photographer"
              loading="lazy"
              width="720"
              height="960"
            />
          </div>
          <div className={s.aboutBio} data-reveal data-reveal-delay="120">
            <p>
              <strong>Mara Vance</strong> is a San Francisco-based photographer and
              the founder of LUMEN. Born in Lisbon, raised between London and Cape Town,
              she came to photography late — but arrived all at once. A borrowed Leica
              in Berlin in 2011 changed the trajectory of everything.
            </p>
            <p>
              Her work is rooted in the documentary tradition: she arrives at a scene
              and waits. She believes the best photographs are found, not staged — that
              the task of the photographer is to create the conditions for something
              true to emerge, then be ready when it does.
            </p>
            <p>
              Since founding LUMEN in 2015, Mara has photographed weddings across
              Europe and North Africa, produced editorial campaigns for independent
              fashion houses, and shot portraits from Reykjavik to Marrakech. She
              grades every image herself — no batch presets, no outsourced editing.
              If it doesn't feel like a film still, it goes back into the lightroom.
            </p>
            <p>
              <strong>LUMEN is now a collective of three.</strong> Alongside Mara,
              associate photographer Jonah Sills covers multi-day weddings and
              fast-paced commercial work, and producer Erin Tsai handles everything
              from moodboards to gallery delivery.
            </p>
            <div style={{ marginTop: 36 }}>
              <Link to={`${BASE}/contact`} className={`${s.btn} ${s.btnFilled}`}>
                Work with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className={s.hairline} />

      {/* STATS */}
      <section className={s.section} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className={s.statsRow}>
          {STATS.map((st, i) => (
            <div key={st.label} className={s.stat} data-reveal data-reveal-delay={String(i * 70)}>
              <div className={s.statNum}>{st.num}</div>
              <div className={s.statLbl}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className={s.hairline} />

      {/* PHILOSOPHY + TIMELINE */}
      <section className={s.section}>
        <div className={s.manifesto} style={{ marginBottom: 'clamp(48px, 7vw, 90px)' }}>
          <div data-reveal>
            <p className={s.eyebrow}>Philosophy</p>
            <h2 className={s.h2}>Slow photography in a fast world.</h2>
          </div>
          <div className={s.manifestoText} data-reveal data-reveal-delay="120">
            <p>
              We live in an era of instant images. Mara's answer is deliberate
              slowness — one roll of film shot for every digital session, a manual
              focus prime lens as the default, and a rule that every shortlisted
              image must pass the <em>frame test</em>: would you print it, frame it,
              hang it on a wall?
            </p>
          </div>
        </div>

        <p className={s.eyebrow} data-reveal>Timeline</p>
        <h2 className={s.h2} data-reveal>A decade in frames</h2>
        <div className={s.timeline}>
          {TIMELINE.map((item, i) => (
            <div key={item.year} className={s.tlItem} data-reveal data-reveal-delay={String(i * 80)}>
              <div className={s.tlYear}>{item.year}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className={s.hairline} />

      {/* AWARDS */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>Recognition</p>
        <h2 className={s.h2} data-reveal>Awards & features</h2>
        <div className={s.timeline} style={{ marginTop: 36 }}>
          {AWARDS.map((a, i) => (
            <div key={a.year + a.body} className={s.tlItem} data-reveal data-reveal-delay={String(i * 70)}>
              <div className={s.tlYear}>{a.year}</div>
              <div>
                <h4>{a.body}</h4>
                <p>{a.honour}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className={s.hairline} />

      {/* GEAR */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal>The kit</p>
        <h2 className={s.h2} data-reveal>What we shoot with</h2>
        <p className={s.lead} data-reveal style={{ marginBottom: 44 }}>
          The tools are secondary to the eye — but since everyone asks, here's the
          honest list. No brand deals, no affiliates.
        </p>
        <div className={s.gearGrid}>
          {GEAR.map(([label, value], i) => (
            <div key={label} className={s.gearItem} data-reveal data-reveal-delay={String(i * 60)}>
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
