<template>
<div>
    <div>
    <h2 class="mt-2" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'">
      {{ this.$store.getters.getActualCampaign.name }}
    </h2>
    <Back backRoute="NewGame" :redo="false" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__bounceInDown animate__faster'" />
    <Missions :campaignId="this.$store.getters.getActualCampaign.id" class="animate__animated animate__zoomIn animate__faster"/>
  </div>
  </div>    
</template>

<script>
import Missions from "../components/Missions.vue";
import Back from "../components/Back.vue";
export default {
  components: {
    Missions,
    Back
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