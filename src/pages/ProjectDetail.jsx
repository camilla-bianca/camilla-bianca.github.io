import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getAdjacentProjects, getFourthField, engineLabels } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { LuLayoutGrid } from 'react-icons/lu'
import Header from '../components/Header'
import ProjectHero from '../components/ProjectHero'
import '../components/ProjectDetail.css'

function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  const isMobile = useMediaQuery('(max-width: 640px)')

  if (!project) {
    return (
      <div>
        <Header />
        <div style={{ padding: '40px' }}>
          <p>Progetto non trovato.</p>
          <Link to="/" style={{ color: 'var(--accent-primary)' }}>Torna alla home</Link>
        </div>
      </div>
    )
  }

  const { previous, next } = getAdjacentProjects(slug)
  const fourthField = getFourthField(project)

  return (
    <div>
      <header className="project-detail-header">
        <div className="project-detail-header-inner">
          <Link to="/#projects" className="back-link">
            <LuLayoutGrid />
            <span>Torna ai progetti</span>
          </Link>
          <Link to="/" className="project-detail-logo">Camilla Bianca</Link>
        </div>
      </header>

      <div className="project-detail-wrap">
        <div
          className="project-hero"
          style={
            project.hero.type === 'embed' && !isMobile
              ? { aspectRatio: `${project.hero.width} / ${project.hero.visibleHeight ?? project.hero.height}` }
              : undefined
          }
        >
          <ProjectHero hero={project.hero} title={project.title} project={project} isMobile={isMobile} />
        </div>

        <div className="project-body">
          <div className="project-title-row">
            <h1>{project.title}</h1>
            <span className={`engine-badge ${project.engine}`}>{engineLabels[project.engine]}</span>
          </div>

          <div className="project-origin">
            <span className="role-company">{project.role}</span>
            {project.company && (
              <>
                <span className="separator"> · </span>
                <span className="role-company">{project.company}</span>
              </>
            )}
          </div>

          <p className="project-description">{project.description}</p>

          <div className="metadata-row">
            <div>
              <div className="metadata-label">STACK</div>
              <div className="metadata-value">{project.stack}</div>
            </div>
            <div>
              <div className="metadata-label">PERIODO</div>
              <div className="metadata-value">{project.duration}</div>
            </div>
            <div>
              <div className="metadata-label">PIATTAFORMA</div>
              <div className="metadata-value">{project.platform}</div>
            </div>
            <div>
              <div className="metadata-label">{fourthField.label}</div>
              <div className="metadata-value">
                {fourthField.url ? (
                  <a href={fourthField.url} target="_blank" rel="noopener noreferrer">
                    {fourthField.value} ↗
                  </a>
                ) : (
                  fourthField.value
                )}
              </div>
            </div>
          </div>

          <div className="gallery">
            {project.gallery.map((image, i) => (
              <div className="gallery-item" key={i} onClick={() => setLightboxIndex(i)}>
                <img src={image} alt={`${project.title} - immagine ${i + 1}`} />
                <div className="gallery-item-scrim" />
              </div>
            ))}
          </div>

          <a href={project.externalLink.url} className="btn-secondary external-cta" target="_blank" rel="noopener noreferrer">
            {project.externalLink.label} ↗
          </a>

          <div className="project-nav">
            {previous ? (
              <Link to={`/progetti/${previous.slug}`}>← Progetto precedente</Link>
            ) : <span></span>}
            {next && (
              <Link to={`/progetti/${next.slug}`} className="next">Progetto successivo →</Link>
            )}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.title} - immagine ${lightboxIndex + 1} ingrandita`}
            className="lightbox-content"
          />
          <span className="lightbox-close">Chiudi ✕</span>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
