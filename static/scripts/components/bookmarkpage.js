const fs = require('fs');
const { GenerateAnimeMixin } = require('../mixins/GenerateMixins');


module.exports = {
    props: [
        'db', 'refs',
    ],
    data() {
        return {
            blankJsonStr: '',
            bookmarkJsonString: '',
            bookmarkJson: {},
            selected: '', 
            collection: '',
        }
    },
    watch: {
        selected(val) {
            this.collection = val;
        },
    },
    mounted() {
        this.blankJsonStr = JSON.stringify({
            "img": "",
            "title": "",
            "links": [],
            "episodes": {
                "embed": {},
                "video": {}
            },
            "info": {
                "year": "",
                "genre": [],
                "title": ""
            }
        },null,4);
        this.bookmarkJsonString = this.blankJsonStr;
        this.bookmarkJson = JSON.parse(this.blankJsonStr);
    },
    mixins: [GenerateAnimeMixin],
    methods: {
        Cancel() {

            this.bookmarkJsonString = this.blankJsonStr;
            this.bookmarkJson = JSON.parse(this.blankJsonStr);
            this.selected = '';
            this.collection = '';
        },
        Generate() {
            let location = this.refs.webview.getURL();

            this.GenerateAnime();
        },
        Update() {
            if(this.db[this.collection]) {

                this.db[this.collection].push(JSON.parse(this.bookmarkJsonString))

                fs.writeFile(`${__dirname}/../../../data/db.json`, JSON.stringify(this.db), 'utf8', ()=>{
                    this.$emit("db-updated");
                });
            }

        },
        
    },
    template: `
    <div class="bookmark-modal">
        <div class="bookmark-container">
            <div class="bookmark-buttons">
                <div class="control-button" @click="Update">Update</div>
                <div class="control-button" @click="Generate">Generate</div>
                <div class="control-button" @click="Cancel">Cancel</div>
            </div>
            <div class="bookmark-inputs" v-if="db">
                <input v-model="collection"/>
                <select v-model="selected">
                    <option v-for="(value, name) in db" :key="name" :value="name">{{name}}</option>
                </select>
            </div>
            <div class="bookmark-json">
                <textarea v-model="bookmarkJsonString"></textarea>
            </div>
        </div>
    </div>
    `
}

