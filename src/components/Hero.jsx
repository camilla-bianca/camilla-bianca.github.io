import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { scrollToSection } from '../utils/smoothScroll'
import './Hero.css'

function Hero({ onWatchShowreel }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  const scrollToProjects = () => {
    scrollToSection('projects')
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
            <button className="btn-primary" onClick={scrollToProjects}>{t('hero.ctaProjects')}</button>
            <button className="btn-secondary" onClick={onWatchShowreel}>{t('hero.ctaShowreel')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero