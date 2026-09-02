import { useState, useEffect, useRef } from 'react'
import { IoGameControllerOutline } from 'react-icons/io5'
import { TbMovie } from 'react-icons/tb'
import './ProjectHero.css'

const gameBadgeIcon = <IoGameControllerOutline />
const videoBadgeIcon = <TbMovie />

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
          <span className="btn-text">Vai su itch.io ↗</span>
        </a>
      </div>
    </div>
  )
}

function ClickToPlayOverlay({ cover, badgeIcon, children }) {
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
      <button className="play-button" aria-label="Avvia">
        <svg viewBox="0 0 24 24">
          <polygon points="9,6 9,18 18,12" />
        </svg>
      </button>
      {badgeIcon && <div className="type-badge">{badgeIcon}</div>}
    </div>
  )
}

function EmbedClickToPlay({ hero, title, project }) {
  return (
    <ClickToPlayOverlay
      cover={project.cover}
      badgeIcon={gameBadgeIcon}
    >
      <EmbedHero hero={hero} title={title} />
    </ClickToPlayOverlay>
  )
}

function VideoClickToPlay({ hero, title, project }) {
  return (
    <ClickToPlayOverlay
      cover={project.cover}
      badgeIcon={videoBadgeIcon}
    >
      <video
        src={hero.src}
        title={title}
        autoPlay
        loop
        playsInline
        controls
      />
    </ClickToPlayOverlay>
  )
}

function YoutubeHero({ hero, title, project }) {
  return (
    <ClickToPlayOverlay cover={project.cover} badgeIcon={videoBadgeIcon}>
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
    return <VideoClickToPlay key={project.slug} hero={hero} title={title} project={project} />
  }

  if (hero.type === 'embed') {
    return <EmbedClickToPlay key={project.slug} hero={hero} title={title} project={project} />
  }

  if (hero.type === 'youtube') {
    return <YoutubeHero key={project.slug} hero={hero} title={title} project={project} />
  }

  return <img key={project.slug} src={hero.src} alt={title} />
}

export default ProjectHero