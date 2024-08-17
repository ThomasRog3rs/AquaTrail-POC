<template>
        <div id="searchContainer">
            <div id="searchTerm">
                <span class="back" @click="goBack">
                &LeftArrow;
                </span>
                <span class="searchTerm">"Search Term here"</span>
            </div>
        </div>
</template>

<script setup lang="ts">
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