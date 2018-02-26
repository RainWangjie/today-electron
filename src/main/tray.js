import path from 'path'
import { Tray, Menu, app } from 'electron'
import { createWindow } from './index'
import i18n from './i18n'

const $t = i18n.$t
let tray = null

export const createTray = function() {
  if (tray) return

  const iconName = `assets/images/${
    process.platform === 'win32' ? 'windows-icon-big.png' : 'iconTemplate.png'
  }`
  const iconPath = path.join(__dirname, iconName)
  const contextMenu = Menu.buildFromTemplate([
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
  ])

  tray = new Tray(iconPath)
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Today')
}

export const destroyTray = function() {
  if (tray) tray.destroy()
  tray = null
}

export const trayExists = function() {
  return !!tray
}
