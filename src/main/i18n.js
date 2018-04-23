import locales from '../shared/locales'
import { getLocale } from '../shared/cache'

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
