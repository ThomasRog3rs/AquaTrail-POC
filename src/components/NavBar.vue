<template>
<nav class="bg-slate-100 w-full z-20 h-69 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow" style="flex-shrink: 0;">
  <div class="flex p-4 justify-between">
    <a href="/" class="flex space-x-3">
        <img src="../assets/AquaTrailsLogo.png" class="h-8" alt="Flowbite Logo">
    </a>
    <div class="flex space-x-6">
      <button class="md:hidden" @click="navStore.toggleNav = !navStore.toggleNav">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>  
      </button>
    </div>

  </div>
</nav>

</template>

<script lang="ts" setup>
import { useNavStore } from '../stores/navStore';
const navStore = useNavStore();

</script>