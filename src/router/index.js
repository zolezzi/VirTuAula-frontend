import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classroom from '../views/Classroom.vue'
import Lesson from '../views/Lesson.vue'
import "animate.css"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: 'classroom',
    name: 'Classroom',
    component: Classroom
  },
  {
    path: 'lesson',
    name: 'Lesson',
    component: Lesson
  }
]

const router = new VueRouter({
  routes
})

export default router
