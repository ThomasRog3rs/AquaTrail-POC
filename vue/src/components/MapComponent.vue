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
            style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
            //style: 'mapbox://styles/mapbox/streets-v12',
            center: [
            -2.474008,
            53.155133
          ], // starting center in [lng, lat]
            zoom: 5
        });

        map.value.on('load', () => {
          // map.value?.addSource('earthquakes', {
          //   type: 'geojson',
          //   data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          // });


          // map.value?.addSource('custom', {
          //   type: 'geojson',
          //   data: 'https://canalplan.org.uk/mapping/geodata/full/ukuk/canalplan_places.geojson'
          //   //data: '/src/assets/geoJSON/features.geojson'
          // });


          // const datasetUrl = `https://api.mapbox.com/datasets/v1/mr-thomas-rogers/clvjxrof22w7l1orvqw1fy7uz/features?access_token=${import.meta.env.VITE_API_KEY}`;
          // map.value?.addSource('canalplan', {
          //   type: 'geojson',
          //   data: datasetUrl
          // })
          // map.value?.addSource('lines', {
          //   'type': 'geojson',
          //   'data': 'https://api.mapbox.com/datasets/v1/mr-thomas-rogers/clvjxrof22w7l1orvqw1fy7uz/features?access_token='
            
          // });

          // map.value?.addSource('test', {
          //   'type': 'geojson',
          //   'data': '/src/assets/geoJSON/test.geojson'
          // });


          // map.value?.addLayer({
          //   'id': 'lines',
          //   'type': 'line',
          //   'source': 'test',
          //   'paint': {
          //       'line-width': 10,
          //       // Use a get expression (https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/expressions/#get)
          //       // to set the line-color to a feature property value.
          //       'line-color': 'red'
          //   }
          // });

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