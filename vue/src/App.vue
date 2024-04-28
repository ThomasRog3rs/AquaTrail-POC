<template>
  <NavBar></NavBar>
  <SideNav></SideNav>
  <main class="mt-18" style="overflow: hidden;">
    <div class="bg-green-600" style="padding-left: 382px; width: 100%; height: 100vh;">
      <!-- <h1 class="text-4xl font-bold underline text-center mt-5">Aqua trail POC</h1> -->
      <MapComponent></MapComponent>
    </div>
  </main>
</template> 

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import MapComponent from './components/MapComponent.vue';
import SideNav from './components/SideNav.vue';
</script>