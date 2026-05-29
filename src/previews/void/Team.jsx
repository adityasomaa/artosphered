import s from './styles.module.css'
import { TEAM, PARTNERS } from './data.js'

export default function Team() {
  return (
    <section className={s.teamPage}>
      <div className={s.container}>
        <div className={s.sectionLabel} data-reveal>The Team</div>
        <h1 className={s.sectionTitle} data-reveal>Built by Builders</h1>
        <p className={s.sectionSubtitle} data-reveal>
          A collective of designers, engineers, and storytellers obsessed with crafting the definitive Web3 creative studio. 6 founders, 24 contributors, one shared vision.
        </p>

        <div className={s.teamGrid}>
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={s.teamCard}
              data-reveal
              data-reveal-delay={i * 80}
            >
              <div className={s.teamAvatar}>
                <img
                  src={`https://picsum.photos/seed/${member.seed}/160/160`}
                  alt={member.name}
                  loading="lazy"
                  width={160}
                  height={160}
                />
              </div>
              <div>
                <div className={s.teamName}>{member.name}</div>
                <div className={s.teamRole}>{member.role}</div>
              </div>
              <p className={s.teamBio}>{member.bio}</p>
              <div className={s.teamSocials}>
                {member.socials.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={s.teamSocial}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className={s.partnersSection}>
          <div className={s.sectionLabel} data-reveal>Partners & Backers</div>
          <h2 className={s.sectionTitle} data-reveal style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            Backed by the Best
          </h2>
          <p className={s.sectionSubtitle} data-reveal>
            We partnered with the most trusted infrastructure providers, analytics platforms, and ecosystem champions in Web3.
          </p>
          <div className={s.partnersList}>
            {PARTNERS.map((p, i) => (
              <div key={p.name} className={s.partnerCard} data-reveal data-reveal-delay={i * 60}>
                <div className={s.partnerName}>{p.name}</div>
                <div className={s.partnerType}>{p.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
