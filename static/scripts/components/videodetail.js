const fs = require('fs');

module.exports = {
    props: [
        'db',
        'video',
        'name'
    ],
    data() {
        return {
            canUpdate: false,
            videoJson: '',
            collection: '',
            canChangeCol: false,
        }
    },
    watch: {
        video(val) {
            this.videoJson = JSON.stringify(this.video, null, 4);
            this.canUpdate = false;
            this.collection = this.name;
        },
        videoJson(val) {
            if(this.videoJson != JSON.stringify(this.video, null, 4)) {
                this.canUpdate = true;
            }
            else {
                this.canUpdate = false;
            }            
        },
        collection(val) {
            if(val != this.name) {
                this.canChangeCol = true;
            }
            else {
                this.canChangeCol = false;
            }            
        }
    },
    mounted() {
        this.videoJson = JSON.stringify(this.video, null, 4);
        this.canUpdate = false;
        this.collection = this.name;
    },
    methods: {
        loadLink() {
            document.querySelector('webview').loadURL(this.video.links[0]);
        },
        goBack() {
            this.$emit('goback')
        },
        loadVide(episode) {
            document.querySelector('webview').loadURL(episode);
        },
        updateData() {
            let index = this.db[this.name].indexOf(this.video);
            this.db[this.name][index] = JSON.parse(this.videoJson);

            fs.writeFile(`${__dirname}/../../../data/db.json`, JSON.stringify(this.db), 'utf8', ()=>{
                this.$emit("db-updated");
                this.canUpdate = false;
            });
        },
        changeCollection() {
            if(this.canChangeCol) {
                this.db[this.collection].push(this.video);
                let index = this.db[this.name].indexOf(this.video);
                delete this.db[this.name][index];
                this.$emit("db-updated");
            }
        },
        changeVideo(direction) {
            this.$emit('change-video', {direction, name: this.name})
        },
        addSources() {
            
        }
    },
    template: `
    <div class="video-container">
        <div class="video-body-container">
            <div class="video-poster">
                <img :src="video.img" @click="loadLink"/>
            </div>
            <div class="video-info">
                <h4>{{video.title}}</h4>
                <div class="video-navigation-arrows">
                    <i class="zmdi zmdi-forward backward" @click="changeVideo(-1)"></i>
                    <i class="zmdi zmdi-forward forward" @click="changeVideo(1)"></i>
                </div>

                <hr>
                <div class="episodes-container">
                    <div class="video-episodes" v-if="video.episodes">
                        <h4>Episodes:</h4>
                        <ul>
                            <li v-for="(episode,count) in video.episodes.embed" :key="count" @click="loadVide(episode)">{{count}}</li>
                        </ul>
                    </div>
                </div>
                <div class="menu-row collection-form">
                        <span :class="{'active':canChangeCol}" @click="changeCollection">Change:</span>
                        <select v-model="collection">
                            <option class="menu-row" v-for="(val, col) in db" :value="col" :key="col">{{col}}</option>
                        </select>
                    </div>
                <div class="video-navigation">
                    <div class="control-button" v-if="canUpdate" @click="updateData">Update</div>
                    <div class="control-button" @click="goBack">Go Back</div>
                    <div class="control-button" @click="addSources">Add Sources</div>
                </div>
            </div>
        </div> 
        <div class="video-json">
            <textarea v-model="videoJson"></textarea>
        </div>
    </div>
    `
}

