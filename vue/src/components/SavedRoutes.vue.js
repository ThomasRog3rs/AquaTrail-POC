/* __placeholder__ */
import { ref, onMounted } from 'vue';
import { useMapStore } from '../stores/mapStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const props = defineProps({
    location: Object
});
const locationType = ref('');
const href = ref('');
function removeLocation() {
    mapStore.removeLocation(props.location?.cp_id);
}
onMounted(() => {
    locationType.value = props.location?.layer === "facilities" ? "Marina" : "Mooring";
    href.value = `https://canalplan.uk/place/${props.location?.cp_id}`;
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
    __VLS_intrinsicElements.h3;
    __VLS_intrinsicElements.h3;
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.button;
    __VLS_intrinsicElements.button;
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ((__VLS_ctx.location?.layer)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ((__VLS_ctx.location?.layer)), }));
        __VLS_styleScopedClasses = (location?.layer);
        {
            const __VLS_5 = __VLS_intrinsicElements["h3"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{ 'onClick': {}, }, class: ("text-lg font-bold"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{ 'onClick': {}, }, class: ("text-lg font-bold"), }));
            let __VLS_10 = { 'click': __VLS_pickEvent(__VLS_9['click'], {}.onClick) };
            __VLS_10 = { click: $event => {
                    __VLS_ctx.$emit('zoomToLocation', __VLS_ctx.location);
                    // @ts-ignore
                    [location, $emit, location,];
                }
            };
            (__VLS_ctx.location?.title);
            (__VLS_ctx.locationType);
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
            let __VLS_9;
        }
        {
            const __VLS_11 = __VLS_intrinsicElements["a"];
            const __VLS_12 = __VLS_elementAsFunctionalComponent(__VLS_11);
            const __VLS_13 = __VLS_12({ ...{}, href: ((__VLS_ctx.href)), target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
            ({}({ ...{}, href: ((__VLS_ctx.href)), target: ("_blank"), }));
            (__VLS_14.slots).default;
            const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13);
        }
        {
            const __VLS_16 = __VLS_intrinsicElements["button"];
            const __VLS_17 = __VLS_elementAsFunctionalComponent(__VLS_16);
            const __VLS_18 = __VLS_17({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            ({}({ ...{ 'onClick': {}, }, }));
            let __VLS_21 = { 'click': __VLS_pickEvent(__VLS_20['click'], {}.onClick) };
            __VLS_21 = { click: (__VLS_ctx.removeLocation) };
            (__VLS_19.slots).default;
            const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18);
            let __VLS_20;
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["text-slate-100"];
        __VLS_styleScopedClasses["rounded-lg"];
        __VLS_styleScopedClasses["p-2"];
        __VLS_styleScopedClasses["hover:cursor-pointer"];
        __VLS_styleScopedClasses["mb-2"];
        __VLS_styleScopedClasses["transition"];
        __VLS_styleScopedClasses["duration-75"];
        __VLS_styleScopedClasses["text-lg"];
        __VLS_styleScopedClasses["font-bold"];
    }
    var __VLS_slots;
    // @ts-ignore
    [location, locationType, href, removeLocation,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            locationType: locationType,
            href: href,
            removeLocation: removeLocation,
        };
    },
    props: {
        location: Object
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        location: Object
    },
});
