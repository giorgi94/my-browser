<template>
    <div>
        <b-card no-body class="border-0">
            <b-tabs card>
                <b-tab title="Home" active>
                    <b-card-text>
                        <Home />
                    </b-card-text>
                </b-tab>

                <b-tab v-for="tab in tablist" :key="tab.id">
                    <div slot="title">
                        <span>{{ tab.title }}</span>
                    </div>
                    <b-card-text>
                        <Web :id="tab.id" />
                    </b-card-text>
                </b-tab>

                <div slot="tabs-end">
                    <b-nav-item href="#" @click.prevent="newTab">
                        <b>+</b>
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
            tabs: {}
        };
    },
    mounted () {
        window.vm = this;
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
        closeTab(x) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i] === x) {
                    this.tabs.splice(i, 1);
                }
            }
        },
        newTab() {
            const id = this.makeid(5);

            this.$set(this.tabs, id, {
                "title": `Tab: ${id}`
            });

        }
    }
};
</script>
