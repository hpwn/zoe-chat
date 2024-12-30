const { app, BrowserWindow, session } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            partition: 'persist:streamlabs'
        },
        title: 'Elora Chat'
    })

    // Set headers for all requests
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    win.loadURL('https://streamlabs.com/dashboard/widgets/chat-box')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
})