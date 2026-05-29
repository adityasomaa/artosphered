import s from './styles.module.css'
import { ROADMAP } from './data.js'

const statusClass = {
  completed: s.statusCompleted,
  active: s.statusActive,
  upcoming: s.statusUpcoming,
}
const nodeClass = {
  completed: s.nodeCompleted,
  active: s.nodeActive,
  upcoming: s.nodeUpcoming,
}
const cardClass = {
  completed: s.phaseCardCompleted,
  active: s.phaseCardActive,
  upcoming: '',
}
const goalClass = {
  completed: s.phaseGoalCompleted,
  active: s.phaseGoalActive,
  upcoming: '',
}
const statusLabel = {
  completed: 'Completed',
  active: 'In Progress',
  upcoming: 'Upcoming',
}
const metaColor = {
  completed: 'var(--green)',
  active: 'var(--cyan)',
  upcoming: 'var(--text3)',
}

export default function Roadmap() {
  return (
    <section className={s.roadmapPage}>
      <div className={s.container}>
        <div className={s.sectionLabel} data-reveal>Roadmap</div>
        <h1 className={s.sectionTitle} data-reveal>From Genesis to Ecosystem</h1>
        <p className={s.sectionSubtitle} data-reveal>
          A five-phase journey from the initial drop to a fully decentralised creative economy. Every milestone is on-chain, every promise is verifiable.
        </p>

        <div className={s.timeline}>
          <div className={s.timelineLine} aria-hidden="true" />

          {ROADMAP.map((phase, i) => (
            <div key={phase.phase} className={s.timelineItem} data-reveal data-reveal-delay={i * 100}>
              {/* Left content (even items swap via CSS) */}
              <div className={s.timelineLeft}>
                {i % 2 === 0 ? (
                  <PhaseCard phase={phase} />
                ) : (
                  <div />
                )}
              </div>

              {/* Center node */}
              <div className={s.timelineCenter}>
                <div className={`${s.timelineNode} ${nodeClass[phase.status]}`}>
                  {phase.status === 'completed' ? '✓' : `P${phase.phase}`}
                </div>
              </div>

              {/* Right content */}
              <div className={s.timelineRight}>
                {i % 2 === 1 ? (
                  <PhaseCard phase={phase} />
                ) : (
                  <div />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PhaseCard({ phase }) {
  return (
    <div className={`${s.phaseCard} ${cardClass[phase.status]}`}>
      <div className={s.phaseMeta} style={{ color: metaColor[phase.status] }}>
        <span>Phase {phase.phase}</span>
        <span style={{ color: 'var(--text3)' }}>·</span>
        <span>{phase.quarter}</span>
        <span className={`${s.statusTag} ${statusClass[phase.status]}`}>
          {statusLabel[phase.status]}
        </span>
      </div>
      <div className={s.phaseTitle}>{phase.title}</div>
      <ul className={s.phaseGoals}>
        {phase.goals.map((g, j) => (
          <li key={j} className={`${s.phaseGoal} ${goalClass[phase.status]}`}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  )
}
