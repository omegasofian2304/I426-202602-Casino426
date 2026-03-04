/***********************************************************************************************************************
 * Program name :           index.js
 * Description :            l'index avec les routes
 * Author :                 Loïc Roux
 * Creation date :          04.03.2026
 * Modified by :            Loïc Roux
 * Modification date :      04.03.2026
 * Version :                4.0
 **********************************************************************************************************************/
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import DiamondMinesGrid from "../components/DiamondMinesGrid.vue";
import Blackjack from '../pages/blackjack.vue';
import Header from '../components/header___.vue';

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
