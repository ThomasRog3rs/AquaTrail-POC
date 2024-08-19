<template>
    <div class="bg-blue-700" style="padding: 25px; height: 80px;">
        <div class="flex justify-between text-white">
            <span class="back w-20" @click="goBack">
                &LeftArrow;
            </span>
            <span class="text-xl w-full" style="text-align: center;">{{marina?.type?.toLowerCase().charAt(0).toUpperCase() + marina?.type?.toLowerCase().slice(1)!}}</span>
            <span class="save w-20">
                
                <template v-if="false">&#9733;</template>
                <template v-else> &#x2606;</template>
            </span>
        </div>
    </div>
    <div id="serviceIcons" class="shadow-lg border" v-if="iconPaths?.length! > 0">
        <div>
            <span v-for="icon in iconPaths">
                <img :src="icon.path" :alt="icon.name" :title="icon.name" class=""/>
            </span>
        </div>
    </div>
    <div>
    <main id="marina-details">
        <section class="marina-heading flex justify-between">
            <h1 class="font-bold text-lg mb-2">{{ marina?.name }}</h1>
            <a v-if="marina?.website != undefined" :href="marina?.website" target="_blank" class="text-blue-700">Website</a>
            <a v-else href="#" class="text-gray-600 hover:cursor-not-allowed">Website</a>
        </section>      
        <hr>  
        <div class="marina-map-conatiner">
            <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
        </div>
        <hr>
        <section>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.notes != undefined">
                <h4 class="mr-2 font-medium">Address:</h4>
                <p v-if="marina?.address != undefined">{{ marina?.address }}</p>
            </div>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.phoneNumber != undefined">
                <h4 class="mr-2 font-medium">Phone Number:</h4>
                <p style="display: inline-block;" class="text-base">{{ marina?.phoneNumber }}</p>
            </div>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.notes != undefined">
                <h4 class="mr-2 font-medium">Notes:</h4>
                <p style="display: inline-block;" class="text-base">{{ marina?.notes }}</p>
            </div>
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
  import { onMounted, ref } from 'vue';
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

const searchStore = useSearchStore();

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
    if(searchStore.marinaSearchValue == undefined && searchStore.serviceSearchValue == undefined){
        router.push("/");
        return;
    } 
    router.push("/Results");
  }

  onMounted(async () => {
    const params : client.DataMarinasIdGetRequest = {
        id: props.id
    }

    marina.value = await DataApi.dataMarinasIdGet(params);

    iconPaths.value = marina.value.services?.map((x : client.ServiceModel) =>{
        return {
            name: x.serviceType?.value ?? '',
            path: `/src/assets/icons/cp-${x.serviceType?.iconKey?.toLowerCase()}.svg` ?? ''
        }
    }) || [];

    console.log(iconPaths.value);

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