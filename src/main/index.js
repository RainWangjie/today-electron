'use strict'

import { app, BrowserWindow, ipcMain, dialog, globalShortcut } from 'electron'
import base64Img from 'base64-img'

import './menu'
import './tray'

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

export function createWindow () {
  /**
   * Initial window options
   */
  if (mainWindow) return

  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 800,
    minHeight: 400,
    minWidth: 656
    // frame: false
  })

  mainWindow.loadURL(winURL)

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  globalShortcut.register('CommandOrControl+N', () => {
    mainWindow.webContents.send('create-new-todo')
  })
}

app.on('ready', createWindow)

// 'window-all-closed' event is handled in tray.js.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

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
