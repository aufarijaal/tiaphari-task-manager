import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import history from "../views/history.vue";
import jelajahi from "../views/jelajahi.vue";
import settings from "../views/settings.vue";
import tasksDetailByDateVue from "../views/tasksDetailByDate.vue";
import notfound from "../views/notfound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/history",
    name: "history",
    component: history,
  },
  {
    path: "/history/:slug",
    name: "historyDetail",
    component: tasksDetailByDateVue,
  },
  {
    path: "/jelajahi",
    name: "jelajahi",
    component: jelajahi,
  },
  {
    path: "/settings",
    name: "settings",
    component: settings,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: notfound },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
