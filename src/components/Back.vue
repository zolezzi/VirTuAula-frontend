<template>
    <div>
        <b-button variant="success" @click="back()">Back</b-button>
    </div>
</template>

<script>
export default {
    props: ["backRoute", "redo"],
    methods: {
        back() {
            this.$store.commit("redo", this.redo);
            setTimeout(() => this.$router.push({ name: this.backRoute }), 500)
        }
    }
}
</script>