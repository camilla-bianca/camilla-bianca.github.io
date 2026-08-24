import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function Hero({ onWatchShowreel }) {
  const videoRef = useRef(null)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
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
          <h1>Sono una Game Programmer.<br />Adoro i videogiochi, perciò li costruisco.</h1>
          <p>Cinque anni tra Dev, Game e non. Gameplay systems, architetture riusabili, codice che sopravvive alla produzione.</p>
          <div className="cta-row">
            <button className="btn-primary" onClick={scrollToProjects}>I miei progetti</button>
            <button className="btn-secondary" onClick={onWatchShowreel}>Showreel 2024</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero