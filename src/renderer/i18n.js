import Vue from 'vue'
import I18N from 'vue-i18n'

import { getLocale } from '../shared/cache'
import locales from '../shared/locales'
import { use } from './components/wzel/locale'

Vue.use(I18N)

const locale = getLocale()
use(locale === 'zh' ? 'zh-CN' : locale) // sorry!

export default new I18N({
  locale,
  messages: locales
})
