<template>
    <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
</template> 
  
<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import mapboxgl, {Map} from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

onMounted(() => {
    if(map.value){
        map.value = new mapboxgl.Map({
            container: map.value as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-24, 42], // starting center in [lng, lat]
            zoom: 1
        });
        map.value.addControl(
          new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          })
        )

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