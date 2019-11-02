
const { ipcRenderer } = require('electron')


const send = (msg) => {
    ipcRenderer.send('webview-event', msg)
}

document.addEventListener("keydown", (e) => {

    const {
        altKey,
        ctrlKey,
        code,
        shiftKey,
        key,
        keyCode,
        type,
    } = e

    send({
        altKey,
        ctrlKey,
        code,
        shiftKey,
        key,
        keyCode,
        type,
    })
})
