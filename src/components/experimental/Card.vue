<template>


<div class="max-w-sm bg-white border border-gray-500 rounded-lg shadow mr-4">
    <router-link :to="`/marina/${props.id}`">
    <img v-if="props.hasImage" class="rounded-t-lg" src="https://i.pinimg.com/736x/78/b2/fb/78b2fbc764bfab4a210ae9ae9117b941.jpg" alt="" />

    <div class="p-5">
        <a href="#">
            <h2 class="mb-2 text-2xl font-bold text-gray-700 md:text-2xl lg:text-3xl"> {{ props.name }}</h2>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900"></h5>
        </a>
        <p class="text-md font-normal text-gray-500 lg:text-xl">{{props.description}}</p>
        <p v-if="props.distance" class="text-md font-normal text-gray-800 lg:text-xl">{{ props.distance }} miles</p>

    </div>
    </router-link>
</div>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { closeLocation } from '@/types/closeToHome';

// Define props based on the closeLocation type
const props = defineProps<{
  id: string;
  name: string;
  description: string | undefined;
  image: string;
  hasImage: boolean;
  distance: number | string | undefined;
}>();
</script>

<style scoped>
div.max-w-sm{
    max-width: 33%;
    min-width: 33%;
}
</style>