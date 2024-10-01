<template>
  <div v-if="loading" class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
    <div v-else class="bg-blue-700" style="padding: 25px; height: 80px;">
        <div class="flex justify-between text-white mx-auto w-full max-w-screen-xl">
            <span class="back w-20" @click="goBack">
                <svg class="w-6 h-6 text-white-800 inline-block mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>
            </span>
          
            <span class="text-xl w-full" style="text-align: center;">
              {{marina?.type?.toLowerCase().charAt(0).toUpperCase() + marina?.type?.toLowerCase().slice(1)!}}
            </span>
            <span class="save w-20">
                <template v-if="marinaIsSaved"><svg @click="unsaveMarina" class="w-6 h-6 mt-2 ml-2 text-[#facc15]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
</svg>

</template>
                <template v-else> <svg @click="saveMarina" class="w-6 h-6 mt-2 ml-2 text-[#facc15]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
</svg>
</template>
            </span>
            <!--<span class="w-20"></span>-->
        </div>
    </div>
    <!-- <div id="serviceIcons" class="shadow-lg border" v-if="iconPaths?.length! > 0">
        <div>
            <span v-for="icon in iconPaths">
                <img :src="icon.path" :alt="icon.name" :title="icon.name" class=""/>
            </span>
            <span v-for="icon in iconPaths" :key="icon.name">
                <img :src="icon.path" :alt="icon.name" :title="icon.name" class=""/>
            </span>
        </div>
    </div> -->
    <div>
    <main id="marina-details" class="mx-auto w-full max-w-screen-xl lg:py-8">
        <section class="marina-heading flex justify-between">
            <h1 class="mb-2 text-2xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl">{{ marina?.name }}</h1>
<!--          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ave</button>-->

          <!--            <a v-if="marina?.website != undefined" :href="marina?.website" target="_blank" class="text-blue-700 text-xl">Website</a>-->
            <!-- <a v-else href="#" class="text-gray-600 hover:cursor-not-allowed">Website</a> -->
        </section>      
        <hr>  
        <div class="marina-map-conatiner">
            <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
        </div>
        <hr>
        <section>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.address != undefined || marina?.website != undefined">
              <template v-if="marina?.address != undefined"> 
                <h4 class="mr-2 font-medium">Address:</h4>
                <p v-if="marina?.address != undefined">{{ marina?.address }}</p>
              </template>

              <template v-if="marina?.website != undefined">
                <h4 class="mt-2 mr-2 font-medium">Website:</h4>
                <a v-if="marina?.website != undefined" :href="marina?.website" target="_blank" class="underline text-blue-600">{{ marina?.website }}</a>
              </template>
            </div>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.phoneNumber != undefined">
                <h4 class="mr-2 font-medium">Phone Number:</h4>
                <p style="display: inline-block;" class="text-base">{{ marina?.phoneNumber }}</p>
            </div>
            <!-- <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.notes != undefined">
                <h4 class="mr-2 font-medium">Notes:</h4>
                <p style="display: inline-block;" class="text-base">{{ marina?.notes }}</p>
            </div> -->
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.services?.length! > 0">
                <h4 class="mr-2 font-medium">Services:</h4>
                <ul style="list-style: inside; margin-bottom: 15px;">
                    <li v-for="service in marina?.services" :key="service.id">{{ service.serviceType?.value }}</li>
                </ul>
            </div>
        </section>
    </main>
    </div>

</template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import * as client from '../api-client';
  import { useRouter } from 'vue-router';
//   import cpBarIcon from '../assets/icons/cp-bar.svg'; // Import the SVG
//@ts-ignore
import mapboxgl, {Map} from 'mapbox-gl';
//@ts-ignore
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useMapStore } from '../stores/mapStore';
import { useSearchStore } from '../stores/searchStore';
import {useSavedMarinasStore} from "../stores/savedMarinasStore";

  const savedMarinasStore = useSavedMarinasStore();
  const searchStore = useSearchStore();

const saving = ref<boolean>(true);
const marinaIsSaved = ref<boolean>(false);

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);
    const mapStore = useMapStore();


    const icons = import.meta.glob('../assets/icons/*.svg');
  console.log(icons);
  type iconPath = {
    path: string,
    name: string
  }
  const iconPaths = ref<Array<iconPath>>();

  const router = useRouter();

  const DataApi = new client.DataApi();
  const GeoApi = new client.GeoJsonApi();

  const loading = ref<boolean>(true);
  
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

  const marina = ref<client.MarinaModel>();

  const goBack = () => {
    // alert(searchStore.searchLocationValue)
    if(searchStore.searchLocationValue == undefined){
        router.push("/");
        return;
    } 
    router.push("/Results");
  }

  function saveMarina() {
    if(marina.value === undefined) return;
    savedMarinasStore.savedMarinas?.push(marina.value);
    marinaIsSaved.value = savedMarinasStore.savedMarinas?.some(x => x.id === marina.value!.id)!;
  }
  
  function unsaveMarina(){
    if(marina.value === undefined) return;
    savedMarinasStore.savedMarinas = savedMarinasStore.savedMarinas?.filter(x => x.id !== marina.value!.id)!;
    marinaIsSaved.value = savedMarinasStore.savedMarinas?.some(x => x.id === marina.value!.id)!;
  }
  

  onMounted(async () => {
    const params : client.DataMarinaIdGetRequest = {
        id: props.id
    }
    
    marina.value = await DataApi.dataMarinaIdGet(params);

    if (savedMarinasStore.savedMarinas && marina.value !== undefined) {
      marinaIsSaved.value = savedMarinasStore.savedMarinas.some(x => x.id === marina.value!.id);
    }


    // iconPaths.value = marina.value.services?.map((x : client.ServiceModel) =>{
    //     const iconKey = x.serviceType?.iconKey?.toLowerCase();
    //     const iconPath = iconKey ? require(`@/assets/icons/cp-${iconKey}.svg`) : '';
    //     return {
    //         name: x.serviceType?.value ?? '',
    //         path: iconPath
    //     }
    // }) || [];

    // console.log(iconPaths.value);

    const geoParams :  client.GeoJsonGeoJsonByIdGetRequest = {
        id: marina.value.geoJsonId!,
    };
    console.log(geoParams);
    console.warn(marina.value.geoJsonId)

    const location : client.GeoJsonModel = await GeoApi.geoJsonGeoJsonByIdGet(geoParams);
    console.log("location",location);

    mapStore.getDataSets();
    //console.log();
    mapStore.mapLoaded = false;
    if(map.value){
        const theMarinaCoords = location.features![0].geometry?.coordinates!;
        map.value = new mapboxgl.Map({
            //@ts-ignore
            container: map.value as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v12',
            // style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
            //style: 'mapbox://styles/mapbox/streets-v12',
            center: theMarinaCoords, // starting center in [lng, lat]
            //bounds: [[-22.92826178066636, 47.677731905744565], [9.98024578066787, 50.887536758179465]],
            zoom: 14.2
        });

        // const marker1 = new mapboxgl.Marker()
        //     .setLngLat(center)
        //     .addTo(map.value);

        new mapboxgl.Marker({ color: '#1d4ed8' })
        .setLngLat(theMarinaCoords)
        .addTo(map.value);
        

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
                // Add geolocate control to the map.
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
          })
        );

    }

    loading.value = false;
  })
  </script>

  <style>
    span.back{
        font-size: 40px;
        margin-top: -20px;
        margin-right: -15px;
    }

    span.save{
        font-size: 30px;
        margin-top: -5px;
        margin-right: -25px;
    }

    span.back:hover,
    span.save:hover{
        cursor: pointer;
    }

    div#serviceIcons{
        background-color: whitesmoke;
        height: 80px;
        padding: 20px;
    }

    div#serviceIcons > div{
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        /* gap: 20px; */
        height: 100%;
        /* border: 1px solid orange; */
        overflow-x: scroll;
    }

        /* Hide scrollbar for Chrome, Safari, and Edge */
        div#serviceIcons > div::-webkit-scrollbar {
      display: none; /* Chrome, Safari, and Edge */
    }

    div#serviceIcons > div > span{
        /* border-right: 1px solid red;
        border-left: 1px solid red; */
        min-width: 20%;
        max-width: 20%;
    }

    div#serviceIcons > div > span > img{
        width: auto;
        max-height: 100%;
        margin: 0px auto;
        border: 3px solid #facc15;
        border-radius: 8px;
    }

    div#marinaHeading{
        padding: 10px;
    }

    div.marina-map-conatiner{
        height: 25vh;
    }
</style>