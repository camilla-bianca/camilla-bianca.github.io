import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import './ProjectsSection.css'

function ProjectsSection() {
  const [showAll, setShowAll] = useState(false)

  const visibleProjects = showAll ? projects : projects.slice(0, 3)
  const hasMore = projects.length > 3

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