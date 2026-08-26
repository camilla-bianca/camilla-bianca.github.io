import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text-left">{year} Camilla Bianca </span>
        <img
          src="/images/cgs/cgs_logo.png"
          alt="Cama's Game Slice"
          className="footer-logo"
        />
        <span className="footer-text-right">in origine Cama's Game Slice</span>
      </div>
    </footer>
  )
}

export default Footer