import { Notification } from 'electron'

const isSupported = Notification.isSupported()

export function pushNotification(body, title, callback) {
  if (!isSupported) return

  const notification = new Notification({
    title,
    body,
    silent: false
    // TODO: ICON
  })
  if (callback) notification.once('click', callback)

  notification.show()
}
