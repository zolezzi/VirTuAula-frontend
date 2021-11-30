<template>
  <div>
    <h2
      class="mt-2"
      :class="
        hide
          ? 'animate__animated animate__zoomOut animate__faster'
          : 'animate__animated animate__bounceInDown animate__faster'
      "
    >
      Mission Check
    </h2>
    <Missions class="animate__animated animate__zoomIn animate__faster" />
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
      hide: false,
    };
  },
};
</script>