module.exports = {
    props: [
        'showCollections', 'location', 'video', 'refs'
    ],
    data() {
        return {
            episode: '',
            go: false,
        }
    },
    watch: {
        video(val) {
            if(val.vid.episodes) {
                this.episode = ''
            }
        },
        episode(val) {
            if(this.go && this.episode != '') {
                this.refs.webview.loadURL(val);
            }
        }
    }, 

    methods: {
        toggleDevTools() {
            this.refs.webview.openDevTools();
        },
        toggleCollections() {
            this.$emit('show-collections')
        },
        toggleGo() {
            this.go = !this.go;

            if(this.refs.webview.getURL()!=this.episode) {
                this.refs.webview.loadURL(this.episode);
            }
        },
        getVideoSource() {
            executeJS("document.querySelector('video').src", (source)=>{
                console.log(source)
            });
        }

    },
    template: `
    <div class="menu-container">
        <div class="menu-row" @click="toggleDevTools()">Show DevTools</div>
        <div :class="['menu-row', {'active':showCollections}]" @click="toggleCollections()">Show Collections</div>
        <div class="menu-row" @click="getVideoSource()">Get Video Souce</div>
        <div v-if="video.vid">
            <hr>
            <div class="menu-row" >
                <span :class="{'active':go}" @click="toggleGo">Episodes:</span>
                <select v-model="episode">
                    <option class="menu-row" v-for="(ep, count) in video.vid.episodes.embed" :value="ep" :key="count">{{count}}</option>
                </select>
            </div>
        </div>
    </div>
    `
}