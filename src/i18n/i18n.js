import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import it from './locales/it.json'
import en from './locales/en.json'

const STORAGE_KEY = 'cgs-language'

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'it' || stored === 'en') return stored

  const browserLang = navigator.language || navigator.userLanguage || ''
  return browserLang.toLowerCase().startsWith('it') ? 'it' : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'it',
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
  document.documentElement.lang = lng
})

export default i18n