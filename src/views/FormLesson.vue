<template>
  <div class="animate__animated animate__zoomIn animate__faster">
    <b-container>
      <b-row align-h="center">
        <h2>Add a Lesson</h2>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card style="width:400px;">
          <b-form>
            <label for="virtuaula-lesson-name">Lesson Name</label>
            <b-input
              id="virtuaula-lesson-name"
              v-model="name"
              placeholder="Lesson name"
            ></b-input>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center">
        <b-button variant="success" :disabled="!name" @click="create"
          >Create</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import lessonService from "../services/lesson-service";

export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    create() {
      let lesson = { name: this.name };
      lessonService.create(
        this.$store.getters.getActualClassroom.id,
        this.$store.getters.getUser.token,
        this.$store.getters.getUser.account.accountId,
        lesson
      );
      setTimeout(() => this.$router.push({ name: "Classroom" }), 500);
    },
  },
};
</script>

<style scoped>
</style>