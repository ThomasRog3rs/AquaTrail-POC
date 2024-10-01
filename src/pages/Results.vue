<template>
  <transition name="down">
    <div id="searchForm" class="shadow-lg" v-if="searchBoxOpen">
      <div class="flex justify-between text-lg">
        <span class="hover:cursor-pointer" @click="searchBoxOpen = false">&cross;</span>
        <h3 class="mb-2">Edit your search</h3>
        <span></span>
      </div>
      <SearchForm :search-has-error="false" :search-error-msg="undefined" @searched="handleSearched()"></SearchForm>
    </div>
  </transition>

  <div id="overlay" v-show="searchBoxOpen" @click="searchBoxOpen = false"></div>

  <div class="bg-blue-700" style="padding: 15px; padding-top: 0px; height: 80px">
    <span class="mx-auto w-full max-w-screen-xl">
    <SearchBar @back="goHome" @click="openSearchBox"></SearchBar>

    <!-- <div id="searchContainer">
        <div id="searchTerm">
            <span class="back" @click="goHome">
            &LeftArrow;
            </span>
            <span class="searchTerm">"Search Term here"</span>
        </div>
    </div> -->
  </span>
  </div>
  
  <!-- Icons: https://www.freepik.com/icon/sort_4511377 -->
  <div id="searchOptions" class="shadow-lg p-4">
    <div class="mt-7 flex justify-between">
            <span @click="openSort">
                <svg class="w-6 h-6 text-gray-800 inline-block mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"/>
</svg>

                Sort
            </span>
      <span @click="openFilter">
                <svg class="w-6 h-6 text-gray-800 inline-block mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z"/>
</svg>

                Filter
            </span>
      <span @click="router.push('/results/map')">                
                <svg class="text-gray-800 inline-block mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>

                Map
            </span>
    </div>
  </div>
  <div id="searchResults" v-if="searchStore.marinaSearchResults?.length! > 0">
    <!-- <div class="resultsCard">
        <h1>Marina Name</h1>
        
    </div> -->
    <span>{{ searchStore.marinaSearchResults?.length }} results</span>

    <div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4 mt-2" v-for="marina in searchStore.marinaSearchResults">
      <router-link :to="{name: 'Marina', params: {id: marina.id}}">
        <img class="rounded-t-lg" src="" alt="" />
      </router-link >
      <div class="p-5">
        <router-link :to="{name: 'Marina', params: {id: marina.id}}" class="flex justify-between">
          <h2 class="mb-2 text-2xl font-bold text-gray-700 md:text-2xl lg:text-3xl"> {{ marina.name }}</h2>
          <span v-if="marinaIsSaved(marina.id!)">
              <svg class="w-7 h-7 text-[#facc15]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
              </svg>
            </span>
          <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ marina.name }}</h5> -->
        </router-link >
        <!-- <p class="mb-3 font-normal text-gray-700">{{marina.notes!}}</p> -->
        <ul class="text-md font-normal text-gray-800 lg:text-xl list-inside mb-4">
          <!-- <li v-if="marina.address">Address: {{ marina.address }}</li> -->
          <!-- <li v-if="marina.website"><a :href="marina.website" class="text-blue-700" target="_blank">{{ marina.website }}</a></li> -->
          <!-- <li v-if="marina.phoneNumber">Phone: {{ marina.phoneNumber }}</li> -->
          <li v-if="marina.canalName">Canal: {{ marina.canalName }}</li>
          <li>{{ marina.services?.length }} service(s)</li>
          <li v-if="marina.distanceFromUser! > 0">Distance from you: {{ (marina.distanceFromUser!).toFixed(2) }} miles</li>
          <li v-if="marina.distanceFromSearch! > 0">Distance from search: {{ (marina.distanceFromSearch!).toFixed(2) }} miles</li>
        </ul>

        <span class="flex">
          <router-link :to="{name: 'Marina', params: {id: marina.id}}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View Details
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </router-link>
          <div class="ml-auto">
            <span v-if="marina.phoneNumber">
              <span class="text-blue-600">
                <svg class="w-6 h-6" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                </svg>
              </span>
            </span>
            <span v-if="marina.website">
              <span class="text-blue-600">
                <svg class="w-6 h-6" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
</svg>
              </span>
            </span>
            <span v-if="marina.services?.length! > 0">
              <span class="text-blue-600">
                <svg class="w-6 h-6" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="m7.4 3.736 3.43 3.429A5.046 5.046 0 0 1 12.133 7c.356.01.71.06 1.056.147l3.41-3.412a2.32 2.32 0 0 1 .451-.344A9.89 9.89 0 0 0 12.268 2a10.022 10.022 0 0 0-5.322 1.392c.165.095.318.211.454.344Zm11.451 1.54-.127-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.03.023.05.054.078.077.237.194.454.41.651.645.033.038.077.067.11.107l2.926-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.025.03-.058.052-.082.082a4.97 4.97 0 0 1-.633.639c-.04.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.443-4.763a3.037 3.037 0 0 0-1.383-1.1l-.012-.007a2.956 2.956 0 0 0-1-.213H12a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.009.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .488 1.716l.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.319.129.657.2 1 .213.393.015.784-.05 1.15-.192.012-.005.021-.013.033-.018a3.01 3.01 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.349.447l-3.426 3.426c.112.428.166.869.161 1.311a4.954 4.954 0 0 1-.148 1.054l3.413 3.412c.133.134.249.283.347.444A9.88 9.88 0 0 0 22 12.269a9.913 9.913 0 0 0-1.386-5.319ZM16.6 20.264l-3.42-3.421c-.386.1-.782.152-1.18.157h-.135c-.356-.01-.71-.06-1.056-.147L7.4 20.265a2.503 2.503 0 0 1-.444.347A9.884 9.884 0 0 0 11.732 22H12a9.9 9.9 0 0 0 5.044-1.388 2.515 2.515 0 0 1-.444-.348ZM3.735 16.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L3.735 7.4a2.508 2.508 0 0 1-.349-.447 9.889 9.889 0 0 0 0 10.1 2.48 2.48 0 0 1 .35-.453Zm5.101-.758a4.959 4.959 0 0 1-.65-.645c-.034-.038-.078-.067-.11-.107L5.15 18.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.029-.018-.049-.053-.078-.076Zm-.755-6.928c.03-.037.07-.063.1-.1.183-.22.383-.423.6-.609.046-.04.081-.092.128-.13L5.983 5.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707l2.932 2.931Z"/>
</svg>      
              </span>
            </span>
          </div> 
        </span>

      </div>
    </div>
  </div>
  <div id="searchResults" v-else>
    No results found, try adjusting your search
  </div>

  <transition name="slide">
    <SortBox :open="sortResultsOpen" title="Sort By" @close="closeSort">
      <fieldset>
        <legend class="sr-only">Select an option to sort the results:</legend>
        <template v-for="sortOption in searchStore.sortOptions" :key="sortOption.id">
          <div v-if="sortOption.enabled === true" @click="closeSort">
            <input type="radio" :id="sortOption.id!.toString()" name="filter" :value="sortOption.id!" :checked="sortOption.active" @click="searchStore.setSortOption(sortOption.id)" />
            <label :for="sortOption.id!.toString()">{{sortOption.name}}</label>
          </div>
        </template>
      </fieldset>
    </SortBox>
  </transition>
  <!-- <FilterBox :open="filterResultsOpen" @close="closeFilter">
  </FilterBox> -->

  <transition name="slide">
    <FilterBox :open="filterResultsOpen" :options="searchStore.serviceFilterOptions" @close="closeFilter">
      <h1>test</h1>
    </FilterBox>
  </transition>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import SortBox from '../components/experimental/SortBox.vue';
import FilterBox from '../components/experimental/FilterBox.vue';
import { useSearchStore } from '../stores/searchStore';
import SearchBar from '../components/experimental/SearchBar.vue';
import SearchForm from '../components/experimental/SearchForm.vue';
import * as client from '../api-client';
import {useSavedMarinasStore} from "../stores/savedMarinasStore";
import {filterOption} from "@/types/search";

const router = useRouter();
const searchStore = useSearchStore();
const savedMarinasStore = useSavedMarinasStore();

const showAllServiceOptions = ref<boolean>(false);

const searchBoxOpen = ref<boolean>(false);
const sortResultsOpen = ref<boolean>(false);
const filterResultsOpen = ref<boolean>(false);

function marinaIsSaved(marinaId: string){
  return savedMarinasStore.savedMarinas?.some(x => x.id === marinaId)!;
}

function handleSearched(){
  searchBoxOpen.value = false;
  let services : Array<filterOption> = [];
  const fuckoff = searchStore.marinaSearchResults?.forEach(marina => {
    marina.services!.forEach(service => {
      if(!services.some(x => x?.serviceType.value === service.serviceType!.value)){
        const filterOption : filterOption = {
          serviceType: service.serviceType!,
          active: false
        }
        console.log(filterOption);
        services.push(filterOption);
      }
    });
    console.warn(marina.name + ":");
    console.log(services);
  })!;
  services =  services.sort((a:filterOption, b:filterOption) => {
    return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
  });
  searchStore.serviceFilterOptions = [];
  searchStore.serviceFilterOptions!.push(...services);
}

const openSearchBox = () => {
  searchBoxOpen.value = true;
}

const closeSearchBox = () => {
  searchBoxOpen.value = false;
}

const openSort = () => {
  sortResultsOpen.value = true;
  filterResultsOpen.value = false;
}

const closeSort = () =>{
  sortResultsOpen.value = false;
}

const openFilter = () => {
  filterResultsOpen.value = true;
  sortResultsOpen.value = false;
}

const closeFilter = () => {
  filterResultsOpen.value = false;
}

function goHome(){
  router.push("/");
}
const availableServiceOptions = ref<Array<filterOption>>([]);
onMounted(async () => {
  searchStore.setSortOption(1);
  await searchStore.resetServiceFilterOptions();
  searchStore.setServiceFilterOptionActive(searchStore?.serviceSearchValue?.key!);

  let services : Array<filterOption> = [];
  const fuckoff = searchStore.marinaSearchResults?.forEach(marina => {
    marina.services!.forEach(service => {
      if(!services.some(x => x?.serviceType.value === service.serviceType!.value)){
        const filterOption : filterOption = {
          serviceType: service.serviceType!,
          active: false
        }
        console.log(filterOption);
        services.push(filterOption);
      }
    });
    console.warn(marina.name + ":");
    console.log(services);
  })!;
  services =  services.sort((a:filterOption, b:filterOption) => {
    return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
  });
  searchStore.serviceFilterOptions = [];
  searchStore.serviceFilterOptions!.push(...services);
})

onBeforeMount(() => {
  if(searchStore.userLocation){
    searchStore.sortOptions!.find(x => x.name === "Distance")!.enabled = true;
  }
})
</script>

<style>
div#searchForm{
  /* transform: translateY(0); */
  background-color: whitesmoke;
  z-index: 9;
  position: fixed;
  padding: 20px;
  width: 100%;
  /* text-align: center; */
}

/* Animation for slide down */
.down-enter-from{
  opacity: 0;
  transform: translateY(-100%);
}

.down-enter-to{
  opacity: 1;
  transform: translateY(0);
}

.down-enter-active{
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-out;
}

.down-leave-from{
  opacity: 1;
  transform: translateY(0);
}

.down-leave-to{
  opacity: 0;
  transform: translateY(-100%);
}

.down-leave-active{
  transition: transform 0.3s ease-in-out, opacity 0.5s ease-out;

}

/* Animation for slide up */
.slide-enter-from{
  opacity: 0;
  transform: translateY(100%);
}

.slide-enter-to{
  opacity: 1;
  transform: translateY(0);
}

.slide-enter-active{
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-out;
}

.slide-leave-from{
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-to{
  opacity: 0;
  transform: translateY(100%);
}

.slide-leave-active{
  transition: transform 0.3s ease-in-out, opacity 0.5s ease-out;

}

/* Slide-up transition */
/* .slide-up-enter-active, .slide-up-leave-active {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-up-enter, .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.slide-up-enter-to {
    transform: translateY(100%);
    opacity: 1 !important;
}

.slide-up-leave {
    transform: translateY(100%);
    opacity: 1 !important;
} */

div#searchTermContainer{
  background-color: whitesmoke;
  padding: 15px;

  border: 5px solid #facc15;
  border-radius: 8px;
}

div#searchContainer{
  position: relative;
  top: 20px;
}

div#searchOptions{
  background-color: whitesmoke;
  width: 100%;
  height: 80px;
}

div#searchOptions > div > span{
  /* border: 1px solid red; */
  width: 100%;
  text-align: center;
}

div#searchOptions > div > *:hover{
  cursor: pointer;
}

div#searchTerm > span{
  /* padding: 4px; */
  display: inline-block;
}

div#searchTerm > span.back{
  /* margin: 5px;s */
  font-size: 40px;
  margin-top: -15px;
  margin-right: 15px;
  /* width: 15%; */
}

div#searchTerm > span.back:hover{
  cursor: pointer;
}

div#searchTerm > span.searchTerm{
  /* margin-left: 19%; */
}

div#searchResults{
  padding: 20px;
}

div.resultsCard{
  border: 2px solid rgb(186, 186, 186);
  border-radius: 8px;
  padding: 10px;
}
</style>