<template>
    <div class="web-page">
        <h1>{{ title }} #{{ id }}</h1>
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