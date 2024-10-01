import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as client from '../api-client';
import { TypesApi } from '../api-client';
import {SearchType, sortOption, filterOption} from '../types/search';


export const useSearchStore = defineStore('searchStore', () => {
    const types = new TypesApi();

    // Initialize the searchTypes array with the correct structure
    const searchItems = ref<SearchType[]>([
        { icon: "", title: "Marinas", active: true },
        // { icon: "", title: "Moorings", active: false },
        // { icon: "", title: "Services", active: false },
    ]);

    const searchLocationValue = ref<string |undefined>(undefined);
    const searchLocationCoordinatesValue = ref<string | undefined>(undefined);
    const searchRadiusValue = ref<number | undefined>(4);

    const marinaSearchValue = ref<string | undefined>(undefined);
    const serviceSearchValue =  ref<client.ServiceTypeModel | undefined>(undefined);

    const serviceTypes = ref<Array<client.ServiceTypeModel> | undefined>();
    
    const marinaSearchResults = ref<Array<client.MarinaModel>>();

    const userLocation = ref<string | undefined>(undefined);

    const sortOptions =  ref<Array<sortOption>>(); 
    sortOptions.value = [
        {name: "Alphabetically", active: true, enabled: true, id: 1},
        {name: "Number Of Services", active: false, enabled: true, id: 2},
        {name: "Distance", active: true, enabled: false, id: 3},

    ]

    const serviceFilterOptions = ref<Array<filterOption>>([]);

    async function getServiceTypes(){
        try {
            const response:Array<client.ServiceTypeModel> = await types.typesServiceTypesGet();
            serviceTypes.value = response;
            console.log(serviceTypes.value);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    async function resetServiceFilterOptions(){
        if(serviceFilterOptions === undefined) return;

        serviceFilterOptions.value = serviceFilterOptions.value.map(x => {
            return {
                serviceType: x,
                active: false
            } as filterOption;
        }).sort((a:filterOption, b:filterOption) => {
            return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
        });
        
        
        // await getServiceTypes();
        // serviceFilterOptions.value! = serviceTypes.value?.map(x => {
        //     const filterOption : filterOption = {
        //         serviceType: x,
        //         active: false
        //     }
        //     return filterOption;
        // }).sort((a:filterOption, b:filterOption) => {
        //     return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
        // });
    }

    function setServiceFilterOptionActive(key: string){
        const option = serviceFilterOptions.value?.find(x => x.serviceType.key === key);
        if(option){
            option.active = true;
        }

    }

    function resetSortOptions(){
        sortOptions.value = [
            {name: "Alphabetically", active: true, enabled: true, id: 1},
            {name: "Number Of Services", active: false, enabled: true, id: 2},
            {name: "Distance", active: false, enabled: true, id: 3}
        ]
    }

    function setSortOption(id:number){
        const sortItem : sortOption | undefined = sortOptions.value?.find(x => x.id === id);
        if(sortItem === undefined) return;
        sortOptions.value?.forEach(o => o.active = false);
        sortItem.active = true;
        sortrBy(sortItem);
    }

    function sortrBy(sortItem:sortOption){
        if(marinaSearchResults.value === undefined) return;
        switch(sortItem.name){
            case "Distance":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (a.distanceFromSearch || 0) - (b.distanceFromSearch || 0);
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
        searchLocationValue,
        searchLocationCoordinatesValue,
        searchRadiusValue,
        marinaSearchResults ,
        sortOptions,
        setSortOption,
        resetSortOptions,
        userLocation,
        resetServiceFilterOptions,
        serviceFilterOptions,setServiceFilterOptionActive
    };
});