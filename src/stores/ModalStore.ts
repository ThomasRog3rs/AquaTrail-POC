import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useModalStore = defineStore('modalStore', () => {
    const modalOpen = ref<boolean>(false);

    return {modalOpen};
});