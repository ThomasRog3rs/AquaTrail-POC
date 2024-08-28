<template>
    <div class="filterBox shadow-lg" v-if="props.open" v-show="props.open">
        <div>
            <div class="header">
                <span class="close" @click="closeBox">&cross;</span>
                <h1>Filter By</h1>
                <span class="reset text-blue-700" @click="clearFilters">Clear filters</span>
            </div>
            <fieldset style="margin-bottom: 200px;">
                <legend class="">Marinas with these services:</legend>
                <!-- <div v-if="!showAllServiceOptions" v-for="index in 5">
                    <input type="checkbox" :id="searchStore.serviceFilterOptions![index].serviceType.key!" :value="searchStore.serviceFilterOptions![index].serviceType.value" name="filter-services" :checked="searchStore.serviceFilterOptions![index].active" @click="setFilterActive(searchStore.serviceFilterOptions![index].serviceType.key!)"/>
                    <label :for="searchStore.serviceFilterOptions![index].serviceType.key!">{{ searchStore.serviceFilterOptions![index].serviceType.value! }}</label>
                </div> -->
                <div v-for="service in searchStore.serviceFilterOptions">
                        <input type="checkbox" :id="service.serviceType.key!" name="filter-services" :value="service.serviceType.value!" :checked="service.active" @click="setFilterActive(service.serviceType.key!)" />
                        <label :for="service.serviceType.key!">{{ service.serviceType.value }}</label>
                </div>

                <!-- <span>
                    <span v-if="!showAllServiceOptions" @click="displayAllServiceOptions" class="text-blue-700 cursor-auto hover:cursor-pointer">View More</span>
                    <span v-if="showAllServiceOptions" @click="hideAllServiceOptions" class="text-blue-700 cursor-auto hover:cursor-pointer">View Less</span>
                </span> -->
            </fieldset>
            <!-- <fieldset style="margin-bottom: 200px;">
            <legend class="">Distance:</legend>
                <div>
                    <input type="checkbox" id="Distance" name="filter-distance" value="Distance" checked />
                    <label for="Distance">Filter by distance</label>
                </div>
                <div>
                    <input class="shadow" type="number" id="Distance" name="filter-distance" value="" placeholder="distance (miles)" /> &ThickSpace; miles
                </div>
            </fieldset> -->
        </div>
            <div id="showResults">
                <div>
                    <span>{{ numberOfResults }} matching results</span>
                    <button class="bg-blue-700 text-white mt-2" @click="closeBox">Show Results</button>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
    import { onActivated, onMounted, ref, watchEffect } from 'vue';
    import { useSearchStore } from '../../stores/searchStore';
    import * as client from '../../api-client';
    import { DataApi } from '../../api-client';

    const dataApi = new DataApi();

    const searchStore = useSearchStore();

    const props = defineProps<{
        open: boolean;
    }>();

    const showAllServiceOptions = ref<boolean>(false);

    const numberOfResults = ref<number>();

    const displayAllServiceOptions = () => {
        showAllServiceOptions.value = true;
    }

    const hideAllServiceOptions = () => {
        showAllServiceOptions.value = false;
    }

    const setFilterActive = async (key:string) => {
        const option = searchStore.serviceFilterOptions!.find(x => x.serviceType.key === key);

        option!.active! = !option!.active!;

        let filtersToSearch: Array<string> | undefined = searchStore.serviceFilterOptions?.filter(x => x.active!).map(x => x.serviceType.key!)!;

        console.log(filtersToSearch);

        //search with new options
        // let serviceTypesArray: Array<string> | undefined = 
        //     searchStore.serviceSearchValue ? [searchStore.serviceSearchValue.key!] : undefined;
        
        if(searchStore.serviceSearchValue){
            // filtersToSearch.push(searchStore.serviceSearchValue.key!);
        }

        if(filtersToSearch.length == 0){
            filtersToSearch = undefined;
        }

        const params : client.DataMarinasSearchGetRequest = {
            name: searchStore.marinaSearchValue ?? undefined,
            searchCoordinates: searchStore.searchLocationCoordinatesValue ?? undefined,
            searchDistance: searchStore.searchRadiusValue,
            userCoordinates: searchStore.userLocation ?? undefined,
            serviceTypes: filtersToSearch ?? undefined,
            limit: undefined,   
            offset: 0,
        }

        console.warn(params);

        try{
            const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
            searchStore.marinaSearchResults = res;
            console.log(searchStore.marinaSearchResults);
            numberOfResults.value = searchStore.marinaSearchResults.length;
        }catch(err: any){
            if (err.response && err.response.status === 404) {
                searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                    numberOfResults.value = 0;
                return;
            }
            console.error("Search error: ", err);
            alert("search error")
            return;
        }

    }

    const clearFilters = async () => {
        searchStore.serviceFilterOptions?.forEach(x => x.active = false);

        let filtersToSearch: Array<string> | undefined = searchStore.serviceFilterOptions?.filter(x => x.active!).map(x => x.serviceType.key!)!;

console.log(filtersToSearch);

//search with new options
// let serviceTypesArray: Array<string> | undefined = 
//     searchStore.serviceSearchValue ? [searchStore.serviceSearchValue.key!] : undefined;

if(searchStore.serviceSearchValue){
    // filtersToSearch.push(searchStore.serviceSearchValue.key!);
}

if(filtersToSearch.length == 0){
            filtersToSearch = undefined;
        }

const params : client.DataMarinasSearchGetRequest = {
    name: searchStore.marinaSearchValue ?? undefined,
    searchCoordinates: searchStore.searchLocationCoordinatesValue ?? undefined,
    searchDistance: searchStore.searchRadiusValue ?? 4,
    userCoordinates: searchStore.userLocation ?? undefined,
    serviceTypes: filtersToSearch ?? undefined,
    limit: undefined,   
    offset: 0,
}

console.warn(params.serviceTypes);

try{
    const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
    searchStore.marinaSearchResults = res;
    console.log(searchStore.marinaSearchResults);
    numberOfResults.value = searchStore.marinaSearchResults.length;
}catch(err: any){
    if (err.response && err.response.status === 404) {
        searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
        numberOfResults.value = 0;
        return;
    }
    console.error("Search error: ", err);
    alert("search error")
    return;
}
    }
  
    const emit = defineEmits<{
        (e: 'close'): void;
    }>();
  
    const closeBox = () => {
      emit('close'); 
    }

    onMounted(() => {
        numberOfResults.value = searchStore.marinaSearchResults?.length;
    })

    watchEffect(() => {
        numberOfResults.value = searchStore.marinaSearchResults?.length;
    })
</script>

<style>
div.filterBox,
div.filterBox > div{
    padding: 30px;
    /* border-top: 2px solid rgb(186, 186, 186);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px; */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(240, 240, 240);
    min-height: 100vh;
    max-height: 100vh;
    overflow: scroll;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

div.filterBox > div > div.header{
    font-size: 17px;
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid rgb(186, 186, 186);
    padding-bottom: 20px;
    margin-bottom: 20px;;
}

div.filterBox > div > div.header > h1 {
    /* border: 1px solid red;
    flex-grow: 2;
    text-align: center; */
}

div.filterBox > div > div.header > span.close:hover{
    cursor: pointer;
}

div.filterBox > div > div.header > span.reset:hover{
    cursor: pointer;
}

div#showResults{
    position: fixed;
    width: 100%;
    max-height: 200px;
    min-height: 150px;
    overflow: hidden;
    bottom: 0px;
    background: white;
    border: 1px solid rgb(186, 186, 186);
}

div#showResults > div > button{
    display: block;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
}
</style>