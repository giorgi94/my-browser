<template>
    <div>
        <b-card no-body class="border-0">
            <b-tabs v-model="activTabStep" card class="app-tabs">
                <b-tab title="Bookmarks" active>
                    <div slot="title">
                        <span>Bookmarks</span>
                    </div>
                    <b-card-text>
                        <Home />
                    </b-card-text>
                </b-tab>

                <b-tab v-for="tab in tablist" :key="tab.id" class="tab-web-content border-0">
                    <div slot="title">
                        <div class="tab-item">
                            <span class="mr-3" :title="tab.title">{{ tab.title }}</span>
                            <span class="tab-close" title="close" @click="tabClose(tab.id)">
                                <i class="fas fa-times" />
                            </span>
                        </div>
                    </div>
                    <b-card-text>
                        <Web :id="tab.id" :homepage="tab.homepage" @change-title="setTabTitle" />
                    </b-card-text>
                </b-tab>

                <div slot="tabs-end">
                    <b-nav-item href="#" @click.prevent="tabAdd">
                        <i class="tab-add fas fa-plus-square" />
                    </b-nav-item>
                </div>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
const Home = require("./views/Home");
const Web = require("./views/Web");

module.exports = {
    components: {
        Home,
        Web
    },
    computed: {
        tablist: {
            get() {
                return Object.entries(this.tabs).map(tab=>{
                    return {
                        id: tab[0],
                        ...tab[1]
                    };
                });
            }
        }
    },
    data() {
        return {
            activTabStep: 0,
            tabs: {
                "sdfjiafe": {
                    "title": "",
                    "homepage": database.config.homepage || "https://google.com"
                }
            }
        };
    },
    mounted () {
        window.vm = this;

        this.activTabStep = 1;
    },
    methods: {
        makeid(length) {
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        tabClose(id) {
            this.$delete(this.tabs, id);
        },
        tabAdd() {
            const id = this.makeid(5);

            this.$set(this.tabs, id, {
                "title": `Tab: ${id}`,
                "homepage": "https://youtube.com/"
            });

        },
        setTabTitle({ id, title }) {
            this.$set(this.tabs, id, {
                title
            });
        }
    }
};
</script>
