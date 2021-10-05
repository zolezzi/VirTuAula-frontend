import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classroom from '../views/Classroom.vue'
import Lesson from '../views/Lesson.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/classroom',
    name: 'Classroom',
    component: Classroom,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: Lesson,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.getUser.token) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
