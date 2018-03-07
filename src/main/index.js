'use strict'

import { app } from 'electron'

import './init'
import { createWindow } from './window'
import { createTray } from './tray'

app.on('ready', () => {
  createWindow()
  createTray()
})

app.on('window-all-closed', event => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('activate', () => {
  createWindow()
})
