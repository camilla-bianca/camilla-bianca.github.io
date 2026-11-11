import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'
import { PiCaretDownBold } from 'react-icons/pi'
import RollButton from './RollButton'
import './ProjectsSection.css'

function ProjectsSection() {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(() => sessionStorage.getItem('projects-show-all') === 'true')
  const [titleRef, isTitleVisible] = useInView()

  useEffect(() => {
    sessionStorage.setItem('projects-show-all', showAll)
  }, [showAll])

  const isMobile = useMediaQuery('(max-width: 640px)')
  const defaultCount = isMobile ? 2 : 3

  const visibleProjects = showAll ? projects : projects.slice(0, defaultCount)
  const hasMore = projects.length > defaultCount

  return (
    <section className="projects-section" id="projects">
      <div className="projects-inner">
        <div
          ref={titleRef}
          className={`section-title-row fade-in-section ${isTitleVisible ? 'is-visible' : ''}`}
        >
          <span className="section-title">{t('projects.sectionTitle')}</span>
          {hasMore && (
            <RollButton
              className="toggle-btn"
              label={showAll ? t('projects.showLess') : t('projects.showAll')}
              onClick={() => setShowAll(!showAll)}
            >
              <PiCaretDownBold
                className={`toggle-icon ${showAll ? 'open' : ''}`}
                aria-hidden="true"
              />
            </RollButton>
          )}
        </div>

        <div className={`project-grid-wrap ${showAll ? 'expanded' : ''}`}>
          <div className="project-grid">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} staggerIndex={i % defaultCount} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection