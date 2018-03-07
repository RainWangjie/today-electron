import { app, Menu } from 'electron'
import i18n from './i18n'

const $t = i18n.$t
const template = [
  {
    label: $t('file'),
    submenu: [
      {
        label: $t('newTodo'),
        accelerator: 'CommandOrControl+N',
        click: (item, window, event) => {
          window.webContents.send('create-new-todo')
        }
      },
      {
        label: $t('newList'),
        accelerator: 'CommandOrControl+Shift+N',
        click: (item, window, event) => {
          window.webContents.send('create-new-list')
        }
      }
    ]
  },
  {
    label: $t('edit'),
    submenu: [
      { role: 'undo', label: $t('undo') },
      { role: 'redo', label: $t('redo') },
      { type: 'separator' },
      { role: 'cut', label: $t('cut') },
      { role: 'copy', label: $t('copy') },
      { role: 'paste', label: $t('paste') }
    ]
  },
  {
    label: $t('view'),
    submenu: [
      {
        label: $t('seeTodos'),
        accelerator: 'CommandOrControl+T',
        click: (item, window, event) => {
          window.webContents.send('go-to-main-view')
        }
      },
      {
        label: $t('checkSummaries'),
        accelerator: 'CommandOrControl+S',
        click: (item, window, event) => {
          window.webContents.send('go-to-summary-view')
        }
      }
      // { type: 'separator' },
      // { role: 'reload' },
      // { role: 'forcereload' },
      // { role: 'toggledevtools' },
      // { type: 'separator' },
      // { role: 'resetzoom' },
      // { role: 'zoomin' },
      // { role: 'zoomout' },
      // { type: 'separator' },
      // { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    label: $t('window'),
    submenu: [
      { role: 'minimize', label: $t('minimize') },
      { role: 'close', label: $t('close') }
    ]
  }
]

if (process.platform === 'win32') {
  template[0].submenu.push(
    { type: 'separator' },
    {
      label: $t('settings'),
      accelerator: 'CommandOrControl+,',
      click: (item, window, event) => {
        window.webContents.send('go-to-settings-view')
      }
    },
    { type: 'separator' },
    {
      label: $t('quit'),
      role: 'quit',
      accelerator: 'Alt+F4'
    }
  )
}

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      {
        label: 'Settings',
        accelerator: 'CommandOrControl+,',
        click: (item, window, event) => {
          window.webContents.send('go-to-settings-view')
        }
      },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
    }
  )

  // Window menu
  template[4].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

export default Menu.buildFromTemplate(template)
