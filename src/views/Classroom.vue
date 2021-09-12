<template>
  <div>
    <h2 class="animate__animated animate__bounceInDown animate__faster mt-2">
      {{ this.$store.getters.getActual.name }}
    </h2>
    <Lessons :classroomId="this.$store.getters.getActual.id" class="animate__animated animate__zoomIn animate__faster"/>
  </div>
</template>

<script>
import Lessons from "../components/Lessons.vue";
export default {
  components: {
    Lessons,
  },
};
</script>

<style scoped>
</style>