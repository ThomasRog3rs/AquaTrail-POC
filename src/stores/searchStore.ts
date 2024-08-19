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

    //Define the type for sort options
    type sortOption = {
        name: string,
        active: boolean,
        id: number
    }

    // Initialize the searchTypes array with the correct structure
    const searchItems = ref<SearchType[]>([
        { icon: "", title: "Marinas", active: true },
        // { icon: "", title: "Moorings", active: false },
        // { icon: "", title: "Services", active: false },
    ]);

    const marinaSearchValue = ref<string | undefined>(undefined);
    const serviceSearchValue =  ref<client.ServiceTypeModel | undefined>(undefined);

    const serviceTypes = ref<Array<client.ServiceTypeModel> | undefined>();
    
    const marinaSearchResults = ref<Array<client.MarinaModel>>();

    const userLocation = ref<string | undefined>(undefined);

    const sortOptions =  ref<Array<sortOption>>(); 
    sortOptions.value = [
        // {name: "Distance", active: true, id: 1},
        {name: "Alphabetically", active: true, id: 2},
        {name: "Number Of Services", active: false, id: 3}
    ]

    function resetSortOptions(){
        sortOptions.value = [
            {name: "Alphabetically", active: true, id: 1},
            {name: "Number Of Services", active: false, id: 2},
            {name: "Distance", active: false, id: 3}
        ]
    }

    function setSortOption(id:number){
        const sortItem : sortOption | undefined = sortOptions.value?.find(x => x.id === id);
        if(sortItem === undefined) return;
        sortOptions.value?.forEach(o => o.active = false);
        sortItem.active = true;
        filterBy(sortItem);
    }

    function filterBy(sortItem:sortOption){
        if(marinaSearchResults.value === undefined) return;
        switch(sortItem.name){
            case "Distance":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (a.distance || 0) - (b.distance || 0);
                });
                break;
            case "Alphabetically":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return a?.name!.localeCompare(b?.name!);
                });
                // alert("sorting abc")
                break;
            case "Number Of Services":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (b.services?.length || 0) - (a.services?.length || 0);
                });
                // alert("sorting #services");

                break;
            default:
                break;
        }
    }

    return { 
        searchItems,
        serviceTypes,
        marinaSearchValue, 
        serviceSearchValue, 
        marinaSearchResults ,
        sortOptions,
        setSortOption,
        resetSortOptions,
        userLocation
    };
});