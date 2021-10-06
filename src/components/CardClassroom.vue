<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-card
      :title="classroom.name"
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
      <b-progress v-show="this.$store.getters.getUser.account.accountType.name !== 'TEACHER'" :max="max" class="mb-3">
        <b-progress-bar
          :value="classroom.progress === 0 ? 100 : value"
          :variant="classroom.progress === 0 ? 'secondary': 'success'"
          show-progress
          :label="`${value}%`"
        ></b-progress-bar>
      </b-progress>

      <b-button href="#" variant="warning" class="m-auto" @click="enter()"
        >Enter</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardClassroom",
  data() {
    return {
      max: 100,
      timer: null,
      value: 0,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.value = this.classroom.progress;
    }, 500);
  },
  props: ["classroom", "hide"],
  methods: {
    enter() {
      this.$emit("update", true);
      this.$store.commit("addActualClassroom", this.classroom);
      setTimeout( () => this.$router.push({ name: "Classroom" }), 500);
    },
  },
};
</script>

<style scoped>
</style>