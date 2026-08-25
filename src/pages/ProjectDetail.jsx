import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getAdjacentProjects, engineLabels } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Header from '../components/Header'
import '../components/ProjectDetail.css'

function getFourthField(project) {
  if (project.origin === 'company') {
    return { label: 'AZIENDA', value: project.company, url: project.companyUrl }
  }
  if (project.origin === 'course') {
    return { label: 'CORSO', value: project.company, url: project.companyUrl }
  }
  if (project.origin === 'game-jam') {
    return { label: 'GAME JAM', value: project.company, url: project.companyUrl }
  }
  return { label: 'TIPO', value: 'Progetto Personale', url: null }
}

function EmbedHero({ hero, title }) {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const updateScale = () => {
      setScale(wrapper.offsetWidth / hero.width)
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [hero.width])

  return (
    <div ref={wrapperRef} className="embed-wrapper">
      <iframe
        src={hero.src}
        title={title}
        width={hero.width}
        height={hero.height}
        allowFullScreen
        scrolling="no"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}

function EmbedFallback({ project }) {
  return (
    <div
      className="embed-fallback"
      style={{ backgroundImage: `url(${project.cover})` }}
    >
      <div className="embed-fallback-overlay">
        <p>Gioca su desktop</p>
        <a
          href={project.externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary external-cta"
        >
          Vai su itch.io ↗
        </a>
      </div>
    </div>
  )
}

function ClickToPlayOverlay({ cover, children }) {
  const [activated, setActivated] = useState(false)

  if (activated) {
    return children
  }

  return (
    <div className="embed-click-overlay" onClick={() => setActivated(true)}>
      <div
        className="embed-click-image"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="embed-click-scrim" />
      <button className="play-button" aria-label="Avvia il video">
        <svg viewBox="0 0 24 24">
          <polygon points="9,6 9,18 18,12" />
        </svg>
      </button>
    </div>
  )
}

function EmbedClickToPlay({ hero, title, project }) {
  return (
    <ClickToPlayOverlay cover={project.cover}>
      <EmbedHero hero={hero} title={title} />
    </ClickToPlayOverlay>
  )
}

function YoutubeHero({ hero, title, project }) {
  return (
    <ClickToPlayOverlay cover={project.cover}>
      <iframe
        className="youtube-iframe"
        src={`https://www.youtube.com/embed/${hero.videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ClickToPlayOverlay>
  )
}

function ProjectHero({ hero, title, project, isMobile }) {
  if (hero.type === 'embed' && isMobile) {
    return <EmbedFallback project={project} />
  }

  if (hero.type === 'video') {
    return (
      <video
        src={hero.src}
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    )
  }

  if (hero.type === 'embed') {
    return <EmbedClickToPlay hero={hero} title={title} project={project} />
  }

  if (hero.type === 'youtube') {
    return <YoutubeHero hero={hero} title={title} project={project} />
  }

  return <img src={hero.src} alt={title} />
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
          <Link to="/#projects" className="back-link">Torna ai progetti</Link>
          <Link to="/" className="project-detail-logo">Nome Cognome</Link>
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
              <div className="metadata-value mono">{project.stack}</div>
            </div>
            <div>
              <div className="metadata-label">DURATA</div>
              <div className="metadata-value">{project.duration}</div>
            </div>
            <div>
              <div className="metadata-label">TEAM</div>
              <div className="metadata-value">{project.team}</div>
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
