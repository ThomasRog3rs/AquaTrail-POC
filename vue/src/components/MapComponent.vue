<template>
    <!-- <button @click="showNearByShops">Show Nearby Shops - test</button> -->
    <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
</template> 
   
<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue';
//@ts-ignore
import mapboxgl, {Map} from 'mapbox-gl';
//@ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useMapStore } from '../stores/mapStore';
import { useNavStore } from '../stores/navStore';
// import PopupContent from './PopupContent.vue';
import {currentLocation, location} from '../types/location';

const mapStore = useMapStore();
const navStore = useNavStore();

const popup = ref<any>(null);

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

watch(() => mapStore.showMoorings,() =>{
  if(map.value){
    map.value.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');  
  }
});

watch(() => mapStore.showMarinas,() =>{
  if(map.value){
    map.value.setLayoutProperty('actual-marinas', 'visibility', mapStore.showMarinas ? 'visible' : 'none');  
  }
});

watch(() => mapStore.triggerLocationChange, async () => {
  console.log(mapStore.zoomToLocation);
  if(!map.value) return;
  if(mapStore.zoomToLocation === undefined) return;
  if(!mapStore.zoomToLocation.coordinates) return;
  if(mapStore.zoomToLocation.coordinates === mapStore.currentLocation?.coordinates) return;

  await flyToLocation(mapStore.zoomToLocation.coordinates);
  removePopup();
  await addPopup(mapStore.zoomToLocation);

  navStore.toggleNav = false;
});

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

function escapeStringForHTML(str:string | undefined) {
  if(str ==undefined) return;
  return str.replace(/'/g, "\\'");
}

function removePopup(){
  if(popup.value){
    popup.value.remove();
  }
}

function addPopup(location: location): Promise<void>{
  return new Promise((resolve, reject) => {
    if(!map.value) return;
    if(!location) return;
    if(!location.coordinates) return;

    if(map.value){
      const theTitle = escapeStringForHTML(location.title);

      popup.value = new mapboxgl.Popup({ offset: [0, -15] })  
      //@ts-ignore
      .setLngLat(location.coordinates)
      .setHTML(`<span class="${location.layer}"><h3>${location.title}</h3><a href="https://canalplan.uk/place/${location.cp_id}" target="_blank">Canal Plan Page</a><br/><button class="save" onclick="saveLocation([${location.coordinates}], '${location.layer}', '${theTitle}', '${location.cp_id}')">Save Location</button></span>`)
      .addTo(map.value!);

      resolve();
    }else{
      reject("No init map");
    }
  })
}

//Needs to be on the window object so it can be called from the template string in popup
//@ts-ignore
Window.prototype.saveLocation = function(coordinates : Array<number>, layer: string, title: string, id: string, icon: string) {
  const location : location = {
    coordinates: coordinates,
    layer: layer,
    title:title,
    cp_id: id,
    icon: icon
  }
  console.log(location);

  //@ts-ignore
  const store = window.globalStore;

  const exists = store.state.value.mapStore.savedLocations.find((x:any) =>  x.cp_id === location.cp_id) == undefined ? false : true;

  if(!exists){
    store.state.value.mapStore.savedLocations.push(location); 
  }

  console.log(store.state.value.mapStore.savedLocations);
}

function getFeaturesFromPoint(point : mapboxgl.Point | mapboxgl.PointLike){
  const features = map.value!.queryRenderedFeatures(point, {
    layers: ['marinas', 'actual-marinas']
  });

  if(features.length < 1) return;

  console.log(features);
  const feature = features[0];

  if(!feature) return;
  if(!feature.properties) return;
  return feature;
}

onMounted(() => {
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
          const currentLocation : currentLocation = {
            //@ts-ignore
            coordinates: map.value.getCenter(),
            bearing: map.value!.getBearing(),
            zoom: map.value!.getZoom()
          }

          mapStore.setCurrentLocation(currentLocation);

          map.value!.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');
          map.value!.setLayoutProperty('actual-marinas', 'visibility', mapStore.showMarinas ? 'visible' : 'none');

          // const marinas = map.value!.querySourceFeatures('composite', {
          //   'sourceLayer': 'actual-marinas'
          // });

          // console.log('All marinas?: ', marinas);

          // console.log('test search: ', marinas.filter((x : any) => x.properties.title === 'undefined' || x.properties.title == undefined));
          
          // //map to correct object
          // const allMarinas : Array<location> = [];

          // marinas.forEach((x) => {
          //   const properties = x.properties;
          //   //@ts-ignore
          //   const coordinates = x.geometry.coordinates;
            
          //   if(!properties) return;
          //   if(!coordinates) return;

          //   console.log(properties.title + ': ', coordinates);

          //   const locationInfo : location = {
          //     coordinates: coordinates,
          //     cp_id: properties.cp_id,
          //     cp_route: properties.cp_route,
          //     icon: properties.icon,
          //     layer: properties.layer,
          //     title: properties.title
          //   };

          //   allMarinas.push(locationInfo);
          // });

          // mapStore.allMarinas = allMarinas;

          // console.log('all marinas from store: ', mapStore.allMarinas);
        });

        //@ts-ignore
        map.value.on('move', () => {
          if(map.value === null || map.value === undefined){
            console.warn("MAP IS NULL");
          }

          // console.log('Bearing', map.value?.getBearing());
          // console.log('Location', map.value?.getCenter());
          // console.log('zoom', map.value?.getZoom());

          const currentLocation : currentLocation = {
              //@ts-ignore
              coordinates: map.value!.getCenter(),
              bearing: map.value!.getBearing(),
              zoom: map.value!.getZoom()
            }

            mapStore.setCurrentLocation(currentLocation);
        })

        //@ts-ignore
        map.value.on('click', async (e) => {
            // const features = map.value!.queryRenderedFeatures(e.point, {
            //     layers: ['marinas', 'actual-marinas']
            // });

            // if(features.length < 1) return;

            // console.log(features);
            // const feature = features[0];

            let feature = getFeaturesFromPoint(e.point);
            console.log("original feature: ", feature)
            if(!feature) return;
            if(!feature.properties) return;

            //@ts-ignore
            await flyToLocation(feature.geometry.coordinates);

            //update feature coordinates for creatubg popup
            // feature = getFeaturesFromPoint(e.point);
            console.log("updated feature: ", feature);
            if(!feature) return;
            if(!feature.properties) return;
            const location : location = {
              //@ts-ignore
              coordinates: feature.geometry.coordinates,
              cp_id: feature.properties.cp_id,
              cp_route: feature.properties.cp_route,
              icon: feature.properties.icon,
              layer: feature.properties.layer,
              title: feature.properties.title
            }

            removePopup();
            //@ts-ignore
            await addPopup(location);
        });

        //@ts-ignore
        map.value.addControl(
          new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          })
        );

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

        //@ts-ignore
        map.value.addControl(new mapboxgl.NavigationControl());
    }
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

</script>

<style>
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