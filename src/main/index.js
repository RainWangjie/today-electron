/**
 * This file manages application's lifecycle.
 */

'use strict'

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron'
import base64Img from 'base64-img'

import menu from './menu'
import { createTray, destroyTray, trayExists } from './tray'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/`
    : `file://${__dirname}/index.html/`

export function createWindow() {
  if (mainWindow) return

  mainWindow = new BrowserWindow({
    useContentSize: true,
    height: 600,
    width: 800,
    minHeight: 400,
    minWidth: 656
  })

  mainWindow.loadURL(winURL)

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu)

  createTray()
}

app.on('ready', createWindow)

app.on('window-all-closed', event => {
  if (process.platform !== 'darwin' && !trayExists()) {
    app.quit()
  }
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Events to renderer.
 */
ipcMain.on('open-avatar-dialog', event => {
  dialog.showOpenDialog(
    mainWindow,
    {
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg'] }]
    },
    file => {
      if (file) {
        const code = base64Img.base64Sync(file[0])
        event.sender.send('avatar-generated', code)
      }
    }
  )
})

ipcMain.on('put-in-tray', event => {
  createTray()
})

ipcMain.on('remove-tray', event => {
  destroyTray()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
