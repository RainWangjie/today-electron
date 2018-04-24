import { ipcMain, dialog } from 'electron'
import base64Img from 'base64-img'

import { mainWindow } from './window'
import { createOrUpdateNotification, deleteNotification } from './scheduler'

import * as types from '../shared/event-types'

ipcMain.on(types.AVATAR_REQUIRE, event => {
  dialog.showOpenDialog(
    {
      window: event.sender,
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg'] }]
    },
    file => {
      if (file) {
        const code = base64Img.base64Sync(file[0])
        event.sender.send(types.AVATAR_RESPONSE, code)
      }
    }
  )
})

ipcMain.on(types.CREATE_NOTIFY, (event, item) => {
  createOrUpdateNotification(item)
})

ipcMain.on(types.DELETE_NOTIFY, (event, item) => {
  deleteNotification(item)
})

const sendToMainWindow = function(type, message) {
  mainWindow.webContents.send(type, message)
}

export const fallbackNotification = function(message) {
  sendToMainWindow(types.NOTIFICATION, message)
}
