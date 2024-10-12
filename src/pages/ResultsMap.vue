<template>
  <div class="flex-1 min-h-0 h-[calc(100vh)] w-full ml-0  sm:w-[calc(100vw)]" style="overflow: hidden;">
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

    <SearchBar style="position: absolute; z-index: 1; width: 100%; padding: 20px; padding-top: 0px;" @back="router.push('/results')" @click="openSearchBox">
          <span class="mt-2 mr-9" style="" v-if="!mapStore.mapLoaded">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </span>
    </SearchBar>        
    
    <button @click="openFilter" style="position: absolute; z-index: 1; margin-top: 115px; background-color: whitesmoke;" class="border-2 border-blue-700 ml-[20px] rounded-md p-2" :class="{ disabled: searchStore.serviceFilterOptions!.length < 3 }">
      <svg class="w-[30px] h-[30px] text-gray-800 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z"/>
    </svg>
      <span style="margin: 5px;">Filter</span>
  </button>

    <!-- <div class="search-info-box-container">
            <div class="search-info-box">
                <span class="back" @click="goBack">
                &LeftArrow;
                </span>
                <span class="searchTerm">"Search Term here"</span>
            </div>
        </div> -->
    <!-- <div v-if="!mapStore.mapLoaded" class="overlay">
<h1>Loading...</h1>
<div class="loading">
<span></span>
<span></span>
<span></span>
</div>
</div> -->
    <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
  </div>
  <transition name="slide">
    <FilterBox :open="filterResultsOpen" :options="searchStore.serviceFilterOptions" @close="closeFilter" style="z-index: 999;">
      <h1>test</h1>
    </FilterBox>
  </transition>
</template>

<script setup lang="ts">
import SearchBar from '../components/experimental/SearchBar.vue';
import {ref, onMounted, onUnmounted, watch} from 'vue';
import { useRouter } from 'vue-router';
//@ts-ignore
import mapboxgl, {Map} from 'mapbox-gl';
//@ts-ignore
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useMapStore } from '../stores/mapStore';
import { useNavStore } from '../stores/navStore';
// import PopupContent from './PopupContent.vue';
// import {currentLocation, location} from '../types/location';
import SearchForm from '../components/experimental/SearchForm.vue';
import { useSearchStore } from '../stores/searchStore';
import * as client from '../api-client';
import {DataMarinaByGeojsonIdGeoJsonIdGetRequest, GeoJsonApi} from '../api-client';
import { DataApi } from '../api-client';
import {useSavedMarinasStore} from "../stores/savedMarinasStore";
import FilterBox from '../components/experimental/FilterBox.vue';
import { SearchType } from '../types/search';


const savedMarinasStore = useSavedMarinasStore();

const dataApi = new DataApi();
const geoJsonApi = new GeoJsonApi();

const searchStore = useSearchStore();
const router = useRouter();

const mapStore = useMapStore();
const navStore = useNavStore();

const filterResultsOpen = ref<boolean>(false);

const openFilter = () => {
  filterResultsOpen.value = true;
}

const closeFilter = async () => {

  filterResultsOpen.value = false;
  // Clear existing markers on the map before adding new ones
  if (map.value && map.value.getSource('marinas')) {
    map.value.removeLayer('marinas');
    map.value.removeSource('marinas');
  }
  removeAllMarkers();

  // Fetch new geojson data for filtered results
  const theIds: Array<number> = searchStore.marinaSearchResults?.map(x => x.geoJsonId!)!;
  const geoParams: client.GeoJsonGeoJsonByIdsGetRequest = {
    ids: theIds!,
  }

  const geojsonData = await geoJsonApi.geoJsonGeoJsonByIdsGet(geoParams);

  // Add filtered markers back to the map
  map.value?.addSource('marinas', {
    type: 'geojson',
    //@ts-ignore
    data: geojsonData
  });

  for (const marker of geojsonData.features!) {
    const el = document.createElement('div');
    el.id = `marker-${marker.properties?.mooringPinId!}`;
    el.className = 'marker';
    if (savedMarinasStore.savedMarinas!.some(x => x.name === marker.properties?.title)) {
      el.className += ' marker-saved';
    }

    const newMarker = new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry!.coordinates)
      .addTo(map.value);

      markers.value.push({ newMarker, element: el });

    el.addEventListener('click', (e) => {
      flyToLocation(marker.geometry?.coordinates!);
      const popProps: popUpProps = {
        coordinates: marker.geometry?.coordinates!,
        geoJsonId: marker.id!
      };
      addPopup(popProps);

      const activeItem = document.getElementsByClassName('active');
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      const listing = document.getElementById(`listing-${marker.properties?.mooringPinId}`);
      listing?.classList.add('active');
    });
  }
};

const markers = ref<{ newMarker: mapboxgl.Marker, element: HTMLElement }[]>([]);

function removeAllMarkers() {
  markers.value.forEach(({ newMarker, element }) => {
    newMarker.remove();          // Remove the marker from the map
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);  // Remove the DOM element from the map
    }
  });
  markers.value.length = 0; // Clear the markers array
}




type popUpProps = {
  coordinates: Array<number>,
  geoJsonId: any
}

const popup = ref<any>(null);

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

const searchBoxOpen = ref<boolean>(false);

const openSearchBox = () => {
  searchBoxOpen.value = true;
}
async function addPopup(location: popUpProps){
  const marianProps: client.DataMarinaByGeojsonIdGeoJsonIdGetRequest = {
    geoJsonId: location.geoJsonId
  }
  let marina : any;
  try{
    // const data : any =  await geoJsonApi.geoJsonGeoJsonByIdGet(marianProps);
    // marina = data!.features![0].properties;
    marina = await dataApi.dataMarinaByGeojsonIdGeoJsonIdGet(marianProps)
  }catch(err:any){
    console.error(err)
  }
  console.log("The marian:", marina);
  // marina = marina?.features![0].properties!.title;

  const isSaved = savedMarinasStore.savedMarinas!.some(x => x.geoJsonId === location.geoJsonId);

  new mapboxgl.Popup({ offset: [0, -15] })
      //@ts-ignore
      .setLngLat(location.coordinates)
      .setHTML(`<span><h3 class="${isSaved ? '!bg-[#e5b700]' : ''}">${marina.name}</h3><a class="${isSaved ? '!text-[#796100]' : ''} ${marina?.website == undefined ? 'd-none' : ''}" href="${marina?.website}" target="_blank">Website</a><br/><a class="${isSaved ? '!text-[#796100]' : ''}" href="/marina/${marina.id}" class="save">View Details</button></span>`)
      .addTo(map.value!);
}

function flyToLocation(coordinates: Array<number>): Promise<void>{
  return new Promise((resolve, reject) => {
    console.log('fly to coordinates', coordinates);
    console.log('map status in fly to: ', map.value ? 'true' : 'HELP, NO MAP');

    if(map.value && coordinates){
      console.log(coordinates);
      map.value.flyTo({
        //@ts-ignore
        center: coordinates,
        zoom: 15
      });

      map.value.once('moveend', (e) => {
        // alert("Moved!");
        resolve();
      });
    }else{
      reject("No init map or no provided coordinates");
    }

  });
}

function getZoomLevel(searchRadius: number | undefined): number {
  if(searchRadius === undefined){
    return 15;
  }

  // Define the min and max zoom levels
  const minZoom = 6;
  const maxZoom = 10;
  
  // Define the min and max search radius
  const minRadius = 1;  // 1 mile
  const maxRadius = 30; // 30 miles
  
  // Clamp the searchRadius within the min/max bounds
  searchRadius = Math.max(minRadius, Math.min(searchRadius, maxRadius));
  
  // Linear interpolation to get the zoom level
  const zoomLevel = maxZoom - ((searchRadius - minRadius) / (maxRadius - minRadius)) * (maxZoom - minZoom);
  
  return zoomLevel;
}

function calculateDistance(coord1: number[], coord2: number[]): number {
  const R = 3958.8; // Earth's radius in miles
  const lat1 = coord1[0] * (Math.PI / 180);  // Convert latitude to radians
  const lat2 = coord2[0] * (Math.PI / 180);  // Convert latitude to radians
  const deltaLat = lat2 - lat1;
  const deltaLng = (coord2[1] - coord1[1]) * (Math.PI / 180);  // Convert longitude to radians

  // Haversine formula
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

onMounted(async () => {
  document.getElementsByTagName("body")[0].style.overflow = "hidden";

  mapStore.getDataSets();
  //console.log();
  mapStore.mapLoaded = false;
  if(map.value){
    let centerCoordinates;
    let searchRadius;
    switch(searchStore.currentSearchType){
      case SearchType.Marina:
        centerCoordinates = searchStore.marinaSearchResults![0].coordinates?.split(",");
        searchRadius = undefined
        break;
      case SearchType.Canal:
        //Work out centre and zoom for canal name search type
        // Sort results by latitude (north-south)
        const sortedMarinas = searchStore.marinaSearchResults!.sort((a, b) => {
          const aCoords = a.coordinates!.split(",").map(Number);
          const bCoords = b.coordinates!.split(",").map(Number);
          return aCoords[0] - bCoords[0]; // Compare latitudes
        });

        // Get the northernmost and southernmost marinas
        const northernmost = sortedMarinas[0].coordinates!.split(",").map(Number);
        const southernmost = sortedMarinas[sortedMarinas.length - 1].coordinates!.split(",").map(Number);

        // Calculate center coordinates as the midpoint between northernmost and southernmost marinas
        const centerLat = (northernmost[1] + southernmost[1]) / 2;
        const centerLng = (northernmost[0] + southernmost[0]) / 2;
        centerCoordinates = [centerLng, centerLat];

        //Calculate the distance between the northernmost and southernmost marinas
        const distance = calculateDistance(northernmost, southernmost);
        // alert(distance)
        // Use the distance to set the searchRadius
        searchRadius = distance;
        break;
      default:
        centerCoordinates = searchStore.searchLocationCoordinatesValue?.split(",");
        searchRadius = searchStore.searchRadiusValue
    }
    map.value = new mapboxgl.Map({
      //@ts-ignore
      container: map.value as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      // style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
      //style: 'mapbox://styles/mapbox/streets-v12',
      center: centerCoordinates,//, // starting center in [lng, lat]
      //bounds: [[-22.92826178066636, 47.677731905744565], [9.98024578066787, 50.887536758179465]],
      zoom: getZoomLevel(searchRadius)
    });


    const theIds: Array<number> = searchStore.marinaSearchResults?.map(x => x.geoJsonId!)!;

    const geoParams: client.GeoJsonGeoJsonByIdsGetRequest = {
      ids: theIds!,
    }
    console.log(geoParams)
    console.warn(geoJsonApi.geoJsonGeoJsonByIdsGet)
    const geojsonData = await geoJsonApi.geoJsonGeoJsonByIdsGet(geoParams);

    console.log("geoData", geojsonData)
    //@ts-ignore
    map.value.on('load', () => {

      /* Add the data to your map as a layer */
      //@ts-ignore
      // map.value.addLayer({
      //   id: 'marinas',
      //   type: 'circle',
      //   /* Add a GeoJSON source containing place coordinates and information. */
      //   source: {
      //     type: 'geojson',
      //     //@ts-ignore
      //     data: geojsonData
      //   }
      // });

      //@ts-ignore
      map.value.addSource('marinas', {
        type: 'geojson',
        //@ts-ignore
        data: geojsonData
      });

      for (const marker of geojsonData.features!) {
        /* Create a div element for the marker. */
        const el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${marker.properties?.mooringPinId!}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';
        if(savedMarinasStore.savedMarinas!.some(x => x.name === marker.properties?.title)){
          el.className += ' marker-saved'
        }
        // alert(marker.properties?.title);
        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        const newMarker = new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry!.coordinates)
            .addTo(map.value);
        
            markers.value.push({ newMarker, element: el });

        el.addEventListener('click', (e) => {
          /* Fly to the point */
          flyToLocation(marker.geometry?.coordinates!);
          /* Close all other popups and display popup for clicked store */
          const popProps:popUpProps = {
            coordinates: marker.geometry?.coordinates!,
            geoJsonId: marker.id!
          }
          addPopup(popProps);
          /* Highlight listing in sidebar */
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          const listing = document.getElementById(`listing-${marker.properties?.mooringPinId}`);
          listing?.classList.add('active');
        });
      }



      mapStore.mapLoaded = true;

    });



    // //@ts-ignore
    // console.log('Bearing', map.value.getBearing());
    // //@ts-ignore
    // console.log('Location', map.value.getCenter());
    // console.log('zoom', map.value.getZoom());

    // //@ts-ignore
    // map.value.on('load', () => {
    // });

    //@ts-ignore
    // map.value.on('click', (e) => {
    //     const features = map.value?.queryRenderedFeatures(e.point, {
    //       layers: ['marinas']
    //     });
    //     if(!features!.length){
    //       alert("layer not found");
    //       return;
    //     }
    //     const clickedLocation = features![0];

    //     /* Fly to the point */
    //     //@ts-ignore
    //     flyToLocation(clickedLocation.geometry.coordinates);

    //     /* Close all other popups and display popup for clicked store */
    //     const popProps : popUpProps = {
    //       //@ts-ignore
    //       coordinates: clickedLocation.geometry.coordinates,
    //       geoJsonId: Number(clickedLocation.id!)
    //     }
    //     addPopup(popProps);

    //   })

    //@ts-ignore
    map.value.on('move', () => {
      if(map.value === null || map.value === undefined){
        console.warn("MAP IS NULL");
      }
    });

    searchStore.marinaSearchResults?.forEach(x => {
      // alert(x.coordinates?.split(",")[0]);
      // const test = x.coordinates?.split(",");
      // const test2 = ["1","2"]
      // alert(test![1]);
      // alert(test2[1]);



    });

    // for(let i = 0; i < searchStore.marinaSearchResults?.length!; i++){
    //   new mapboxgl.Marker({ color: '#1d4ed8' })
    //     .setLngLat(searchStore.marinaSearchResults![i].coordinates?.split(","))
    //     .addTo(map.value);
    // }

    // new mapboxgl.Marker({ color: '#1d4ed8' })
    //     .setLngLat(searchStore.marinaSearchResults![0].coordinates?.split(","))
    //     .addTo(map.value);

    // // Add geolocate control to the map.
    // //@ts-ignore
    // map.value.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true  
    //     },
    //     // When active the map will receive updates to the device's location as it changes.
    //     trackUserLocation: true,
    //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
    //     showUserHeading: false
    //   })
    // );

    //@ts-ignore
    map.value.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    //@ts-ignore
    map.value.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: false
        }),
        "bottom-right"
    );
  }
});

onUnmounted(() => {
  document.getElementsByTagName("body")[0].style.overflow = "scroll";
  if (map.value) {
    map.value.remove();
  }

});
</script>

<style>
button.disabled{
  color: rgb(93, 93, 93) !important;
  border-color: rgb(93, 93, 93) !important;
  pointer-events: none;
}

button.disabled > svg{
  color: rgb(93, 93, 93) !important;
}


div.search-info-box > span.back:hover{
  cursor: pointer;
}

/* body{
    overflow: hidden !important;
} */

.mapboxgl-popup-close-button {
  display: none;
}

.mapboxgl-popup-content {
  font:
      400 15px/22px 'Source Sans Pro',
      'Helvetica Neue',
      sans-serif;
  padding: 0px;
  min-width: 12rem;
  min-height: 7rem;
  border-radius: 0.5rem;

}

.mapboxgl-popup-content span.facilities h3 {
  background:#613583;
  color: #fff;
  margin: 0;
  padding: 10px;
  border-radius: 0.5rem 0.5rem 0 0;
  /* border-radius: 0.5rem; */
  font-weight: 700;
  margin-top: -15px;
}

.mapboxgl-popup-content h3 {
  background:#1d4ed8;
  color: #fff;
  margin: 0;
  padding: 10px;
  border-radius: 0.5rem 0.5rem 0 0;
  /* border-radius: 0.5rem; */
  font-weight: 700;
  margin-top: -15px;
}

.mapbox-popup-content > span > h3.saved{
  background:#facc15 !important;
}

.mapboxgl-popup-content h4 {
  margin: 0;
  padding: 10px;
  font-weight: 400;
}

.mapboxgl-popup-content a {
  display: inline-block;
  padding-left: 10px !important;
  /* margin-bottom: 10px; */
  text-decoration: underline;
  margin-top: 0px;
  padding: 10px;
  font-weight: 400;
  color: #1d4ed8;
}

.mapboxgl-popup-content button.save {
  margin-left: 10px;
  margin-bottom: 10px;
  display: block;
  width: 90%;
  padding: 5px;
  border: 1px solid grey;
  font-weight: 400;
  color: rgb(230, 230, 230);
  border-radius: 0.5rem;
  background-color: #613583;
}

.mapboxgl-popup-content span.mooring button.save{
  background:#1d4ed8;
}

.mapboxgl-popup-content span.facilities a {
  /* margin-top: 10px; */
  padding: 10px;
  font-weight: 400;
  color: #613583;
}

.mapboxgl-popup-content div {
  padding: 10px;
}

.mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
  margin-top: 15px;
}

.mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
  border-bottom-color: #1d4ed8;
}

a{
  outline: none !important;
}

.marker {
  border: none;
  cursor: pointer;
  height: 65px;
  width: 65px;
  background-image: url('../assets/map-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

div.marker-saved{
  border: none;
  cursor: pointer;
  height: 65px;
  width: 65px;
  background-image: url('../assets/map-icon-saved.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.d-none{
  display: none !important;
}
</style>