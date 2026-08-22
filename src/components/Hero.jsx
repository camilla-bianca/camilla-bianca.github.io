import './Hero.css'

function Hero({ onWatchShowreel }) {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero">
      <video
        className="hero-bg"
        src="/videos/video-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero-scrim"></div>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <h1>Sono una Game Programmer.<br />Adoro i videogiochi, perciò li costruisco.</h1>
          <p>Cinque anni tra Dev, Game e non. Gameplay systems, architetture riusabili, codice che sopravvive alla produzione.</p>
          <div className="cta-row">
            <button className="btn-primary" onClick={scrollToProjects}>Vedi i progetti</button>
            <button className="btn-secondary" onClick={onWatchShowreel}>Guarda lo showreel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero