import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Blackjack from '../pages/blackjack.vue';

const routes = [
    { path: '/Home', component: Home },
    { path: '/Blackjack', component: Blackjack }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
