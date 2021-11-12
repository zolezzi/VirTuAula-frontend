<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div v-for="task in this.tasks" :key="task.id">
          <CardMission :task="task" :hide="hide" />
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
            :disabled="disabled === 100 || complete"
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
  props: ["lessonId"],
  data() {
    return {
      tasks: [],
      hide: false,
      disabled: this.$store.getters.getActualLesson.progress,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    send() {
      campaignService
        .completeMission(
          this.$store.getters.getActualClassroom.id,
          this.lessonId,
          this.$store.getters.getTasksResponse,
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then(() => {
          accountService
            .getExperience(
              this.$store.getters.getUser.getToken(),
              this.$store.getters.getUser.getAccountId()
            )
            .then((response) =>
              this.$store.getters.getUser.setExperience(response.data)
            );
        });

      this.hideUpdate(true);
      setTimeout(() => this.$router.push({ name: "NewGame" }), 500);
    },
  },
  computed: {
    complete() {
      return this.tasks.length !== this.$store.getters.getTasksResponse.length;
    },
  },
  async beforeCreate() {
    if (this.$store.getters.getUser.isLeader()) {
      let response = await missionService.fetchMissionsLeader(
        this.$store.getters.getActualLesson.id,
        this.$store.getters.getUser.getAccountId(),
        this.$store.getters.getUser.getToken()
      );
      this.tasks = response.data;
    } else {
      let response = await missionService.fetchMissions(
        this.$store.getters.getActualLesson.id,
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      );
      this.tasks = response.data;
    }
  },
};
</script>

<style scoped>
</style>