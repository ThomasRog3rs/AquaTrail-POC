<template>
      <nav class="bg-blue-700" style="padding: 0px; padding-top: 10px ">
        <!-- <img src="../assets/signal-2024-08-14-154247_002.png" width="50" height="50" style="display: inline-block;"/>  -->
        <!-- <h1 class="logo">Mooring Pin</h1> -->
        <img style="margin: 0px auto" src="../assets/logo.png" width="50%" alt="">
        <!-- <p v-if="userLocation">Your location: {{ userLocation.longitude }}, {{ userLocation.latitude }}</p>         -->
        <div class="search-types">
          <template v-if="searchStore.searchItems.length > 1" v-for="type in searchStore.searchItems">
              <div class="search-type" :class="{ active: type.active }" @click="setActive(type.title)">
                {{ type.title }}
              </div>location
          </template>
        </div>
      </nav>
      <section id="search">
        <SearchForm></SearchForm>
        <!-- <div class="search-container">
          <div class="container-header">
              <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
            </div>
          <form>            
            <input type="search" placeholder="Search Marina Name" v-model="marinaSearchValue">
            <v-select label="name" placeholder="Which service are you looking for?" :options="searchStore.serviceValues" v-model="serviceSearchValue"></v-select>
          </form>
          <div class="container-footer">
              <button class="bg-blue-700" @click="search">Search</button>
          </div>
        </div> -->
      </section>
      <template v-if="userLocation && marinasClose != undefined">
      <div style="padding: 20px; padding-bottom: 0px;">
        <h2 class="mb-2">{{ activeOption }} closest to you</h2>
      </div>
      <section id="close-by">
        <div class="close-items">
          <Card v-if="marinasClose != undefined" v-for="marina in marinasClose" :id="marina.id!" :name="marina.name!" :description="marina.notes!" image="" :has-image="false" :distance="(marina.distance!.toFixed(2))" @click="searchStore.searchLocationValue = undefined"></Card>
        </div>
      </section>
    </template>

    <!-- <template v-if="mapStore.savedLocations.length > 0">
      <div style="padding: 20px; padding-bottom: 0px;">
        <h2 class="mb-2">Your saved locations</h2>
      </div>
      <section id="close-by">
        <div class="close-items">
          <template v-for="location in mapStore.savedLocations" :key="location.id">
               <Card :name="location.title!" :description="undefined" image="" :has-image="false" :distance="1.2"></Card>
            </template>
        </div>
      </section>
    </template> -->


<!-- <footer class="bg-blue-700 rounded-lg shadow m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Mooring Pin</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-white">
                <li>
                  <RouterLink to="/old" class="hover:underline me-4 md:me-6">View Legacy </RouterLink>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
        <span class="block text-sm text-gray-200 sm:text-center dark:text-gray-200">© 2024 <a href="https://flowbite.com/" class="hover:underline">Mooring Pin</a>. All Rights Reserved.</span>
    </div>
</footer> -->
      <footer>
      </footer>
      <!-- <div id="ad-space" v-if="adOpen">
        <span @click="closeAd" style="width: 100%; margin: 0px auto; text-align: center;">        
          click me to close
        </span>
        <img width="100%" src="data:image/jpeg;base64,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" alt="">
      </div> -->
  </template>
  <script setup lang="ts">
  import 'vue-select/dist/vue-select.css';
  import {ref, onMounted, watchEffect} from 'vue';
  import {useRouter} from 'vue-router';
  import Card from '../components/experimental/Card.vue';
  import { useSearchStore } from '../stores/searchStore';
  import { useMapStore } from '../stores/mapStore';
  import SearchForm from '../components/experimental/SearchForm.vue';
  import { SearchPayload } from '../types/search';
  import * as client from '../api-client';
  import { DataApi } from '../api-client';

  const dataApi = new DataApi();

  const mapStore = useMapStore();
  const searchStore = useSearchStore();

  const activeOption = ref<string>();

  const adOpen = ref<boolean>(true);

  const router = useRouter();
  // const marinaSearchValue = ref<string | undefined>();
  // const serviceSearchValue = ref<string | undefined>();
  const searchErrorMsg = ref<string>("");
  const searchHasError = ref<boolean>(false);

  //Call the API
  //alert(`Searching: ${marinaSearchValue.value}, ${serviceSearchValue.value}`);

  function closeAd(){
    adOpen.value = false;
  }

  function setActive(title:string){
    searchStore.searchItems.find(x => x.active)!.active = false;
    searchStore.searchItems.find(x => x.title === title)!.active = true;
    activeOption.value = searchStore.searchItems.find(x => x.active)!.title;
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

const marinasClose = ref<Array<client.MarinaModel> | undefined>(undefined);

  watchEffect(async () =>{
      if(searchStore.userLocation != undefined){
        console.log("get close", searchStore.userLocation);
        const marinaParams : client.DataMarinasSearchGetRequest = {
        coordinates: searchStore.userLocation,
        distance: 8,
        limit: 20
      }

      marinasClose.value = await dataApi.dataMarinasSearchGet(marinaParams) ?? undefined;
      marinasClose.value = marinasClose.value.sort((a : client.MarinaModel,b : client.MarinaModel) => {
       return a?.distance! - b?.distance!
      });
      console.warn(marinasClose.value)
    }
  });

onMounted(async () => {
  activeOption.value = searchStore.searchItems.find((x:any) => x.active)!.title;
  requestLocation();
  // Log current state immediately after request
  console.log('Initial Location:', userLocation.value);
  console.log('Initial Error:', error.value);

  // const params : client.DataMarinasSearchGetRequest = {
  //   name: "Marina",
  //   limit: 10,
  //   offset: 0
  // }
  // const res = await dataApi.dataMarinasSearchGet(params);
  // console.log(res);

  // const url: string = `${import.meta.env.VITE_AQUA_API_ROOT}/Types/service-types`;

  // try {
  //       const response = await fetch(url);
  //       // Make the HTTP GET request

  //       // Check if the response is OK (status code 200-299)
  //       if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       // Parse the JSON from the response
  //       const data = await response.json();

  //       // Log the JSON data to the console
  //       console.log(data);
  //   } catch (error) {
  //       // Log any errors that occur
  //       console.error('Error fetching data:', error);
  //   }
});
  </script>

  <style>
    nav, section{
      padding: 20px;
    }

    h1.logo{
      color: white;
      font-size: 25px;
      text-align: center;
      font-weight: bold;
    }

    h2{
      font-size: 20px;
    }

    div.search-types{
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: 15px;
    }

    div.search-type{
      text-align: center;
      padding: 10px;
      border: 2px solid transparent;
      width: 100%;
      margin: 10px;
      color: white;
      border-radius: 100px;
      font-weight: 500;
    }

    div.search-type:hover{
      cursor: pointer;
      background-color: #2563eb;
    }

    div.search-type.active{
      background-color: #1e3a8a;
      border: 2px solid white;
    }

    .search-container{
      border: 5px solid #facc15;
      border-radius: 8px;
      /* padding: 5px; */
    }

    .search-container > form{
      padding: 5px;
      background-color: whitesmoke;
    }

    .search-container > form > input, select{
      width: 100%;
      padding: 20px;
      background-color: whitesmoke;
    }

    .search-container > form > input:not(:last-child),
    .search-container > form > select:not(:last-child) {
      border-bottom: 1px solid rgb(186, 186, 186);
    }

    .search-container > form > input::placeholder{
      color:rgb(143, 143, 143)
    }

    select {
      color: rgb(186, 186, 186);
    }

    .search-container > .container-footer > button{
      width: 100%;
      color: white;
      padding: 0px;
      padding: 15px;
      font-weight: 500;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

    }

    .close-items{
      width: 800px;
      display: flex;
      justify-content:flex-start;
    }

    section#close-by{
      overflow-x: scroll;
      margin-right: 20px;
    }

    /* Hide scrollbar for Chrome, Safari, and Edge */
    section#close-by::-webkit-scrollbar {
      display: none; /* Chrome, Safari, and Edge */
    }

    div#ad-space{
      position: sticky;
      bottom: 0;
      width: 100%;
      background-color: whitesmoke;
      outline: 2px solid rgb(88, 88, 88);
      padding: 20px;
    }

    .container-header > div.search-error{
      /* background-color: red !important; */
      width: 100%;
      color: white;
      padding: 0px;
      padding: 15px;
      font-weight: 500;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: center;
    }
  </style>
