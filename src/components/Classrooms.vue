<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <div v-for="classroom in classrooms" :key="classroom.id">
          <b-col>
            <CardClassroom
              :classroom="classroom"
              :hide="hide"
              @update="hideUpdate"
              class="animate__animated animate__zoomIn animate__faster"
            />
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardClassroom from "./CardClassroom.vue";
import classroomService from "../services/classroom-service";
export default {
  name: "Classrooms",
  components: {
    CardClassroom,
  },
  data() {
    return {
      classrooms: [],
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
  },
  async beforeCreate() {
    let response = await classroomService.fetchClasses(
      this.$store.getters.getUser.getToken(),
      this.$store.getters.getUser.getAccountId()
    );
    this.classrooms = response.data;
  },
};
</script>

<style scoped>
</style>