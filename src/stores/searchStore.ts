import { defineStore } from 'pinia';
import { ref } from 'vue';
import { marina } from '@/types/location';
import * as client from '../api-client';


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
        // { icon: "", title: "Moorings", active: false },
        // { icon: "", title: "Services", active: false },
    ]);

    const marinaSearchValue = ref<string>("");
    const serviceSearchValue =  ref<client.ServiceTypeModel>();

    const serviceTypes = ref<Array<client.ServiceTypeModel> | undefined>();
    
    const marinaSearchResults = ref<Array<client.MarinaModel>>();

    return { 
        searchItems,
        serviceTypes,
        marinaSearchValue, 
        serviceSearchValue, 
        marinaSearchResults 
    };
});