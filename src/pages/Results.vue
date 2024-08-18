<template>
    <transition name="down">
        <div id="searchForm" class="shadow-lg" v-if="searchBoxOpen">
            <div class="flex justify-between text-lg">
                <span class="hover:cursor-pointer" @click="searchBoxOpen = false">&cross;</span>
                <h3 class="mb-2">Edit your search</h3>
                <span></span>
            </div>
            <SearchForm :search-has-error="false" :search-error-msg="undefined" @searched="searchBoxOpen = false"></SearchForm>
        </div>
    </transition>

    <div id="overlay" v-show="searchBoxOpen" @click="searchBoxOpen = false"></div>

    <div class="bg-blue-700" style="padding: 15px; padding-top: 0px; height: 80px;">
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
    <div id="searchOptions" class="shadow-lg p-4">
        <div class="mt-6 flex justify-between">
            <span @click="openSort">
                &uparrow;
                &downarrow;
                Sort
            </span>
            <span @click="openFilter">
                &#9906;
                Filter
            </span>
            <span @click="router.push('/results/map')">                
                &GreaterLess;
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
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ marina.name }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">{{marina.notes!}}</p>
        <ul style="list-style: inside; margin-bottom: 15px;">
            <!-- <li v-if="marina.address">Address: {{ marina.address }}</li> -->
            <li v-if="marina.website"><a :href="marina.website" class="text-blue-700" target="_blank"> {{marina.website }}</a></li>
            <li v-if="marina.phoneNumber">Phone: {{ marina.phoneNumber }}</li>
            <li v-if="marina.canalName">Canal: {{ marina.canalName }}</li>
            <li>{{ marina.services?.length }} service</li>
        </ul>

        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
    </div>
    <div id="searchResults" v-else>
        No results found, try adjusting your search
    </div>

    <transition name="slide">
        <FilterBox :open="sortResultsOpen" title="Sort By" @close="closeSort">
            <fieldset>
            <legend class="sr-only">Select an option to sort the results:</legend>

                <div>
                    <input type="radio" id="Distance" name="filter" value="Distance" checked />
                    <label for="Distance">Distance</label>
                </div>

                <div>
                    <input type="radio" id="Alphabetically" name="filter" value="Alphabetically" />
                    <label for="Alphabetically">Alphabetically</label>
                </div>

                <div>
                    <input type="radio" id="Services" name="filter" value="Services" />
                    <label for="Services">Number Of Services</label>
                </div>
            </fieldset>
        </FilterBox>
    </transition>

    <transition name="slide">
        <FilterBox :open="filterResultsOpen" title="Filter By" @close="closeFilter">
            <fieldset>
                <legend class="">Marinas with these services:</legend>
                <div v-if="!showAllServiceOptions" v-for="index in 5">
                    <input type="checkbox" :id="searchStore.serviceTypes![index].key!" :value="searchStore.serviceTypes![index].value" name="filter-services"  />
                    <label :for="searchStore.serviceTypes![index].key!">{{ searchStore.serviceTypes![index].value! }}</label>
                </div>
                <div v-for="service in searchStore.serviceTypes" v-if="showAllServiceOptions">
                    <input type="checkbox" :id="service.key!" name="filter-services" :value="service.value!" />
                    <label :for="service.key!">{{ service.value }}</label>
                </div>

                <span>
                    <span v-if="!showAllServiceOptions" @click="displayAllServiceOptions" class="text-blue-700 cursor-auto hover:cursor-pointer">View More</span>
                    <span v-if="showAllServiceOptions" @click="hideAllServiceOptions" class="text-blue-700 cursor-auto hover:cursor-pointer">View Less</span>
                </span>
            </fieldset>
            <fieldset>
            <legend class="">Distance:</legend>
                <div>
                    <input type="checkbox" id="Distance" name="filter" value="Distance" checked />
                    <label for="Distance">Filter by distance</label>
                </div>
                <div>
                    <input class="shadow" type="number" id="Distance" name="filter" value="Distance" placeholder="distance (km)" /> &ThickSpace; km
                    <!-- <label for="Distance">Filter by distance</label> -->
                </div>
            </fieldset>
            <fieldset>
            <legend class="">Marinas with these close by:</legend>
                <div>
                    <input type="checkbox" id="Pubs" name="filter-close" value="Pubs" checked />
                    <label for="Pubs">Pubs</label>
                </div>

                <div>
                    <input type="checkbox" id="Supermarkets" name="filter-shop" value="Supermarkets" />
                    <label for="Supermarkets">Supermarkets</label>
                </div>

                <div>
                    <input type="checkbox" id="Transport" name="filter-transport" value="Transport" />
                    <label for="Transport">Public transport</label>
                </div>
            </fieldset>
        </FilterBox>
    </transition>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import FilterBox from '../components/experimental/FilterBox.vue';
import { useSearchStore } from '../stores/searchStore';
import SearchBar from '../components/experimental/SearchBar.vue';
import SearchForm from '../components/experimental/SearchForm.vue';
import * as client from '../api-client';

const router = useRouter();
const searchStore = useSearchStore();

const showAllServiceOptions = ref<boolean>(false);

const searchBoxOpen = ref<boolean>(false);
const sortResultsOpen = ref<boolean>(false);
const filterResultsOpen = ref<boolean>(false);

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

const displayAllServiceOptions = () => {
    showAllServiceOptions.value = true;
}

const hideAllServiceOptions = () => {
    showAllServiceOptions.value = false;
}

function goHome(){
    router.push("/");
}
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

div#searchTerm{
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

div#searchOptions > div > *{
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