import {defineStore} from "pinia";
import {ref} from 'vue';
import * as client from '../api-client';
export const useSavedMarinasStore = defineStore("savedMarinaStore", () => {
    const savedMarinas = ref<Array<client.MarinaModel> | undefined>([]);
    
    return{
        savedMarinas
    }
}, {persist: true});