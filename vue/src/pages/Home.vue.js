/* __placeholder__ */
import NavBar from '../components/NavBar.vue';
import MapComponent from '../components/MapComponent.vue';
import SideNav from '../components/SideNav.vue';
import { useMapStore } from '../stores/mapStore';
import { onMounted, onUnmounted } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const handleScroll = () => {
    const scrollPosition = {
        x: window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft,
        y: window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
    };
    if (scrollPosition.y !== 0) {
        window.scrollY = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop;
    }
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
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
    __VLS_components.NavBar;
    __VLS_components.NavBar;
    __VLS_components.NavBar;
    __VLS_components.NavBar;
    // @ts-ignore
    [NavBar, NavBar,];
    __VLS_components.SideNav;
    __VLS_components.SideNav;
    __VLS_components.SideNav;
    __VLS_components.SideNav;
    // @ts-ignore
    [SideNav, SideNav,];
    __VLS_intrinsicElements.main;
    __VLS_intrinsicElements.main;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_components.MapComponent;
    __VLS_components.MapComponent;
    __VLS_components.MapComponent;
    __VLS_components.MapComponent;
    // @ts-ignore
    [MapComponent, MapComponent,];
    {
        const __VLS_0 = {}.NavBar;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
        ({}.NavBar);
        ({}.NavBar);
        const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, }));
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_5 = {}.SideNav;
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, }));
        ({}.SideNav);
        ({}.SideNav);
        const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({}({ ...{}, }));
        const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
    }
    {
        const __VLS_10 = __VLS_intrinsicElements["main"];
        const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
        const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        ({}({ ...{}, }));
        {
            const __VLS_15 = __VLS_intrinsicElements["div"];
            const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
            const __VLS_17 = __VLS_16({ ...{}, class: ("flex-1 min-h-0 h-[calc(100vh-69px)] w-full ml-0 sm:ml-[25rem] sm:w-[calc(100vw-25rem)]"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({}({ ...{}, class: ("flex-1 min-h-0 h-[calc(100vh-69px)] w-full ml-0 sm:ml-[25rem] sm:w-[calc(100vw-25rem)]"), }));
            if (!__VLS_ctx.mapStore.mapLoaded) {
                {
                    const __VLS_20 = __VLS_intrinsicElements["div"];
                    const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                    const __VLS_22 = __VLS_21({ ...{}, class: ("overlay"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                    ({}({ ...{}, class: ("overlay"), }));
                    {
                        const __VLS_25 = __VLS_intrinsicElements["h1"];
                        const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                        const __VLS_27 = __VLS_26({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                        ({}({ ...{}, }));
                        (__VLS_28.slots).default;
                        const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
                    }
                    {
                        const __VLS_30 = __VLS_intrinsicElements["div"];
                        const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
                        const __VLS_32 = __VLS_31({ ...{}, class: ("loading"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                        ({}({ ...{}, class: ("loading"), }));
                        {
                            const __VLS_35 = __VLS_intrinsicElements["span"];
                            const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
                            const __VLS_37 = __VLS_36({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                            ({}({ ...{}, }));
                            const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
                        }
                        {
                            const __VLS_40 = __VLS_intrinsicElements["span"];
                            const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
                            const __VLS_42 = __VLS_41({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                            ({}({ ...{}, }));
                            const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
                        }
                        {
                            const __VLS_45 = __VLS_intrinsicElements["span"];
                            const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
                            const __VLS_47 = __VLS_46({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_46));
                            ({}({ ...{}, }));
                            const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
                        }
                        (__VLS_33.slots).default;
                        const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                    }
                    (__VLS_23.slots).default;
                    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
                }
                // @ts-ignore
                [mapStore,];
            }
            {
                const __VLS_50 = {}.MapComponent;
                const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ ...{}, }));
                ({}.MapComponent);
                ({}.MapComponent);
                const __VLS_52 = __VLS_51({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                ({}({ ...{}, }));
                const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
            }
            (__VLS_18.slots).default;
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
        }
        (__VLS_13.slots).default;
        const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            NavBar: NavBar,
            MapComponent: MapComponent,
            SideNav: SideNav,
            mapStore: mapStore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
