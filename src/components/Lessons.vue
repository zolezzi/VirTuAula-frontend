<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div v-for="lesson in this.$store.getters.getLessons(classroomId)" :key="lesson.id">
          <CardLesson :lesson="lesson" :hide="hide" @update="hideUpdate" />
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
  props: ['classroomId'],
  data() {
    return {
      hide: false,
    }
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    }
  }
};
</script>

<style scoped>
</style>