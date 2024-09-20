import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useQuestionnaireStore = defineStore('questionnaireStore', () => {
    const promptModalOpen = ref<boolean>(false);
    const pageVisits = ref<number>(0);
    const hasBeenPrompted = ref<boolean>(false);
    
    const trackUserInteractions = () => {
        pageVisits.value++;
        alert(pageVisits.value)
        // Check if user has visited 3 or more pages or interacted significantly
        if (pageVisits.value >= 4 && !hasBeenPrompted.value) {
            startPromptTimer(3000); // Wait 3 seconds before showing, or adapt to idle state
            hasBeenPrompted.value = true;
        }
    }
    
    
    const startPromptTimer = (timeMs : number) => {
        //To do: 
        // - check if they have or have not already done the form via cookie
        // alert("starting feedback form timer...");
        setTimeout(() => {
            promptModalOpen.value = true;
        }, timeMs)
    }
    
    const closePrompt = () => {
        promptModalOpen.value = false;
    }

    return {
        promptModalOpen,
        pageVisits,
        hasBeenPrompted,
        trackUserInteractions,
        startPromptTimer,
        closePrompt
    };
},{persist: true});