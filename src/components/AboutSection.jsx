import { Trans, useTranslation } from 'react-i18next'
import { PiArrowUpRightBold } from 'react-icons/pi'
import { stats, workExperience, education } from '../data/experience'
import { engineLabels } from '../data/projects'
import { useInView } from '../hooks/useInView'
import SkillsSection from './SkillsSection'
import './AboutSection.css'

function TimelineTitle({ children }) {
  const [ref, isVisible] = useInView()

  return (
    <span
      ref={ref}
      className={`timeline-title fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </span>
  )
}

function TimelineItem({ item, index }) {
  const { t } = useTranslation()
  const [ref, isVisible] = useInView()
  const description = t(`experience.items.${item.id}.description`)

  return (
    <div
      ref={ref}
      className={`timeline-item fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ '--stagger-index': index % 3 }}
    >
      <div className="timeline-role-row">
        <div className="timeline-role">{t(`experience.items.${item.id}.role`)}</div>
        {item.engine && (
          <span className={`engine-badge ${item.engine}`}>{engineLabels[item.engine]}</span>
        )}
      </div>
      {item.company &&
        (item.companyUrl ? (
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="timeline-company company-link"
            aria-label={t('about.companySiteAria', { name: item.company })}
          >
            <span>{item.company}</span>
            <PiArrowUpRightBold className="company-arrow" aria-hidden="true" />
          </a>
        ) : (
          <div className="timeline-company">{item.company}</div>
        ))}
      <div className="timeline-period">{t(`experience.items.${item.id}.period`)}</div>
      {description && <div className="timeline-description">{description}</div>}
    </div>
  )
}

function TimelineList({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <TimelineItem item={item} index={i} key={item.id} />
      ))}
    </div>
  )
}

function AboutSection() {
  const { t } = useTranslation()
  const [introRef, isIntroVisible] = useInView()

  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div
          ref={introRef}
          className={`about-intro-block fade-in-section ${isIntroVisible ? 'is-visible' : ''}`}
        >
          <span className="section-title">{t('about.title')}</span>
          <p className="intro">
            <Trans
              i18nKey="about.introText"
              components={{ hl: <span className="highlight" />, br: <br /> }}
            />
          </p>

          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.id}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{t(`about.stats.${stat.id}`)}</div>
              </div>
            ))}
          </div>

          <SkillsSection />
        </div>

        <TimelineTitle>{t('about.experienceTitle')}</TimelineTitle>
        <TimelineList items={workExperience} />

        <TimelineTitle>{t('about.educationTitle')}</TimelineTitle>
        <TimelineList items={education} />
      </div>
    </section>
  )
}

export default AboutSection
