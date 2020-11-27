import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Albums from "@/views/Albums.vue";
import Album from "@/views/Album.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home
    // component: () =>
    // import(/* webpackChunkName: "albums" */ "@/views/Albums.vue")
  },
  {
    path: "/albums",
    name: "albums",
    // route level code-splitting
    // this generates a separate chunk (albums.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
     component: () =>
       import(/* webpackChunkName: "albums" */ "@/views/Albums.vue")
      // component: Albums
  },
  {
    path: "/album/:folder",
    name: "album",
     component: () => import(/* webpackChunkName: "album" */ "@/views/Album.vue")
    //  component: () => import(/* webpackChunkName: "albums" */ "@/views/Album.vue")
    //component: Album
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: "not-found",
    component: () => import(/* webpackChunkName: "404" */ "@/views/NotFound.vue")
    // component: () => import(/* webpackChunkName: "albums" */ "@/views/NotFound.vue")
    // component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
