import { stats, workExperience, education } from '../data/experience'
import { engineLabels } from '../data/projects'
import SkillsSection from './SkillsSection'
import './AboutSection.css'

function TimelineList({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-role-row">
            <div className="timeline-role">{item.role}</div>
            {item.engine && (
              <span className={`engine-badge ${item.engine}`}>{engineLabels[item.engine]}</span>
            )}
          </div>
          {item.company && (
            <div className="timeline-company">{item.company}</div>
          )}
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
          Programmo videogiochi in <span className="highlight">Unreal Engine</span> e <span className="highlight">Unity</span>, tra C++, Blueprint e C#.
          <br />
          Ho una <span className="highlight">Laurea Magistrale</span> in <span className="highlight">Ingegneria Informatica</span>, presa appena in tempo per studiare l'IA generativa prima ancora di usarla.
          <br />
          Il mio percorso è iniziato dallo sviluppo software generalista, proseguito poi su prototipi indie realizzati sia in autonomia che in gruppo, e continuato su <span className="highlight">titoli pubblicati</span> in studio.
        </p>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <SkillsSection />

        <span className="timeline-title">Esperienza</span>
        <TimelineList items={workExperience} />

        <span className="timeline-title">Formazione</span>
        <TimelineList items={education} />
      </div>
    </section>
  )
}

export default AboutSection