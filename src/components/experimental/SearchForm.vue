<template>
    <div class="search-container shadow-xl">
        <div class="container-header">
          <div class="search-error bg-yellow-600 text-lg font-bold">Warning: search form in development, do NOT deploy to LIVE</div>            

            <div class="search-error bg-red-600" v-if="searchHasError">{{searchErrorMsg}}</div>            
        </div>

        <form class="mx-w-md mx-auto" @submit.prevent="search">
    <label for="search-location" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative bg-transparent">
      <!-- Icon inside input field -->
      <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <!-- Input field -->
      <input
        type="search"
        autocomplete="off"
        id="search-location"
        class="form-border-bottom block w-full p-6 ps-11 text-lg text-gray-900 bg-transparent"
        placeholder="Search Location"
        required
        v-model="searchStore.searchLocationValue"
        @focus="suggestionsActive = true"
        @blur="handleBlur"
        @keyup="setSuggestions(searchStore.searchLocationValue ?? '')"
      />
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
          
          <li v-if="searchStore.searchLocationValue === ''" class="p-2 text-gray-700">
            Start typing for suggestions
          </li>
          <li v-else-if="suggestions && suggestions!.length == 0" class="p-2 text-gray-700">
            No results found
          </li>
          <template v-for="suggestion in suggestions" :key="suggestion.name">
            <li 
              class="p-2 border-b border-grey-100 cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center" 
              :class="{
                'bg-blue-100 text-blue-700': suggestion.type === 'coordinates',
                'bg-green-100 text-green-700': suggestion.type === 'marina',
                'bg-orange-100 text-orange-700': suggestion.type === 'canal'
              }"
              @click="searchStore.searchLocationValue = suggestion.name!">
              
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
    <div style="width: 100%;">
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

    const types = new TypesApi();
    const dataApi = new DataApi();
    const locationApi = new LocationApi();

    const suggestionsBox = ref<HTMLElement | undefined>();

    const canalNames = ref<string[] | undefined>(undefined);
    const marinaNames = ref<string[] | undefined>(undefined);

    const handleBlur = (event : FocusEvent) => {
      setTimeout(() => {
        suggestionsActive.value = false;
      }, 200); // Slight delay so click event actually works
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
  if (type === 'canal') {
    return `
    <svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FFA500">
      <g>
        <path d="M471,79.483c-12.212-6.551-22.696-15.974-30.534-27.339l-13.796-20l-13.797,20c-7.839,11.365-18.33,20.788-30.542,27.339 
        c-12.212,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.78-3.72-41-10.28c-12.204-6.551-22.694-15.974-30.534-27.339l-13.796-20 
        l-13.797,20c-7.839,11.365-18.33,20.788-30.533,27.339c-12.22,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.788-3.72-41-10.28 
        c-12.212-6.551-22.703-15.974-30.543-27.339l-13.796-20l-13.796,20C63.694,63.509,53.212,72.932,41,79.483 
        c-12.212,6.56-26.11,10.271-41,10.28v33.517c20.509,0.009,39.94-5.161,56.864-14.263c10.534-5.66,20.119-12.839,28.466-21.236 
        c8.356,8.398,17.932,15.576,28.466,21.236c16.932,9.102,36.356,14.272,56.873,14.263c20.508,0.009,39.932-5.161,56.864-14.263 
        c10.534-5.66,20.119-12.839,28.466-21.236c8.347,8.398,17.932,15.576,28.466,21.236c16.932,9.102,36.355,14.272,56.864,14.263 
        c20.517,0.009,39.94-5.161,56.873-14.263c10.534-5.66,20.11-12.839,28.466-21.236c8.347,8.398,17.932,15.576,28.466,21.236 
        c16.924,9.102,36.355,14.272,56.864,14.263V89.763C497.11,89.754,483.212,86.043,471,79.483z"></path>
      </g>
    </svg>`;
  } else if (type === 'coordinates') {
    return `
    <svg height="24px" width="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#0000FF">
      <g>
        <path d="M32,2C18.746,2,8,12.746,8,26c0,16.294,22.127,35.283,22.83,35.903c0.378,0.328,0.848,0.491,1.317,0.491
        c0.469,0,0.939-0.163,1.317-0.491C33.873,61.283,56,42.294,56,26C56,12.746,45.254,2,32,2z M32,36c-5.523,0-10-4.477-10-10
        s4.477-10,10-10s10,4.477,10,10S37.523,36,32,36z"></path>
      </g>
    </svg>`;
  } else if (type === 'marina') {
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
        searchStore.searchLocationValue = data.features[0].properties.full_address;
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

    interface SuggestionModel {
      name: string;
      type: string;
      coordinates: string | undefined;
      score: number
    }

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

      const GetMapBoxSuggestions = await getSuggestions(currentSearchValue);

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
            type: "coordinates",
            score: calculateScore(currentSearchValue, x.properties.full_address ?? "NOPE", "coordinates") ?? 0,
            coordinates: `${x.properties.coordinates.latitude},${x.properties.coordinates.longitude}`
          } as SuggestionModel;
        });
      }

      let filteredMarinas : Array<SuggestionModel> | undefined = undefined
      filteredMarinas = GetFilteredMarinas?.map((x:any) => {
        return{
          name: x.name,
          type: x.type,
          score: calculateScore(currentSearchValue, x.name, 'marina') ?? 0,
          coordinates: undefined
        } as SuggestionModel
      });

      let filteredCanals: Array<SuggestionModel> | undefined = undefined;
      filteredCanals = getFilteredCanals?.map((x:any) => {
        return{
          name: x.name,
          type: x.type,
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
        const coordinatesSuggestions = allSuggestions.filter(s => s.type === 'coordinates').slice(0, maxPerType);
        const marinaSuggestions = allSuggestions.filter(s => s.type === 'marina').slice(0, maxPerType);
        const canalSuggestions = allSuggestions.filter(s => s.type === 'canal').slice(0, maxPerType);

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

    async function getSuggestions(currentSearchValue : string) {
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
        // if (
        //     (searchStore.marinaSearchValue === undefined || searchStore.marinaSearchValue === null || searchStore.marinaSearchValue === '') &&
        //     (searchStore.serviceSearchValue === undefined || searchStore.serviceSearchValue=== null)
        // ) {
        //     searchErrorMsg.value = "Please provide one or more values";
        //     searchHasError.value = true;
        //     return;
        // }

        if (
            (searchStore.searchLocationValue === undefined || searchStore.searchLocationValue === null || searchStore.searchLocationValue === '') ||
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
 
        //get Location
        const locationParams : client.LocationSearchGetRequest = {
            query: searchStore.searchLocationValue
        }

        const results = await getSuggestions(searchStore.searchLocationValue);
        console.log(results);
        if(results.features.length <= 0){
          searchErrorMsg.value = "We can't find that location";
          searchHasError.value = true;
          return;
        }
        
        let locationCoordinates : string | undefined = undefined;
        locationCoordinates = `${results.features[0].properties.coordinates.longitude}, ${results.features[0].properties.coordinates.latitude}`;
         searchStore.searchLocationCoordinatesValue = locationCoordinates!;
        //searchStore.searchLocationValue = results.features[0].properties.place_formatted;
        
        // try{
        //     const loactionResponse : Array<client.LocationModel> = await locationApi.locationSearchGet(locationParams);
        //     locationCoordinates = loactionResponse[0].coordinates!;
        //     searchStore.searchLocationValue = truncateLocation(loactionResponse[0].name!);
        //     searchStore.searchLocationCoordinatesValue = loactionResponse[0].coordinates!;
        // }catch(err: any){
        //     console.error("Location error: ", err);
        //     console.warn(err.response.statusText);
        //     searchErrorMsg.value = "Location not found. Please check and try again.";
        //     searchHasError.value = true;
        //     return;
        // }

        if(locationCoordinates === undefined){
            console.warn("something wrong with location searhc")
        }

        // let serviceTypesArray: Array<string> | undefined = 
        //     searchStore.serviceSearchValue ? [searchStore.serviceSearchValue.key!] : undefined;
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
        
        router.push("/results");
        searchHasError.value = false;
        searchStore.resetSortOptions();
        searchStore.resetServiceFilterOptions();
        // searchStore.setServiceFilterOptionActive(searchStore?.serviceSearchValue?.key!); // moved to Results on mounted
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

        const getCanalNames: string[] = await dataApi.dataMarinaGetAllCanalNamesGet();
        canalNames.value = getCanalNames;
        console.log(canalNames.value);

        const getMarinaName: string[] = await dataApi.dataMarinaGetAllNamesGet();
        marinaNames.value = getMarinaName;
        console.log(marinaNames.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }    });
</script>