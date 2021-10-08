<template>
  <div
    :class="
      hide
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster'
    "
  >
    <b-container>
      <b-row align-h="center">
        <h2>Add a Lesson</h2>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-form>
            <b-container>
              <b-row>
                <label class="virtuaula-label" for="virtuaula-lesson-name"
                  >Lesson Name</label
                >
                <b-input
                  id="virtuaula-lesson-name"
                  v-model="name"
                  placeholder="Lesson name"
                ></b-input>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="8" class="virtuaula-column">
                  <label class="virtuaula-label" for="virtuaula-lesson-note"
                    >Max Note</label
                  >
                  <b-input
                    type="number"
                    id="virtuaula-lesson-note"
                    v-model="note"
                    placeholder="Lesson note"
                  ></b-input>
                </b-col>
                <b-col>
                  <b-button class="virtuaula-button" variant="warning"
                    >+ Add Task</b-button
                  >
                </b-col>
              </b-row>
              <b-row class="mt-4 virtuaula-separator">
                <b-col class="virtuaula-column">
                  <label
                    class="mt-2 virtuaula-label"
                    for="virtuaula-task-statement"
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
              <b-row>
                <b-form-group>
                  <label
                    class="mt-2 virtuaula-label"
                    for="virtuaula-task-option-1"
                    >Option 1</label
                  >
                  <b-input
                    id="virtuaula-task-option-1"
                    placeholder="Option 1"
                    class="mt-2"
                    v-model="option1"
                  ></b-input>
                  <label
                    class="mt-2 virtuaula-label"
                    for="virtuaula-task-option-2"
                    >Option 2</label
                  >
                  <b-input
                    id="virtuaula-task-option-2"
                    placeholder="Option 2"
                    class="mt-2"
                    v-model="option2"
                  ></b-input>
                  <label
                    class="mt-2 virtuaula-label"
                    for="virtuaula-task-option-3"
                    >Option 3</label
                  >
                  <b-input
                    id="virtuaula-task-option-3"
                    placeholder="Option 3"
                    class="mt-2"
                    v-model="option3"
                  ></b-input>
                  <label
                    class="mt-2 virtuaula-label"
                    for="virtuaula-task-option-4"
                    >Option 4</label
                  >
                  <b-input
                    id="virtuaula-task-option-4"
                    placeholder="Option 4"
                    class="mt-2"
                    v-model="option4"
                  ></b-input>
                </b-form-group>
              </b-row>
            </b-container>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center">
        <b-button variant="success" :disabled="!completed" @click="create"
          >Create</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import lessonService from "../services/lesson-service";

export default {
  name: "FormLesson",
  data() {
    return {
      hide: false,
      name: "",
      note: undefined,
      statement: "",
      score: undefined,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    };
  },
  computed: {
    completed() {
      return (
        this.name &&
        this.note &&
        this.statement &&
        this.score &&
        this.option1 &&
        this.option2 &&
        this.option3 &&
        this.option4
      );
    },
  },
  methods: {
    create() {
      if (this.completed) {
        lessonService.create(
          this.$store.getters.getActualClassroom.id,
          this.$store.getters.getUser.token,
          this.$store.getters.getUser.account.accountId,
          {
            name: this.name,
            maxNote: this.note,
            tasks: [
              {
                statement: this.statement,
                score: this.score,
                options: [
                  { responseValue: this.option1 },
                  { responseValue: this.option2 },
                  { responseValue: this.option3 },
                  { responseValue: this.option4 },
                ],
              },
            ],
          }
        );
        this.hide = true;
        setTimeout(() => this.$router.push({ name: "Classroom" }), 500);
      }
    },
  },
};
</script>

<style scoped>
.virtuaula-label {
  float: left;
}

.virtuaula-card {
  width: 30rem;
}

.virtuaula-button {
  margin-top: 27%;
}

.virtuaula-column {
  padding: 0;
}

@media (max-width: 600px) {
  .virtuaula-card {
    width: 22rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }
}

@media (max-width: 400px) {
  .virtuaula-card {
    width: 18rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.virtuaula-separator {
  border-top: 2px #c1c1c1 solid;
}
</style>