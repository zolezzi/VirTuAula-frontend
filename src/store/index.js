import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classrooms: [],
    lessons: [],
    tasks: [],
    actualClassroom: {},
    actualLesson: {},
    tasksResponse: []
  },
  getters: {
    getClassrooms: (state) => state.classrooms,
    getActualClassroom: (state) => state.actualClassroom,
    getLessons: (state) => (classroomId) => state.lessons.filter((lesson) => lesson.classroomId === classroomId),
    getActualLesson: (state) => state.actualLesson,
    getTasks: (state) => (lessonId) => state.tasks,
    getTasksResponse: (state) => state.tasksResponse
  },
  mutations: {
    addActualClassroom: (state, classroom) => (state.actualClassroom = classroom),
    addActualLesson: (state, lesson) => (state.actualLesson = lesson),
    setClasses: (state, classrooms) => (state.classrooms = classrooms),
    setLessons: (state, lessons) => (state.lessons = lessons),
    addTaskResponse: (state, taskResponse) => state.tasksResponse.some(task => task.id === taskResponse.id) ? state.tasksResponse.find(task=> task.id === taskResponse.id).answer = taskResponse.answer : state.tasksResponse.push(taskResponse),
    setTasks: (state, tasks) => (state.tasks = tasks)
  },
  actions: {
    async fetchClasses() {
      const response = await axios.get("/classrooms");
      this.commit("setClasses", response.data);
    },
    async fetchLessons() {
      const response = await axios.get(`/lessons/${this.state.actualClassroom.id}`);
      this.commit("setLessons", response.data);
    },
    async fetchTasks() {
      const response = await axios.get(`/tasks/${this.state.actualLesson.id}`);
      this.commit("setTasks", response.data);
    },
  },
  modules: {},
});
