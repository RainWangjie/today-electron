import Store from 'electron-store'

const store = new Store()

const LOCALE = 'locale'

export const setLocale = function(locale) {
  store.set(LOCALE, locale)
}
export const getLocale = function() {
  return store.get(LOCALE, 'zh')
}
