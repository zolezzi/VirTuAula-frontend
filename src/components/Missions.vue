<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div v-for="mission in this.missions" :key="mission.id">
          <CardMission :mission="mission" :hide="hide" />
        </div>
      </b-row>
      <b-row
        v-show="!this.$store.getters.getUser.isLeader()"
        align-h="center"
        :class="
          hide ? 'animate__animated animate__zoomOut animate__faster' : ''
        "
      >
        <b-col
          ><b-button
            variant="success"
            @click="send"
            :disabled="
              (disabled === 100 || complete) && !this.$store.getters.getRedo
            "
            >Send</b-button
          ></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardMission from "./CardMission.vue";
import campaignService from "../services/campaign-service";
import missionService from "../services/mission-service";
import accountService from "../services/account-service";

export default {
  components: {
    CardMission,
  },
  props: ["campaignId"],
  data() {
    return {
      missions: [],
      hide: false,
      disabled: this.$store.getters.getActualCampaign.progress,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    send() {
      if (this.$store.getters.getRedo) {
        this.redo();
      } else {
        this.completeCampaign();
      }
    },
    redo() {
      campaignService
        .redoMission(
          this.campaignId,
          this.$store.getters.getUser.getAccountId(),
          this.$store.getters.getMissionsResponse,
          this.$store.getters.getUser.getToken()
        )
        .then(() => {
          this.$store.commit("redo", false);
          accountService
            .getExperience(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) =>
              this.$store.getters.getUser.setExperience(response.data)
            );
        })
        .then(() => {
          accountService
            .getLevel(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) =>
              this.$store.getters.getUser.setLevel(response.data)
            );
        })
        .then(() => {
          accountService
            .getLifes(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) => this.$store.commit("addLifes", response.data))
            .catch((error) => console.log(error));
        });

      this.hideUpdate(true);
      setTimeout(() => this.$router.push({ name: "NewGame" }), 500);
    },
    completeCampaign() {
      campaignService
        .completeMission(
          this.$store.getters.getActualNewGame.id,
          this.campaignId,
          this.$store.getters.getMissionsResponse,
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then(() => {
          this.$store.commit("redo", false);
          accountService
            .getExperience(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) =>
              this.$store.getters.getUser.setExperience(response.data)
            );
        })
        .then(() => {
          accountService
            .getLevel(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) =>
              this.$store.getters.getUser.setLevel(response.data)
            );
        });

      this.hideUpdate(true);
      setTimeout(() => this.$router.push({ name: "NewGame" }), 500);
    },
    sendMissionPendingNote(missions) {
      let pendingMission = missions.find(
        (mission) => mission.state === "PENDING"
      );
      if (pendingMission) {
        this.$store.commit("addPendingMission", pendingMission);
        this.$emit("send-note", pendingMission.score);
      }
    },
  },
  computed: {
    complete() {
      return (
        this.missions.length !== this.$store.getters.getMissionsResponse.length
      );
    },
  },
  async beforeCreate() {
    if (
      this.$store.getters.getUser.isLeader() &&
      this.$route.name !== "MissionCorrect" &&
      this.$route.name !== "MissionCheck"
    ) {
      let response = await missionService.fetchMissionsLeader(
        this.$store.getters.getActualCampaign.id,
        this.$store.getters.getUser.getAccountId(),
        this.$store.getters.getUser.getToken()
      );
      this.missions = response.data;
    } else if (
      (this.$store.getters.getUser.isLeader() &&
        this.$route.name === "MissionCorrect") ||
      this.$route.name === "MissionCheck"
    ) {
      let response = await missionService.fetchMissions(
        this.$store.getters.getCampaignToCorrect,
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getPlayerToCorrect.id
      );
      this.sendMissionPendingNote(response.data);
      this.missions = response.data;
    } else {
      let response = await missionService.fetchMissions(
        this.$store.getters.getActualCampaign.id,
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      );
      this.missions = response.data;
    }
  },
};
</script>

<style scoped>
</style>