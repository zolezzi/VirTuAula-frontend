<template>
  <div class="home">
    <h2>Classrooms</h2>
    <Classrooms class="mt-1" />
  </div>
</template>

<script>
import Classrooms from '@/components/Classrooms.vue';

export default {
  name: 'Home',
  components: {
    Classrooms
  }
}
</script>
