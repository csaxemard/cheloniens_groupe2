import { createRouter, createWebHistory } from "vue-router";

import appState from "@/appState.js";
import Error404 from "@/Views/Error404.vue";
import Home from "./Views/Home.vue";
import SawTurtle from "./Views/sawTurtle.vue";
import TurtlesDetails from "./Views/TurtlesDetails.vue";



const routes = [
    {
        path: "/",
        component: Home,
        name: "Accueil",
        meta: { title: `${appState.titleDefault}` }
    },
    {
        path: "/sawTurtle",
        component: SawTurtle,
        name: "Ajouter une observation de tortue",
        meta: { title: `J'ai vu une tortue | ${appState.titleDefault}` }
    },
    {
        path: "/turtlesDetails",
        component: TurtlesDetails,
        name: "Fiches Tortues",
        meta: { title: `Fiches tortues | ${appState.titleDefault}` }
    },
    {
        // 404
        path: "/:pathMatch(.*)*",
        component: Error404,
        name: "Error404",
        meta: { title: `404 | ${appState.titleDefault}` },
    }
];
routes.push(
)

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    // Hook de navigation exécuté après chaque navigation
    document.title = to.meta.title || appState.title;
});

export default router;
