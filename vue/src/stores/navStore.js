import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useNavStore = defineStore('navStore', () => {
    const toggleNav = ref(false);
    return { toggleNav };
});
