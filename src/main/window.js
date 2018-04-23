'use strict'

import { Menu, BrowserWindow } from 'electron'
import menu from './menu'

export let mainWindow

const isDev = process.env.NODE_ENV === 'development'
const winURL = isDev
  ? `http://localhost:9080/`
  : `file://${__dirname}/index.html`

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
  mainWindow.on('closed', () => (mainWindow = null))

  Menu.setApplicationMenu(menu)
}
