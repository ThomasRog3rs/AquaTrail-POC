import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('searchStore', () => {
    // Define the type for each search type object
    type SearchType = {
        icon: string,
        title: string,
        active: boolean
    };

    // Initialize the searchTypes array with the correct structure
    const searchItems = ref<SearchType[]>([
        { icon: "", title: "Marinas", active: true },
        { icon: "", title: "Moorings", active: false },
        { icon: "", title: "Services", active: false },
    ]);

    return { searchItems };
});