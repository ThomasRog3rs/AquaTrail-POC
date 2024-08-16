import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router/index';
import vSelect from 'vue-select';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Explicitly typing the global store
declare global {
    interface Window {
        globalStore: ReturnType<typeof createPinia>;
    }
}

window.globalStore = pinia;

const app = createApp(App);
app.component('v-select', vSelect);
// Use the router and pinia
app.use(router);
app.use(pinia);

app.mount('#app');