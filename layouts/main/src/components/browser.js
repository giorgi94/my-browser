const Browser = {
    template: `<div class="browser-wrapper">
        <webview
            ref="browser"
            class="browser"
            preload="../preload.js"
            :src="homepage" />
    </div>`,
    data() {
        return {
            homepage: "https://www.google.co.uk/"
        }
    },
    mounted() {
        this.setMute()

        console.log($ROOT)

    },
    methods: {
        setMute() {
            setTimeout(() => {
                this.$refs.browser.setAudioMuted(true)
                console.log('muted')
            }, 500)
        },
        loadURL(location) {
            this.$refs.browser.loadURL(location)
        },
        parseItems() {
            browser.executeJavaScript(`(()=>{
                const el = document.title


                return el
            })()`, (e) => console.log(e))
        }
    }
}


module.exports = Browser