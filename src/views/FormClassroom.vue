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
        <h2>Add a Classroom</h2>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-form>
            <b-container>
              <b-row>
                <label class="virtuaula-label" for="virtuaula-classroom-name"
                  >Classroom Name</label
                >
                <b-input
                  id="virtuaula-classroom-name"
                  v-model="classroom.name"
                  placeholder="Classroom name"
                ></b-input>
              </b-row>
              <b-row class="mt-3">
                <label
                  class="virtuaula-label"
                  for="virtuaula-classroom-description"
                  >Classroom Description</label
                >
                <b-form-textarea
                  id="virtuaula-classroom-description"
                  v-model="classroom.description"
                  placeholder="Classroom Description"
                  rows="8"
                ></b-form-textarea>
              </b-row>
              <b-row class="mt-3">
                <label class="virtuaula-label" for="virtuaula-students"
                  >Students</label
                >
                <b-form-select
                  id="virtuaula-students"
                  v-model="studentsSelected"
                  :options="students"
                  multiple
                  :select-size="4"
                ></b-form-select>
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
import classroomService from "../services/classroom-service";
import accountService from "../services/account-service";

export default {
  data() {
    return {
      hide: false,
      classroom: {
        name: "",
        description: "",
      },
      students: [],
      studentsSelected: [],
    };
  },
  computed: {
    completed() {
      return (
        this.classroom.name &&
        this.classroom.description &&
        this.studentsSelected.length > 0
      );
    },
  },
  methods: {
    create() {
      if (this.completed) {
        classroomService.createClassroom(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId(),
          {
            newGame: this.classroom,
            players: this.studentsSelected
          }
        );
        this.hide = true;
        setTimeout(() => this.$router.push({ name: "Home" }), 500);
      }
    },
  },
  mounted() {
    accountService
      .getStudents(
        this.$store.getters.getUser.getToken(),
        this.$store.getters.getUser.getAccountId()
      )
      .then(
        (response) =>
          (this.students = response.data.map((student) => {
            return { value: student.id, text: student.username };
          }))
      )
      .catch((error) => console.log(error));
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
</style>