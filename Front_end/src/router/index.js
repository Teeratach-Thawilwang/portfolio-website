import { createRouter, createWebHistory } from "vue-router";

// import component
import home from "../views/home.vue"
import research from "../views/research.vue"
import label from "../views/label.vue"
import labelpost from "../views/labelpost.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/research",
    name: "research",
    component: research,
  },
  {
    path: "/label",
    name: "label",
    component: label,
  },
  {
    path: "/labelpost",
    name: "labelpost",
    component: labelpost,
    props: (route) => ({ param: route.query }),  
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
