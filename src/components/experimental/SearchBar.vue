<template>
        <div id="searchContainer" clas="mb-2">
            <div id="searchTermContainer" :class="{ 'flex justify-between': !mapStore.mapLoaded }">
                <div id="searchTerm" class="flex items-center justify-between space-x-2 w-full "> <!-- Set a max width for the entire container if needed -->
    <!-- Back Button on the far left -->
    <span class="flex-shrink-0 h-full" @click="goBack">
        <svg class="w-6 h-full text-gray-800 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
        </svg>
    </span>

    <!-- Input box that grows but never pushes the icon down -->
    <input type="text" 
           class="flex-grow max-w-[calc(100%-75px)] w-full p-2 bg-transparent border-gray-300 rounded focus:outline-none" 
           :value="searchStore.searchValue"
           placeholder="Search..."> <!-- Add placeholder for clarity -->

    <!-- Icon on the far right -->
    <span class="flex-shrink-0 p-2 bg-gray-300 rounded" v-html="searchStore.getCurrentSearchIcon()"></span>
</div>

            </div>
        </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../../stores/searchStore';
import { useMapStore } from '../../stores/mapStore';
const searchStore = useSearchStore();
const mapStore = useMapStore();
const emit = defineEmits<{
  (e: 'back'): void;
}>();

const goBack = () => {
    emit('back'); 
}

const openSearchForm = () => {

}
</script>

<style scoped>
div#searchContainer:hover{
    cursor: pointer;
}
</style>