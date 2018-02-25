import path from 'path'
import { Tray, Menu, ipcMain, app } from 'electron'

import { createWindow } from './index'

let tray = null

app.on('ready', event => {
  createTray()
})

app.on('window-all-closed', event => {
  if (process.platform !== 'darwin' && tray === null) {
    app.quit()
  }
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

ipcMain.on('put-in-tray', event => {
  createTray()
})

ipcMain.on('remove-tray', event => {
  destroyTray()
})

export const createTray = function () {
  if (tray) return
  const iconName = `assets/images/${process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'}`
  const iconPath = path.join(__dirname, iconName)
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Window',
      click () {
        createWindow()
        if (process.platform === 'darwin') app.dock.show()
      }
    },
    {
      label: 'Quit',
      click () {
        app.quit()
      }
    }
  ])
  tray.setContextMenu(contextMenu)
}

export const destroyTray = function () {
  if (tray) tray.destroy()
  tray = null
}
