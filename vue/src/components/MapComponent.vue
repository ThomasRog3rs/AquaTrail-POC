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

const mapStore = useMapStore();

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

watch(() => mapStore.showMoorings,() =>{
  if(map.value){
    map.value.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');  
  }
});

function flyToLocation(currentFeature :  mapboxgl.MapboxGeoJSONFeature){
  if(map.value){
    map.value.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
}

onMounted(() => {
    if(map.value){
        map.value = new mapboxgl.Map({
            container: map.value as HTMLElement,
            style: 'mapbox://styles/mr-thomas-rogers/clx7iv6sm00cs01qqd577ddc8',
            // style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
            //style: 'mapbox://styles/mapbox/streets-v12',
            //center: [-2.474008, 53.155133], // starting center in [lng, lat]
            //center: [-0.974478,51.449553],
            bounds: [[-22.92826178066636, 47.677731905744565], [17.98024578066787, 56.887536758179465]],
            zoom: 5
        });
        
        //TODO: show nearby shops

        map.value.on('load', () => {
          map.value!.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');
        });

        map.value.on('click', (e) => {
            const features = map.value!.queryRenderedFeatures(e.point, {
                layers: ['marinas']
            });

            if(!features.length) return;

            console.log(features);
            const feature = features[0];
            new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`<h3>${feature.properties.title}</h3><a href="https://canalplan.uk/place/${feature.properties.cp_id}" target="_blank">Canal Plan Page</p>`)
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