import {defineStore} from 'pinia';
import {ref} from 'vue';
import {savedLocation} from '../types/location';

export const useMapStore = defineStore('mapStore', () => {
    const showMoorings = ref<boolean>(true);
    const showMarinas = ref<boolean>(true);

    const savedLocations = ref<Array<savedLocation>>([]);

    const zoomToLocationCoordinates = ref<Array<number> | undefined>(undefined);

    function addLocation(location : savedLocation){
        savedLocations.value.push(location);
        console.log(savedLocations.value);
    }

    function removeLocation(locationId: string){
        const item : savedLocation | undefined = savedLocations.value.find(x =>  x.id === locationId);
        if(item === undefined) return;
        const index = savedLocations.value.indexOf(item);
        savedLocations.value.splice(index, 1);
    }

    return {showMoorings, showMarinas, savedLocations, zoomToLocationCoordinates, addLocation, removeLocation};
});