import { createRouter, createWebHistory } from 'vue-router';
import experimentalLayout from '../layouts/experimentalLayout.vue';
import App from '../App.vue';
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory(""),
    routes: [
        { path: '/', name: 'Default', component: Home },
        {path: '/booking-pin', name: 'Experimental', component: experimentalLayout}
    ]
});

export default router;