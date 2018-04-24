'use strict'

import { app } from 'electron'

import './init'
import './ipc'
import { initScheduler } from './scheduler'
import { createWindow } from './window'
import { createTray } from './tray'

app.on('ready', () => {
  createWindow()
  createTray()
  initScheduler()
})

app.on('window-all-closed', event => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('activate', () => {
  createWindow()
})
