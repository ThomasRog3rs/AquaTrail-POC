<template>
   <aside id="default-sidebar" class="fixed top-69 left-0 z-40 w-[25rem] h-screen shadow-lg border-solid transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-slate-100">
         <div class="mb-4">
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
         </div>

         <div class="mb-4">
            <label class=""></label>
            <label for="countries" class="mb-5 text-md font-medium text-gray-900 text-slate-800">Location Type</label>
            <select id="countries" class="block w-full p-3 text-sm text-slate-500 border border-gray-300 rounded-lg bg-gray-50">
               <option selected>Choose type</option>
               <option value="US">United States</option>
               <option value="CA">Canada</option>
               <option value="FR">France</option>
               <option value="DE">Germany</option>
            </select>
         </div>
      </div>
   </aside>
</template>

<script lang="ts" setup>
import SavedRoutes from './SavedRoutes.vue';
</script>