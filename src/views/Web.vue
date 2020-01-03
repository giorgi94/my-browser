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
                    </b-button-group>
                </div>

                <div class="flex-fill">
                    <b-button-group class="w-100">
                        <b-form-input ref="location" type="text" @keyup.enter="LoadUrl" />
                        <b-button @click="LoadUrl">
                            <i class="far fa-arrow-alt-circle-right" />
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
                        <b-button>
                            <i class="fas fa-expand"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </b-row>
        </div>
        <div :class="`web-wrapper`">
            <webview class="web-view" ref="view" @did-finish-load="Loaded" />
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
            title: "Hello Web Page"
        };
    },
    mounted () {
        const view = this.$refs.view
        view.src = this.homepage
    },
    methods: {
        Loaded() {
            const view = this.$refs.view
            const title = view.getTitle()

            this.$refs.location.localValue = view.getURL()
            this.$emit('change-title', {id: this.id, title})
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
        ToggleVolume () {
            const view = this.$refs.view
            const ismuted = view.isAudioMuted()
            view.setAudioMuted(!ismuted)

            this.muted = !ismuted
        },
        ToggleFullView () {

        },
        MakeBookmark () {

        }
    }
};
</script>