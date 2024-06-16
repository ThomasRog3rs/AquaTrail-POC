<template>
    <div :class="location?.layer" class="text-slate-100 rounded-lg p-2 hover:cursor-pointer mb-2 transition duration-75">
        <h3 class="text-lg font-bold">{{ location?.title }} - {{ locationType }}</h3>
        <a :href="href" target="_blank">Canal Plan Page</a>
        <button @click="removeLocation">Delete</button>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { useMapStore } from '../stores/mapStore';

const mapStore = useMapStore();

const props = defineProps({
    location: Object
});

const locationType = ref<string>('');
const href = ref<string>('');

function removeLocation(){
    mapStore.removeLocation(props.location?.id);
}

onMounted(() => {
    locationType.value = props.location?.layer === "facilities" ? "Marina" : "Mooring";
    href.value = `https://canalplan.uk/place/${props.location?.id}`
})


</script>

<style scoped>
    div.facilities{
        background-color: #613583;
    }

    div.mooring{
        background-color: rgb(22 163 74);
    }

    a, button{
        margin-right: 10px;
        text-decoration: underline;
    }
</style>