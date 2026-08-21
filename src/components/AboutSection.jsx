import { stats, workExperience, education } from '../data/experience'
import './AboutSection.css'

function TimelineList({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-role">{item.role}</div>
          <div className="timeline-period">{item.period}</div>
          <div className="timeline-description">{item.description}</div>
        </div>
      ))}
    </div>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <span className="section-title">Chi sono</span>
        <p className="intro">
          Game Programmer con base in C# e C++, con esperienza sia su titoli shippati che su prototipi indie costruiti da sola o in team.
        </p>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <span className="timeline-title">Esperienza</span>
        <TimelineList items={workExperience} />

        <span className="timeline-title">Formazione</span>
        <TimelineList items={education} />
      </div>
    </section>
  )
}

export default AboutSection