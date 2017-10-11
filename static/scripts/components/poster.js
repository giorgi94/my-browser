module.exports = {
    props: [
        'video',
        'name',
    ],
    data() {
        return {
            
        }
    },
    methods: {
        showDetails() {
            this.$emit('show-details', this.video)
        }
    },
    template: `
    <div class="poster-container" v-if="video">
        <img :src="video.img" :title="video.title" @click="showDetails()">
    </div>
    `
}