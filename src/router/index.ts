import { createRouter, createWebHistory } from 'vue-router';
import experimentalLayout from '../layouts/experimentalLayout.vue';
import App from '../App.vue';
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory(""),
    routes: [
        { path: '/old', name: 'Default', component: Home },
        {path: '/', name: 'Experimental', component: experimentalLayout}
    ]
});

export default router;
