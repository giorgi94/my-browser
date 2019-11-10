const { dirname, normalize, join } = require('path')
const Vue = require('vue/dist/vue');
const App = require('./App')

const { ipcRenderer } = require('electron')


window.$ROOT = normalize(join(__dirname, '../../../'))


// window.browser = document.querySelector('webview')
// browser.src = "https://www.youtube.com/"



const app = new Vue({
    render: h => h(App),
    components: { App }
}).$mount('#app');



ipcRenderer.on('webview-event', (event, msg) => {


    if (msg.type === 'keydown' && msg.altKey) {
        if (msg.key === "ArrowLeft" && webview.canGoBack()) {
            webview.goBack()
        } else if (msg.key === "ArrowRight" && webview.canGoForward()) {
            webview.goForward()
        }
    }
})
