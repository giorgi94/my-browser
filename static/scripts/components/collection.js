const Poster = require('./poster');

module.exports = {
    props: [
        'name',
        'videos',
    ],
    data() {
        return {
            translateX: 0,
            visibleCount: 0,
        }
    },
    mounted(){
        window.addEventListener('resize',()=>{
            if(document.querySelector('.collection-container')) {
                this.visibleCount = Math.floor(document.querySelector('.collection-container').offsetWidth/145);
            }
        });
    },
    components: {
        Poster
    },
    methods: {
        showDetails(vid) {
            this.$emit('show-details', {vid, name:this.name})
        },
        getSliderWidth() {
            return `${this.videos.length*145}px`
        },
        getTranslateX() {
            return `translateX(${-145*this.translateX}px)`
        },
        adjustVisibleCount() {
            let el = document.querySelector('.collection-container');
            if(el) {
                this.visibleCount = Math.floor(el.offsetWidth/145);
            }
        },
        scrollRight() {
            let items = Math.floor(document.querySelector('.collection-container').offsetWidth/145)
            if(this.translateX + items<=this.videos.length - this.visibleCount) {
                this.translateX = this.translateX+items
            }
            else {
                this.translateX = this.videos.length - this.visibleCount;
            } 
        },
        scrollLeft() {
            let items = Math.floor(document.querySelector('.collection-container').offsetWidth/145)
            if(this.translateX - items>=0) {
                this.translateX = this.translateX-items;
            }
            else {
                this.translateX = 0;
            }
            
        },
        showCollectionDetail() {
            this.$emit('show-collection-detail', this.name)
        }
    },
    template: `
    <div class="collection-block-container" @click.once="adjustVisibleCount">
        <h1 class="collection-head" @click="showCollectionDetail">{{name}}</h1>
        <i class="zmdi zmdi-caret-left-circle scroll-left active" @click="scrollLeft()"></i>
        <i class="zmdi zmdi-caret-right-circle scroll-right active" @click="scrollRight()"></i>
        <div class="collection-container">
            <div class="posters-container" 
                :style="{'width':getSliderWidth(), 'transform':getTranslateX()}"
                >
                <poster v-for="(video, count) in videos" @click :key="count" :video="video" @show-details="showDetails" :name="name"/>
            </div>
        </div>
    </div>
    `
}