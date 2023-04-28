import {createWebHistory, createRouter} from "vue-router";
import ChatPage from "./components/ChatPage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignUpPage from "./components/SignUpPage.vue";

const routes = [
    {
        path: "/",
        component: ChatPage,
    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/signup",
        component: SignUpPage,
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