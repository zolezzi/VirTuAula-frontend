<template>
  <div
    :class="
      hide
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster'
    "
  >
    <b-container>
      <b-row align-h="center">
        <h2>Add a New Game</h2>
      </b-row>
      <b-row align-h="center">
        <Back
          backRoute="Home"
          class="mb-2"
          :class="
            hide
              ? 'animate__animated animate__zoomOut animate__faster'
              : 'animate__animated animate__bounceInDown animate__faster'
          "
        />
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-form>
            <b-container>
              <b-row>
                <label class="virtuaula-label" for="virtuaula-new-game-name"
                  >New Game Name</label
                >
                <b-input
                  id="virtuaula-new-game-name"
                  v-model="newGame.name"
                  placeholder="New Game Name"
                ></b-input>
              </b-row>
              <b-row class="mt-3">
                <label
                  class="virtuaula-label"
                  for="virtuaula-new-game-description"
                  >New Game Description</label
                >
                <b-form-textarea
                  id="virtuaula-new-game-description"
                  v-model="newGame.description"
                  placeholder="New Game Description"
                  rows="8"
                ></b-form-textarea>
              </b-row>
              <b-row class="mt-3">
                <label class="virtuaula-label" for="virtuaula-players"
                  >Players</label
                >
                <b-form-select
                  id="virtuaula-players"
                  v-model="playersSelected"
                  :options="players"
                  multiple
                  :select-size="4"
                ></b-form-select>
              </b-row>
            </b-container>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center">
        <b-button variant="success" :disabled="!completed" @click="create"
          >Create</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import newGameService from "../services/new-game-service";
import accountService from "../services/account-service";
import Back from "../components/Back.vue";

export default {
  components: {
    Back
  },
  data() {
    return {
      hide: false,
      newGame: {
        name: "",
        description: "",
      },
      players: [],
      playersSelected: [],
    };
  },
  computed: {
    completed() {
      return (
        this.newGame.name &&
        this.newGame.description &&
        this.playersSelected.length > 0
      );
    },
  },
  methods: {
    create() {
      if (this.completed) {
        newGameService.createNewGame(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId(),
          {
            newGame: this.newGame,
            players: this.playersSelected,
          }
        );
        this.hide = true;
        setTimeout(() => this.$router.push({ name: "Home" }), 500);
      }
    },
  },
  mounted() {
    accountService
      .getPlayers(
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      )
      .then(
        (response) =>
          (this.players = response.data.map((player) => {
            return { value: player.id, text: player.username };
          }))
      )
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.virtuaula-label {
  float: left;
}

.virtuaula-card {
  width: 30rem;
}

.virtuaula-button {
  margin-top: 27%;
}

.virtuaula-column {
  padding: 0;
}

@media (max-width: 600px) {
  .virtuaula-card {
    width: 22rem;
  }
}

@media (max-width: 400px) {
  .virtuaula-card {
    width: 18rem;
  }
}
</style>