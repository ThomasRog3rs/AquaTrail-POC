<template>
<nav class="bg-slate-100 w-full z-20 h-69 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow">
  <div class="flex p-4 justify-between">
    <a href="https://flowbite.com/" class="flex space-x-3">
        <img src="../assets/AquaTrailsLogo.png" class="h-8" alt="Flowbite Logo">
    </a>
    <div class="flex space-x-6">
        <button type="button" class="" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <svg class="w-5 h-5 text-gray-800 transition duration-75 font-xl text-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
            </svg>      
        </button>
        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-green-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user photo">
        </button>
    </div>

  </div>
</nav>

</template>

<script lang="ts" setup>
</script>