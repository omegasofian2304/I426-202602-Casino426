import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import DiamondMinesGrid from "../components/DiamondMinesGrid.vue";

const routes = [
    { path: '/Home', component: Home },
    { path: '/diamond-mines', component: DiamondMinesGrid}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
