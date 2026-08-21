import { contactInfo, cvUrl } from '../data/contact'
import './ContactSection.css'

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <span className="section-title">Contatti</span>
      <p className="contact-intro">
        Aperta a ruoli come Game Programmer, anche (e soprattutto) da remoto.
      </p>

      <div className="contact-list">
        {contactInfo.map((item) => (
          <div className="contact-row" key={item.label}>
            <span className="contact-label">{item.label}</span>
            <a href={item.href} className="contact-value clickable">{item.value}</a>
          </div>
        ))}
      </div>

      <a href={cvUrl} className="btn-cv" download>
        Scarica il CV
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12m0 0-4-4m4 4 4-4" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      </a>
    </section>
  )
}

export default ContactSection