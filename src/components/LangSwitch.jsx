import { useTranslation } from 'react-i18next'
import './LangSwitch.css'

function LangSwitch() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }

  return (
    <button
      className="lang-switch"
      onClick={() => changeLanguage(i18n.language === 'it' ? 'en' : 'it')}
    >
      <span className={i18n.language === 'it' ? '' : 'inactive'}>IT</span>
      <span style={{ color: 'var(--text-muted)' }}>/</span>
      <span className={i18n.language === 'en' ? '' : 'inactive'}>EN</span>
    </button>
  )
}

export default LangSwitch