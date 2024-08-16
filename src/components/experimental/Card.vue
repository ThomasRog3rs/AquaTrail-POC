<template>


<div class="max-w-sm bg-white border border-gray-500 rounded-lg shadow mr-4">
    <img v-if="props.hasImage" class="rounded-t-lg" src="https://i.pinimg.com/736x/78/b2/fb/78b2fbc764bfab4a210ae9ae9117b941.jpg" alt="" />

    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.name }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">{{props.description}}</p>
        <p>{{ props.distance }}km</p>
    </div>
</div>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { closeLocation } from '@/types/closeToHome';

// Define props based on the closeLocation type
const props = defineProps<{
  name: string;
  description: string | undefined;
  image: string;
  hasImage: boolean;
  distance: number;
}>();
</script>

<style scoped>
div.max-w-sm{
    max-width: 33%;
    min-width: 33%;
}
</style>