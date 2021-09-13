import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classrooms: [
      { id: 1, name: "Matemáticas", progress: 30 },
      { id: 2, name: "Historia", progress: 10},
      { id: 3, name: "Lengua", progress: 50},
      { id: 4, name: "Química", progress: 70 },
      { id: 5, name: "Programación", progress: 100 },
      { id: 6, name: "Física", progress: 20},
    ],
    lessons: [
      {id: 1, name: "Números Reales", progress: 20, classroomId: 1},
      {id: 2, name: "Fracciones", progress: 50, classroomId: 1},
      {id: 3, name: "Ecuaciones", progress: 30, classroomId: 1},
      {id: 4, name: "Derivadas", progress: 10, classroomId: 1},
      {id: 5, name: "Historia Argentina", progress: 100, classroomId: 2},
      {id: 6, name: "Primera Guerra Mundial", progress: 80, classroomId: 2},
      {id: 7, name: "Análisis Sintáctico", progress: 30, classroomId: 3},
      {id: 8, name: "Ortografía", progress: 20, classroomId: 3},
      {id: 9, name: "Soluciones", progress: 10, classroomId: 4},
      {id: 10, name: "Nomenclatura", progress: 60, classroomId: 4},
      {id: 11, name: "Algoritmos Básicos", progress: 30, classroomId: 5},
      {id: 12, name: "Estructuras de datos", progress: 80, classroomId: 5},
      {id: 13, name: "Patrones de diseño", progress: 90, classroomId: 5},
      {id: 14, name: "Fuerza", progress: 100, classroomId: 6},
      {id: 15, name: "Velocidad", progress: 70, classroomId: 6},
    ],
    actualClassroom: {},
    actualLesson: {},
  },
  getters: {
    getClassrooms: state => {
      return state.classrooms;
    },
    getActualClassroom: state => {
      return state.actualClassroom;
    }, 
    getLessons: state => classroomId => {
      return state.lessons.filter(lesson => lesson.classroomId === classroomId);
    },
    getActualLesson: state => {
      return state.actualLesson;
    }
  },
  mutations: {
    addActualClassroom(state, classroom) {
      state.actualClassroom = classroom;
    },
    addActualLesson(state, lesson) {
      state.actualLesson = lesson;
    }
  },
  actions: {
  },
  modules: {
  }
})
