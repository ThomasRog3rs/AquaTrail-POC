import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import './style.css'
import App from './App.vue'

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

//@ts-ignore
window.globalStore = pinia;

const app = createApp(App);

app.use(pinia);
app.mount('#app');
