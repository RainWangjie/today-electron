import { getLocale } from './store'
import locales from '../locales'

let dictionary

function Translator() {
  const locale = getLocale()
  dictionary = locales[locale]
}

Translator.prototype.$t = function(from) {
  const to = dictionary[from]
  return to === undefined ? from : to
}

export default new Translator()
