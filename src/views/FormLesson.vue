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
                  <b-button
                    class="virtuaula-button"
                    variant="warning"
                    @click="addTask"
                    >+ Add Task</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <template v-for="(task, index) in tasks">
          <b-card class="mt-2 ml-2 virtuaula-card" :key="index">
            <h2>Task {{ index + 1 }}</h2>
            <div class="virtuaula-task-info">
              <p>Statement: {{ task.statement }}</p>
              <p>Score: {{ task.score }}</p>
              <template v-for="(option, index) in task.options">
                <p :key="index">
                  Option {{ index + 1 }}: {{ option.responseValue }}
                </p>
              </template>
            </div>
          </b-card>
        </template>
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
      tasks: this.$store.getters.getNewTasks,
    };
  },
  computed: {
    completed() {
      return (
        this.name && this.note && this.$store.getters.getNewTasks.length > 0
      );
    },
  },
  methods: {
    create() {
      if (this.completed) {
        lessonService.create(
          this.$store.getters.getActualClassroom.id,
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId(),
          {
            name: this.name,
            maxNote: this.note,
            tasks: this.$store.getters.getNewTasks,
          }
        );
        this.hide = true;
        this.$store.commit("resetNewTasks");
        setTimeout(() => this.$router.push({ name: "Classroom" }), 500);
      }
    },
    addTask() {
      this.hide = true;
      setTimeout(() => this.$router.push({ name: "FormTask" }), 500);
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

.virtuaula-task-info{
  text-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>