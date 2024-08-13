import { defineStore } from 'pinia';
import { ref } from 'vue';
//@ts-ignore
import mapboxSdk from '@mapbox/mapbox-sdk/services/datasets';
// import { SdkConfig } from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
// import { MapiRequest } from '@mapbox/mapbox-sdk/lib/classes/mapi-request';
export const useMapStore = defineStore('mapStore', () => {
    const mapLoaded = ref(false);
    const showMoorings = ref(true);
    const showMarinas = ref(true);
    const savedLocations = ref([]);
    const zoomToLocation = ref(undefined);
    const currentLocation = ref(undefined);
    const allMarinas = ref(undefined);
    // const datasets = ref<any>();
    //click event trigger (not ideal)
    const triggerLocationChange = ref(0);
    //For some reason this does not work, yet to work out why:
    function getDataSets() {
        const token = import.meta.env.VITE_API_KEY;
        const datasetsService = mapboxSdk({ accessToken: token });
        datasetsService.listDatasets()
            .send()
            .then((response) => {
            const datasets = response.body;
            console.log(datasets);
        })
            .catch((error) => {
            console.error('Error fetching datasets:', error);
        });
        // const username = '';
        // Optional parameters
        // const options = {
        //     username: username,
        //     // additional parameters: `limit`, `sortby`, and `start` if needed
        // };
        // const test : MapiRequest
        // Fetch the datasets
        // let url = `https://api.mapbox.com/datasets/v1/${username}?access_token=${import.meta.env.VITE_API_KEY}`;
        // console.log(url);
        // // Fetch the datasets
        // fetch(url)
        // .then(response => {
        //     if (!response.ok) {
        //         console.log(response);
        //         throw new Error('Network response was not ok ' + response.statusText);
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Datasets:', data);
        //     datasets.value = data;
        // })
        // .catch(error => {
        //     console.error('There has been a problem with your fetch operation:', error);
        // });
    }
    function addLocation(location) {
        savedLocations.value.push(location);
        console.log(savedLocations.value);
    }
    function removeLocation(locationId) {
        const item = savedLocations.value.find(x => x.cp_id === locationId);
        if (item === undefined)
            return;
        const index = savedLocations.value.indexOf(item);
        savedLocations.value.splice(index, 1);
    }
    function setZoomLocation(location) {
        // currentLocation.value = undefined;
        zoomToLocation.value = location;
        triggerLocationChange.value++;
        // console.log(zoomToLocationCoordinates.value);
    }
    function setCurrentLocation(newCurrentLocation) {
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
        setZoomLocation,
        getDataSets
    };
}, { persist: true });
