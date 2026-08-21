import './Hero.css'

function Hero({ onWatchShowreel }) {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero">
      <div className="hero-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span>video hero</span>
      </div>

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