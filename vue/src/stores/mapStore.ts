import {defineStore} from 'pinia';
import {ref} from 'vue';
import {savedLocation, currentLocation, location} from '../types/location';

export const useMapStore = defineStore('mapStore', () => {
    const mapLoaded = ref<boolean>(false);
    const showMoorings = ref<boolean>(true);
    const showMarinas = ref<boolean>(true);

    const savedLocations = ref<Array<location>>([]);

    const zoomToLocation = ref<location | undefined>(undefined);

    const currentLocation = ref<currentLocation | undefined>(undefined);

    const allMarinas = ref<Array<location> | undefined>(undefined);

    //click event trigger (not ideal)
    const triggerLocationChange = ref<number>(0);

    function addLocation(location : savedLocation){
        savedLocations.value.push(location);
        console.log(savedLocations.value);
    }

    function removeLocation(locationId: string){
        const item : location | undefined = savedLocations.value.find(x =>  x.cp_id === locationId);
        if(item === undefined) return;
        const index = savedLocations.value.indexOf(item);
        savedLocations.value.splice(index, 1);
    }

    function setZoomLocation(location: location){
        // currentLocation.value = undefined;
        zoomToLocation.value = location;
        triggerLocationChange.value ++;
        // console.log(zoomToLocationCoordinates.value);
    }

    function setCurrentLocation(newCurrentLocation: currentLocation){
        currentLocation.value = newCurrentLocation;
    }

    return {
        mapLoaded,
        allMarinas,
        showMoorings, 
        showMarinas, 
        savedLocations, 
        zoomToLocation,
        currentLocation, 
        triggerLocationChange,
        setCurrentLocation,
        addLocation, 
        removeLocation,
        setZoomLocation
    };
}, {persist: true});