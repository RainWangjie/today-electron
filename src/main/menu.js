import { app, Menu } from 'electron'

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: 'CommandOrControl+N',
        click: (item, window, event) => {
          window.webContents.send('create-new-todo')
        }
      },
      {
        label: 'New List',
        accelerator: 'CommandOrControl+Shift+N',
        click: (item, window, event) => {
          window.webContents.send('create-new-list')
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'See ToDos',
        accelerator: 'CommandOrControl+T',
        click: (item, window, event) => {
          window.webContents.send('go-to-main-view')
        }
      },
      {
        label: 'Check Summaries',
        accelerator: 'CommandOrControl+S',
        click: (item, window, event) => {
          window.webContents.send('go-to-summary-view')
        }
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://electron.atom.io')
        }
      }
    ]
  }
]

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

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
