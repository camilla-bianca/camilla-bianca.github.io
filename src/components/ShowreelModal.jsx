import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ShowreelModal.css'

const YOUTUBE_VIDEO_ID = 'CgECediqz7U'

function ShowreelModal({ onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="showreel-overlay" onClick={onClose}>
      <div className="showreel-box" onClick={(e) => e.stopPropagation()}>
        <div className="showreel-close-row">
          <button className="showreel-close" onClick={onClose} aria-label={t('showreel.close')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
        <div className="showreel-frame-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1`}
            title={t('showreel.title')}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default ShowreelModal