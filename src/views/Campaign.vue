<template>
<div>
    <div>
    <h2 class="mt-2" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">
      {{ this.$store.getters.getActualLesson.name }}
    </h2>
    <Missions :lessonId="this.$store.getters.getActualLesson.id" class="animate__animated animate__zoomIn animate__faster"/>
  </div>
  </div>    
</template>

<script>
import Missions from "../components/Missions.vue";
export default {
  components: {
    Missions,
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