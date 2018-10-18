const path = require('path')
const { app, BrowserWindow } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

let win

const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 1016,
    minHeight: 639,
    width: 1016,
    height: 639,
    autoHideMenuBar: true,
  })

  win.setMenu(null)
  win.webContents.openDevTools()

  let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(name => {
      console.log(`Extensão Adicionada: ${name}`)
    })
    .catch(err => {
      console.log('Não foi possivel instalar o vue-devtools: \n', err)
    })

  win.loadFile(path.resolve(__dirname, 'dist', 'index.html'))

  win.on('closed', () => {
      win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
