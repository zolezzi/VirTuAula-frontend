<template>
  <div>
    <b-card class="virtuaula-width" :title="team.name">
      <b-table striped hover :fields="fields" :items="players">
        <template #cell(actions)="row">
          <b-button size="sm" @click="correct(row.item)" class="mr-1">
            Correct
          </b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["team"],
  data() {
    return {
      fields: [
        { key: "username", label: "Username" },
        { key: "firstName", label: "First Name" },
        { key: "level", label: "Level" },
        { key: "experience", label: "Experience" },
        { key: "progress", label: "Progress" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  computed: {
    players() {
      return this.team.playerAccounts.map((player) => {
        return {
          id: player.id,
          username: player.username,
          firstName: player.firstName,
          level: player.level.name,
          experience: player.experience + " points",
          progress: player.progress + "%",
        };
      });
    },
  },
  methods: {
    correct(item) {
      this.$store.commit("addTeamForCorrection", this.team.id);
      this.$store.commit("addPlayerToCorrect", item);
      setTimeout(() => this.$router.push({ name: "PlayerCorrection" }), 500);
    },
  },
};
</script>

<style scoped>
.virtuaula-width {
  width: 700px !important;
}
</style>