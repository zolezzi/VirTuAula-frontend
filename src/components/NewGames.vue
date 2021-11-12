<template>
  <div>
    <b-container>
      <b-row
        v-show="this.$store.getters.getUser.isLeader()"
        align-h="center"
        class="mb-4 mt-3"
      >
        <b-button
          variant="success"
          :class="
            hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__zoomIn animate__faster'
          "
          @click="addClassroom"
        >
          + Add Classroom</b-button
        >
      </b-row>
      <b-row align-h="center">
        <div v-for="classroom in classrooms" :key="classroom.id">
          <b-col>
            <CardNewGame
              :classroom="classroom"
              :hide="hide"
              @update="hideUpdate"
              class="animate__animated animate__zoomIn animate__faster"
            />
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardNewGame from "./CardNewGame.vue";
import newGameService from "../services/new-game-service";
export default {
  name: "Classrooms",
  components: {
    CardNewGame,
  },
  data() {
    return {
      classrooms: [],
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    addClassroom() {
      this.hide = true;
      this.$parent.hide = true;
      setTimeout(() => this.$router.push({ name: "FormNewGame" }), 500);
    },
  },
  async beforeCreate() {
    let response = await newGameService.fetchNewGames(
      this.$store.getters.getUser.getToken(),
      this.$store.getters.getUser.getAccountId()
    );
    this.classrooms = response.data;
  },
};
</script>

<style scoped>
</style>