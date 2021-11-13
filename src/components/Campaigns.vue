<template>
  <div class="mt-3">
    <b-container>
      <b-row
        v-show="this.$store.getters.getUser.isLeader()"
        align-h="center"
        class="mb-4"
      >
        <b-button
          class="ml-1"
          variant="success"
          :class="
            hide ? 'animate__animated animate__zoomOut animate__faster' : ''
          "
          @click="addCampaign"
        >
          + Add Campaign</b-button
        >
        <b-button
          class="ml-1"
          variant="success"
          :class="
            hide ? 'animate__animated animate__zoomOut animate__faster' : ''
          "
          @click="addPlayers"
        >
          + Add Players to Game</b-button
        >
      </b-row>
      <b-row align-h="center">
        <div v-for="campaign in campaigns" :key="campaign.id">
          <CardCampaign :campaign="campaign" :hide="hide" @update="hideUpdate" />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardCampaign from "./CardCampaign.vue";
import campaignService from "../services/campaign-service";
export default {
  components: {
    CardCampaign,
  },
  props: ["newGameId"],
  data() {
    return {
      campaigns: [],
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    addCampaign() {
      this.hide = true;
      this.$parent.hide = true;
      setTimeout(() => this.$router.push({ name: "FormCampaign" }), 500);
    },
    addPlayers() {
      this.hide = true;
      this.$parent.hide = true;
      setTimeout(() => this.$router.push({ name: "FormPlayers" }), 500);
    },
  },
  async beforeCreate() {
    let response;
    if (this.$store.getters.getUser.isLeader()) {
      response = await campaignService.fetchCampaignsLeader(
        this.$store.getters.getActualNewGame.id,
        this.$store.getters.getUser.getToken()
      );
    } else {
      response = await campaignService.fetchCampaigns(
        this.$store.getters.getActualNewGame.id,
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      );
    }
    this.campaigns = response.data;
  },
};
</script>

<style scoped>
</style>