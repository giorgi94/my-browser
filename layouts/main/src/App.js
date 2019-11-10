const WebTabs = require('./components/webtabs')

const template = `
<div id="app" class="vh-100 d-flex flex-column">
<div>
    {{msg}}
</div>
<WebTabs class="flex-fill" />
</div>
`


const App = {
    template,
    components: {
        WebTabs
    },
    data() {
        return {
            msg: "Hello my browser"
        }
    },
    mounted() {
    },
    methods: {

    }
}


module.exports = App