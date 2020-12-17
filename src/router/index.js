import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";


import api from "@/services/api";



import Outage from "@/views/Outage.vue";
import OutageCreate from "@/views/OutageCreate.vue";
import OutageEdit from "@/views/OutageEdit.vue";
import OutageEdit2 from "@/views/OutageEdit2.vue";

import Canvas from "@/views/canvas.vue";


import Register from "@/views/Register.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
 
  
  {
    path: "/outage",
    meta: {isSecured: true},
    name: "outage",
    component: Outage,
  },
  {
    path: "/outage-create",
    meta: {isSecured: true},
    name: "outage-create",
    component: OutageCreate,
  },
  {
    path: "/outage-edit/:id",
    name: "outage-edit",
    component: OutageEdit,
  },
  {
    path: "/outage-edit2/:id",
    name: "outage-edit2",
    component: OutageEdit2,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  
  {
    path: "/canvas",
    name: "canvas",
    component: Canvas,
  },


  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login", // page not found
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// Router guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => (record.meta.isSecured ? true : false))) {
    // secure route
    if (api.isLoggedIn()) {
      next();
    } else {
      next("/login");
    }
  } else {
    // unsecure route
    next();
  }
});
export default router;
