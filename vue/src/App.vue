<template>
  <NavBar></NavBar>
  <SideNav></SideNav>
  <main class="">
    <div class="flex-1 min-h-0 h-[calc(100vh-69px)] w-full ml-0 sm:ml-[25rem] sm:w-[calc(100vw-25rem)]">
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
.content {
    flex: 1;
    min-height: 0;
    height: calc(100vh - 69px); /* 100vh minus the height of the nav */
    width: calc(100vw - 25rem); /* 100vw minus the width of the side nav */
    margin-left: 25rem;
}
</style>