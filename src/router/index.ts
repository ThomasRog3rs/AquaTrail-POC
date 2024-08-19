import { createRouter, createWebHistory } from 'vue-router';
import experimentalLayout from '../layouts/experimentalLayout.vue';
import App from '../App.vue';
import Home from '../pages/Home.vue';
import Results from '../pages/Results.vue';
import ResultsMap from '../pages/ResultsMap.vue';
import Marina from '../pages/Marina.vue';


const router = createRouter({
    history: createWebHistory(""),
    routes: [
        { path: '/old', name: 'Default', component: Home },
        { path: '/', name: 'Experimental', component: experimentalLayout },
        { path: '/results', name: 'Results', component: Results },
        { path: '/results/map', name: 'ResultsMap', component: ResultsMap },
        { 
            path: '/marina/:id', 
            name: 'Marina', 
            component: Marina,
            props: true // This passes the route params as props to the component
        }
    ]
});

export default router;
