import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router/index';
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
window.globalStore = pinia;
const app = createApp(App);
// Use the router and pinia
app.use(router);
app.use(pinia);
app.mount('#app');
