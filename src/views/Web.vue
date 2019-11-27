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
                            <i class="fas fa-volume-up" />
                            <!-- <i class="fas fa-volume-mute" /> -->
                        </b-button>
                        <b-button @click="MakeBookmark">
                            <i class="far fa-star" />
                            <!-- <i class="fas fa-star" /> -->
                        </b-button>
                        <b-button>
                            <i class="fas fa-bars" />
                        </b-button>
                    </b-button-group>
                </div>
            </b-row>
        </div>
        <div class="web-wrapper">
            <webview ref="view" src="https://youtube.com/" />
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            view: null,
            title: "Hello Web Page"
        };
    },
    mounted () {
        this.adjustHeight();
    },
    methods: {
        adjustHeight () {
            setTimeout(() => {
                let view = this.$refs.view;
                let rect = view.getBoundingClientRect();
                let top = rect.top;
                view.style.height = `calc(100vh - ${top}px)`;
            }, 1000);
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

            view.loadURL(url);
        },
        ToggleVolume () {

        },
        MakeBookmark () {

        }
    }
};
</script>