const App = {
    template: `<div id="app">
        {{msg}}
    </div>`,
    data() {
        return {
            msg: "Hello my browser"
        }
    },
    mounted() {
        this.setMute()

    },
    methods: {
        setMute() {
            // setTimeout(() => {
            //     browser.setAudioMuted(true)
            //     console.log('muted')
            // }, 500)
        },
        parseItems() {
            browser.executeJavaScript(`(()=>{
                const el = document.title


                return el
            })()`, (e) => console.log(e))
        }
    }
}


module.exports = App