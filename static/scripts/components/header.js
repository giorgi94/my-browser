
module.exports = {
    props: [
        'showMenu', 'refs', 'db'
    ],
    data() {
        return {
            location: 'https://ww3.gogoanime.io/',
            isMuted: false,
            isLoading: true,
            history: {
                canGoBack: false,
                canGoForward: false,
            },
            db_stringified: '',
            isBookmarked: false,
        }
    },
    watch: {
        db(val) {
            this.db_stringified = JSON.stringify(this.db);
        }
    },
    mounted() {

        // this.refs.webview.loadURL(this.location)

        this.db_stringified = JSON.stringify(this.db);

        this.refs.webview.addEventListener('did-start-loading', (event)=>{
            this.isLoading = true

        });
        this.refs.webview.addEventListener('did-stop-loading', (event)=>{
            this.isLoading = false
            this.refs.title.innerText = this.refs.webview.getTitle()
            this.location = this.refs.webview.getURL()

            this.history.canGoBack = this.refs.webview.canGoBack()
            this.history.canGoForward = this.refs.webview.canGoForward()

            

            if(this.db_stringified.indexOf(`"${this.location}"`)!=-1) {
                this.isBookmarked = true;
            }
            else {
                this.isBookmarked = false;
            }

        });



    },
    methods: {
        bookmarkPage() {
            this.$emit('toggle-bookmark')
        },
        goHomePage() {
            this.location = 'https://ww3.gogoanime.io/';
            this.loadURL();
        },
        toggleMute() {
            this.isMuted = !this.isMuted
            this.refs.webview.setAudioMuted(this.isMuted)
        },
        toggleMenu() {
            this.$emit('show-menu', !this.showMenu)
        },
        loadURL: function() {
            if(this.location.indexOf('http://')==-1&&this.location.indexOf('https://')==-1) {
                this.location = 'http://' + this.location;
            }
            this.refs.webview.loadURL(this.location);
        },
        goBack() {
            if(this.refs.webview.canGoBack()) {
                this.refs.webview.goBack()
            }
        },
        goForward() {
            if(this.refs.webview.canGoForward()) {
                this.refs.webview.goForward()
            }
        },
        reload() {
            if(this.isLoading) {
                this.refs.webview.stop()
            }
            else {
                this.refs.webview.reload()
            }
        }
    },
    template: `
    <div class="header-navigator">
        <div class="navigator-buttons">      
            <i :class="['zmdi', 'zmdi-arrow-left', {'active': history.canGoBack}]" @click="goBack()"></i>
            <i :class="['zmdi', 'zmdi-arrow-right', {'active': history.canGoForward}]" @click="goForward()"></i>
            <i :class="['zmdi', 'zmdi-refresh', 'refresh', {'active isloading': isLoading}]" @click="reload()"></i>
            <i class="zmdi zmdi-home home" @click="goHomePage()"></i>
        </div>
        <div class="navigator-address">
            <i class="zmdi zmdi-gps-dot"></i>
            <input type="text" name="address" v-model="location" @keyup.enter="loadURL()">
            <i :class="['fa', {'fa-star-o':!isBookmarked, 'fa-star':isBookmarked}]" aria-hidden="true" @click="bookmarkPage"></i>
        </div>
        <div class="navigator-buttons navigator-buttons-right">   
            <i :class="['zmdi volume', {'zmdi-volume-off':isMuted, 'active zmdi-volume-up':!isMuted}]" @click="toggleMute()"></i>     
            <i :class="['fa', 'fa-bars', {'active': showMenu}]" @click="toggleMenu()" aria-hidden="true"></i>
        </div>
    </div>
    `
}