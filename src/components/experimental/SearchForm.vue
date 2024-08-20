<template>
    <div class="search-container">
        <div class="container-header">
            <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
        </div>
        <form>            
            <input type="search" placeholder="Search Marina Name" v-model="searchStore.marinaSearchValue">
            <v-select label="value" placeholder="Which service are you looking for?" :options="serviceTypes" v-model="searchStore.serviceSearchValue"></v-select>
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
    import {ServiceTypeModel, TypesApi, DataApi} from '../../api-client';
    import * as client from '../../api-client';

    const types = new TypesApi();
    const dataApi = new DataApi();

    const router = useRouter();
    const searchStore = useSearchStore();

    const searchErrorMsg = ref<string>("");
    const searchHasError = ref<boolean>(false);

    const emit = defineEmits<{
        (e: 'searched'): void;
    }>();

    async function search() {
        if (
            (searchStore.marinaSearchValue === undefined || searchStore.marinaSearchValue === null || searchStore.marinaSearchValue === '') &&
            (searchStore.serviceSearchValue === undefined || searchStore.serviceSearchValue=== null)
        ) {
            searchErrorMsg.value = "Please provide one or more values";
            searchHasError.value = true;
            return;
        }

        let serviceTypesArray: Array<string> | undefined = 
            searchStore.serviceSearchValue ? [searchStore.serviceSearchValue.key!] : undefined;
        const params : client.DataMarinasSearchGetRequest = {
            name: searchStore.marinaSearchValue ?? undefined,
            coordinates: searchStore.userLocation ?? undefined,
            distance: undefined,
            serviceTypes: serviceTypesArray,
            limit: undefined,   
            offset: 0,
        }

        console.warn(params.serviceTypes);

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