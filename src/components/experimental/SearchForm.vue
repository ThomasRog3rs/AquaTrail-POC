<template>
    <div class="search-container">
        <div class="container-header">
            <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
        </div>
        <form>            
            <input type="search" placeholder="Search Marina Name" v-model="searchStore.marinaSearchValue">
            <v-select label="name" placeholder="Which service are you looking for?" :options="searchStore.serviceValues" v-model="searchStore.serviceSearchValue"></v-select>
        </form>
        <div class="container-footer">
            <button class="bg-blue-700" @click="search">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useSearchStore } from '../../stores/searchStore';
    import { useRouter } from 'vue-router';

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
            (searchStore.serviceSearchValue === undefined || searchStore.serviceSearchValue=== null || searchStore.serviceSearchValue  === '')
        ) {
            searchErrorMsg.value = "Please provide one or more values";
            searchHasError.value = true;
            return;
        }

        router.push("/results");
        searchHasError.value = false;
        emit("searched");
    }
</script>