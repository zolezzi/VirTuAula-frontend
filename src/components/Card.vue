<template>
  <div>
    <b-card
      :title="classroomName"
      img-src="../assets/classroom.png"
      img-alt="classroom"
      img-top
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>
      <b-progress :max="max" class="mb-3">
        <b-progress-bar :value="value" variant="success" show-progress :label="`${((value / max) * 100)}%`"></b-progress-bar>
      </b-progress>

      <b-button href="#" variant="warning" class="m-auto">Ingresar</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
    name: "Card",
    data() {
      return {
        max: 100,
        timer: null,
        value: 0
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.value = this.progress;
      }, 500)
    },
    props: ['classroomName', 'progress']
}
</script>

<style scoped>

</style>