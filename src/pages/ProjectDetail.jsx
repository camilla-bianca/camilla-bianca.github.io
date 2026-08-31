import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getAdjacentProjects, getFourthField, engineLabels } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { LuLayoutGrid, LuMonitor, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { SiApple, SiAndroid } from 'react-icons/si'
import { IoLogoAndroid } from "react-icons/io";
import { BsNintendoSwitch, BsPlaystation, BsXbox } from "react-icons/bs";
import Header from '../components/Header'
import ProjectHero from '../components/ProjectHero'
import ProjectNav from '../components/ProjectNav'
import '../components/ProjectDetail.css'

const platformIconMap = {
  pc: { Icon: LuMonitor, size: 18 },
  ps5: { Icon: BsPlaystation, size: 18 },
  xbox: { Icon: BsXbox },
  switch: { Icon: BsNintendoSwitch},
  ios: { Icon: SiApple, size: 18 },
  android: { Icon: SiAndroid, size: 18 },
}

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

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
      if (e.key === 'ArrowRight' && lightboxIndex < project.gallery.length - 1) setLightboxIndex(lightboxIndex + 1)
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, project.gallery.length])

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

  const goToPrevImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i > 0 ? i - 1 : i))
  }

  const goToNextImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i < project.gallery.length - 1 ? i + 1 : i))
  }

  return (
    <div>
      <header className="project-detail-header">
        <div className="project-detail-header-inner">
          <Link to="/#projects" className="back-link link-accent">
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
              <div className="metadata-label">TECNOLOGIE</div>
              <div className="metadata-value">{project.stack}</div>
            </div>
            <div>
              <div className="metadata-label">PIATTAFORME</div>
              {project.platforms?.length > 0 && (
                <div className="platform-icons">
                  {project.platforms.map((key) => {
                    const entry = platformIconMap[key]
                    if (!entry) return null
                    const { Icon, size } = entry
                    return (
                      <Icon
                        key={key}
                        title={key}
                        style={size ? { width: size, height: size } : undefined}
                      />
                    )
                  })}
                </div>
              )}
            </div>
            <div>
              <div className="metadata-label">PERIODO</div>
              <div className="metadata-value">{project.duration}</div>
            </div>
            <div>
              <div className="metadata-label">{fourthField.label}</div>
              <div className="metadata-value">
                {fourthField.url ? (
                  <a href={fourthField.url} target="_blank" rel="noopener noreferrer" className="link-accent">
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
            <span className="btn-text">{project.externalLink.label} ↗</span>
          </a>
        </div>
      </div>

      <ProjectNav previous={previous} next={next} />

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          {lightboxIndex > 0 && (
            <button className="lightbox-nav prev" onClick={goToPrevImage} aria-label="Immagine precedente">
              <LuChevronLeft />
            </button>
          )}
          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.title} - immagine ${lightboxIndex + 1} ingrandita`}
            className="lightbox-content"
          />
          {lightboxIndex < project.gallery.length - 1 && (
            <button className="lightbox-nav next" onClick={goToNextImage} aria-label="Immagine successiva">
              <LuChevronRight />
            </button>
          )}
          <span className="lightbox-close">Chiudi ✕</span>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
