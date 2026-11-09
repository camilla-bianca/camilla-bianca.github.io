import { Trans, useTranslation } from 'react-i18next'
import { contactInfo } from '../data/contact'
import { useInView } from '../hooks/useInView'
import { trackEvent } from '../utils/analytics'
import './ContactSection.css'

function ContactSection() {
  const { t } = useTranslation()
  const [ref, isVisible] = useInView()

  return (
    <section
      ref={ref}
      className={`contact-section fade-in-section ${isVisible ? 'is-visible' : ''}`}
      id="contact"
    >
      <span className="section-title">{t('contact.title')}</span>
      <p className="contact-intro">
        <Trans
          i18nKey="contact.introText"
          components={{ hl: <span className="highlight" /> }}
        />
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
              onClick={() => trackEvent('click-contatto', { tipo: item.label })}
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
    </section>
  )
}

export default ContactSection