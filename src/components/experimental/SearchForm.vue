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
    import {ServiceTypeModel, TypesApi} from '../../api-client';

    const types = new TypesApi();

    const router = useRouter();
    const searchStore = useSearchStore();

    const searchErrorMsg = ref<string>("");
    const searchHasError = ref<boolean>(false);

    const emit = defineEmits<{
        (e: 'searched'): void;
    }>();

    function search() {
        if (
            (searchStore.marinaSearchValue === undefined || searchStore.marinaSearchValue === null || searchStore.marinaSearchValue === '') &&
            (searchStore.serviceSearchValue === undefined || searchStore.serviceSearchValue=== null)
        ) {
            searchErrorMsg.value = "Please provide one or more values";
            searchHasError.value = true;
            return;
        }

        router.push("/results");
        searchHasError.value = false;
        emit("searched");
    }

    const serviceTypes = ref<Array<ServiceTypeModel> | undefined>();

    onMounted(async () => {
        try {
        const response:any = await types.typesServiceTypesGet(); // Replace with your API method
        serviceTypes.value = response;
        console.log(serviceTypes.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }    })
</script>