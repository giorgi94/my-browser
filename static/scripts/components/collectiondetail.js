const Poster = require('./poster');

module.exports = {
    props: [
        'name',
        'db',
    ],
    data() {
        return {
            videos: [],
            translateX: 0,
            marginLeft: 0,
        }
    },
    mounted(){
        this.videos = this.db[this.name]

        setTimeout(()=>{
            this.marginLeft = Math.floor((this.$refs.container.offsetWidth-145*Math.floor(this.$refs.container.offsetWidth/145))/2);
        },100)
        
    
        window.addEventListener('resize',()=>{

            if(this.$refs.container) {
                this.marginLeft = Math.floor((this.$refs.container.offsetWidth-145*Math.floor(this.$refs.container.offsetWidth/145))/2);
            }
        });
    },
    components: {
        Poster
    },
    methods: {
        goBack() {
            this.$emit('goback')
        },
        showDetails(vid) {
            this.$emit('show-details', {vid, name:this.name})
        },
        getMarginLeft() {
            return `${this.marginLeft}px`
        }
    },
    template: `
    <div class="collection-block-container">
        <h1 class="collection-head" @click="goBack">{{name}}</h1>
        <br>
        <div class="collection-group-container">
            <div class="collection-posters-container" ref="container" :style="{'padding-left':getMarginLeft()}">
                <poster v-for="(video, count) in videos" @click :key="count" :video="video" :name="name" @show-details="showDetails"/>
            </div>
        </div>
    </div>
    `
}