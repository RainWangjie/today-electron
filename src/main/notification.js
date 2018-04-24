import { Notification } from 'electron'

import { fallbackNotification } from './ipc'

const isSupported = Notification.isSupported()
// const iconPath = path.join(__static, '/images/trayicons/windows.png')
// const icon = nativeImage.createFromPath(iconPath)

export function pushNotification(body, title, callback) {
  if (!isSupported) {
    fallbackNotification({ body, title })
    return
  }
  // TODO: if not supported, use notification in renderer as fallback
  const notification = new Notification({
    title,
    body,
    silent: false
  })
  if (callback) notification.once('click', callback)
  notification.show()
}
