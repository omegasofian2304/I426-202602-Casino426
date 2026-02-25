import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import DiamondMinesGrid from "../components/DiamondMinesGrid.vue";
import Blackjack from '../pages/blackjack.vue';
import Header from '../components/header.vue';

const routes = [
    { path: '/Home', component: Home },
    { path: '/diamond-mines', component: DiamondMinesGrid},
    { path: '/Blackjack', component: Blackjack },
    { path: '/Header', component: Header }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
