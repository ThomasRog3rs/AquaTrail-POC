<template>
        <div id="searchContainer">
            <div id="searchTermContainer" :class="{ 'flex justify-between': !mapStore.mapLoaded }">
                <div id="searchTerm">
                    <span class="back" @click="goBack">
                        &LeftArrow;
                    </span>
                    <span class="mt-3">{{ searchStore.searchLocationValue }}</span>
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