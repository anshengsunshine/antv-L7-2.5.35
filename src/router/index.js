import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/map_world_point",
    name: "MapWorldPoint",
    component: () =>
      import(/* webpackChunkName: "map_world_point" */ "../views/MapWorldPoint.vue"),
  },
  {
    path: "/map_world_marker",
    name: "MapWorldMarker",
    component: () =>
      import(/* webpackChunkName: "map_world_marker" */ "../views/MapWorldMarker.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
