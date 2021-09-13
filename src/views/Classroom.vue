<template>
  <div>
    <h2 class="mt-2" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">
      {{ this.$store.getters.getActualClassroom.name }}
    </h2>
    <Lessons :classroomId="this.$store.getters.getActualClassroom.id" class="animate__animated animate__zoomIn animate__faster"/>
  </div>
</template>

<script>
import Lessons from "../components/Lessons.vue";
export default {
  components: {
    Lessons,
  },
  data() {
    return {
      hide: false
    }
  }
};
</script>

<style scoped>
</style>