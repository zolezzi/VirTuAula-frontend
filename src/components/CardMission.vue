<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-col>
      <b-container>
        <b-row>
          <b-col>
            <b-card :title="mission.statement" class="mb-3 virtuaula-card">
              <template v-if="mission.missionTypeId === 1">
                <b-form-group class="virtuaula-group">
                  <b-form-radio-group
                    class="virtuaula-options"
                    stacked
                    v-model="selected"
                    :disabled="(disabled === 100 || isLeader) && !this.$store.getters.getRedo"
                    :options="options"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </template>
              <template
                v-if="
                  (mission.missionTypeId === 2 &&
                    !this.$store.getters.getUser.isLeader()) ||
                  (mission.missionTypeId === 2 &&
                    this.$store.getters.getUser.isLeader() &&
                    (currentRouteName === 'MissionCorrect' ||
                      currentRouteName === 'MissionCheck'))
                "
              >
                <label class="mt-2 virtuaula-label" for="virtuaula-story"
                  >Tell a Story</label
                >
                <b-form-textarea
                  id="virtuaula-story"
                  v-model="storyWrited"
                  placeholder="Tell a story..."
                  rows="3"
                  max-rows="6"
                  :disabled="
                    (this.$store.getters.getUser.isLeader() &&
                      currentRouteName === 'MissionCorrect') ||
                    currentRouteName === 'MissionCheck'
                  "
                ></b-form-textarea>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      max: 100,
      options: this.mission.options.map((option) => {
        return { text: option.responseValue, value: option.id };
      }),
      timer: null,
      selected:
        this.$store.getters.getUser.isLeader() &&
        this.$route.name !== "MissionCheck"
          ? this.mission.correctAnswer
          : this.$store.getters.getRedo
          ? undefined
          : this.mission.answer,
      disabled: this.$store.getters.getActualCampaign.progress,
      isLeader: this.$store.getters.getUser.isLeader(),
      storyWrited: this.$store.getters.getRedo
        ? ""
        : this.mission.story
        ? this.mission.story
        : "",
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  props: ["mission", "hide"],
  watch: {
    selected(newSelected) {
      if (newSelected) {
        this.mission.answer = this.selected;
        this.$store.commit("addMissionResponse", {
          id: this.mission.id,
          answerId: newSelected,
        });
      }
    },
    storyWrited(newStory) {
      if (newStory) {
        this.mission.answer = this.options[0].value;
        this.$store.commit("addMissionResponse", {
          id: this.mission.id,
          answerId: this.options[0].value,
          story: newStory,
        });
      }
    },
  },
};
</script>

<style scoped>
.virtuaula-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.virtuaula-options {
  text-align: start;
}

.virtuaula-card {
  width: 30rem;
  height: 15rem;
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