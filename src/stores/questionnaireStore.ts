import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Question} from "../types/question";
export const useQuestionnaireStore = defineStore('questionnaireStore', () => {
    const promptModalOpen = ref<boolean>(false);
    const pageVisits = ref<number>(0);
    const hasBeenPrompted = ref<boolean>(false);
    
    const questions = ref<Question[] >([
        {
            id: 1,
            question: "How easy was it to find marinas using our search and map features?",
            options: ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"],
            type: "radio",
            hasBeenAnswered: false,
            theAnswer: undefined
        },
        {
            id: 2,
            question: "Did the information provided about each marina (services, contact details, etc.) meet your needs?",
            options: ["Yes", "Mostly", "Somewhat", "No"],
            type: "radio",
            hasBeenAnswered: false,
            theAnswer: undefined
        },
        {
            id: 3,
            question: "What features did you find most helpful? (Select all that apply)",
            options: [
                "Search by location",
                "Search radius",
                "Sorting by name/distance/services",
                "Filters by services",
                "Map view",
                "Marina details"
            ],
            type: "multi-select",
            hasBeenAnswered: false,
            theAnswer: undefined
        },
        {
            id: 4,
            question: "What other features would you find useful on our website? (Select all that apply)",
            options: [
                "Ability to search for moorings as well as marinas",
                "Ability to search for services (e.g., water points, Elsan points, fuel stations)",
                "Booking stays at marinas and moorings through the app",
                "Ability to place orders with a fuel boat through the app",
                "Ability to contact marina offices directly through the app",
                "Notifications for marina or mooring availability updates",
                "Navigation features",
                "Closures and outage warnings and information",
                "Boat maintenance and service reminders (e.g., engine service, fire safety checks)"
            ],
            hasBeenAnswered: false,
            type: "multi-select",
            theAnswer: undefined
        },
        {
            id: 5,
            question: "Would you recommend this app to other boaters to find marinas?",
            options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
            type: "radio",
            hasBeenAnswered: false,
            theAnswer: undefined
        },
        {
            id: 6,
            question: "Which best describes you as a boater?",
            type: "radio",
            options: [
                "I live on my boat (Liveaboard boater)",
                "I use my boat for holidays/recreation (Holiday boater)",
                "I don't own a boat but I’m interested in boating",
                "Other (please specify)"
            ],
            hasBeenAnswered: false,
            theAnswer: undefined
        }
    ]);
    
    const trackUserInteractions = () => {
        pageVisits.value++;
        // alert(pageVisits.value)
        // Check if user has visited 3 or more pages or interacted significantly
        if (pageVisits.value >= 4 && !hasBeenPrompted.value) {
            startPromptTimer(3000); // Wait 3 seconds before showing, or adapt to idle state
            // hasBeenPrompted.value = true;
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
        questions,
        trackUserInteractions,
        startPromptTimer,
        closePrompt
    };
},{persist: true});