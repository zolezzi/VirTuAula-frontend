<template>
  <div
    :class="
      hide
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster'
    "
  >
    <b-container>
      <h2>Add a Mission</h2>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-row class="mr-1 ml-1">
            <b-form-select
              v-model="missionTypeSelected"
              :options="missionTypes"
            ></b-form-select>
          </b-row>
          <b-row>
            <b-col class="virtuaula-column">
              <label class="mt-2 virtuaula-label" for="virtuaula-mission-score"
                >Mission score</label
              >
              <b-input
                id="virtuaula-mission-score"
                type="number"
                v-model="score"
                placeholder="Mission score"
              ></b-input>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col class="virtuaula-column">
              <label class="mt-2 virtuaula-label" for="virtuaula-mission-statement"
                >Mission statement</label
              >
              <b-input
                id="virtuaula-mission-statement"
                v-model="statement"
                placeholder="Mission statement"
              ></b-input>
            </b-col>
          </b-row>
          <template v-if="missionTypeSelected === 1">
            <b-button @click="addOption" variant="success" class="mt-4">
              + Add Option</b-button
            >
            <template v-for="(option, index) in options">
              <div :key="index">
                <b-row>
                  <b-col cols="12">
                    <label
                      class="mt-3 virtuaula-label"
                      :for="'virtuaula-mission-option-' + index"
                      >Option {{ index + 1 }}</label
                    >
                  </b-col>
                  <b-col cols="10">
                    <b-input
                      :id="'virtuaula-mission-option-' + index"
                      :placeholder="'Option' + (index + 1)"
                      class="mt-1"
                      v-model="option.responseValue"
                    ></b-input>
                  </b-col>
                  <b-col cols="2">
                    <b-form-checkbox
                      :id="'option-' + index"
                      v-model="option.isCorrect"
                      :name="'option' + index"
                      class="mt-2"
                      :disabled="aCheckIsSelected && !option.isCorrect"
                    >
                    </b-form-checkbox>
                  </b-col>
                </b-row>
              </div>
            </template>
          </template>
          <b-row v-show="this.allComplete()" class="mt-3" align-h="center"
            ><b-button
              variant="warning"
              :disabled="!this.allComplete()"
              @click="add"
              >Add</b-button
            ></b-row
          >
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import missionTypesService from "../services/mission-types";

export default {
  data() {
    return {
      hide: false,
      statement: "",
      score: undefined,
      options: [],
      missionTypes: [],
      missionTypeSelected: null,
      story: "",
    };
  },
  computed: {
    aCheckIsSelected() {
      return this.options.some((option) => option.isCorrect);
    },
  },
  methods: {
    add() {
      if (this.allComplete()) {
        this.$store.commit("addNewMission", this.getNewMission());
        setTimeout(() => this.$router.push({ name: "FormCampaign" }), 500);
      }
    },
    getNewMission() {
      if(this.missionTypeSelected === 1) {
        return {
          statement: this.statement,
          score: this.score,
          options: this.options,
          missionTypeId: this.missionTypeSelected,
        }
      } else {
        return {
          statement: this.statement,
          score: this.score,
          options: [{ responseValue: "Story", isCorrect: true }],
          missionTypeId: this.missionTypeSelected,
        }
      }
    },
    addOption() {
      this.options.push({ responseValue: "", isCorrect: false });
    },
    allComplete() {
      return (
        (this.missionTypeSelected === 1 &&
          this.options.length > 0 &&
          this.options.every((option) => option.responseValue) &&
          this.statement &&
          this.score &&
          this.aCheckIsSelected) ||
        (this.missionTypeSelected == 2 && this.statement && this.score)
      );
    },
  },
  mounted() {
    missionTypesService
      .fetchMissionsTypes(this.$store.getters.getUser.getToken())
      .then((response) => {
        this.missionTypes = response.data.map((missionType) => {
          return { value: missionType.id, text: missionType.name };
        });
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.virtuaula-card {
  width: 30rem;
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

.virtuaula-label {
  float: left;
}

.virtuaula-options {
  margin-left: 0.3%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.virtuaula-option-check {
  display: flex;
  flex-direction: column;
}
</style>