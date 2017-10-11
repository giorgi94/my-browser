const Collection = require('./collection');
const VideoDetail = require('./videodetail');
const CollectionDetail = require('./collectiondetail');

module.exports = {
    props: [
        'db'
    ],
    data() {
        return {
            showVideoDetails: false,
            showCollectionDetails: false,
            videoDetail: {},
            name: '',
        }
    },
    mounted(){
        
    },
    components: {
        Collection,
        VideoDetail,
        CollectionDetail,
    },
    methods: {
        showDetails(data) {
            this.name = data.name;
            this.videoDetail = data.vid;
            this.showVideoDetails = true;
            this.$emit('selected-video', data)
        },
        hideDetails() {
            this.showVideoDetails = false;
        },
        dbUplated() {
            this.$emit("db-updated");
        },
        showCollectionDetail(name) {
            this.name = name;
            this.showCollectionDetails = true;
        },
        hideCollectionDetail() {
            this.showCollectionDetails = false;
        },
        changeDetailVideo(data) {
            let videos = this.db[data.name];
            let index = videos.findIndex(val=>val.title==this.videoDetail.title);

            index = index + data.direction;
            if(index<0) {
                this.videoDetail = videos[videos.length-1];
            }
            else if(index==videos.length) {
                this.videoDetail = videos[0];
            }
            else {
                this.videoDetail = videos[index];
            }
            this.$emit('selected-video', {vid:this.videoDetail, name:this.name});
        }
    },
    template: `
    <div class="collections-container" v-if="db">
        <div v-if="!showVideoDetails&&!showCollectionDetails">
            <collection v-for="(value, key) in db" :key="key" :videos="value" :name="key" @show-details="showDetails" @show-collection-detail="showCollectionDetail"/>
        </div>
        <div v-if="showCollectionDetails && !showVideoDetails">
            <collection-detail :db="db" :name="name" @goback="hideCollectionDetail" @show-details="showDetails" />
        </div>
        <div v-if="showVideoDetails">
            <video-detail :video="videoDetail" @goback="hideDetails" :db="db" :name="name" @db-updated="dbUplated" @change-video="changeDetailVideo"/>
        </div>        
    </div>
    `
}


