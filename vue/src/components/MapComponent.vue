<template>
    <div ref="map" class="map-container w-1/1 h-full" id="map-container"></div>
</template> 
  
<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import mapboxgl, {Map} from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref<Map|null>(null);

onMounted(() => {
    if(map.value){
        map.value = new mapboxgl.Map({
            container: map.value as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v11',
        });
    }
});

onUnmounted(() => {
  // Clean up when the component is unmounted
  if (map.value) {
    map.value.remove();
  }
});
</script>

<style scoped>
/* .map-container {
  width: 150%;
  height: 100%;
} */
</style>