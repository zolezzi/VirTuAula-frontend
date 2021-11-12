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
          @click="addNewGame"
        >
          + Add New Game</b-button
        >
      </b-row>
      <b-row align-h="center">
        <div v-for="newGame in newGames" :key="newGame.id">
          <b-col>
            <CardNewGame
              :newGame="newGame"
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
  name: "NewGames",
  components: {
    CardNewGame,
  },
  data() {
    return {
      newGames: [],
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    addNewGame() {
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
    this.newGames = response.data;
  },
};
</script>

<style scoped>
</style>