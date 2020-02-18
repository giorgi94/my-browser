<template>
    <div class="web-page">
        <div class="web-toolbar px-3 py-2 border-bottom">
            <b-row>
                <div class="mx-2">
                    <b-button-group>
                        <b-button @click="GoBack">
                            <i class="far fa-arrow-alt-circle-left" />
                        </b-button>

                        <b-button @click="GoForward">
                            <i class="far fa-arrow-alt-circle-right" />
                        </b-button>

                        <b-button @click="Reload">
                            <i class="fas fa-retweet" />
                        </b-button>
                    </b-button-group>
                </div>

                <div class="flex-fill">
                    <b-button-group class="w-100">
                        <b-button @click="GoToHomepage">
                            <i class="fas fa-hotel" />
                        </b-button>
                        <b-form-input
                            ref="location"
                            class="rounded-0"
                            type="text"
                            @keyup.enter="LoadUrl"
                        />
                        <b-button @click="LoadUrl">
                            <i v-if="!loading" class="far fa-arrow-alt-circle-right" />
                            <i v-else class="fas fa-spinner" />
                        </b-button>
                        <b-button @click="OpenDevTools">
                            <i class="fas fa-code" />
                        </b-button>
                    </b-button-group>
                </div>

                <div class="mx-2">
                    <b-button-group>
                        <b-button @click="ToggleVolume">
                            <i :class="`fas fa-volume-${muted ? 'mute': 'up'}`" />
                        </b-button>
                        <b-button @click="MakeBookmark">
                            <i :class="bookmarked ? 'fas fa-star': 'far fa-star'" />
                        </b-button>

                        <b-button>
                            <i class="fas fa-bars" />
                        </b-button>
                        <b-button @click="ToggleFullView">
                            <i class="fas fa-expand" />
                        </b-button>
                    </b-button-group>
                </div>
            </b-row>
        </div>
        <div class="web-wrapper">
            <div class="full-view-widgets left">
                <b-button-group>
                    <b-button @click="ToggleVolume">
                        <i :class="`fas fa-volume-${muted ? 'mute': 'up'}`" />
                    </b-button>
                </b-button-group>
            </div>
            <div class="full-view-widgets right">
                <b-button-group>
                    <b-button @click="ToggleFullView">
                        <i class="fas fa-expand" />
                    </b-button>
                </b-button-group>
            </div>
            <webview
                ref="view"
                class="web-view"
                @did-finish-load="Loaded"
                @did-start-loading="loading = true"
                @did-stop-loading="loading = false"
            />
        </div>
    </div>
</template>

<script>


module.exports = {
    props: {
        id: {
            type: String,
            required: true
        },
        homepage: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            view: null,
            muted: false,
            isfullview: false,
            bookmarked: false,
            loading: false,
            title: "Hello Web Page"
        };
    },
    watch: {
        isfullview (value) {
            if (value) {
                document.body.classList.add("full-view");
            } else {
                document.body.classList.remove("full-view");
            }
        }
    },
    mounted () {
        const view = this.$refs.view;
        view.src = this.homepage;

        if (database.config.muted) {
            setTimeout(()=>{
                this.ToggleVolume();
            }, 1000);
        }

    },
    methods: {
        Loaded() {
            const title = this.GetTitle();
            const url = this.GetURL();

            this.$refs.location.localValue = url;
            this.$emit("change-title", {id: this.id, title});

            database.dumpHistory(url);
        },
        GetTitle () {
            return this.$refs.view.getTitle();
        },
        GetURL () {
            return this.$refs.view.getURL();
        },
        GoBack() {
            const view = this.$refs.view;
            if (view.canGoBack()) {
                view.goBack();
            }
        },
        GoForward() {
            const view = this.$refs.view;
            if (view.canGoForward()) {
                view.goForward();
            }
        },
        LoadUrl() {
            const view = this.$refs.view;
            let url = this.$refs.location.localValue;

            if (!url.match(/^(http|https):\/\//)) {
                url = "http://" + url;
            }

            view.loadURL(url).catch(e=>console.log(e));
        },
        Reload() {
            const view = this.$refs.view;
            view.reload();
        },
        ToggleVolume () {
            const view = this.$refs.view;
            const ismuted = view.isAudioMuted();
            view.setAudioMuted(!ismuted);

            this.muted = !ismuted;
        },
        ToggleFullView () {
            this.isfullview = !this.isfullview;
        },
        OpenDevTools () {
            this.$refs.view.openDevTools();
        },
        GoToHomepage () {
            this.$refs.view.loadURL(database.config.homepage);
        },
        MakeBookmark () {

        }
    }
};
</script>