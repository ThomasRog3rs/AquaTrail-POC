<template>
    <div class="search-container">
        <div class="container-header">
            <div class="search-error bg-red-600" v-if="props.searchHasError">{{props.searchErrorMsg}}</div>            
        </div>
        <form>            
            <input type="search" placeholder="Search Marina Name" v-model="marinaSearchValue">
            <v-select label="name" placeholder="Which service are you looking for?" :options="searchStore.serviceValues" v-model="serviceSearchValue"></v-select>
            <!-- <select>
              <option value="" disabled selected>Select Services (optional)</option>
            </select> -->
            <!-- <input type="number" placeholder="Distance from current location (km)"> -->
        </form>
        <div class="container-footer">
            <button class="bg-blue-700" @click="search">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useSearchStore } from '../../stores/searchStore';
    import { SearchPayload } from '../../types/search';

    const searchStore = useSearchStore();

    const props = defineProps<{
        searchHasError: boolean;
        searchErrorMsg: string | undefined; 
    }>();

    const emit = defineEmits<{
        (e: 'search', payload: SearchPayload): void;
    }>();

    const marinaSearchValue = ref<string>("");
    const serviceSearchValue = ref<string>("");

    const search = () => {
        const payload: SearchPayload = {
            marina: marinaSearchValue.value,
            service: serviceSearchValue.value
        };

        emit("search", payload);
    };

</script>