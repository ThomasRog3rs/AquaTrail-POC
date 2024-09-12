<template>
    <div class="search-container shadow-xl">
        <div class="container-header">
            <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
        </div>
        <form class="mx-w-md mx-auto">
            <label for="search-location" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative bg-transparent">
                <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="search-location" class="form-border-bottom block w-full p-6 ps-11 text-lg text-gray-900 bg-transparent" placeholder="Search Location" required v-model="searchStore.searchLocationValue" />
             </div>
            <!-- <input  type="text" placeholder="Search Location"  style="text-align: left;">   -->
            <div style="width: 100%;">
                <label for="" style="text-align: left; display: block; width: 90%; margin: 0px auto; margin-top: 20px;">Search Radius: {{ searchStore.searchRadiusValue }} Miles</label>
                <input type="range" placeholder="Radius (miles)" v-model="searchStore.searchRadiusValue" max=30 min=1 value="1" style="display: block; width: 90%; margin: 0px auto; margin-bottom: 12px; margin-top: 12px;"> 
            </div>   
      
            <!-- <input type="search" placeholder="Search Marina Name" v-model="searchStore.marinaSearchValue"> -->
            <!-- <v-select label="value" placeholder="Which service are you looking for?" :options="serviceTypes" v-model="searchStore.serviceSearchValue"></v-select> -->
        </form>
        <div class="container-footer">
            <button class="bg-blue-700" @click="search">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useSearchStore } from '../../stores/searchStore';
    import { useRouter } from 'vue-router';
    import {ServiceTypeModel, TypesApi, DataApi, LocationApi} from '../../api-client';
    import * as client from '../../api-client';

    const types = new TypesApi();
    const dataApi = new DataApi();
    const locationApi = new LocationApi();

    const router = useRouter();
    const searchStore = useSearchStore();

    const searchErrorMsg = ref<string>("");
    const searchHasError = ref<boolean>(false);

    const emit = defineEmits<{
        (e: 'searched'): void;
    }>();

    function truncateLocation(response: string): string {
    // Split the response string by commas
    const parts = response.split(',');

    // Check if there are at least two commas in the response
    if (parts.length >= 2) {
        // Join the first two parts and return the result
        return parts.slice(0, 2).join(',');
    }

    // If there are fewer than two parts, return the original string
    return response;
}

    async function search() {
        // if (
        //     (searchStore.marinaSearchValue === undefined || searchStore.marinaSearchValue === null || searchStore.marinaSearchValue === '') &&
        //     (searchStore.serviceSearchValue === undefined || searchStore.serviceSearchValue=== null)
        // ) {
        //     searchErrorMsg.value = "Please provide one or more values";
        //     searchHasError.value = true;
        //     return;
        // }

        if (
            (searchStore.searchLocationValue === undefined || searchStore.searchLocationValue === null || searchStore.searchLocationValue === '') ||
            (searchStore.searchRadiusValue === undefined || searchStore.searchRadiusValue=== null)
        ) {
            searchErrorMsg.value = "Please complete the search form";
            searchHasError.value = true;
            return;
        }

        // alert(searchStore.searchRadiusValue);
        if(searchStore.searchRadiusValue > 30){
            searchStore.searchRadiusValue = 30;
        }

        //get Location
        const locationParams : client.LocationSearchGetRequest = {
            query: searchStore.searchLocationValue
        }

        let locationCoordinates : string | undefined = undefined;
        try{
            const loactionResponse : Array<client.LocationModel> = await locationApi.locationSearchGet(locationParams);
            locationCoordinates = loactionResponse[0].coordinates!;
            searchStore.searchLocationValue = truncateLocation(loactionResponse[0].name!);
            searchStore.searchLocationCoordinatesValue = loactionResponse[0].coordinates!;
        }catch(err: any){
            console.error("Location error: ", err);
            console.warn(err.response.statusText);
            searchErrorMsg.value = "Can't find that location";
            searchHasError.value = true;
            return;
        }

        if(locationCoordinates === undefined){
            console.warn("something wrong with location searhc")
        }

        // let serviceTypesArray: Array<string> | undefined = 
        //     searchStore.serviceSearchValue ? [searchStore.serviceSearchValue.key!] : undefined;
        const params : client.DataMarinasSearchGetRequest = {
            name: undefined,
            searchCoordinates: locationCoordinates,
            searchDistance: searchStore.searchRadiusValue,
            userCoordinates: searchStore.userLocation ?? undefined,
            serviceTypes: undefined,
            limit: undefined,   
            offset: 0,
        }

        console.warn(params);

        try{
            const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
            searchStore.marinaSearchResults = res;
            console.log(searchStore.marinaSearchResults);
        }catch(err: any){
            if (err.response && err.response.status === 404) {
                router.push("/results");
                searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                return;
            }
            console.error("Search error: ", err);
            console.warn(err.response.statusText);
            searchErrorMsg.value = "Error with search";
            searchHasError.value = true;
            return;
        }
        
        router.push("/results");
        searchHasError.value = false;
        searchStore.resetSortOptions();
        searchStore.resetServiceFilterOptions();
        // searchStore.setServiceFilterOptionActive(searchStore?.serviceSearchValue?.key!); // moved to Results on mounted
        emit("searched");
    }

    const serviceTypes = ref<Array<ServiceTypeModel> | undefined>();

    onMounted(async () => {
        try {
        const response:Array<client.ServiceTypeModel> = await types.typesServiceTypesGet();
        serviceTypes.value = response;
        searchStore.serviceTypes = response;
        console.log(serviceTypes.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }    });
</script>