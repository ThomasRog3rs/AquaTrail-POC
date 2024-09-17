<template>
        <div id="searchContainer" clas="mb-2">
            <div id="searchTermContainer" :class="{ 'flex justify-between': !mapStore.mapLoaded }">
                <div id="searchTerm">
                    <span class="back" @click="goBack">
                        <svg class="w-6 h-6 text-gray-800 inline-block " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>

                    </span>
                    <span class="mt-3 truncate w-[75%]">{{ searchStore.searchLocationValue }}</span>
                </div>
                <slot></slot>
                <!-- <span v-if="searchStore.marinaSearchValue" class="searchTerm mr-5">&#9873; {{ searchStore.marinaSearchValue }}</span>
                <span v-if="searchStore.serviceSearchValue && !searchStore.marinaSearchValue">&#9733; {{searchStore.serviceSearchValue.value}}</span> -->
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