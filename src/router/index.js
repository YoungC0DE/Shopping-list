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
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home/dashboard",
          name: "Dashboard",
          meta: { requiresAuth: true },
          component: () => import("../views/Dashboard.vue"),
        },
        {
          path: "/home/profile",
          name: "Profile",
          meta: { requiresAuth: true },
          component: () => import("../views/Profile.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userToken = sessionStorage.getItem('piniaState')
  if (to.matched.some(record => record.meta.requiresAuth) && !userToken) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router;
