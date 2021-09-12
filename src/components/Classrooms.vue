<template>
  <div>
    <b-container>
      <b-row>
        <div v-for="(classroom, index) in classrooms" :key="classroom.id">
          <b-col>
            <Card :classroomName="classroom.name" class="animate__animated animate__fadeInDown animate__faster" :class="delay(index)" />
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
        { id: 1, name: "Matemáticas" },
        { id: 2, name: "Ciencias" },
        { id: 3, name: "Lengua" },
        { id: 4, name: "Química" },
        { id: 5, name: "Programación" },
        { id: 6, name: "Física" },
      ],
    };
  },
  components: {
    Card,
  },
  methods: {
      delay(seconds) {
          return `animate__delay-${seconds}s`;
      }
  }
};
</script>

<style scoped>
    
</style>