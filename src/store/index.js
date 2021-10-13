import Vue from "vue";
import Vuex from "vuex";
const User = require('../entity/User');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    actualClassroom: {},
    actualLesson: {},
    tasksResponse: [],
    user: new User(),
    newTasks: []
  },
  getters: {
    getActualClassroom: (state) => state.actualClassroom,
    getActualLesson: (state) => state.actualLesson,
    getTasksResponse: (state) => state.tasksResponse,
    getUser: (state) => state.user,
    getNewTasks: (state) => state.newTasks
  },
  mutations: {
    addActualClassroom: (state, classroom) => (state.actualClassroom = classroom),
    addActualLesson: (state, lesson) => (state.actualLesson = lesson),
    addTaskResponse: (state, taskResponse) => state.tasksResponse.some(task => task.id === taskResponse.id) ? state.tasksResponse.find(task=> task.id === taskResponse.id).answer = taskResponse.answer : state.tasksResponse.push(taskResponse),
    resetTaskResponse: (state) => state.tasksResponse = [],
    addUser: (state, user) => state.user = user,
    addNewTask: (state, task) => state.newTasks.push(task),
    resetNewTasks: (state) => state.newTasks = []
  },
  actions: {},
  modules: {},
});
