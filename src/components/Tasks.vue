<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div
          v-for="task in this.$store.getters.getTasks(lessonId)"
          :key="task.id"
        >
          <CardTask :task="task" :hide="hide"/>
        </div>
      </b-row>
      <b-row align-h="center" :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''">
        <b-col><b-button variant="success" @click="send" :disabled="disabled === 100 || complete">Send</b-button></b-col>
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
      disabled: this.$store.getters.getActualLesson.progress
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    send() {
        lessonService.completeTask(this.$store.getters.getActualClassroom.id, this.lessonId, this.$store.getters.getTasksResponse, this.$store.getters.getToken);
        this.hideUpdate(true);
        setTimeout( () => this.$router.push({ name: "Classroom" }), 500);
    }
  },
  computed: {
    complete() {
      return this.$store.getters.getTasks(this.lessonId).length !== this.$store.getters.getTasksResponse.length
    }
  },
  created() {
    this.$store.dispatch('fetchTasks', this.lessonId);
  }
};
</script>

<style scoped>
</style>