import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/home",
      name: "Home",
      redirect: "/home/dashboard",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "/home/dashboard",
          name: "Dashboard",
          component: () => import("../views/Dashboard.vue"),
        },
        {
          path: "/home/profile",
          name: "Profile",
          component: () => import("../views/Profile.vue"),
        },
        {
          path: "/home/settings",
          name: "Settings",
          component: () => import("../views/Settings.vue"),
        },
      ],
    },
  ],
});

export default router;
