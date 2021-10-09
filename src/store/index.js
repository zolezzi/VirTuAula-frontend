import Vue from "vue";
import Vuex from "vuex";
import lessonService from "../services/lesson-service"
import classroomService from "../services/classroom-service"
import taskService from "../services/task-service"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classrooms: [],
    lessons: [],
    tasks: [],
    actualClassroom: {},
    actualLesson: {},
    tasksResponse: [],
    user: {},
    newTasks: []
  },
  getters: {
    getClassrooms: (state) => state.classrooms,
    getActualClassroom: (state) => state.actualClassroom,
    getLessons: (state) => (classroomId) => state.lessons.filter((lesson) => lesson.classroomId === classroomId),
    getActualLesson: (state) => state.actualLesson,
    getTasks: (state) => (lessonId) => state.tasks,
    getTasksResponse: (state) => state.tasksResponse,
    getUser: (state) => state.user,
    getNewTasks: (state) => state.newTasks
  },
  mutations: {
    addActualClassroom: (state, classroom) => (state.actualClassroom = classroom),
    addActualLesson: (state, lesson) => (state.actualLesson = lesson),
    setClasses: (state, classrooms) => (state.classrooms = classrooms),
    setLessons: (state, lessons) => (state.lessons = lessons),
    addTaskResponse: (state, taskResponse) => state.tasksResponse.some(task => task.id === taskResponse.id) ? state.tasksResponse.find(task=> task.id === taskResponse.id).answer = taskResponse.answer : state.tasksResponse.push(taskResponse),
    resetTaskResponse: (state) => state.tasksResponse = [],
    setTasks: (state, tasks) => (state.tasks = tasks),
    addUser: (state, user) => state.user = user,
    addNewTask: (state, task) => state.newTasks.push(task),
    resetNewTasks: (state) => state.newTasks = []
  },
  actions: {
    async fetchClasses() {
      const response = await classroomService.fetchClasses(this.state.user.token, this.state.user.account.accountId);
      this.commit("setClasses", response.data);
    },
    async fetchLessons() {
      const response = await lessonService.fetchLessons(this.state.actualClassroom.id, this.state.user.token);
      this.commit("setLessons", response.data);
    },
    async fetchTasks() {
      let response = null;
      if(this.state.user.account.accountType.name === 'TEACHER'){
        response = await taskService.fetchTasksTeacher(this.state.actualLesson.id,this.state.user.account.accountId, this.state.user.token);  
      }else{
        response = await taskService.fetchTasks(this.state.actualLesson.id, this.state.user.token);
      }
      
      this.commit("setTasks", response.data);
    },
  },
  modules: {},
});
