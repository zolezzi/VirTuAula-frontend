<template>
  <div>
    <h2
      :class="
        hide
          ? 'animate__animated animate__zoomOut animate__faster'
          : 'animate__animated animate__bounceInDown animate__faster'
      "
    >
      Teams
    </h2>
    <b-container>
      <template v-for="(team, index) in teams">
        <b-row class="justify-content-md-center mt-4" :key="index">
          <Team :team="team" />
        </b-row>
      </template>
    </b-container>
  </div>
</template>

<script>
import teamsService from "../services/teams";
import Team from "../components/Team.vue";

export default {
  data() {
    return {
      hide: false,
      teams: [],
    };
  },
  components: {
    Team,
  },
  mounted() {
    teamsService
      .fetchTeams(
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      )
      .then((response) => (this.teams = response.data))
      .catch((error) => console.error(error));
  },
};
</script>