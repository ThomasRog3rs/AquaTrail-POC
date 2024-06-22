import {defineStore} from 'pinia';
import {ref} from 'vue';
import {savedLocation, currentLocation} from '../types/location';

export const useMapStore = defineStore('mapStore', () => {
    const showMoorings = ref<boolean>(true);
    const showMarinas = ref<boolean>(true);

    const savedLocations = ref<Array<savedLocation>>([]);

    const zoomToLocationCoordinates = ref<Array<number> | undefined>(undefined);

    const currentLocation = ref<currentLocation | undefined>(undefined);

    //click event trigger (not ideal)
    const triggerLocationChange = ref<number>(0);

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

    function setZoomLocation(coordinates: Array<number>){
        // currentLocation.value = undefined;
        zoomToLocationCoordinates.value = coordinates;
        triggerLocationChange.value ++;
        // console.log(zoomToLocationCoordinates.value);
    }

    function setCurrentLocation(newCurrentLocation: currentLocation){
        currentLocation.value = newCurrentLocation;
    }


    return {
        showMoorings, 
        showMarinas, 
        savedLocations, 
        zoomToLocationCoordinates,
        currentLocation, 
        triggerLocationChange,
        setCurrentLocation,
        addLocation, 
        removeLocation,
        setZoomLocation
    };
}, {persist: true});