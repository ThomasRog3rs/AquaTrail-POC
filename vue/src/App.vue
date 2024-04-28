<template>
  <NavBar></NavBar>
  <SideNav></SideNav>
  <main class="mt-18" style="overflow: hidden;">
    <div class="w-100 h-screen pl-[0px] sm:pl-[382px]">
      <MapComponent></MapComponent>
    </div>
  </main>
</template> 

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import MapComponent from './components/MapComponent.vue';
import SideNav from './components/SideNav.vue';
</script>

<style>
</style>