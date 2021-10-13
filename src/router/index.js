import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classroom from '../views/Classroom.vue'
import Lesson from '../views/Lesson.vue'
import Login from '../views/Login.vue'
import FormLesson from '../views/FormLesson.vue'
import FormTask from '../views/FormTask.vue'
import Forbidden from '../views/Forbidden.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresRole: false
    }
  },
  {
    path: '/classroom',
    name: 'Classroom',
    component: Classroom,
    meta: {
      requiresAuth: true,
      requiresRole: false
    }
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: Lesson,
    meta: {
      requiresAuth: true,
      requiresRole: false
    }
  },
  {
    path: '/add-lesson',
    name: 'FormLesson',
    component: FormLesson,
    meta: {
      requiresAuth: true,
      requiresRole: true
    }
  },
  {
    path: '/add-task',
    name: 'FormTask',
    component: FormTask,
    meta: {
      requiresAuth: true,
      requiresRole: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    checkAuthPermission()
  } else {
    next();
  }

  function checkAuthPermission() {
    if (!store.getters.getUser.getToken()) {
      next({ name: "Login" })
    } else if (to.matched.some((record) => record.meta.requiresRole)) {
      checkTeacherPermission()
    } else {
      next()
    }
  }

  function checkTeacherPermission() {
    if (!store.getters.getUser.isTeacher()) {
      next({ name: "Forbidden" })
    } else {
      next()
    }
  }
});

export default router
