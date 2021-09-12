<template>
  <div class="home">
    <Navbar />
    <Classrooms class="mt-4" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Classrooms from '@/components/Classrooms.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Classrooms
  }
}
</script>
