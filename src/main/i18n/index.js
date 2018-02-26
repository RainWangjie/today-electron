import path from 'path'
import fs from 'fs'

import { getLocale } from '../store'

let dictionary

function Translator() {
  const locale = getLocale()
  const exists = fs.existsSync(path.join(__dirname, locale + '.json'))
  const destiFile = path.join(__dirname, (exists ? locale : 'en') + '.json')

  dictionary = JSON.parse(fs.readFileSync(destiFile, 'utf8'))
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
