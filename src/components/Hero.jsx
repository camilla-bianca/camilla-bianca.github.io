import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { scrollToSection } from '../utils/smoothScroll'
import { trackEvent } from '../utils/analytics'
import { projects } from '../data/projects'
import './Hero.css'

function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  // projects.js is ordered from newest to oldest
  const latestProject = projects[0]

  const scrollToContact = () => {
    scrollToSection('contact')
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setAutoplayFailed(true)
      })
    }
  }, [])

  return (
    <div className="hero" id="hero">
      {autoplayFailed ? (
        <div
          className="hero-bg hero-bg-fallback"
          style={{ backgroundImage: 'url(/videos/hero-poster.jpg)' }}
        />
      ) : (
        <video
          ref={videoRef}
          className="hero-bg"
          src="/videos/video-hero.mp4"
          muted
          loop
          playsInline
        />
      )}

      <div className="hero-scrim"></div>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <span className="hero-eyebrow">{t('hero.eyebrow')}</span>
          <h1><Trans i18nKey="hero.title" components={{ br: <br /> }} /></h1>
          <p><Trans i18nKey="hero.subtitle" components={{ br: <br /> }} /></p>
          <div className="cta-row">
            <button className="btn-primary" onClick={scrollToContact}>
              {t('hero.ctaContact')}
            </button>
            <Link
              className="btn-secondary"
              to={`/progetti/${latestProject.slug}`}
              onClick={() => trackEvent('click-ultimo-progetto', { slug: latestProject.slug })}
            >
              {t('hero.ctaLatest')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero