import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './LangSwitch.css'

// Segmented IT | EN toggle: one click switches to the other language.
// The thumb marks the current language. On hover (pointer devices) it slides
// to the OTHER language, as a preview of what the click will do. After a click
// the preview is suppressed until the pointer leaves: otherwise the thumb would
// jump back while the mouse is still over the button and it would look like
// nothing happened.
function LangSwitch() {
  const { i18n } = useTranslation()
  const [locked, setLocked] = useState(false)
  const isEn = i18n.language?.startsWith('en')

  const handleClick = (e) => {
    // Lock only if the pointer is actually over the button (not on keyboard use).
    setLocked(e.currentTarget.matches(':hover'))
    i18n.changeLanguage(isEn ? 'it' : 'en')
  }

  return (
    <button
      className={`lang-switch${isEn ? ' is-en' : ''}${locked ? ' is-locked' : ''}`}
      onClick={handleClick}
      onMouseLeave={() => setLocked(false)}
    >
      <span className="lang-switch-thumb" aria-hidden="true" />
      <span className="lang-switch-it">IT</span>
      <span className="lang-switch-en">EN</span>
    </button>
  )
}

export default LangSwitch
