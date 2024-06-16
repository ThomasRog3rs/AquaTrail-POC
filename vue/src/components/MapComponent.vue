<template>
    <!-- <button @click="showNearByShops">Show Nearby Shops - test</button> -->
    <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
</template> 
   
<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue';
import mapboxgl, {Map} from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useMapStore } from '../stores/mapStore';
// import PopupContent from './PopupContent.vue';
import {savedLocation} from '../types/location';

const mapStore = useMapStore();

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

watch(() => mapStore.zoomToLocationCoordinates, () => {
  if(map.value && mapStore.zoomToLocationCoordinates != undefined){
    zoomToLocation(mapStore.zoomToLocationCoordinates);
  }
})

function flyToLocation(currentFeature :  mapboxgl.MapboxGeoJSONFeature){
  if(map.value){
    map.value.flyTo({
      //@ts-ignore
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
}

function zoomToLocation(coordinates: Array<number>){
  if(map.value){
    map.value.flyTo({
      //@ts-ignore
      center: coordinates,
      zoom: 15
    })
  }
}

//Needs to be on the window object so it can be called from the template string in popup
//@ts-ignore
Window.prototype.saveLocation = function(coordinates : Array<number>, layer: string, title: string, id: string) {
  const location : savedLocation = {
    coordinates: coordinates,
    layer: layer,
    title:title,
    id: id
  }
  console.log(location);

  //@ts-ignore
  const store = window.globalStore;

  const exists = store.state.value.mapStore.savedLocations.find((x:any) =>  x.id === location.id) == undefined ? false : true;

  if(!exists){
    store.state.value.mapStore.savedLocations.push(location); 
  }

  console.log(store.state.value.mapStore.savedLocations);

  console.log(coordinates);
  console.log(layer)
  console.log(title)
  console.log(id);
}

onMounted(() => {
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
        
        //TODO: show nearby shops

        map.value.on('load', () => {
          map.value!.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');
          map.value!.setLayoutProperty('actual-marinas', 'visibility', mapStore.showMarinas ? 'visible' : 'none');
        });

        map.value.on('click', (e) => {
            const features = map.value!.queryRenderedFeatures(e.point, {
                layers: ['marinas', 'actual-marinas']
            });

            features[0].state

            if(!features.length) return;

            console.log(features);
            const feature = features[0];
            new mapboxgl.Popup({ offset: [0, -15] }) 
                //@ts-ignore
                .setLngLat(feature.geometry.coordinates)
                //@ts-ignore
                .setHTML(`<span class="${feature.properties.layer}"><h3>${feature.properties.title}</h3><a href="https://canalplan.uk/place/${feature.properties.cp_id}" target="_blank">Canal Plan Page</a><button onclick="saveLocation([${feature.geometry.coordinates}], '${feature.properties.layer}', '${feature.properties.title}', '${feature.properties.cp_id}')">Save</button></span>`)
                .addTo(map.value!);

            flyToLocation(feature);
          })

        map.value.addControl(
          new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          })
        );

        // Add geolocate control to the map.
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
    padding: 0;
    width: 185px;
  }

  .mapboxgl-popup-content span.facilities h3 {
    background:#613583;
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-weight: 700;
    margin-top: -15px;
  }

  .mapboxgl-popup-content h3 {
    background:rgb(22 163 74);
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-weight: 700;
    margin-top: -15px;
  }

  .mapboxgl-popup-content h4 {
    margin: 0;
    padding: 10px;
    font-weight: 400;
  }

  .mapboxgl-popup-content a {
    margin-top: 10px;
    padding: 10px;
    font-weight: 400;
    color: rgb(22 163 74);
  }

  .mapboxgl-popup-content span.facilities a {
    margin-top: 10px;
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
</style>