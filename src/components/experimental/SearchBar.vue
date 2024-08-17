<template>
        <div id="searchContainer">
            <div id="searchTerm">
                <span class="back" @click="goBack">
                &LeftArrow;
                </span>
                <span v-if="searchStore.marinaSearchValue" class="searchTerm mr-5">&#9873; {{ searchStore.marinaSearchValue }}</span>
                <span v-if="searchStore.serviceSearchValue && !searchStore.marinaSearchValue">&#9733; {{searchStore.serviceSearchValue}}</span>
            </div>
        </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../../stores/searchStore';
const searchStore = useSearchStore();
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