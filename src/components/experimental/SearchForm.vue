<template>
    <div class="search-container shadow-xl">
        <div class="container-header">
          <!-- <div class="search-error bg-yellow-600 text-lg font-bold">Warning: search form in development, do NOT deploy to LIVE</div>             -->
          <!-- <div class="search-error bg-blue-600 text-lg font-bold !text-[#facc15]">Warning: search form in development, do NOT deploy to LIVE</div>             -->

            <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
        </div>

        <form class="mx-w-md mx-auto" @submit.prevent="manualFormEnter">
    <label for="search-location" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative bg-transparent">
      <!-- Icon on the left inside input field -->
      <div class="relative form-border-bottom">
  <!-- Left Icon Outside of Input -->
  <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
  </div>

  <!-- Input field with adjusted padding for the left icon -->
  <input
    type="search"
    autocomplete="off"
    id="search-location"
    class="block p-6 pl-11 pr-12 text-lg text-gray-900 bg-transparent w-full"
    placeholder="Location, Marina or Canal"
    required
    v-model="searchStore.searchValue"
    @focus="suggestionsActive = true"
    @blur="handleBlur"
    @keyup="setSuggestions(searchStore.searchValue ?? '')"
  />

  <!-- Right Icon Outside of Input -->
  <div v-if="searchStore.currentSearchType !== SearchType.None" class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
    <span class="flex-shrink-0 p-2 bg-gray-300 rounded" v-html="searchStore.getCurrentSearchIcon()"></span>
  </div>
</div>
      <!-- Suggestions box -->
      <div
        id="suggestions"
        ref="suggestionsBox"
        v-if="suggestionsActive"
        class="absolute w-full mt-1 bg-white shadow-xl z-10 p-4"
        :style="{ top: '100%', left: '0' }"
      >
        <ul>
          <li v-if="searchStore.userLocation" class="flex p-2 border-b border-grey-100 cursor-pointer text-blue-700 hover:bg-gray-100 hover:text-blue-900" @click="searchUserLocation"><svg class="mr-2 w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg><span>Search My Current Location</span> 
</li>
          
          <li v-if="searchStore.searchValue === '' || searchStore.searchValue === undefined" class="p-2 text-gray-700">
            Start typing for suggestions
          </li>
          <li v-else-if="suggestions && suggestions!.length == 0" class="p-2 text-gray-700">
            No results found
          </li>
          <template v-for="suggestion in suggestions" :key="suggestion.name">
            <li 
              class="p-2 border-b border-grey-100 cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center" 
              :class="{
                'bg-blue-100 text-blue-700': suggestion.type === SearchType.Coordinates,
                'bg-green-100 text-green-700': suggestion.type === SearchType.Marina,
                'bg-orange-100 text-orange-700': suggestion.type === SearchType.Canal
              }"
              @click="setSelectedSuggestion(suggestion)">
              
              <span class="mr-2" v-html="getIcon(suggestion.type)"></span>
              {{ suggestion.name }}
            </li>
          </template>

          <!-- <li class="p-2 border-b border-grey-100 cursor-pointer hover:bg-gray-100 hover:text-gray-900">123</li>
          <li class="p-2 border-b border-grey-100 cursor-pointer hover:bg-gray-100 hover:text-gray-900">123</li>
          <li class="p-2 cursor-pointer hover:bg-gray-100 hover:text-gray-900">123</li> -->
        </ul>
      </div>
    </div>
    <div style="width: 100%;" v-if="searchStore.currentSearchType === SearchType.Coordinates">
      <label for="" style="text-align: left; display: block; width: 90%; margin: 0 auto; margin-top: 20px;">
        Search Radius: {{ searchStore.searchRadiusValue }} Miles
      </label>
      <input
        type="range"
        placeholder="Radius (miles)"
        v-model="searchStore.searchRadiusValue"
        max="30"
        min="1"
        value="1"
        style="display: block; width: 90%; margin: 0 auto; margin-bottom: 12px; margin-top: 12px;"
      />
    </div>
  </form>
        <div class="container-footer">
            <button class="bg-blue-700" @click="search">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watchEffect } from 'vue';
    import { useSearchStore } from '../../stores/searchStore';
    import { useRouter } from 'vue-router';
    import {ServiceTypeModel, TypesApi, DataApi, LocationApi} from '../../api-client';
    import * as client from '../../api-client';
    import { SearchType } from '../../types/search';

    const types = new TypesApi();
    const dataApi = new DataApi();
    const locationApi = new LocationApi();

    interface SuggestionModel {
      name: string;
      type: SearchType;
      coordinates: string | undefined;
      score: number
    }

    const suggestionsBox = ref<HTMLElement | undefined>();

    const canalNames = ref<string[] | undefined>(undefined);
    const marinaNames = ref<string[] | undefined>(undefined);

    const selectedSuggestion = ref<SuggestionModel | undefined>(undefined);

    function setSelectedSuggestion(suggestion: SuggestionModel){
      searchStore.searchValue = suggestion.name!
      selectedSuggestion.value = suggestion;
      searchStore.currentSearchType = suggestion.type;
    }

    const handleBlur = (event : FocusEvent) => {
      setTimeout(() => {
        suggestionsActive.value = false;
      }, 200); // Slight delay so click event actually works
    }

    const manualFormEnter = () =>{
      searchStore.currentSearchType = SearchType.Coordinates;
      selectedSuggestion.value = undefined;
      search();
    }

    const router = useRouter();
    const searchStore = useSearchStore();

    const searchErrorMsg = ref<string>("");
    const searchHasError = ref<boolean>(false);

    const suggestionsActive = ref<boolean>(false);

    const emit = defineEmits<{
        (e: 'searched'): void;
    }>();

    const getIcon = (type: string) => {
  if (type === SearchType.Canal) {
    return `
    <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#D97706;} </style> <g> <path class="st0" d="M492.346,41.403c-10.57,3.222-18.868,9.015-25.208,14.756c-4.793,4.326-8.66,8.652-12.12,12.437 c-5.186,5.719-9.459,10.068-13.497,12.631c-2.029,1.311-3.992,2.251-6.296,2.955c-2.304,0.689-5,1.148-8.571,1.148 c-3.63,0-6.356-0.482-8.689-1.186c-4.022-1.252-7.238-3.296-11.142-6.785c-2.896-2.593-6-5.978-9.541-9.86 c-5.319-5.786-11.63-12.852-20.802-18.83c-4.578-2.964-9.874-5.571-15.801-7.349c-5.933-1.792-12.452-2.756-19.379-2.748 c-7.037-0.008-13.653,0.985-19.653,2.83c-10.564,3.222-18.868,9.015-25.209,14.756c-4.793,4.326-8.66,8.652-12.127,12.437 c-5.178,5.719-9.452,10.068-13.482,12.631c-2.03,1.311-3.993,2.251-6.297,2.955c-2.304,0.689-4.993,1.148-8.571,1.148 c-3.63,0-6.348-0.482-8.682-1.186c-4.015-1.252-7.23-3.296-11.134-6.778c-2.896-2.593-6-5.978-9.534-9.868 c-5.326-5.778-11.63-12.852-20.809-18.83c-4.57-2.964-9.874-5.571-15.801-7.349c-5.926-1.792-12.445-2.756-19.375-2.748 c-7.034-0.008-13.649,0.985-19.649,2.83c-10.56,3.222-18.864,9.015-25.202,14.756c-4.789,4.326-8.652,8.66-12.115,12.437 c-5.175,5.726-9.453,10.068-13.483,12.631c-2.03,1.311-3.989,2.251-6.289,2.955c-2.304,0.689-4.993,1.148-8.564,1.148 c-3.63,0-6.352-0.482-8.678-1.186c-4.019-1.252-7.237-3.296-11.142-6.778c-2.889-2.593-5.989-5.978-9.53-9.868 c-5.323-5.778-11.63-12.852-20.801-18.83c-4.575-2.964-9.875-5.571-15.804-7.349C13.441,39.528,6.926,38.565,0,38.573v37.41 c3.63,0.007,6.348,0.481,8.678,1.185c4.023,1.259,7.237,3.297,11.142,6.778c2.892,2.6,5.993,5.985,9.53,9.867 c5.323,5.779,11.63,12.853,20.805,18.831c4.57,2.963,9.867,5.57,15.801,7.356c5.93,1.785,12.445,2.748,19.371,2.74 c7.034,0.008,13.645-0.978,19.649-2.837c10.564-3.215,18.864-9.008,25.206-14.749c4.789-4.327,8.652-8.66,12.116-12.438 c5.17-5.726,9.452-10.067,13.482-12.638c2.03-1.304,3.986-2.252,6.289-2.948c2.3-0.689,4.989-1.141,8.56-1.148 c3.634,0.007,6.352,0.481,8.686,1.185c4.015,1.259,7.237,3.297,11.142,6.778c2.889,2.6,5.985,5.985,9.526,9.867 c5.327,5.779,11.63,12.853,20.809,18.831c4.57,2.963,9.868,5.57,15.801,7.356c5.926,1.785,12.445,2.748,19.371,2.74 c7.038,0.008,13.653-0.978,19.653-2.829c10.564-3.222,18.869-9.008,25.209-14.756c4.793-4.327,8.66-8.653,12.119-12.438 c5.186-5.719,9.46-10.06,13.49-12.63c2.029-1.304,3.992-2.252,6.296-2.956c2.305-0.689,4.993-1.141,8.571-1.148 c3.63,0.007,6.348,0.481,8.682,1.185c4.022,1.259,7.244,3.297,11.149,6.778c2.888,2.6,5.992,5.985,9.534,9.874 c5.319,5.771,11.63,12.846,20.809,18.824c4.57,2.963,9.874,5.57,15.801,7.356c5.934,1.785,12.452,2.748,19.379,2.74 c7.037,0.008,13.645-0.978,19.653-2.829c10.564-3.222,18.868-9.008,25.209-14.756c4.793-4.327,8.66-8.653,12.12-12.431 c5.186-5.726,9.46-10.068,13.497-12.638c2.03-1.304,3.993-2.252,6.297-2.948c2.304-0.696,4.993-1.148,8.571-1.155v-37.41 C504.962,38.565,498.348,39.558,492.346,41.403z"></path> <path class="st0" d="M467.138,231.502c-4.793,4.318-8.66,8.652-12.12,12.438c-5.186,5.719-9.459,10.067-13.497,12.63 c-2.029,1.304-3.992,2.252-6.296,2.948c-2.304,0.696-5,1.155-8.571,1.155c-3.63,0-6.356-0.482-8.689-1.185 c-4.022-1.252-7.238-3.297-11.142-6.786c-2.896-2.593-6-5.978-9.541-9.86c-5.319-5.786-11.63-12.852-20.802-18.83 c-4.578-2.963-9.874-5.571-15.801-7.348c-5.933-1.793-12.452-2.756-19.379-2.749c-7.037-0.007-13.653,0.985-19.653,2.83 c-10.564,3.222-18.868,9.008-25.209,14.756c-4.793,4.326-8.66,8.652-12.127,12.438c-5.178,5.719-9.452,10.067-13.482,12.63 c-2.03,1.304-3.993,2.252-6.297,2.948c-2.304,0.696-4.993,1.155-8.571,1.155c-3.63,0-6.348-0.482-8.682-1.185 c-4.015-1.252-7.23-3.297-11.134-6.778c-2.896-2.593-6-5.978-9.534-9.868c-5.326-5.778-11.63-12.852-20.809-18.83 c-4.57-2.963-9.874-5.571-15.801-7.348c-5.926-1.793-12.445-2.756-19.375-2.749c-7.034-0.007-13.649,0.985-19.649,2.83 c-10.56,3.222-18.864,9.016-25.202,14.756c-4.789,4.326-8.652,8.66-12.115,12.438c-5.175,5.726-9.453,10.067-13.483,12.63 c-2.03,1.304-3.989,2.252-6.289,2.948c-2.304,0.696-4.993,1.155-8.564,1.155c-3.63,0-6.352-0.482-8.678-1.185 c-4.019-1.252-7.237-3.297-11.142-6.778c-2.889-2.593-5.989-5.978-9.53-9.868c-5.323-5.778-11.63-12.852-20.801-18.83 c-4.575-2.963-9.875-5.571-15.804-7.348c-5.931-1.793-12.445-2.756-19.372-2.749v37.41c3.63,0.008,6.348,0.482,8.678,1.185 c4.023,1.252,7.237,3.297,11.142,6.778c2.892,2.593,5.993,5.986,9.53,9.868c5.323,5.778,11.63,12.852,20.805,18.83 c4.57,2.963,9.867,5.571,15.801,7.348c5.93,1.793,12.445,2.756,19.371,2.749c7.034,0.007,13.645-0.985,19.649-2.838 c10.564-3.215,18.864-9.008,25.206-14.749c4.789-4.326,8.652-8.66,12.116-12.438c5.17-5.726,9.452-10.067,13.482-12.638 c2.03-1.303,3.986-2.251,6.289-2.948c2.3-0.69,4.989-1.141,8.56-1.148c3.634,0.008,6.352,0.482,8.686,1.185 c4.015,1.252,7.237,3.297,11.142,6.778c2.889,2.593,5.985,5.986,9.526,9.868c5.327,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.868,5.571,15.801,7.348c5.926,1.793,12.445,2.756,19.371,2.749c7.038,0.007,13.653-0.985,19.653-2.83 c10.564-3.222,18.869-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.119-12.438c5.186-5.719,9.46-10.06,13.49-12.63 c2.029-1.304,3.992-2.252,6.296-2.955c2.305-0.69,4.993-1.141,8.571-1.148c3.63,0.008,6.348,0.482,8.682,1.185 c4.022,1.252,7.244,3.297,11.149,6.778c2.888,2.593,5.992,5.986,9.534,9.868c5.319,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.874,5.571,15.801,7.348c5.934,1.793,12.452,2.756,19.379,2.749c7.037,0.007,13.645-0.985,19.653-2.83 c10.564-3.222,18.868-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.12-12.431c5.186-5.726,9.46-10.067,13.497-12.638 c2.03-1.304,3.993-2.252,6.297-2.948c2.304-0.696,4.993-1.148,8.571-1.155v-37.41c-7.038-0.007-13.652,0.985-19.654,2.83 C481.776,219.968,473.479,225.754,467.138,231.502z"></path> <path class="st0" d="M467.138,406.845c-4.793,4.319-8.66,8.653-12.12,12.43c-5.186,5.726-9.459,10.068-13.497,12.638 c-2.029,1.304-3.992,2.252-6.296,2.948c-2.304,0.696-5,1.148-8.571,1.155c-3.63-0.007-6.356-0.481-8.689-1.185 c-4.022-1.259-7.238-3.297-11.142-6.785c-2.896-2.593-6-5.978-9.541-9.868c-5.319-5.778-11.63-12.846-20.802-18.824 c-4.578-2.963-9.874-5.57-15.801-7.356c-5.933-1.785-12.452-2.748-19.379-2.74c-7.037-0.008-13.653,0.978-19.653,2.829 c-10.564,3.222-18.868,9.008-25.209,14.756c-4.793,4.327-8.66,8.653-12.127,12.43c-5.178,5.726-9.452,10.068-13.482,12.638 c-2.03,1.304-3.993,2.252-6.297,2.948c-2.304,0.696-4.993,1.148-8.571,1.155c-3.63-0.007-6.348-0.481-8.682-1.185 c-4.015-1.259-7.23-3.297-11.134-6.778c-2.896-2.6-6-5.985-9.534-9.874c-5.326-5.771-11.63-12.846-20.809-18.824 c-4.57-2.963-9.874-5.57-15.801-7.356c-5.926-1.785-12.445-2.748-19.375-2.74c-7.034-0.008-13.649,0.978-19.649,2.829 c-10.56,3.222-18.864,9.016-25.202,14.756c-4.789,4.327-8.652,8.66-12.115,12.438c-5.175,5.726-9.453,10.067-13.483,12.63 c-2.03,1.304-3.989,2.252-6.289,2.948c-2.304,0.696-4.993,1.148-8.564,1.155c-3.63-0.007-6.352-0.481-8.678-1.185 c-4.019-1.259-7.237-3.297-11.142-6.778c-2.889-2.6-5.989-5.985-9.53-9.867c-5.323-5.779-11.63-12.853-20.801-18.831 c-4.575-2.963-9.875-5.57-15.804-7.356c-5.931-1.785-12.445-2.748-19.372-2.74v37.409c3.63,0,6.348,0.482,8.678,1.186 c4.023,1.252,7.237,3.296,11.142,6.778c2.892,2.593,5.993,5.978,9.53,9.868c5.323,5.778,11.63,12.852,20.805,18.83 c4.57,2.964,9.867,5.571,15.801,7.349c5.93,1.792,12.445,2.756,19.371,2.748c7.034,0.008,13.645-0.985,19.649-2.837 c10.564-3.216,18.864-9.008,25.206-14.75c4.789-4.326,8.652-8.66,12.116-12.438c5.17-5.726,9.452-10.068,13.482-12.638 c2.03-1.304,3.986-2.252,6.289-2.948c2.3-0.689,4.989-1.148,8.56-1.148c3.634,0,6.352,0.482,8.686,1.186 c4.015,1.252,7.237,3.296,11.142,6.778c2.889,2.593,5.985,5.978,9.526,9.868c5.327,5.778,11.63,12.852,20.809,18.83 c4.57,2.964,9.868,5.571,15.801,7.349c5.926,1.792,12.445,2.756,19.371,2.748c7.038,0.008,13.653-0.985,19.653-2.83 c10.564-3.222,18.869-9.015,25.209-14.756c4.793-4.326,8.66-8.652,12.119-12.438c5.186-5.719,9.46-10.068,13.49-12.631 c2.029-1.311,3.992-2.251,6.296-2.955c2.305-0.689,4.993-1.148,8.571-1.148c3.63,0,6.348,0.482,8.682,1.186 c4.022,1.252,7.244,3.296,11.149,6.778c2.888,2.593,5.992,5.978,9.534,9.868c5.319,5.778,11.63,12.852,20.809,18.83 c4.57,2.964,9.874,5.571,15.801,7.349c5.934,1.792,12.452,2.756,19.379,2.748c7.037,0.008,13.645-0.985,19.653-2.83 c10.564-3.222,18.868-9.015,25.209-14.756c4.793-4.326,8.66-8.652,12.12-12.438c5.186-5.719,9.46-10.068,13.497-12.631 c2.03-1.311,3.993-2.251,6.297-2.948c2.304-0.696,4.993-1.156,8.571-1.156V389.26c-7.038-0.008-13.652,0.978-19.654,2.829 C481.776,395.311,473.479,401.097,467.138,406.845z"></path> </g> </g></svg>
    `
    ;
  } else if (type === SearchType.Coordinates) {
    return `
    <svg height="24px" width="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#0000FF">
      <g>
        <path d="M32,2C18.746,2,8,12.746,8,26c0,16.294,22.127,35.283,22.83,35.903c0.378,0.328,0.848,0.491,1.317,0.491
        c0.469,0,0.939-0.163,1.317-0.491C33.873,61.283,56,42.294,56,26C56,12.746,45.254,2,32,2z M32,36c-5.523,0-10-4.477-10-10
        s4.477-10,10-10s10,4.477,10,10S37.523,36,32,36z"></path>
      </g>
    </svg>`;
  } else if (type === SearchType.Marina) {
    return `
    <svg width="24px" height="24px" viewBox="0 0 50 50" version="1.2" xmlns="http://www.w3.org/2000/svg" fill="#008000">
      <path d="M25.117 10.335c-1.475 0-2.691-1.222-2.691-2.72 0-1.508 1.216-2.719 2.691-2.719 1.501 0 2.705 1.211 2.705 2.719 
      0 1.498-1.204 2.72-2.705 2.72zm21.836 23.806l-1.441-9.027c-.164-.844-.898-1.486-1.771-1.486-.531 0-1.004.226-1.347.595
      l-6.639 6.26c-.104.095-.211.201-.307.333-.624.854-.446 2.066.404 2.708.162.117.342.201.519.273l1.663.559c-1.602 
      4.559-6.216 8.683-11.034 9.644v-30c2.361-1.01 4.695-3.652 4.695-6.385 0-3.658-2.942-6.615-6.578-6.615-3.623 0-6.576
      2.957-6.576 6.615 0 2.733 2.108 5.375 4.458 6.385v30c-4.924-.891-9.406-5-11.048-9.645l1.678-.559c.177-.072.353-.156.519-.273
      .849-.642 1.038-1.854.402-2.708-.096-.132-.189-.238-.308-.333l-6.638-6.26c-.331-.369-.815-.595-1.335-.595-.885 0-1.63.642-1.783
      1.486l-1.441 9.027c-.033.143-.045.297-.045.453 0 1.066.862 1.936 1.926 1.936.2 0 .389-.025.566-.085l1.559-.51c2.48 
      7.578 9.575 13.066 17.949 13.066 8.373 0 15.471-5.488 17.951-13.078l1.56.521c.175.06.367.085.565.085 1.063 0 
      1.925-.869 1.925-1.936-.001-.155-.012-.309-.048-.451z"></path>
    </svg>`;
  }
  return '';
};


    function truncateLocation(response: string): string {
    // Split the response string by commas
    const parts = response.split(',');

    // Check if there are at least two commas in the response
    if (parts.length >= 2) {
        // Join the first two parts and return the result
        return parts.slice(0, 2).join(',');
    }

    // If there are fewer than two parts, return the original string
    return response;
}

const searchUserLocation = async () => {
  searchStore.currentSearchType = SearchType.Coordinates;
  selectedSuggestion.value = undefined;

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL = 'https://api.mapbox.com/search/geocode/v6/reverse';
  const userCoordinates = searchStore.userLocation?.split(",");
  try {
        // Default parameters for the query
        const params = {
          longitude: userCoordinates![0],
          latitude: userCoordinates![1],
          access_token: apiKey,
        };
        const queryString = buildQueryString(params);
        const response = await fetch(`${baseURL}?${queryString}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("USER LOCATION SEARCH REVERSE: ", data)
        searchStore.searchValue = data.features[0].properties.full_address;
        // suggestions.value = data.features.map((x:any) => {
        //   return{
        //     name: x.properties.place_formatted ?? "NOPE",
        //     coordinates: `${x.properties.coordinates.latitude},${x.properties.coordinates.longitude}`
        //   }
        // });
        return data;
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        suggestions.value = [];
        throw error;
      }
}

    const buildQueryString = (params: Record<string, string | number>) => {
      return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    };

    const suggestions = ref<Array<SuggestionModel>>([]);

      function levenshteinDistance(s: string, t: string): number {
        const m = s.length;
        const n = t.length;
        const d: number[][] = [];

        for (let i = 0; i <= m; i++) {
          d[i] = [i];
        }
        for (let j = 1; j <= n; j++) {
          d[0][j] = j;
        }
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const cost = s[i - 1] === t[j - 1] ? 0 : 1;
            d[i][j] = Math.min(
              d[i - 1][j] + 1,      // deletion
              d[i][j - 1] + 1,      // insertion
              d[i - 1][j - 1] + cost // substitution
            );
          }
        }
        return d[m][n];
      }

          
      // Then, calculate the similarity score based on Levenshtein distance
      function getSimilarity(s1: string, s2: string): number {
        const distance = levenshteinDistance(s1, s2);
        const maxLen = Math.max(s1.length, s2.length);
        return 1 - distance / maxLen; // Normalized similarity between 0 and 1
      }

      function normalize(str: string): string {
        return str.toLowerCase().replace(/\s+/g, ' ').trim();
      }

    function fuzzyMatchScore(currentSearchValue: string, name: string): number {
      const normalizedSearchValue = normalize(currentSearchValue);
      const normalizedName = normalize(name);

      const distance = levenshteinDistance(normalizedSearchValue, normalizedName);
      
      // Assign a maximum tolerance for fuzzy matching
      const maxTolerance = Math.max(normalizedSearchValue.length, normalizedName.length) / 2;

      // If distance is within tolerance, return a score (lower distance gets higher score)
      if (distance <= maxTolerance) {
        return (1 - distance / maxTolerance) * 5;  // Scale score to a max of 5
      }
      
      return 0; // No match
    }

    // Update your calculateScore function
function calculateScore(currentSearchValue: string, name: string, type: string): number {
  const lowerSearchValue = currentSearchValue.toLocaleLowerCase();
  const lowerName = name.toLocaleLowerCase();
  let score = 0; 

  // Exact match boost
  if (lowerName === lowerSearchValue) {
    score += 100;
  }
  // Partial match boost based on match length
  else if (lowerName.includes(lowerSearchValue)) {
    const matchRatio = lowerSearchValue.length / lowerName.length;
    score += matchRatio * 70;
  }
  // Fuzzy match boost
  else {
    const similarity = getSimilarity(lowerSearchValue, lowerName);
    if (similarity > 0.6) { // Adjust threshold as needed
      score += similarity * 50;
    }
  }

  // Type-based score boosts
  if (type === 'coordinates') {
    score += 10;
  } else if (type === 'canal') {
    score += 5;
  } else if (type === 'marina') {
    score += 5;
  }

  return score;
}
    
    async function setSuggestions(currentSearchValue: string){
      if (!currentSearchValue || currentSearchValue === '') {
        suggestions.value = [];
        return;
      }
      currentSearchValue = normalize(currentSearchValue)

      const GetMapBoxSuggestions = await getMapBoxSuggestions(currentSearchValue);

      // Filter marina and canal names locally
      //        ?.filter(marina => marina.toLowerCase().includes(currentSearchValue.toLocaleLowerCase()))
      let GetFilteredMarinas = marinaNames.value
        ?.map(marina => ({ name: marina, type: 'marina'}));
        
      // ?.filter(canal => canal.toLowerCase().includes(currentSearchValue.toLocaleLowerCase()))
      let getFilteredCanals = canalNames.value
        ?.map(canal => ({ name: canal, type: 'canal' }));

      // let all = [...marinaNames.value!, canalNames.value!];

      // let marinaAsJson = marinaNames.value?.map(x => {
      //   return{
      //     title: x,
      //     author: {
      //       firstName: ""
      //     }
      //   }
      // })


      // console.error("marinaAsJson")
      // console.warn(marinaAsJson);
      
      let mapBoxSuggestions : Array<SuggestionModel> | undefined = undefined;
      if(GetMapBoxSuggestions !== undefined){
        mapBoxSuggestions = GetMapBoxSuggestions.features.map((x:any) => {
          return{
            name: x.properties.full_address ?? "NOPE",
            type: SearchType.Coordinates,
            score: calculateScore(currentSearchValue, x.properties.full_address ?? "NOPE", "coordinates") ?? 0,
            coordinates: `${x.properties.coordinates.latitude},${x.properties.coordinates.longitude}`
          } as SuggestionModel;
        });
      }

      let filteredMarinas : Array<SuggestionModel> | undefined = undefined
      filteredMarinas = GetFilteredMarinas?.map((x:any) => {
        return{
          name: x.name,
          type: SearchType.Marina,
          score: calculateScore(currentSearchValue, x.name, 'marina') ?? 0,
          coordinates: undefined
        } as SuggestionModel
      });

      let filteredCanals: Array<SuggestionModel> | undefined = undefined;
      filteredCanals = getFilteredCanals?.map((x:any) => {
        return{
          name: x.name,
          type: SearchType.Canal,
          score: calculateScore(currentSearchValue, x.name, 'canal') ?? 0,
          coordinates: undefined
        } as SuggestionModel
      })

      // Combine all suggestions
      let allSuggestions = [
        ...mapBoxSuggestions!,
        ...filteredMarinas!,
        ...filteredCanals!
      ];

      const isShortSearch = currentSearchValue.length < 3;

      if (isShortSearch) {
        const maxPerType = 3;
        const coordinatesSuggestions = allSuggestions.filter(s => s.type === SearchType.Coordinates).slice(0, maxPerType);
        const marinaSuggestions = allSuggestions.filter(s => s.type === SearchType.Marina).slice(0, maxPerType);
        const canalSuggestions = allSuggestions.filter(s => s.type === SearchType.Canal).slice(0, maxPerType);

        console.log(coordinatesSuggestions)
        console.log(marinaSuggestions)
        console.log(canalSuggestions)


        suggestions.value = [
          ...coordinatesSuggestions,
          ...marinaSuggestions,
          ...canalSuggestions
        ];

      }else{
        // For longer search strings, rely more on the score-based sorting
        allSuggestions.sort((a, b) => b.score - a.score);
        suggestions.value = allSuggestions.slice(0, 10);
      }
      console.log(suggestions.value);
      // if(currentSearchValue === ''){
      //   suggestions.value = [];
      // }
    }

    async function getMapBoxSuggestions(currentSearchValue : string) {
      currentSearchValue = currentSearchValue.trim();
      const apiKey = import.meta.env.VITE_API_KEY;
      const baseURL = 'https://api.mapbox.com/search/geocode/v6/forward';

      try {
        // Default parameters for the query
        const params = {
          q: currentSearchValue,
          access_token: apiKey,
          autocomplete: "true",
          country: 'GB'
        };
        const queryString = buildQueryString(params);
        const response = await fetch(`${baseURL}?${queryString}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("LOCATION SEARCH: ", data)

        return data;
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        suggestions.value = [];
        throw error;
      }



      // if(currentSearchValue === ""){
      //   suggestions.value = [];
      //   return;
      // }
      // const locationParams : client.LocationSearchGetRequest = {
      //   query: currentSearchValue
      // }

      // try{
      //   const loactionResponse : Array<client.LocationModel> = await locationApi.locationSearchGet(locationParams);
      //   suggestions.value = loactionResponse;
      // }catch(err){
      //   suggestions.value = [];
      // }

    }

    async function search() {
        if (
            (searchStore.searchValue === undefined || searchStore.searchValue === null || searchStore.searchValue === '') ||
            (searchStore.searchRadiusValue === undefined || searchStore.searchRadiusValue=== null)
        ) {
            searchErrorMsg.value = "Please complete the search form";
            searchHasError.value = true;
            return;
        }

        // alert(searchStore.searchRadiusValue);
        if(searchStore.searchRadiusValue > 30){
            searchStore.searchRadiusValue = 30;
        }

        if(selectedSuggestion.value === undefined){
          alert("no suggestion selected so search a location with mapbox");

          //make sure mapbox has results for the search query
          const results = await getMapBoxSuggestions(searchStore.searchValue);
          console.log(results);
          if(results.features.length <= 0){
            searchErrorMsg.value = "We can't find that location";
            searchHasError.value = true;
            return;
          }
          
          //get the cooridinates of the search
          let locationCoordinates : string | undefined = undefined;
          locationCoordinates = `${results.features[0].properties.coordinates.longitude}, ${results.features[0].properties.coordinates.latitude}`;
          searchStore.searchLocationCoordinatesValue = locationCoordinates!;

          //something has gone wrong with getting the cooridiantes
          if(locationCoordinates === undefined){
            console.error("something wrong with location search");
            searchErrorMsg.value = "Something has gone wrong with your search, please try agian";
            searchHasError.value = true;
            return;
          }

          const params : client.DataMarinasSearchGetRequest = {
              searchCoordinates: locationCoordinates,
              searchDistance: searchStore.searchRadiusValue ?? 12,
              userCoordinates: searchStore.userLocation ?? undefined,
          } 

          searchStore.currentSearchType = SearchType.Coordinates;

          try{
            await searchStore.searchMarinas(params);
            
          }catch(err: any){
              if (err.response && err.response.status === 404) {
                  searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                  router.push("/results");
                  searchHasError.value = false;
                  searchStore.resetSortOptions();
                  searchStore.resetServiceFilterOptions();
                  emit("searched");
                  return;
              }
              console.error("Search error: ", err);
              console.warn(err.response.statusText);
              searchErrorMsg.value = "Error with search";
              searchHasError.value = true;
              return;
          }
        }else{
          //alert("Do a custom search based on suggestion type: " + selectedSuggestion.value.type)
          if(selectedSuggestion.value.type === SearchType.Coordinates){
            searchStore.currentSearchType = SearchType.Coordinates;
            //alert(selectedSuggestion.value.coordinates);
            const extractCoordiantes = selectedSuggestion.value.coordinates?.split(",");
            let locationCoordinates : string | undefined = undefined;
            locationCoordinates = `${extractCoordiantes![1]}, ${extractCoordiantes![0]}`;
            //alert(locationCoordinates);
            searchStore.searchLocationCoordinatesValue = locationCoordinates!;

            if(locationCoordinates === undefined){
              console.warn("something wrong with location search")
            }

            const params : client.DataMarinasSearchGetRequest = {
                name: undefined,
                searchCoordinates: locationCoordinates,
                searchDistance: searchStore.searchRadiusValue,
                userCoordinates: searchStore.userLocation ?? undefined,
                serviceTypes: undefined,
                limit: undefined,   
                offset: 0,
            }

            console.warn(params);

            try{
              const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
              searchStore.marinaSearchResults = res;
              console.log(searchStore.marinaSearchResults);
            }catch(err: any){
                if (err.response && err.response.status === 404) {
                    router.push("/results");
                    searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                    router.push("/results");
                    searchHasError.value = false;
                    searchStore.resetSortOptions();
                    searchStore.resetServiceFilterOptions();
                    emit("searched");
                    return;
                }
                console.error("Search error: ", err);
                console.warn(err.response.statusText);
                searchErrorMsg.value = "Error with search";
                searchHasError.value = true;
                return;
            }
          }else if(selectedSuggestion.value.type === SearchType.Canal){
            searchStore.currentSearchType = SearchType.Canal;
            alert("canal search")
            const params : client.DataMarinasSearchGetRequest = {
              name: undefined,
              canalName: selectedSuggestion.value.name,
              searchCoordinates: undefined,
              searchDistance: undefined,
              userCoordinates: searchStore.userLocation ?? undefined,
              serviceTypes: undefined,
              limit: undefined,   
              offset: 0,
            };

            try{
              const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
              searchStore.marinaSearchResults = res;
              console.log(searchStore.marinaSearchResults);
            }catch(err: any){
                if (err.response && err.response.status === 404) {
                    router.push("/results");
                    searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                    router.push("/results");
                    searchHasError.value = false;
                    searchStore.resetSortOptions();
                    searchStore.resetServiceFilterOptions();
                    emit("searched");
                    return;
                }
                console.error("Search error: ", err);
                console.warn(err.response.statusText);
                searchErrorMsg.value = "Error with search";
                searchHasError.value = true;
                return;
            }
          }else if(selectedSuggestion.value.type === SearchType.Marina){
            searchStore.currentSearchType = SearchType.Marina;
            alert("marina search")
            const params : client.DataMarinasSearchGetRequest = {
              name: selectedSuggestion.value.name,
              searchCoordinates: undefined,
              searchDistance: searchStore.searchRadiusValue,
              userCoordinates: searchStore.userLocation ?? undefined,
              serviceTypes: undefined,
              limit: undefined,   
              offset: 0,
            };

            try{
              const res : Array<client.MarinaModel> = await dataApi.dataMarinasSearchGet(params);
              searchStore.marinaSearchResults = res;
              console.log(searchStore.marinaSearchResults);
            }catch(err: any){
                if (err.response && err.response.status === 404) {
                    router.push("/results");
                    searchStore.marinaSearchResults = [] as Array<client.MarinaModel> ;
                    router.push("/results");
                    searchHasError.value = false;
                    searchStore.resetSortOptions();
                    searchStore.resetServiceFilterOptions();
                    emit("searched");
                    return;
                }
                console.error("Search error: ", err);
                console.warn(err.response.statusText);
                searchErrorMsg.value = "Error with search";
                searchHasError.value = true;
                return;
            }
          }
        }

        router.push("/results");
        searchHasError.value = false;
        searchStore.resetSortOptions();
        searchStore.resetServiceFilterOptions();
        emit("searched");
    }

    const serviceTypes = ref<Array<ServiceTypeModel> | undefined>();

      //TO DO: handle arrow keys to navigate options
    // const handleKeydown = (e:KeyboardEvent) => {
    //   if (e.key === 'ArrowDown') {
    //     e.preventDefault();
    //     alert("down");
    //   }
    // }

    // watchEffect(() => {
    //   if (suggestionsActive.value === true) {
    //     document.addEventListener('keydown', handleKeydown);
    //   } else {
    //     document.removeEventListener('keydown', handleKeydown);
    //   }
    // })

    onMounted(async () => {
      try {
        const response:Array<client.ServiceTypeModel> = await types.typesServiceTypesGet();
        serviceTypes.value = response;
        searchStore.serviceTypes = response;
        console.log(serviceTypes.value);

        const getCanalNames: string[] = await dataApi.dataCanalGetAllCanalNamesGet();
        canalNames.value = getCanalNames;
        console.log(canalNames.value);

        const getMarinaName: string[] = await dataApi.dataMarinaGetAllNamesGet();
        marinaNames.value = getMarinaName;
        console.log(marinaNames.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }    });
</script>