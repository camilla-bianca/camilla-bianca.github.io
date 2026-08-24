import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { engineLabels } from '../data/projects'
import './ProjectCard.css'

const originIcons = {
  company: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <path d="M12 12l0 .01" />
      <path d="M3 13a20 20 0 0 0 18 0" />
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
      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
    </svg>
  ),
  'game-jam': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
    </svg>
  ),
}

function ProjectCard({ project }) {
  const videoRef = useRef(null)
  const [previewLoaded, setPreviewLoaded] = useState(false)

  function handleMouseEnter() {
    const video = videoRef.current
    if (!previewLoaded) {
      video.src = project.preview
      setPreviewLoaded(true)
    }
    video.play().catch(() => {})
  }

  function handleMouseLeave() {
    const video = videoRef.current
    video.pause()
    video.currentTime = 0
  }

  return (
    <Link
      to={`/progetti/${project.slug}`}
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-media">
        <img src={project.cover} alt={project.title} className="card-image" />
        <video
          ref={videoRef}
          className="card-hover-preview"
          muted
          loop
          playsInline
          preload="none"
        />
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <span className="card-title">{project.title}</span>
          <span className={`engine-badge ${project.engine}`}>{engineLabels[project.engine]}</span>
        </div>
        <div className="card-origin">
          {originIcons[project.origin]}
          <div className="card-origin-text">
            <div>{project.role}</div>
            {project.company && <div className="card-origin-company">{project.company}</div>}
          </div>
        </div>
        <div className="card-stack">{project.stack}</div>
      </div>
    </Link>
  )
}

export default ProjectCard