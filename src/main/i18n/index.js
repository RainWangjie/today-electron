import { getLocale } from '../store'

const files = require.context('.', false, /\.js$/)
const dicts = {}

files.keys().forEach(key => {
  dicts[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

let dictionary

function Translator() {
  const locale = getLocale()
  dictionary = dicts[locale]
}

/**
 * Use `__` to translate a sentence.
 *
 * @param {any} from
 * @returns
 */
Translator.prototype.$t = function(from) {
  const to = dictionary[from]
  return to === undefined ? from : to
}

export default new Translator()
