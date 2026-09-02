import { contactInfo, cvUrl } from '../data/contact'
import { useInView } from '../hooks/useInView'
import './ContactSection.css'

function ContactSection() {
  const [ref, isVisible] = useInView()

  return (
    <section
      ref={ref}
      className={`contact-section fade-in-section ${isVisible ? 'is-visible' : ''}`}
      id="contact"
    >
      <span className="section-title">Contatti</span>
      <p className="contact-intro">
        Aperta a ruoli da <span class="highlight">Game Programmer</span>, preferibilmente da remoto.
      </p>

      <div className="contact-list">
        {contactInfo.map((item) => {
          const Icon = item.icon
          const isExternal = !item.href.startsWith('mailto:')
          return (
            <a
              href={item.href}
              className="contact-row"
              key={item.label}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact-label">
                <Icon className="contact-label-icon" aria-hidden="true" />
                {item.label}
              </span>
              <span className="contact-value">
                {item.value}
              </span>
            </a>
          )
        })}
      </div>

      <a href={cvUrl} className="btn-cv" download>
        <span className="btn-text">Scarica il CV</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12m0 0-4-4m4 4 4-4" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      </a>
    </section>
  )
}

export default ContactSection