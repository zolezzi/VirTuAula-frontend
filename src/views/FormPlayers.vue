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
        <h2>
          {{ "Add Players to " + this.$store.getters.getActualNewGame.name }}
        </h2>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-form>
            <b-container>
              <b-row class="mt-3">
                <label class="virtuaula-label" for="virtuaula-players"
                  >Select Players</label
                >
                <b-form-select
                  id="virtuaula-players"
                  v-model="playersSelected"
                  :options="players"
                  multiple
                  :select-size="20"
                ></b-form-select>
              </b-row>
            </b-container>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center">
        <b-button variant="success" :disabled="!completed" @click="assing"
          >Assing</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>
<script>
import newGameService from "../services/new-game-service";
import accountService from "../services/account-service";

export default {
  data() {
    return {
      hide: false,
      players: [],
      playersSelected: [],
    };
  },
  computed: {
    completed() {
      return this.playersSelected.length > 0;
    },
  },
  methods: {
    assing() {
      if (this.completed) {
        newGameService.assignPlayerToNewGame(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getActualNewGame.id,
          this.$store.getters.getUser.getAccountId(),
          this.playersSelected
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
.virtuaula-card {
  width: 30rem;
  height: 30rem;
}

.virtuaula-label {
  float: left;
}

@media (max-width: 600px) {
  .virtuaula-card {
    width: 22rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }
}

@media (max-width: 400px) {
  .virtuaula-card {
    width: 18rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }
}
</style>