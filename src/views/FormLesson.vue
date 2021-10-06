<template>
  <div :class="hide ? 'animate__animated animate__zoomOut animate__faster' :'animate__animated animate__zoomIn animate__faster'">
    <b-container>
      <b-row align-h="center">
        <h2>Add a Lesson</h2>
      </b-row>
      <CardFormLesson />
      <b-row align-h="center">
        <b-button variant="success" :disabled="!this.$store.getters.getNewLesson.name" @click="create"
          >Create</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import lessonService from "../services/lesson-service";
import CardFormLesson from "../components/CardFormLesson.vue";

export default {
  name: "FormLesson",
  components: {
    CardFormLesson,
  },
  data() {
    return {
      hide: false
    };
  },
  methods: {
    create() {
      lessonService.create(
        this.$store.getters.getActualClassroom.id,
        this.$store.getters.getUser.token,
        this.$store.getters.getUser.account.accountId,
        this.$store.getters.getNewLesson
      );
      this.$store.commit("addNewLesson", {});
      this.hide = true;
      setTimeout(() => this.$router.push({ name: "Classroom" }), 500);
    },
  },
};
</script>

<style scoped>
</style>