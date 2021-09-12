<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <div v-for="classroom in classrooms" :key="classroom.id">
          <b-col>
            <Card :classroomName="classroom.name" :progress="classroom.progress" class="animate__animated animate__zoomIn animate__faster" />
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
  data() {
    return {
      classrooms: [
        { id: 1, name: "Matemáticas", progress: 0 },
        { id: 2, name: "Ciencias", progress: 10},
        { id: 3, name: "Lengua", progress: 50},
        { id: 4, name: "Química", progress: 70 },
        { id: 5, name: "Programación", progress: 100 },
        { id: 6, name: "Física", progress: 20},
      ],
    };
  },
  components: {
    Card,
  }
};
</script>

<style scoped>
    
</style>