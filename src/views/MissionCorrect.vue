<template>
  <div>
    <h2>
      Mission Correction of
      {{ this.$store.getters.getPlayerToCorrect.firstName }}
    </h2>
    <Back
      backRoute="PlayerCorrection"
      class="mb-2"
    />
    <Missions
      :campaignId="this.$store.getters.getCampaignToCorrect"
      class="animate__animated animate__zoomIn animate__faster"
      @send-note="receiveNote"
    />
    <b-container>
      <b-row align-h="center">
        <b-card class="mt-2 virtuaula-card">
          <label for="comment">Comment:</label>
          <b-form-textarea
            id="comment"
            v-model="comment"
            placeholder="Make a comment about mission..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <label class="mt-3" for="note">Note:</label>
          <b-form-select
            id="note"
            v-model="note"
            :options="options"
          ></b-form-select>
        </b-card>
      </b-row>
      <b-row align-h="center">
        <b-button
          :disabled="!comment && !note"
          class="mt-3"
          variant="success"
          @click="correct()"
          >Correct</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Missions from "../components/Missions.vue";
import Back from "../components/Back.vue";
import campaignService from "../services/campaign-service";
export default {
  data() {
    return {
      comment: "",
      note: undefined,
      options: []
    };
  },
  components: {
    Missions,
    Back
  },
  methods: {
    correct() {
      campaignService.correctMission(
        this.$store.getters.getCampaignToCorrect,
        this.$store.getters.getPlayerToCorrect.id,
        this.createPlayerMission(),
        this.$store.getters.getUser.getToken()
      )
      .then(() => setTimeout(() => this.$router.push({ name: "Teams" }), 500))
      .catch((error) => console.log(error));
    },
    createPlayerMission() {
        let mission = this.$store.getters.getPendingMissionToCorrect;
        return {
            id: mission.id,
            statement: mission.statement,
            options: mission.options,
            score: this.note,
            answer: mission.answer,
            missionTypeId: mission.missionTypeId,
            story: mission.story,
            comment: this.comment,
            state: "COMPLETED"
        }
    },
    receiveNote(note) {
      let optionsNote = [];
      for (let i = 0; i <= note; i++) {
        optionsNote.push({ value: i, text: i });
      }
      this.options = optionsNote;
    }
  },
};
</script>

<style scoped>
.virtuaula-card {
  width: 30rem;
  height: 15rem;
}
</style>