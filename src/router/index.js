import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Classroom from "../views/Classroom.vue";
import Lesson from "../views/Lesson.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import FormLesson from "../views/FormLesson.vue";
import FormTask from "../views/FormTask.vue";
import FormClassroom from "../views/FormClassroom.vue";
import Forbidden from "../views/Forbidden.vue";
import Account from "../views/Account.vue";
import Students from "../views/Students.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/classroom",
    name: "Classroom",
    component: Classroom,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/lesson",
    name: "Lesson",
    component: Lesson,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/add-lesson",
    name: "FormLesson",
    component: FormLesson,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-task",
    name: "FormTask",
    component: FormTask,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-classroom",
    name: "FormClassroom",
    component: FormClassroom,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
  {
    path: "/students",
    name: "Students",
    component: Students,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    checkAuthPermission();
  } else {
    next();
  }

  function checkAuthPermission() {
    if (!store.getters.getUser.getToken()) {
      next({ name: "Login" });
    } else if (to.matched.some((record) => record.meta.requiresRole)) {
      checkTeacherPermission();
    } else {
      next();
    }
  }

  function checkTeacherPermission() {
    if (!store.getters.getUser.isLeader()) {
      next({ name: "Forbidden" });
    } else {
      next();
    }
  }
});

export default router;
