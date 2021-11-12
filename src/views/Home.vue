<template>
  <div class="home">
    <h2 :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">New Games</h2>
    <NewGames class="mt-1" />
  </div>
</template>

<script>
import NewGames from '@/components/NewGames.vue';

export default {
  name: 'Home',
  components: {
    NewGames
  },
  data() {
    return {
      hide: false
    }
  }
}
</script>
