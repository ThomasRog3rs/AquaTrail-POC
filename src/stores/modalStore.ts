import {defineStore} from 'pinia';
import {ref} from 'vue';
export const useModalStore = defineStore('modalStore', () => {
    const showBackdrop = ref<boolean>(false);

    return {
        showBackdrop
    }
});