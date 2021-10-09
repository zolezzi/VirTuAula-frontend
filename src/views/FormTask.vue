<template>
  <div
    :class="
      hide
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster'
    "
  >
    <b-container>
      <h2>Add a Task</h2>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-row>
            <b-col class="virtuaula-column">
              <label class="mt-2 virtuaula-label" for="virtuaula-task-score"
                >Task score</label
              >
              <b-input
                id="virtuaula-task-score"
                type="number"
                v-model="score"
                placeholder="Task score"
              ></b-input>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col class="virtuaula-column">
              <label class="mt-2 virtuaula-label" for="virtuaula-task-statement"
                >Task statement</label
              >
              <b-input
                id="virtuaula-task-statement"
                v-model="statement"
                placeholder="Task statement"
              ></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12"
              ><label class="mt-3 virtuaula-label" for="virtuaula-task-option-1"
                >Option 1</label
              ></b-col
            >
            <b-col cols="10">
              <b-input
                id="virtuaula-task-option-1"
                placeholder="Option 1"
                class="mt-1"
                v-model="option1"
              ></b-input>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="option-1"
                v-model="check1"
                name="option-1"
                class="mt-2"
                :disabled="aCheckIsSelected && !check1"
              >
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <label class="mt-2 virtuaula-label" for="virtuaula-task-option-2"
                >Option 2</label
              >
            </b-col>
            <b-col cols="10">
              <b-input
                id="virtuaula-task-option-2"
                placeholder="Option 2"
                class="mt-2"
                v-model="option2"
              ></b-input>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="option-2"
                v-model="check2"
                name="option-2"
                class="mt-3"
                :disabled="aCheckIsSelected && !check2"
              >
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <label class="mt-2 virtuaula-label" for="virtuaula-task-option-3"
                >Option 3</label
              >
            </b-col>
            <b-col cols="10">
              <b-input
                id="virtuaula-task-option-3"
                placeholder="Option 3"
                class="mt-2"
                v-model="option3"
              ></b-input>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="option-3"
                v-model="check3"
                name="option-3"
                class="mt-3"
                :disabled="aCheckIsSelected && !check3"
              >
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <label class="mt-2 virtuaula-label" for="virtuaula-task-option-4"
                >Option 4</label
              >
            </b-col>
            <b-col cols="10">
              <b-input
                id="virtuaula-task-option-4"
                placeholder="Option 4"
                class="mt-2"
                v-model="option4"
              ></b-input>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="option-4"
                v-model="check4"
                name="option-4"
                class="mt-3"
                :disabled="aCheckIsSelected && !check4"
              >
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="mt-3" align-h="center"
            ><b-button
              variant="warning"
              :disabled="
                !(
                  this.option1 &&
                  this.option2 &&
                  this.option3 &&
                  this.option4 &&
                  this.statement &&
                  this.score
                  && this.aCheckIsSelected
                )
              "
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
export default {
  data() {
    return {
      hide: false,
      statement: "",
      score: undefined,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    };
  },
  computed: {
    aCheckIsSelected() {
      return this.check1 || this.check2 || this.check3 || this.check4;
    },
  },
  methods: {
    add() {
      if (this.allComplete()) {
        this.$store.commit("addNewTask", {
          statement: this.statement,
          score: this.score,
          options: [
            { responseValue: this.option1, isCorrect: this.check1 },
            { responseValue: this.option2, isCorrect: this.check2 },
            { responseValue: this.option3, isCorrect: this.check3 },
            { responseValue: this.option4, isCorrect: this.check4 },
          ],
        });
        setTimeout(() => this.$router.push({ name: "FormLesson" }), 500);
      }
    },
    allComplete() {
      return (
        this.option1 &&
        this.option2 &&
        this.option3 &&
        this.option4 &&
        this.statement &&
        this.score &&
        this.aCheckIsSelected
      );
    },
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