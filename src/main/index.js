/* eslint-disable no-new */
'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const printURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/print`
    : `file://${__dirname}/index.html#print`

function createWindow () {
    /**
     * Initial window options
     */

    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        show: false,
        minWidth: 1050
    })
    mainWindow.setMenu(null)
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.once('ready-to-show', () => mainWindow.show())
}

app.on('ready', createWindow)

ipcMain.on('showPrint', function (e, data) {
    let win = new BrowserWindow({ width: 1050, height: 500, webPreferences: {webSecurity: false} })
    win.on('close', function () { win = null })
    win.setMenu(null)
    win.loadURL(printURL)
    console.log(__dirname)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
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
