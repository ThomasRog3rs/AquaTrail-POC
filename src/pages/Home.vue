<template>
        <NavBar></NavBar>
        <SideNav></SideNav>

        <main>
            <div class="flex-1 min-h-0 h-[calc(100vh-69px)] w-full ml-0 sm:ml-[25rem] sm:w-[calc(100vw-25rem)]">
    <div v-if="!mapStore.mapLoaded" class="overlay">
<h1>Loading...</h1>
<div class="loading">
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
  <MapComponent></MapComponent>
</div>
        </main>

</template>

<script setup lang="ts">

import NavBar from '../components/NavBar.vue';
import MapComponent from '../components/MapComponent.vue';
import SideNav from '../components/SideNav.vue';
import { useMapStore } from '../stores/mapStore';
import { onMounted, onUnmounted } from 'vue';
const mapStore = useMapStore();

const handleScroll = () => {
    const scrollPosition = {
        x: window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft,
        y: window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
    };

    if(scrollPosition.y !== 0){
        window.scrollY = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

<style>
.overlay{
  width: 100%;
  height: 100%;
  background-color: rgb(234, 234, 234);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: none;
}

.loading {
  position: relative;
  width: 10px;
  display: flex;
  align-items: center;
  margin-top: 20px; /* Adjust margin-top to create space between h1 and loading */
}

.loading span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #1d4ed8;
    border-radius: 10px;
    position: absolute;
}

.loading span:first-child {
    animation: loading-span1 1.3s infinite;
    left: 0;
}

.loading span:nth-child(2) {
    animation: loading-span2 1.3s infinite;
    left: 15px;
}

.loading span:nth-child(3){
    animation: loading-span3 1.3s infinite;
    left: 30px;
}

@keyframes loading-span1 {
    0% {
        height: 10px;
    }
    25% {
        height: 20px;
    }
    50% {
        height: 10px;
    }
    100% {
        height: 10px;
    }
}

@keyframes loading-span2 {
    0% {
        height: 10px;
    }
    25% {
        height: 10px;
    }
    50% {
        height: 20px;
    }
    75% {
        height: 10px;
    }
    100% {
        height: 10px;
    }
}

@keyframes loading-span3 {
    0% {
        height: 10px;
    }
    25% {
        height: 10px;
    }
    50% {
        height: 10px;
    }
    75% {
        height: 20px;
    }
    100% {
        height: 10px;
    }
}

</style>