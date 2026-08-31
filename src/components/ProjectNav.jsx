import { Link } from 'react-router-dom'
import './ProjectNav.css'

function ProjectNav({ previous, next }) {
  return (
    <div className="project-nav-fixed">
      <div className="project-nav-fixed-inner">
        {previous ? (
          <Link to={`/progetti/${previous.slug}`} className="nav-link prev link-accent">
            <span className="nav-label">← Precedente</span>
            <span className="nav-title">{previous.title}</span>
          </Link>
        ) : <span></span>}
        {next && (
          <Link to={`/progetti/${next.slug}`} className="nav-link next link-accent">
            <span className="nav-label">Successivo →</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProjectNav