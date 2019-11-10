const Browser = require('./browser')



const template = `
<div class="browser-container d-flex flex-column">
    <div class="browser-controls">
        <input type="text" v-model="location" >
        <button v-on:click="loadURL">Go</button>
    </div>
    <div class="d-flex flex-column flex-fill">
        <Browser class="flex-fill" ref="browser"/>
    </div>
</div>
`


const WebTabs = {
    template,
    components: {
        Browser
    },
    data() {
        return {
            location: "",
            active_index: 0
        }
    },
    mounted() {

    },
    methods: {
        loadURL() {
            this.$refs.browser.loadURL(this.location)
        }
    }
}


module.exports = WebTabs