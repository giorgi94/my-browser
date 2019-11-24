<template>
    <div class="web-page">
        <div class="web-toolbar">
            <span>tools</span>
        </div>
        <div class="web-wrapper">
            <webview src="https://youtube.com/" />
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
            title: "Hello Web Page"
        };
    }
};
</script>