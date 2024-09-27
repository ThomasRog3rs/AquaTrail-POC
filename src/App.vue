<template>
  <DevelopmentPhaseBanner></DevelopmentPhaseBanner>
  
<!--  <div v-show="questionnaireStore.promptModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"></div>-->
  <main>
    <router-view></router-view>
  </main>
  <div v-if="cookieBannerOpen" class="fixed bottom-0 left-0 w-full bg-blue-700 text-white py-4 px-6 flex flex-col md:flex-row items-center z-[999]">
    <div class="flex-1 text-left mb-4 md:mb-0">
      <h2 class="text-lg font-semibold mb-1">Cookie Notice</h2>
      <p class="text-sm">We use a cookie to help improve the site. Your consent helps us to make valuable updates. <router-link to="/privacy-policy" class="underline">Privacy Policy</router-link></p>
    </div>
    <button class="absolute top-2 right-2 text-white text-lg" aria-label="Close" @click="cookieBannerOpen = false">
      &times;
    </button>
    <div class="flex flex-col w-full md:flex-row md:w-auto md:space-x-4">
      <button class="w-full md:w-1/2 bg-[#D9A61C] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mb-2 md:mb-0" @click="registerCookie">
        Accept
      </button>
      <button class="w-full md:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded" @click="cookieBannerOpen = false">
        Decline
      </button>
    </div>
  </div>
<!--  <QuestionnairePrompt></QuestionnairePrompt>-->
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import QuestionnairePrompt from "./components/experimental/QuestionnairePrompt.vue";

import * as client from './api-client';
import {RegisterSessionModel, SessionApi} from './api-client';
import {useSearchStore} from "./stores/searchStore";
import {useQuestionnaireStore} from './stores/questionnaireStore';
import DevelopmentPhaseBanner from "./components/experimental/DevelopmentPhaseBanner.vue";

const questionnaireStore = useQuestionnaireStore();

const sessionApi = new SessionApi();

const searchStore = useSearchStore();

const cookieBannerOpen = ref<Boolean>(false);

const registerCookie = async () => {
  const registerSession : client.RegisterSessionModel = {
    coordinates: searchStore.userLocation ?? undefined
  };
  
  const registerCookieRequest : client.SessionRegisterPostRequest = {
    registerSessionModel: registerSession,
  }
  
  let res : client.CheckSessionTypeModel = {};
  try{
    if(registerCookieRequest.registerSessionModel?.coordinates !== undefined){
      res = await sessionApi.sessionRegisterPost(registerCookieRequest);
    }else{
      res = await sessionApi.sessionRegisterPost();
    }
    console.log(res);
    cookieBannerOpen.value = false;
  }catch(error: any){
    console.error(error)
  }
}
interface userLocation {
  latitude: number;
  longitude: number;
}
const userLocation = ref<userLocation | null>(null);
const error = ref<string | null>(null);
const requestLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log('Location:', userLocation.value);  // Log location when obtained
          searchStore.userLocation = `${userLocation.value.longitude}, ${userLocation.value.latitude}`;
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              error.value = "User denied the request for Geolocation.";
              break;
            case err.POSITION_UNAVAILABLE:
              error.value = "Location information is unavailable.";
              break;
            case err.TIMEOUT:
              error.value = "The request to get user location timed out.";
              break;
            default:
              error.value = "An unknown error occurred.";
              break;
          }
          console.log('Error:', error.value);  // Log error if occurred
        }
    );
  } else {
    error.value = "Geolocation is not supported by this browser.";
    console.log('Error:', error.value);  // Log if geolocation is not supported
  }
};

onMounted(async () => {
  requestLocation();
  // alert(navigator.userAgent);
    
  const res : client.CheckSessionTypeModel = await sessionApi.sessionCheckSessionGet();
  console.log(res);
  cookieBannerOpen.value = !res.hasSession;
  // questionnaireStore.startPromptTimer(2800);
})
</script>

