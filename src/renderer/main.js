import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import wzel from './components/wzel/index'

import { dateFormatter } from './utils/filters/dateformatter'
import { savePreferences } from './store/modules/preference'
import { saveTodoItems } from './store/modules/todo-item'
import { saveListItems } from './store/modules/list-item'
import { saveDailySummaries } from './store/modules/daily-summary'

Vue.config.productionTip = false
Vue.use(wzel)

Vue.filter('date', dateFormatter)

// TODO: move this to App.vue
window.onbeforeunload = e => {
  saveDailySummaries()
  saveTodoItems()
  saveListItems()
  savePreferences()
}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
