import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const SECTIONS = ['hero', 'projects', 'about', 'contact']

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // True right after a nav click, while the page is jumping to a section.
  // We use this to ignore scroll events for a short moment.
  const isClickScrolling = useRef(false)
  const clickTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Skip this scroll event if we just clicked a nav link.
      // Otherwise the jump-to-section scroll would immediately overwrite the section we just clicked.
      if (isClickScrolling.current) return

      const scrollY = window.scrollY

      // Special case: we are at the very top of the page.
      // Always show "Home" as active here.
      if (scrollY < 10) {
        setActiveSection(SECTIONS[0])
        return
      }

      const header = document.querySelector('.header')
      const headerHeight = header ? header.offsetHeight : 0
      const triggerPoint = scrollY + headerHeight + 1
      let current = SECTIONS[0]

      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= triggerPoint) {
          current = id
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(clickTimeoutRef.current)
    }
  }, [])

  const linkClass = (id) => (activeSection === id ? 'active' : '')

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMenuOpen(false)

    // Block scroll updates for a short time,
    // so the jump caused by clicking the link doesn't immediately change our choice.
    isClickScrolling.current = true
    clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false
    }, 600)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">Camilla Bianca</Link>

        <nav className="nav">
          <a href="#hero" className={linkClass('hero')} onClick={() => handleNavClick('hero')}>Home</a>
          <a href="#projects" className={linkClass('projects')} onClick={() => handleNavClick('projects')}>Progetti</a>
          <a href="#about" className={linkClass('about')} onClick={() => handleNavClick('about')}>Chi sono</a>
          <a href="#contact" className={linkClass('contact')} onClick={() => handleNavClick('contact')}>Contatti</a>
          <button className="lang-switch">
            <span>IT</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span className="inactive">EN</span>
          </button>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Apri menu"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#hero" className={linkClass('hero')} onClick={() => handleNavClick('hero')}>Home</a>
        <a href="#projects" className={linkClass('projects')} onClick={() => handleNavClick('projects')}>Progetti</a>
        <a href="#about" className={linkClass('about')} onClick={() => handleNavClick('about')}>Chi sono</a>
        <a href="#contact" className={linkClass('contact')} onClick={() => handleNavClick('contact')}>Contatti</a>
        <button className="lang-switch">
          <span>IT</span>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span className="inactive">EN</span>
        </button>
      </div>
    </header>
  )
}

export default Header