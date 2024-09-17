<template>
  <main>
    <router-view></router-view>
  </main>
  <div class="fixed bottom-0 left-0 w-full bg-blue-700 text-white py-4 px-6 flex items-center z-[999]">
    <div class="flex-1 text-left">
      <h2 class="text-lg font-semibold mb-1">Cookie Notice</h2>
      <p class="text-sm">We use a cookie to help improve the site. Your consent allows us to make valuable updates. </p>
    </div>
    <button class="absolute top-2 right-2 text-white text-lg" aria-label="Close">
      &times;
    </button>
    <div class="flex space-x-4 ml-12">
      <button class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
        Decline
      </button>
      <button class="bg-[#D9A61C] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
        Accept
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

