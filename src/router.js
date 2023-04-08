import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/HomePage.vue";
import Login from "./components/LoginForm.vue";
import Register from "./components/RegisterForm.vue";
// lazy-loaded
function Profile() {
    return import("./components/ChatPage.vue");
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;