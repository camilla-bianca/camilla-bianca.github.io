import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './ProjectNav.css'

function ProjectNav({ previous, next }) {
  const { t } = useTranslation()

  return (
    <div className="project-nav-fixed">
      <div className="project-nav-fixed-inner">
        {previous ? (
          <Link to={`/progetti/${previous.slug}`} className="nav-link prev link-accent">
            <span className="nav-label">{t('projectNav.previous')}</span>
            <span className="nav-title">{previous.title}</span>
          </Link>
        ) : <span></span>}
        {next && (
          <Link to={`/progetti/${next.slug}`} className="nav-link next link-accent">
            <span className="nav-label">{t('projectNav.next')}</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProjectNav