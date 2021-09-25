<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <div v-for="classroom in this.$store.getters.getClassrooms" :key="classroom.id">
          <b-col>
            <CardClassroom :classroom="classroom"  :hide="hide" @update="hideUpdate" class="animate__animated animate__zoomIn animate__faster" />
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardClassroom from "./CardClassroom.vue";
export default {
  name: "Classrooms",
  components: {
    CardClassroom,
  },
  data() {
    return {
      hide: false,
    }
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    }
  },
  created() {
    this.$store.dispatch('fetchClasses');
  }

};
</script>

<style scoped>
    
</style>