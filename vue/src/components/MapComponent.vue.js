/* __placeholder__ */
import { ref, onMounted, onUnmounted, watch } from 'vue';
//@ts-ignore
import mapboxgl from 'mapbox-gl';
//@ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useMapStore } from '../stores/mapStore';
import { useNavStore } from '../stores/navStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const navStore = useNavStore();
const popup = ref(null);
mapboxgl.accessToken = import.meta.env.VITE_API_KEY;
const map = ref(null);
watch(() => mapStore.showMoorings, () => {
    if (map.value) {
        map.value.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');
    }
});
watch(() => mapStore.showMarinas, () => {
    if (map.value) {
        map.value.setLayoutProperty('actual-marinas', 'visibility', mapStore.showMarinas ? 'visible' : 'none');
    }
});
watch(() => mapStore.triggerLocationChange, async () => {
    console.log(mapStore.zoomToLocation);
    if (!map.value)
        return;
    if (mapStore.zoomToLocation === undefined)
        return;
    if (!mapStore.zoomToLocation.coordinates)
        return;
    if (mapStore.zoomToLocation.coordinates === mapStore.currentLocation?.coordinates)
        return;
    await flyToLocation(mapStore.zoomToLocation.coordinates);
    removePopup();
    await addPopup(mapStore.zoomToLocation);
    navStore.toggleNav = false;
});
function flyToLocation(coordinates) {
    return new Promise((resolve, reject) => {
        console.log('fly to coordinates', coordinates);
        console.log('map status in fly to: ', map.value ? 'true' : 'HELP, NO MAP');
        if (map.value && coordinates) {
            console.log(coordinates);
            map.value.flyTo({
                //@ts-ignore
                center: coordinates,
                zoom: 15
            });
            map.value.once('moveend', (e) => {
                // alert("Moved!");
                resolve();
            });
        }
        else {
            reject("No init map or no provided coordinates");
        }
    });
}
function escapeStringForHTML(str) {
    if (str == undefined)
        return;
    return str.replace(/'/g, "\\'");
}
function removePopup() {
    if (popup.value) {
        popup.value.remove();
    }
}
function addPopup(location) {
    return new Promise((resolve, reject) => {
        if (!map.value)
            return;
        if (!location)
            return;
        if (!location.coordinates)
            return;
        if (map.value) {
            const theTitle = escapeStringForHTML(location.title);
            popup.value = new mapboxgl.Popup({ offset: [0, -15] })
                //@ts-ignore
                .setLngLat(location.coordinates)
                .setHTML(`<span class="${location.layer}"><h3>${location.title}</h3><a href="https://canalplan.uk/place/${location.cp_id}" target="_blank">Canal Plan Page</a><br/><button class="save" onclick="saveLocation([${location.coordinates}], '${location.layer}', '${theTitle}', '${location.cp_id}')">Save Location</button></span>`)
                .addTo(map.value);
            resolve();
        }
        else {
            reject("No init map");
        }
    });
}
//Needs to be on the window object so it can be called from the template string in popup
//@ts-ignore
Window.prototype.saveLocation = function (coordinates, layer, title, id, icon) {
    const location = {
        coordinates: coordinates,
        layer: layer,
        title: title,
        cp_id: id,
        icon: icon
    };
    console.log(location);
    //@ts-ignore
    const store = window.globalStore;
    const exists = store.state.value.mapStore.savedLocations.find((x) => x.cp_id === location.cp_id) == undefined ? false : true;
    if (!exists) {
        store.state.value.mapStore.savedLocations.push(location);
    }
    console.log(store.state.value.mapStore.savedLocations);
};
function getFeaturesFromPoint(point) {
    const features = map.value.queryRenderedFeatures(point, {
        layers: ['marinas', 'actual-marinas']
    });
    if (features.length < 1)
        return;
    console.log(features);
    const feature = features[0];
    if (!feature)
        return;
    if (!feature.properties)
        return;
    return feature;
}
onMounted(() => {
    mapStore.getDataSets();
    //console.log();
    mapStore.mapLoaded = false;
    if (map.value) {
        map.value = new mapboxgl.Map({
            //@ts-ignore
            container: map.value,
            style: 'mapbox://styles/mr-thomas-rogers/clx7qe3r701pv01qs1dtoethy',
            // style: 'mapbox://styles/mr-thomas-rogers/clvk00pzg01e501quhyrs5psj',
            //style: 'mapbox://styles/mapbox/streets-v12',
            center: [-1.474008, 52.155133], // starting center in [lng, lat]
            //bounds: [[-22.92826178066636, 47.677731905744565], [9.98024578066787, 50.887536758179465]],
            zoom: 6
        });
        // console.log('Bearing', map.value.getBearing());
        // console.log('Location', map.value.getCenter());
        // console.log('zoom', map.value.getZoom());
        //@ts-ignore
        map.value.on('load', () => {
            mapStore.mapLoaded = true;
            const currentLocation = {
                //@ts-ignore
                coordinates: map.value.getCenter(),
                bearing: map.value.getBearing(),
                zoom: map.value.getZoom()
            };
            mapStore.setCurrentLocation(currentLocation);
            map.value.setLayoutProperty('marinas', 'visibility', mapStore.showMoorings ? 'visible' : 'none');
            map.value.setLayoutProperty('actual-marinas', 'visibility', mapStore.showMarinas ? 'visible' : 'none');
            // const marinas = map.value!.querySourceFeatures('composite', {
            //   'sourceLayer': 'actual-marinas'
            // });
            // console.log('All marinas?: ', marinas);
            // console.log('test search: ', marinas.filter((x : any) => x.properties.title === 'undefined' || x.properties.title == undefined));
            // //map to correct object
            // const allMarinas : Array<location> = [];
            // marinas.forEach((x) => {
            //   const properties = x.properties;
            //   //@ts-ignore
            //   const coordinates = x.geometry.coordinates;
            //   if(!properties) return;
            //   if(!coordinates) return;
            //   console.log(properties.title + ': ', coordinates);
            //   const locationInfo : location = {
            //     coordinates: coordinates,
            //     cp_id: properties.cp_id,
            //     cp_route: properties.cp_route,
            //     icon: properties.icon,
            //     layer: properties.layer,
            //     title: properties.title
            //   };
            //   allMarinas.push(locationInfo);
            // });
            // mapStore.allMarinas = allMarinas;
            // console.log('all marinas from store: ', mapStore.allMarinas);
        });
        //@ts-ignore
        map.value.on('move', () => {
            if (map.value === null || map.value === undefined) {
                console.warn("MAP IS NULL");
            }
            // console.log('Bearing', map.value?.getBearing());
            // console.log('Location', map.value?.getCenter());
            // console.log('zoom', map.value?.getZoom());
            const currentLocation = {
                //@ts-ignore
                coordinates: map.value.getCenter(),
                bearing: map.value.getBearing(),
                zoom: map.value.getZoom()
            };
            mapStore.setCurrentLocation(currentLocation);
        });
        //@ts-ignore
        map.value.on('click', async (e) => {
            // const features = map.value!.queryRenderedFeatures(e.point, {
            //     layers: ['marinas', 'actual-marinas']
            // });
            // if(features.length < 1) return;
            // console.log(features);
            // const feature = features[0];
            let feature = getFeaturesFromPoint(e.point);
            console.log("original feature: ", feature);
            if (!feature)
                return;
            if (!feature.properties)
                return;
            //@ts-ignore
            await flyToLocation(feature.geometry.coordinates);
            //update feature coordinates for creatubg popup
            // feature = getFeaturesFromPoint(e.point);
            console.log("updated feature: ", feature);
            if (!feature)
                return;
            if (!feature.properties)
                return;
            const location = {
                //@ts-ignore
                coordinates: feature.geometry.coordinates,
                cp_id: feature.properties.cp_id,
                cp_route: feature.properties.cp_route,
                icon: feature.properties.icon,
                layer: feature.properties.layer,
                title: feature.properties.title
            };
            removePopup();
            //@ts-ignore
            await addPopup(location);
        });
        //@ts-ignore
        map.value.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }));
        // Add geolocate control to the map.
        //@ts-ignore
        map.value.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: false
        }));
        //@ts-ignore
        map.value.addControl(new mapboxgl.NavigationControl());
    }
});
onUnmounted(() => {
    if (map.value) {
        map.value.remove();
    }
});
let __VLS_modelEmitsType;
const __VLS_componentsOption = {};
let __VLS_name;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    /* CSS variable injection */
    /* CSS variable injection end */
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, ref: ("map"), class: ("map-container w-1/1 h-full"), id: ("map-container"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, ref: ("map"), class: ("map-container w-1/1 h-full"), id: ("map-container"), }));
        // @ts-ignore
        (__VLS_ctx.map);
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    // @ts-ignore
    [map,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            map: map,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
