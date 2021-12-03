<template>
    <div>
        <b-button variant="success" @click="back()">Back</b-button>
    </div>
</template>

<script>
export default {
    props: ["backRoute"],
    methods: {
        back() {
            setTimeout(() => this.$router.push({ name: this.backRoute }), 500)
        }
    }
}
</script>