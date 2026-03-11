import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import DiamondMinesGrid from "../components/DiamondMinesGrid.vue";
import Blackjack from '../pages/blackjack.vue';
import Banditmanchot from "@/pages/banditmanchot.vue";
import Leaderboard from "@/pages/leaderboard.vue";

const routes = [
    { path: '/Home', component: Home },
    { path: '/diamond-mines', component: DiamondMinesGrid},
    { path: '/Blackjack', component: Blackjack },
    { path: '/Banditmanchot', component: Banditmanchot },
    { path: '/Leaderboard', component: Leaderboard }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
