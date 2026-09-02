import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const SECTIONS = ['hero', 'projects', 'about', 'contact']

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Progetti' },
  { id: 'about', label: 'Chi sono' },
  { id: 'contact', label: 'Contatti' },
]

const SCROLL_DURATION = 700 // ms

function easeInOutExpo(t) {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5
    ? 0.5 * Math.pow(2, 20 * t - 10)
    : 0.5 * (2 - Math.pow(2, -20 * t + 10))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animates window.scrollTo toward targetY with ease-out easing (fast start, slow finish).
// onDone only fires when the animation actually completes, not on a guessed timeout.
function animatedScrollTo(targetY, duration, onDone) {
  const startY = window.scrollY
  const diff = targetY - startY

  if (diff === 0 || prefersReducedMotion()) {
    window.scrollTo(0, targetY)
    onDone?.()
    return
  }

  const startTime = performance.now()

  function step(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutExpo(progress)
    window.scrollTo(0, startY + diff * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      onDone?.()
    }
  }

  requestAnimationFrame(step)
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // True right after a nav click, while the page is jumping to a section.
  // We use this to ignore scroll events for a short moment.
  const isClickScrolling = useRef(false)

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id) => (activeSection === id ? 'active' : '')

  const handleNavClick = (id, e) => {
    // Cmd/Ctrl/middle-click: let the browser handle it (open in new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.button === 1) return

    e.preventDefault()
    setActiveSection(id)
    setMenuOpen(false)

    const el = document.getElementById(id)
    if (!el) return

    // Update the URL right away (a normal <a> click would do this on its own,
    // but preventDefault() blocks that, so it has to be done manually).
    window.history.pushState(null, '', `#${id}`)

    const header = document.querySelector('.header')
    const headerHeight = header ? header.offsetHeight : 0
    const targetY = el.offsetTop - headerHeight

    // Block scroll updates for a short time,
    // so the jump caused by clicking the link doesn't immediately change our choice.
    isClickScrolling.current = true
    animatedScrollTo(targetY, SCROLL_DURATION, () => {
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