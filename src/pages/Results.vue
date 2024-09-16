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
        <SearchBar @back="goHome" @click="openSearchBox"></SearchBar>
         
        <!-- <div id="searchContainer">
            <div id="searchTerm">
                <span class="back" @click="goHome">
                &LeftArrow;
                </span>
                <span class="searchTerm">"Search Term here"</span>
            </div>
        </div> -->
    </div>
    <!-- Icons: https://www.freepik.com/icon/sort_4511377 -->
    <div id="searchOptions" class="shadow-lg p-4">
        <div class="mt-6 flex justify-between">
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


        <router-link :to="{name: 'Marina', params: {id: marina.id}}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </router-link>
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
import {onBeforeMount, onMounted, ref} from 'vue';
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