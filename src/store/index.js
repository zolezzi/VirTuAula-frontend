import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classrooms: [
      { id: 1, name: "Matemáticas", progress: 0 },
      { id: 2, name: "Ciencias", progress: 10},
      { id: 3, name: "Lengua", progress: 50},
      { id: 4, name: "Química", progress: 70 },
      { id: 5, name: "Programación", progress: 100 },
      { id: 6, name: "Física", progress: 20},
    ],
    actualClassroom: {}
  },
  getters: {
    getClassrooms: state => {
      return state.classrooms;
    },
    getActual: state => {
      return state.actualClassroom;
    }
  },
  mutations: {
    addActual(state, classroom) {
      state.actualClassroom = classroom;
    }
  },
  actions: {
  },
  modules: {
  }
})
