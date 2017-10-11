const MenuComponent = require('./components/menu');
const Webheader =  require('./components/header');
const Collections = require('./components/collections');
const Bookmarkpage = require('./components/bookmarkpage');


const db = require('../../data/db.json');


var app = new Vue({
    el: '#app',
    data: {
        db,
        showMenu: true,
        isMuted: false,
        showCollections: false,
        showBookmarkModal: false,
        selectedVideo: {}
    },
    components: {
        MenuComponent,
        Webheader,
        Collections,
        Bookmarkpage,
    },
    mounted() {
        

    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu
        },
        toggleMute() {
            this.isMuted = !this.isMuted
        },
        toggleCollections() {
            this.showCollections = !this.showCollections
        },
        dbUplated() {
            this.db = require('../../data/db.json');
        },
        toggleBookmark() {
            this.showBookmarkModal = !this.showBookmarkModal;
        },
        toggleVideo(data) {
            this.selectedVideo = data;
        }
    }
});

module.exports = app;