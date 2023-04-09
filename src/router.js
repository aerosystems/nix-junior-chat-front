import { createWebHistory, createRouter } from "vue-router";
import Chat from "./components/ChatPage.vue";
import Login from "./components/LoginForm.vue";
import SignUp from "./components/SignUpForm.vue";
import LogoutPage from "./components/LogoutPage.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/logout",
    component: LogoutPage,
  },
  {
    path: "/chat",
    component: Chat,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/signup', '/'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;