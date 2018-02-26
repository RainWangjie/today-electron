import Vue from 'vue'
import I18N from 'vue-i18n'
import { getLocale } from '../store/cache'

Vue.use(I18N)

export default new I18N({
  locale: getLocale() // one of 'en' and 'zh'
  // messages are divided in separate components.
})
