<template>
  <div>
    <h2>
      Player {{ this.$store.getters.getPlayerToCorrect.firstName }} Correction
    </h2>
    <b-container class="mt-4">
      <b-row align-h="center">
        <div v-for="campaign in campaigns" :key="campaign.id">
          <CardCampaign
            :campaign="campaign"
            :hide="hide"
            @update="hideUpdate"
          />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import campaignService from "../services/campaign-service";
import CardCampaign from "../components/CardCampaign.vue";

export default {
  components: {
    CardCampaign,
  },
  data() {
    return {
      hide: false,
      campaigns: [],
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
  },
  async beforeCreate() {
    let response;
    response = await campaignService.fetchCampaigns(
      this.$store.getters.getTeamForCorrection,
      this.$store.getters.getUser.getToken(),
      this.$store.getters.getPlayerToCorrect.id
    );
    this.campaigns = response.data;
  },
};
</script>