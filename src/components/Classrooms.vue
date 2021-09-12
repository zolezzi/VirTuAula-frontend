<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <div v-for="classroom in this.$store.getters.getClassrooms" :key="classroom.id">
          <b-col>
            <Card :classroom="classroom"  :hide="hide" @update="hideUpdate" class="animate__animated animate__zoomIn animate__faster" />
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Classrooms",
  components: {
    Card,
  },
  data() {
    return {
      hide: false,
    }
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
    }
  }
};
</script>

<style scoped>
    
</style>