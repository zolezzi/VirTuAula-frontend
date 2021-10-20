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
                  v-model="name"
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
                    v-model="description"
                    placeholder="Classroom Description"
                    rows="8"
                  ></b-form-textarea>
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

export default {
  data() {
    return {
      hide: false,
      name: "",
      description: "",
    };
  },
  computed: {
    completed() {
      return (
        this.name && this.description
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
            name: this.name,
            description: this.description,
          }
        );
        this.hide = true;
        setTimeout(() => this.$router.push({ name: "Home" }), 500);
      }
    },
  }
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