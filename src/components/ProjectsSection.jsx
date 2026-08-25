import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import './ProjectsSection.css'

function ProjectsSection() {
  const [showAll, setShowAll] = useState(() => sessionStorage.getItem('projects-show-all') === 'true')

  useEffect(() => {
  sessionStorage.setItem('projects-show-all', showAll)
}, [showAll])

  const isMobile = useMediaQuery('(max-width: 640px)')
  const defaultCount = isMobile ? 2 : 3

  const visibleProjects = showAll ? projects : projects.slice(0, defaultCount)
  const hasMore = projects.length > defaultCount

  return (
    <section className="projects-section" id="projects">
      <div className="section-title-row">
        <span className="section-title">Progetti</span>
        {hasMore && (
          <button className="btn-secondary toggle-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Mostra meno' : 'Mostra tutti '}
            <svg
              className={`toggle-icon ${showAll ? 'open' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>

      <div className={`project-grid-wrap ${showAll ? 'expanded' : ''}`}>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection