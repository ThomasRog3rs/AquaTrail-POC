<template>
  <NavBar></NavBar>
  <SideNav></SideNav>
  <main class="mt-18" style="overflow: hidden;">
    <div class="bg-green-600" style="padding-left: 382px; width: 100%; height: 100vh;">
      <MapComponent></MapComponent>
    </div>
  </main>
  
</template> 

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import MapComponent from './components/MapComponent.vue';
import SideNav from './components/SideNav.vue';
</script>