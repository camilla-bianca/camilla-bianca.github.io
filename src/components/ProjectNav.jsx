import { Link } from 'react-router-dom'
import './ProjectNav.css'

function ProjectNav({ previous, next }) {
  return (
    <div className="project-nav-fixed">
      <div className="project-nav-fixed-inner">
        {previous ? (
          <Link to={`/progetti/${previous.slug}`} className="link-accent">← Progetto precedente</Link>
        ) : <span></span>}
        {next && (
          <Link to={`/progetti/${next.slug}`} className="next link-accent">Progetto successivo →</Link>
        )}
      </div>
    </div>
  )
}

export default ProjectNav