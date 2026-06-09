import { createRouter, createWebHistory } from "vue-router";

import appState from "./appState";
import Home from "./Views/Home.vue";
import Error404 from "./Views/Error404.vue";
import SawTurtle from "./Views/SawTurtle.vue";
import CheloniensStats from "./Views/CheloniensStats.vue";



const routes = [
    {
        path: "/",
        component: Home,
        name: "Accueil",
        meta: { title: `${appState.appTitle}` }
    },
    {
        path: "/sawTurtle",
        component: SawTurtle,
        name: "Tortue",
        meta: { title: `J'ai vu une tortue | ${appState.appTitle}` }
    },
    {
        path: "/cheloniensstats",
        component: CheloniensStats,
        name: "Stats",
        meta: {title: `Voir d'autres tortues | ${appState.appTitle}`}

    },
    {
        // 404
        path: "/:pathMatch(.*)*",
        component: Error404,
        name: "Error404",
        meta: { title: `404 | ${appState.appTitle}` },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation hook:
// - Sets document.title from route meta. Using a global hook centralizes
//   title management but be careful if routes are loaded asynchronously
//    ensure `meta.title` is available after lazy-loading.
router.afterEach((to) => {
    // Hook de navigation exécuté après chaque navigation
    document.title = to.meta.title as string || appState.appTitle;
});

export default router;
