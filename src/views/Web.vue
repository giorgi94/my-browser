<template>
    <div class="web-page">
        <div class="web-toolbar px-3 py-2 border-bottom">
            <span class="lead">
                <i class="far fa-arrow-alt-circle-left" />
            </span>
            <span class="lead">
                <i class="far fa-arrow-alt-circle-right" />
            </span>
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
        }
    }
};
</script>