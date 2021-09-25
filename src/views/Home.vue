<template>
  <div class="home">
    <h2 :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">Classrooms</h2>
    <Classrooms class="mt-1" />
  </div>
</template>

<script>
import Classrooms from '@/components/Classrooms.vue';

export default {
  name: 'Home',
  components: {
    Classrooms
  },
  data() {
    return {
      hide: false
    }
  }
}
</script>
