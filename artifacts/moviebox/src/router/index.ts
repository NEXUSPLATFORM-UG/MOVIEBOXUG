import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "mainplatform.nexus@gmail.com";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: "/", name: "home", component: () => import("../pages/HomePage.vue") },
    { path: "/web/movie", name: "movies", component: () => import("../pages/MoviesPage.vue") },
    { path: "/web/tv-series", name: "series", component: () => import("../pages/SeriesPage.vue") },
    { path: "/web/animated-series", name: "animation", component: () => import("../pages/AnimationPage.vue") },
    { path: "/most-watched", name: "most-watched", component: () => import("../pages/MostWatchedPage.vue") },
    { path: "/live-tv", name: "live-tv", component: () => import("../pages/LiveTVPage.vue") },
    { path: "/short-series", name: "short-series", component: () => import("../pages/ShortSeriesPage.vue") },
    { path: "/admin", name: "admin", component: () => import("../pages/AdminDashboard.vue") },
    { path: "/watch/:id", name: "watch", component: () => import("../pages/WatchPage.vue") },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to) => {
  if (to.name !== "admin") return true;
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user?.email === ADMIN_EMAIL) resolve(true);
      else resolve("/");
    });
  });
});

export default router;
