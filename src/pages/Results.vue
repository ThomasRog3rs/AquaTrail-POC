<template>
    <div class="bg-blue-700" style="padding: 15px; padding-top: 0px; height: 80px;">
        <div id="searchContainer">
            <div id="searchTerm">
                <span class="back" @click="goHome">
                &LeftArrow;
                </span>
                <span class="searchTerm">"Search Term here"</span>
            </div>
        </div>
    </div>
    <div id="searchOptions" class="shadow-lg p-4">
        <div class="mt-6 flex justify-between">
            <span @click="openSort">
                &uparrow;
                &downarrow;
                Sort
            </span>
            <span>
                &#9906;
                Filter
            </span>
            <span>                
                &GreaterLess;
                Map
            </span>
        </div>
    </div>
    <div id="searchResults">
        <!-- <div class="resultsCard">
            <h1>Marina Name</h1>
            
        </div> -->
        <span>12 results</span>

<div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4 mt-2">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Marina Name</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
<div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Marina Name</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
<div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Marina Name</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
<div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Marina Name</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            View more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
    </div>

    <transition name="slide">
        <div id="sortContainer" class="shadow-lg" v-if="sortResultsOpen">
            <div class="header">
                <h1>Sort By</h1>
                <span class="close" @click="closeSort">&cross;</span>
            </div>
            <fieldset>
            <legend class="sr-only">Select a maintenance drone:</legend>

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
        </div>
    </transition>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const sortResultsOpen = ref<boolean>(false);

const openSort = () => {
    sortResultsOpen.value = true;
}

const closeSort = () =>{
    sortResultsOpen.value = false;
}

function goHome(){
    router.push("/");
}
</script>

<style>
div#sortContainer{
    padding: 30px;
    border-top: 2px solid rgb(186, 186, 186);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: whitesmoke;
    min-height: 30vh;
    max-height: 50vh;
    overflow: scroll;
    /* transition: transform 0.3s ease-out, opacity 0.3s ease-out; */
}

div#sortContainer > div.header{
    font-size: 25px;
    display: flex;
    justify-content:space-between
}

div#sortContainer > div.header > span.close:hover{
    cursor: pointer;
}

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