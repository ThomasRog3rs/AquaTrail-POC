import { createRouter, createWebHistory } from 'vue-router';
import experimentalLayout from '../layouts/experimentalLayout.vue';
import App from '../App.vue';
import Home from '../pages/Home.vue';
import Results from '../pages/Results.vue';
import ResultsMap from '../pages/ResultsMap.vue';
import Marina from '../pages/Marina.vue';
import Privacy from '../pages/Privacy.vue';
import Cookie from '../pages/Cookie.vue';
import NotFound from '../pages/NotFound.vue';
import Questionnaire from '../pages/Questionnaire.vue';
import { nextTick } from 'vue';

import {useQuestionnaireStore} from "../stores/questionnaireStore";

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
        },
        {path: '/feedback', name: 'Feedback', component: Questionnaire},
        { path: '/cookie-policy', name: 'Cookiez', component: () => window.location.href = '/cookie-policy.html' },
        { path: '/privacy-policy', name: 'Privacy', component: () => window.location.href = '/privacy-policy.html' },
        { 
            path: '/:pathMatch(.*)*', 
            name: 'NotFound', 
            component: NotFound,
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

        const questionnaireStore = useQuestionnaireStore();
        questionnaireStore.trackUserInteractions();
    });
});

router.beforeEach(() => {
    nextTick(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
})

export default router;
