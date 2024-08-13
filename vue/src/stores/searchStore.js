import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useSearchStore = defineStore('searchStore', () => {
    // Initialize the searchTypes array with the correct structure
    const searchItems = ref([
        { icon: "", title: "Marinas", active: true },
        { icon: "", title: "Moorings", active: false },
        { icon: "", title: "Services", active: false },
    ]);
    return { searchItems };
});
