import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Question} from "../types/question";
import * as client from '../api-client';
import {QuestionnaireApi} from "../api-client/";
export const useQuestionnaireStore = defineStore('questionnaireStore', () => {
    const promptModalOpen = ref<boolean>(false);
    const pageVisits = ref<number>(0);
    const hasBeenPrompted = ref<boolean>(false);
    const questionAPI = new QuestionnaireApi();

    
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
                "Search for moorings as well as marinas",
                "Search for services (e.g., Elsan points, fuel stations)",
                "Contact marina offices through the app",
                "Book marinas and moorings through the app",
                "Place orders with a fuel boat through the app",
                "Marina or mooring availability updates",
                "Navigation features",
                "Closures and outage warnings/information",
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
                "Other"
            ],
            hasBeenAnswered: false,
            theAnswer: undefined
        },
        {
            id: 7,
            question: "Do you have any additional comments or suggestions?",
            type: "text",
            options: [],
            hasBeenAnswered: false,
            theAnswer: undefined
        }
    ]);

    const isTimerRunning = ref<boolean>(false);
    
    const trackUserInteractions = () => {
        pageVisits.value++;
        // alert(pageVisits.value)
        // Check if user has visited 3 or more pages or interacted significantly
        if (pageVisits.value >= 4 && !hasBeenPrompted.value && !isTimerRunning.value) {
            isTimerRunning.value = true;
            startPromptTimer(15000); // Wait 15 seconds before showing, or adapt to idle state
        }
    }
    
    
    const startPromptTimer = (timeMs : number) => {
        // alert("prompt has started t-15s")
        //To do: 
        // - check if they have or have not already done the form via cookie
        // alert("starting feedback form timer...");
        setTimeout(() => {
            promptModalOpen.value = true;
            hasBeenPrompted.value = true;
            isTimerRunning.value = false;
            // alert("prompt open")
        }, timeMs)
    }
    
    const closePrompt = async () => {
        promptModalOpen.value = false;
        hasBeenPrompted.value = true;
        
        const postRequest : client.ApiQuestionnairePostRequest = {
            questionnaireModel: {
                questionNumber: 0,
                questionName: "please give us feedback",
                questionType: "prompt",
                questionOptions: ["yes", "no"],
                answers: ["no", navigator.userAgent]
            }
        }
        console.log(postRequest);
        await questionAPI.apiQuestionnairePost(postRequest);
    }

    const acceptPrompt = async () => {
        promptModalOpen.value = false;
        hasBeenPrompted.value = true;
        
        const postRequest : client.ApiQuestionnairePostRequest = {
            questionnaireModel: {
                questionNumber: 0,
                questionName: "please give us feedback",
                questionType: "prompt",
                questionOptions: ["yes", "no"],
                answers: ["yes", navigator.userAgent]
            }
        }
        console.log(postRequest);
        await questionAPI.apiQuestionnairePost(postRequest);
    }

    return {
        promptModalOpen,
        pageVisits,
        hasBeenPrompted,
        questions,
        trackUserInteractions,
        startPromptTimer,
        closePrompt,
        acceptPrompt
    };
},{persist: true});