<!-- ***********************************************************************************************************************
* Program name :           main.js
* Description :            le main
* Author :                 Loïc Roux
* Creation date :          04.03.2026
* Modified by :            Loïc Roux
* Modification date :      04.03.2026
* Version :                4.0
********************************************************************************************************************** -->
import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/main.css'

createApp(App)
    .use(router)
    .mount('#app');
