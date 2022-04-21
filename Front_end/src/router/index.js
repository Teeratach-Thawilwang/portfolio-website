import { createRouter, createWebHistory } from "vue-router";

// import component
import home from "../views/home.vue"
import project from "../views/project.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/project",
    name: "project",
    component: project,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
