import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>{year} Nome Cognome</span>
        <span>&middot;</span>
        <div className="footer-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="8" cy="12" r="2" />
            <path d="M14 10h4M14 14h4" />
          </svg>
        </div>
        <span>progetti personali sotto Cama's Game Slice</span>
      </div>
    </footer>
  )
}

export default Footer