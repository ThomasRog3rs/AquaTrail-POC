<template>
   <aside id="default-sidebar" class="fixed top-69 left-0 z-40 w-[25rem] h-screen shadow-lg border-solid transition-transform sm:translate-x-0" aria-label="Sidebar" :class="{'-translate-x-full' : !navStore.toggleNav, '-translate-x-0' : navStore.toggleNav}">
      <div class="h-full px-3 py-4 overflow-y-auto bg-slate-100 flex flex-col justify-between">
         <!-- <div class="mb-4">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
               <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                     <svg class="w-4 h-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                     </svg>
               </div>
               <input type="search" class="block w-full p-4 ps-10 text-sm text-slate-500 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search Locations" />
               <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-green-600 hover:bg-green-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-green-700 ">Search</button>
            </div>
         </div> -->
         <div>
         <div class="mb-4">
            <label class="cursor-pointer" >
               <p class="text-sm font-medium text-gray-900 mb-2">Display Moorings</p>
               <input type="checkbox" value="" class="sr-only peer" :checked="mapStore.showMoorings" @click="toggleMoorings">
               <div class="relative w-11 h-6 bg-green-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
         </div>
         <div class="mb-4">
            <label class="cursor-pointer" >
               <p class="text-sm font-medium text-gray-900 mb-2">Display Marinas</p>
               <input type="checkbox" value="" class="sr-only peer" :checked="mapStore.showMarinas" @click="toggleMarinas">
               <div class="relative w-11 h-6 bg-[#431A63] rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#613583]"></div>
            </label>
         </div>
         <div v-if="mapStore.savedLocations.length > 0">
            <h1>Saved Locations:</h1>

            <template v-for="location in mapStore.savedLocations" :key="location.id">
               <SavedRoutes :location="location" @click.self="zoomToLocation(location.coordinates)" @zoomToLocation="zoomToLocation"></SavedRoutes>
            </template>
         </div>
         </div>
         <div style="margin-bottom: 75px;">
            <p>Map data for this project was downloaded from <a href="https://canalplan.org.uk/wiki/downloads:introduction" target="_blank">Canal Plan</a></p>
         </div>
      </div>
   </aside>
</template>

<script lang="ts" setup>
import { useMapStore } from '../stores/mapStore';
import { useNavStore } from '../stores/navStore';
import SavedRoutes from './SavedRoutes.vue';

const mapStore = useMapStore();
const navStore = useNavStore();

const toggleMoorings = () => {
   mapStore.showMoorings = !mapStore.showMoorings;
}

const toggleMarinas = () => {
   mapStore.showMarinas = !mapStore.showMarinas;
}

const zoomToLocation = (coordinates : Array<number>) => {
   mapStore.setZoomLocation(coordinates);
}

</script>

<style scoped>
   a{
      color: rgb(22 163 74);
      text-decoration: underline;
   }
</style>