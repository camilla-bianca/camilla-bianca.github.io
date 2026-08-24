import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import './ProjectsSection.css'

function ProjectsSection() {
  const [showAll, setShowAll] = useState(false)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const defaultCount = isMobile ? 4 : 3

  const visibleProjects = showAll ? projects : projects.slice(0, defaultCount)
  const hasMore = projects.length > defaultCount

  return (
    <section className="projects-section" id="projects">
      <div className="section-title-row">
        <span className="section-title">Progetti</span>
        {hasMore && (
          <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Mostra meno' : 'Mostra tutti'}
          </button>
        )}
      </div>

      <div className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection