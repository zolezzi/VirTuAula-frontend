<template>
<div>
    <div>
    <h2 class="mt-2" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">
      {{ this.$store.getters.getActualLesson.name }}
    </h2>
    <Tasks :lessonId="this.$store.getters.getActualLesson.id" class="animate__animated animate__zoomIn animate__faster"/>
  </div>
  </div>    
</template>

<script>
import Tasks from "../components/Tasks.vue";
export default {
  components: {
    Tasks,
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