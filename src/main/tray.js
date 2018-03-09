import path from 'path'
import { Tray, Menu, app, nativeImage } from 'electron'
import { createWindow } from './window'
import i18n from './i18n'

const $t = i18n.$t
const trayMenu = [
  {
    label: $t('openWindow'),
    click() {
      createWindow()
      if (process.platform === 'darwin') app.dock.show()
    }
  },
  {
    label: $t('quit'),
    click() {
      app.quit()
    }
  }
]

let tray = null

export const createTray = function() {
  if (!tray) {
    const iconName = `/images/trayicons/${
      process.platform === 'win32' ? 'windows.png' : 'mac.png'
    }`
    const iconPath = path.join(__static, iconName)
    const icon = nativeImage.createFromPath(iconPath)
    const contextMenu = Menu.buildFromTemplate(trayMenu)

    tray = new Tray(icon)
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Today')
  }
}

export const destroyTray = function() {
  if (tray) {
    tray.destroy()
  }
  tray = null
}

export const trayExists = function() {
  return tray !== null
}
