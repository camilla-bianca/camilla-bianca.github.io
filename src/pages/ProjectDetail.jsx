import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [touchStart, setTouchStart] = useState(null)
  const [touchDelta, setTouchDelta] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const isLightboxOpen = lightboxIndex !== null

  useEffect(() => {
    if (isLightboxOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isLightboxOpen])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
      if (e.key === 'ArrowRight' && lightboxIndex < project.gallery.length - 1) setLightboxIndex(lightboxIndex + 1)
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, project?.gallery?.length])

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

  const handleTouchStart = (e) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    setTouchDelta(0)
    setIsSwiping(false)
  }

  const handleTouchMove = (e) => {
    if (!touchStart) return
    const dx = e.touches[0].clientX - touchStart.x
    const dy = e.touches[0].clientY - touchStart.y

    if (!isSwiping) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        setIsSwiping(true)
      } else {
        return
      }
    }

    const atFirstImage = lightboxIndex === 0
    const atLastImage = lightboxIndex === project.gallery.length - 1

    let clampedDx = dx
    if (atFirstImage && dx > 0) clampedDx = dx * 0.3
    if (atLastImage && dx < 0) clampedDx = dx * 0.3

    setTouchDelta(clampedDx)
  }

  const handleTouchEnd = () => {
    const minSwipeDistance = 50

    if (touchDelta < -minSwipeDistance && lightboxIndex < project.gallery.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    } else if (touchDelta > minSwipeDistance && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    }

    setTouchStart(null)
    setTouchDelta(0)
    setIsSwiping(false)
  }

  const trackStyle = {
    transform: `translateX(calc(-${lightboxIndex ?? 0} * 100% + ${touchDelta}px))`,
    transition: isSwiping ? 'none' : 'transform 0.3s ease',
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

          <p className="project-description">{renderHighlights(project.description)}</p>

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

      {lightboxIndex !== null && createPortal(
        <div className="lightbox" onClick={() => { if (!isSwiping) setLightboxIndex(null) }}>
          {lightboxIndex > 0 && (
            <button className="lightbox-nav prev" onClick={goToPrevImage} aria-label="Immagine precedente">
              <LuChevronLeft />
            </button>
          )}

          <div
            className="lightbox-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="lightbox-track" style={trackStyle}>
              {project.gallery.map((image, i) => (
                <div className="lightbox-slide" key={i}>
                  <img
                    src={image}
                    alt={`${project.title} - immagine ${i + 1} ingrandita`}
                    className="lightbox-content"
                  />
                </div>
              ))}
            </div>
          </div>

          {lightboxIndex < project.gallery.length - 1 && (
            <button className="lightbox-nav next" onClick={goToNextImage} aria-label="Immagine successiva">
              <LuChevronRight />
            </button>
          )}
          <span className="lightbox-close">Chiudi ✕</span>
        </div>,
        document.body
      )}
    </div>
  )
}

function renderHighlights(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="highlight">{part.slice(2, -2)}</span>
      : part
  )
}

export default ProjectDetail