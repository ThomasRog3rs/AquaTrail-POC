import { createRouter, createWebHistory } from 'vue-router';
import experimentalLayout from '../layouts/experimentalLayout.vue';
import App from '../App.vue';
import Home from '../pages/Home.vue';
import Results from '../pages/Results.vue';
import ResultsMap from '../pages/ResultsMap.vue';
import Marina from '../pages/Marina.vue';
import { nextTick } from 'vue';

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
    ],
    scrollBehavior(to, from, savedPosition) {
        console.log('Navigating from', from.fullPath, 'to', to.fullPath);
        return { top: 0 };
    }
});

// Global afterEach hook to scroll to the top
router.afterEach(() => {
    nextTick(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});

router.beforeEach(() => {
    nextTick(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
})

export default router;
