import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classrooms: [],
    lessons: [],
    actualClassroom: {},
    actualLesson: {},
  },
  getters: {
    getClassrooms: state => state.classrooms,
    getActualClassroom: state => state.actualClassroom, 
    getLessons: state => classroomId => state.lessons.filter(lesson => lesson.classroomId === classroomId),
    getActualLesson: state => state.actualLesson
  },
  mutations: {
    addActualClassroom: (state, classroom) => state.actualClassroom = classroom,
    addActualLesson: (state, lesson) => state.actualLesson = lesson,
    setClasses: (state, classrooms) =>  state.classrooms = classrooms,
    setLessons: (state, lessons) =>  state.lessons = lessons
  },
  actions: {
    async fetchClasses() {
      const response = await axios.get('/classrooms');
      this.commit('setClasses', response.data);
    },
    async fetchLessons() {
      const response = await axios.get(`/lessons/${this.state.actualClassroom.id}`);
      this.commit('setLessons', response.data);
    }
  },
  modules: {
  }
})
