import Vue from 'vue'
import NotificationTemplate from './NotificationItem'

const NotificationConstructor = Vue.extend(NotificationTemplate)

let newNotification
let notifications = []
let seed = 1

/**
 * Create a new NotificationItem instance and push it into notifications.
 *
 * @param {any} options
 */
const Notification = function (options) {
  options = options || {}
  const id = 'notification_' + seed++
  let offset = options.offset || 16

  // This function would be passed to `NotificationTemplate` to be called when
  // it will close.
  options.onClose = function () {
    Notification.close(id)
  }

  // Create a new instance of NotificationTemplate.
  newNotification = new NotificationConstructor({
    data: options
  })

  newNotification.id = id
  newNotification.vm = newNotification.$mount()
  document.body.appendChild(newNotification.vm.$el)
  newNotification.vm.visible = true
  newNotification.dom = newNotification.vm.$el

  notifications.forEach((item) => {
    offset += item.$el.offsetHeight + 16
  })
  newNotification.verticalOffset = offset
  notifications.push(newNotification)
  return newNotification.vm
}

/**
 * Handler for notification-close. Now just about transitions.
 *
 * @param {any} id
 */
Notification.close = function (id) {
  let index = -1
  const len = notifications.length
  const noti = notifications.filter((notification, i) => {
    if (notification.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!noti) return

  notifications.splice(index, 1)
  const removedHeight = noti.dom.offsetHeight
  for (let i = index; i < len - 1; i++) {
    notifications[i].dom.style['top'] =
      parseInt(notifications[i].dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

export default Notification
