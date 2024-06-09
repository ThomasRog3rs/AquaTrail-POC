import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useMapStore = defineStore('mapStore', () => {
    const showMoorings = ref<boolean>(true);

    return {showMoorings};
});