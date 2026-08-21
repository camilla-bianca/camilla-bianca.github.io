import { Link } from 'react-router-dom'
import './ProjectCard.css'

const statusLabels = {
  shipped: 'SHIPPED',
  'in-dev': 'IN DEVELOPMENT',
  'pre-prod': 'PRE-PRODUCTION',
}

const originIcons = {
  company: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  personal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v1" />
    </svg>
  ),
  course: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
}

function ProjectCard({ project }) {
  const originLabel = project.company || project.role

  return (
    <Link to={`/progetti/${project.slug}`} className="card">
      <div className="card-media">
        <div className="card-image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>immagine</span>
        </div>
        <div className="card-hover-preview">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>anteprima in loop</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <span className="card-title">{project.title}</span>
          <span className={`status ${project.status}`}>{statusLabels[project.status]}</span>
        </div>
        <div className="card-origin">
          {originIcons[project.origin]}
          {originLabel}
        </div>
        <div className="card-stack">{project.stack}</div>
      </div>
    </Link>
  )
}

export default ProjectCard