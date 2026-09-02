import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { scrollToSection } from '../utils/smoothScroll'
import './Header.css'

const SECTIONS = ['hero', 'projects', 'about', 'contact']

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Progetti' },
  { id: 'about', label: 'Chi sono' },
  { id: 'contact', label: 'Contatti' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const isClickScrolling = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return

      const scrollY = window.scrollY

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id) => (activeSection === id ? 'active' : '')

  const handleNavClick = (id, e) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return

    e.preventDefault()
    setActiveSection(id)
    setMenuOpen(false)

    window.history.pushState(null, '', `#${id}`)

    isClickScrolling.current = true
    scrollToSection(id, () => {
      isClickScrolling.current = false
    })
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">Camilla Bianca</Link>

        <nav className="nav">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={linkClass(id)}
              onClick={(e) => handleNavClick(id, e)}
            >
              {label}
            </a>
          ))}
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
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={linkClass(id)}
            onClick={(e) => handleNavClick(id, e)}
          >
            {label}
          </a>
        ))}
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