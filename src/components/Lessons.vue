<template>
  <div class="mt-3">
    <b-container>
      <b-row
        v-show="
          this.$store.getters.getUser.account.accountType.name === 'TEACHER'
        "
        align-h="center"
        class="mb-4"
      >
        <b-button
          variant="success"
          :class="
            hide ? 'animate__animated animate__zoomOut animate__faster' : ''
          "
          @click="addLesson"
        >
          + Add Lesson</b-button
        >
      </b-row>
      <b-row align-h="center">
        <div
          v-for="lesson in lessons"
          :key="lesson.id"
        >
          <CardLesson :lesson="lesson" :hide="hide" @update="hideUpdate" />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardLesson from "./CardLesson.vue";
import lessonService from "../services/lesson-service"
export default {
  components: {
    CardLesson,
  },
  props: ["classroomId"],
  data() {
    return {
      lessons: [],
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    addLesson() {
      this.hide = true;
      this.$parent.hide = true;
      setTimeout(() => this.$router.push({ name: "FormLesson" }), 500);
    },
  },
  async beforeCreate() {
    let response = await lessonService.fetchLessons(
      this.$store.getters.getActualClassroom.id,
      this.$store.getters.getUser.token
    );
    this.lessons = response.data;
  },
};
</script>

<style scoped>
</style>