import {createWebHistory, createRouter} from "vue-router";
import ChatPage from "./components/ChatPage.vue";
import LoginForm from "./components/LoginForm.vue";
import SignUpForm from "./components/SignUpForm.vue";
import LogoutPage from "./components/LogoutPage.vue";

const routes = [
    {
        path: "/",
        component: ChatPage,
    },
    {
        path: "/login",
        component: LoginForm,
    },
    {
        path: "/signup",
        component: SignUpForm,
    },
    {
        path: "/logout",
        component: LogoutPage,
    },
    {
        path: "/chat",
        component: ChatPage,
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