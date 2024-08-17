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

        <SearchBar style="position: absolute; z-index: 1; width: 100%; padding: 20px; padding-top: 0px;" @back="router.push('/results')" @click="openSearchBox"></SearchBar>
        <!-- <div class="search-info-box-container">
            <div class="search-info-box">
                <span class="back" @click="goBack">
                &LeftArrow;
                </span>
                <span class="searchTerm">"Search Term here"</span>
            </div>
        </div> -->
        <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
    </div>
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

const router = useRouter();

const mapStore = useMapStore();
const navStore = useNavStore();

const popup = ref<any>(null);

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

const searchBoxOpen = ref<boolean>(false);

const openSearchBox = () => {
    searchBoxOpen.value = true;
}

onMounted(() => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    mapStore.getDataSets();
    //console.log();
    mapStore.mapLoaded = false;
    if(map.value){
        map.value = new mapboxgl.Map({
            //@ts-ignore
            container: map.value as HTMLElement,
            style: 'mapbox://styles/mr-thomas-rogers/clx7qe3r701pv01qs1dtoethy',
            // style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
            //style: 'mapbox://styles/mapbox/streets-v12',
            center: [-1.474008, 52.155133], // starting center in [lng, lat]
            //bounds: [[-22.92826178066636, 47.677731905744565], [9.98024578066787, 50.887536758179465]],
            zoom: 6
        });
        

        // //@ts-ignore
        // console.log('Bearing', map.value.getBearing());
        // //@ts-ignore
        // console.log('Location', map.value.getCenter());
        // console.log('zoom', map.value.getZoom());

        //@ts-ignore
        map.value.on('load', () => {
          mapStore.mapLoaded = true;
        });

        //@ts-ignore
        map.value.on('move', () => {
          if(map.value === null || map.value === undefined){
            console.warn("MAP IS NULL");
          }
        })

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
    background:rgb(22 163 74);
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 0.5rem 0.5rem 0 0;
    /* border-radius: 0.5rem; */
    font-weight: 700;
    margin-top: -15px;
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
    color: rgb(22 163 74);
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
    background:rgb(22 163 74);  
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
    border-bottom-color: #91c949;
  }

  a{
    outline: none !important;
  }
</style>