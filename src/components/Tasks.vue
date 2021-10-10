<template>
  <div class="mt-3">
    <b-container>
      <b-row align-h="center">
        <div v-for="task in this.tasks" :key="task.id">
          <CardTask :task="task" :hide="hide" />
        </div>
      </b-row>
      <b-row
        v-show="
          this.$store.getters.getUser.account.accountType.name !== 'TEACHER'
        "
        align-h="center"
        :class="
          hide ? 'animate__animated animate__zoomOut animate__faster' : ''
        "
      >
        <b-col
          ><b-button
            variant="success"
            @click="send"
            :disabled="disabled === 100 || complete"
            >Send</b-button
          ></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardTask from "./CardTask.vue";
import lessonService from "../services/lesson-service";
import taskService from "../services/task-service";

export default {
  components: {
    CardTask,
  },
  props: ["lessonId"],
  data() {
    return {
      tasks: [],
      hide: false,
      disabled: this.$store.getters.getActualLesson.progress,
    };
  },
  methods: {
    hideUpdate(newValue) {
      this.hide = newValue;
      this.$parent.hide = newValue;
    },
    send() {
      lessonService.completeTask(
        this.$store.getters.getActualClassroom.id,
        this.lessonId,
        this.$store.getters.getTasksResponse,
        this.$store.getters.getUser.token
      );
      this.hideUpdate(true);
      setTimeout(() => this.$router.push({ name: "Classroom" }), 500);
    },
  },
  computed: {
    complete() {
      return (
        this.tasks.length !==
        this.$store.getters.getTasksResponse.length
      );
    },
  },
  async beforeCreate() {
    if (this.$store.getters.getUser.account.accountType.name === "TEACHER") {
      let response = await taskService.fetchTasksTeacher(
        this.$store.getters.getActualLesson.id,
        this.$store.getters.getUser.account.accountId,
        this.$store.getters.getUser.token
      );
      this.tasks = response.data;
    } else {
      let response = await taskService.fetchTasks(
        this.$store.getters.getActualLesson.id,
        this.$store.getters.getUser.token
      );
      this.tasks = response.data;
    }
  },
};
</script>

<style scoped>
</style>