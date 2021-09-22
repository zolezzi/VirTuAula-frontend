<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div
          v-for="task in this.$store.getters.getTasks(lessonId)"
          :key="task.id"
        >
          <CardTask :task="task" :hide="hide" @update="hideUpdate" />
        </div>
      </b-row>
      <b-row align-h="center">
        <b-col><b-button variant="success" @click="enviar">Enviar</b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardTask from "./CardTask.vue";
import lessonService from "../services/lesson-service";

export default {
  components: {
    CardTask,
  },
  props: ["lessonId"],
  data() {
    return {
      hide: false,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    enviar() {
        lessonService.completeTask(this.$store.getters.getActualClassroom.id, this.lessonId, this.$store.getters.getTasksResponse)
    }
  },
  created() {
    this.$store.dispatch('fetchTasks', this.lessonId);
  }
};
</script>

<style scoped>
</style>