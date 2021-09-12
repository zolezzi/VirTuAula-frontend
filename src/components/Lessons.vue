<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div v-for="lesson in this.$store.getters.getLessons(classroomId)" :key="lesson.id">
          <CardLesson :lesson="lesson" />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardLesson from "./CardLesson.vue";
export default {
  components: {
    CardLesson,
  },
  props: ['classroomId']
};
</script>

<style scoped>
</style>