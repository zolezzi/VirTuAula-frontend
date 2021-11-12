<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-card
      :title="newGame.name"
      img-src="../assets/newGame.png"
      img-alt="newGame"
      img-top
      style="max-width: 20rem"
      class="mb-2 virtuaula-card"
    >
      <b-card-text class="virtuaula-text">
        {{ newGame.description }}
      </b-card-text>
      <b-progress
        v-show="!this.$store.getters.getUser.isLeader()"
        :max="max"
        class="mb-3"
      >
        <b-progress-bar
          :value="newGame.progress === 0 ? 100 : value"
          :variant="newGame.progress === 0 ? 'secondary' : 'success'"
          show-progress
          :label="`${value}%`"
        ></b-progress-bar>
      </b-progress>

      <b-button
        href="#"
        variant="warning"
        class="m-auto"
        @click="enter()"
      >
        Enter
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardNewGame",
  data() {
    return {
      max: 100,
      timer: null,
      value: 0,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.value = this.newGame.progress;
    }, 500);
  },
  props: ["newGame", "hide"],
  methods: {
    enter() {
      this.$emit("update", true);
      this.$store.commit("addActualNewGame", this.newGame);
      setTimeout(() => this.$router.push({ name: "NewGame" }), 500);
    },
  },
};
</script>

<style scoped>
.virtuaula-card {
  height: 390px;
}

.virtuaula-text {
  height: 50px;
}
</style>