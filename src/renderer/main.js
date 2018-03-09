import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'

import Noti from './components/Notification'
import Message from './components/Message'
import Modal from './components/Modal'
import ContextMenu from './components/ContextMenu'

import { dateFormatter } from './utils/filters/dateformatter'
import { savePreferences } from './store/modules/preference'
import { saveTodoItems } from './store/modules/todo_item'
import { saveListItems } from './store/modules/list_item'
import { saveDailySummaries } from './store/modules/daily_summary'

Vue.config.productionTip = false
Vue.filter('date', dateFormatter)

Vue.prototype.$noti = Noti
Vue.prototype.$message = Message
Vue.prototype.$modal = Modal
Vue.prototype.$contextMenu = ContextMenu

// Save everything before quit application.
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
