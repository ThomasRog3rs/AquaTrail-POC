/* __placeholder__ */
import { useMapStore } from '../stores/mapStore';
import { useNavStore } from '../stores/navStore';
import SavedRoutes from './SavedRoutes.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const navStore = useNavStore();
const toggleMoorings = () => {
    mapStore.showMoorings = !mapStore.showMoorings;
};
const toggleMarinas = () => {
    mapStore.showMarinas = !mapStore.showMarinas;
};
const zoomToLocation = (location) => {
    if (!location)
        return;
    mapStore.setZoomLocation(location);
};
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
    __VLS_intrinsicElements.aside;
    __VLS_intrinsicElements.aside;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.label;
    __VLS_intrinsicElements.label;
    __VLS_intrinsicElements.label;
    __VLS_intrinsicElements.label;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.input;
    __VLS_intrinsicElements.input;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_components.SavedRoutes;
    __VLS_components.SavedRoutes;
    __VLS_components.SavedRoutes;
    __VLS_components.SavedRoutes;
    // @ts-ignore
    [SavedRoutes, SavedRoutes,];
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.a;
    {
        const __VLS_0 = __VLS_intrinsicElements["aside"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, id: ("default-sidebar"), class: ("absolute top-69 left-0 z-40 w-full sm:w-[25rem] h-screen shadow-lg border-solid transition-transform sm:translate-x-0"), "aria-label": ("Sidebar"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, id: ("default-sidebar"), class: ("absolute top-69 left-0 z-40 w-full sm:w-[25rem] h-screen shadow-lg border-solid transition-transform sm:translate-x-0"), "aria-label": ("Sidebar"), }));
        ({ '-translate-x-full': !__VLS_ctx.navStore.toggleNav, '-translate-x-0': __VLS_ctx.navStore.toggleNav });
        __VLS_styleScopedClasses = ({ '-translate-x-full': !navStore.toggleNav, '-translate-x-0': navStore.toggleNav });
        {
            const __VLS_5 = __VLS_intrinsicElements["div"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, class: ("h-full px-3 py-4 overflow-y-auto bg-slate-100 flex flex-col justify-between"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, class: ("h-full px-3 py-4 overflow-y-auto bg-slate-100 flex flex-col justify-between"), }));
            {
                const __VLS_10 = __VLS_intrinsicElements["div"];
                const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
                const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                ({}({ ...{}, }));
                {
                    const __VLS_15 = __VLS_intrinsicElements["div"];
                    const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                    const __VLS_17 = __VLS_16({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                    ({}({ ...{}, class: ("mb-4"), }));
                    {
                        const __VLS_20 = __VLS_intrinsicElements["label"];
                        const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                        const __VLS_22 = __VLS_21({ ...{}, class: ("cursor-pointer"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                        ({}({ ...{}, class: ("cursor-pointer"), }));
                        {
                            const __VLS_25 = __VLS_intrinsicElements["p"];
                            const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                            const __VLS_27 = __VLS_26({ ...{}, class: ("text-sm font-medium text-gray-900 mb-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                            ({}({ ...{}, class: ("text-sm font-medium text-gray-900 mb-2"), }));
                            (__VLS_28.slots).default;
                            const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
                        }
                        {
                            const __VLS_30 = __VLS_intrinsicElements["input"];
                            const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
                            const __VLS_32 = __VLS_31({ ...{ 'onClick': {}, }, type: ("checkbox"), value: (""), class: ("sr-only peer"), checked: ((__VLS_ctx.mapStore.showMoorings)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                            ({}({ ...{ 'onClick': {}, }, type: ("checkbox"), value: (""), class: ("sr-only peer"), checked: ((__VLS_ctx.mapStore.showMoorings)), }));
                            let __VLS_35 = { 'click': __VLS_pickEvent(__VLS_34['click'], {}.onClick) };
                            __VLS_35 = { click: (__VLS_ctx.toggleMoorings) };
                            const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                            let __VLS_34;
                        }
                        {
                            const __VLS_36 = __VLS_intrinsicElements["div"];
                            const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
                            const __VLS_38 = __VLS_37({ ...{}, class: ("relative w-11 h-6 bg-green-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
                            ({}({ ...{}, class: ("relative w-11 h-6 bg-green-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"), }));
                            const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
                        }
                        (__VLS_23.slots).default;
                        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
                    }
                    (__VLS_18.slots).default;
                    const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
                }
                {
                    const __VLS_41 = __VLS_intrinsicElements["div"];
                    const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
                    const __VLS_43 = __VLS_42({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                    ({}({ ...{}, class: ("mb-4"), }));
                    {
                        const __VLS_46 = __VLS_intrinsicElements["label"];
                        const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
                        const __VLS_48 = __VLS_47({ ...{}, class: ("cursor-pointer"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
                        ({}({ ...{}, class: ("cursor-pointer"), }));
                        {
                            const __VLS_51 = __VLS_intrinsicElements["p"];
                            const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
                            const __VLS_53 = __VLS_52({ ...{}, class: ("text-sm font-medium text-gray-900 mb-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
                            ({}({ ...{}, class: ("text-sm font-medium text-gray-900 mb-2"), }));
                            (__VLS_54.slots).default;
                            const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53);
                        }
                        {
                            const __VLS_56 = __VLS_intrinsicElements["input"];
                            const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
                            const __VLS_58 = __VLS_57({ ...{ 'onClick': {}, }, type: ("checkbox"), value: (""), class: ("sr-only peer"), checked: ((__VLS_ctx.mapStore.showMarinas)), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
                            ({}({ ...{ 'onClick': {}, }, type: ("checkbox"), value: (""), class: ("sr-only peer"), checked: ((__VLS_ctx.mapStore.showMarinas)), }));
                            let __VLS_61 = { 'click': __VLS_pickEvent(__VLS_60['click'], {}.onClick) };
                            __VLS_61 = { click: (__VLS_ctx.toggleMarinas) };
                            const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
                            let __VLS_60;
                        }
                        {
                            const __VLS_62 = __VLS_intrinsicElements["div"];
                            const __VLS_63 = __VLS_elementAsFunctionalComponent(__VLS_62);
                            const __VLS_64 = __VLS_63({ ...{}, class: ("relative w-11 h-6 bg-[#431A63] rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#613583]"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
                            ({}({ ...{}, class: ("relative w-11 h-6 bg-[#431A63] rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#613583]"), }));
                            const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
                        }
                        (__VLS_49.slots).default;
                        const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
                    }
                    (__VLS_44.slots).default;
                    const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43);
                }
                if (__VLS_ctx.mapStore.savedLocations.length > 0) {
                    {
                        const __VLS_67 = __VLS_intrinsicElements["div"];
                        const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
                        const __VLS_69 = __VLS_68({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_68));
                        ({}({ ...{}, }));
                        {
                            const __VLS_72 = __VLS_intrinsicElements["h1"];
                            const __VLS_73 = __VLS_elementAsFunctionalComponent(__VLS_72);
                            const __VLS_74 = __VLS_73({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_73));
                            ({}({ ...{}, }));
                            (__VLS_75.slots).default;
                            const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
                        }
                        for (const [location] of __VLS_getVForSourceType((__VLS_ctx.mapStore.savedLocations))) {
                            {
                                const __VLS_77 = {}.SavedRoutes;
                                const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({ ...{ 'onClick': {}, 'onZoomToLocation': {}, }, location: ((location)), }));
                                ({}.SavedRoutes);
                                ({}.SavedRoutes);
                                const __VLS_79 = __VLS_78({ ...{ 'onClick': {}, 'onZoomToLocation': {}, }, location: ((location)), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
                                ({}({ ...{ 'onClick': {}, 'onZoomToLocation': {}, }, location: ((location)), }));
                                let __VLS_82 = { 'click': __VLS_pickEvent(__VLS_81['click'], {}.onClick) };
                                __VLS_82 = { click: $event => {
                                        if (!((__VLS_ctx.mapStore.savedLocations.length > 0)))
                                            return;
                                        __VLS_ctx.zoomToLocation(location);
                                        // @ts-ignore
                                        [navStore, navStore, mapStore, toggleMoorings, mapStore, toggleMarinas, mapStore, mapStore, zoomToLocation,];
                                    }
                                };
                                let __VLS_83 = { 'zoomToLocation': __VLS_pickEvent(__VLS_81['zoomToLocation'], {}.onZoomToLocation) };
                                __VLS_83 = { zoomToLocation: (__VLS_ctx.zoomToLocation) };
                                const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79);
                                let __VLS_81;
                            }
                            // @ts-ignore
                            [zoomToLocation,];
                        }
                        (__VLS_70.slots).default;
                        const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69);
                    }
                }
                (__VLS_13.slots).default;
                const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
            }
            {
                const __VLS_84 = __VLS_intrinsicElements["div"];
                const __VLS_85 = __VLS_elementAsFunctionalComponent(__VLS_84);
                const __VLS_86 = __VLS_85({ ...{}, style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_85));
                ({}({ ...{}, style: ({}), }));
                {
                    const __VLS_89 = __VLS_intrinsicElements["p"];
                    const __VLS_90 = __VLS_elementAsFunctionalComponent(__VLS_89);
                    const __VLS_91 = __VLS_90({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_90));
                    ({}({ ...{}, }));
                    {
                        const __VLS_94 = __VLS_intrinsicElements["a"];
                        const __VLS_95 = __VLS_elementAsFunctionalComponent(__VLS_94);
                        const __VLS_96 = __VLS_95({ ...{}, href: ("https://canalplan.org.uk/wiki/downloads:introduction"), target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_95));
                        ({}({ ...{}, href: ("https://canalplan.org.uk/wiki/downloads:introduction"), target: ("_blank"), }));
                        (__VLS_97.slots).default;
                        const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96);
                    }
                    (__VLS_92.slots).default;
                    const __VLS_92 = __VLS_pickFunctionalComponentCtx(__VLS_89, __VLS_91);
                }
                (__VLS_87.slots).default;
                const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_84, __VLS_86);
            }
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["absolute"];
        __VLS_styleScopedClasses["top-69"];
        __VLS_styleScopedClasses["left-0"];
        __VLS_styleScopedClasses["z-40"];
        __VLS_styleScopedClasses["w-full"];
        __VLS_styleScopedClasses["sm:w-[25rem]"];
        __VLS_styleScopedClasses["h-screen"];
        __VLS_styleScopedClasses["shadow-lg"];
        __VLS_styleScopedClasses["border-solid"];
        __VLS_styleScopedClasses["transition-transform"];
        __VLS_styleScopedClasses["sm:translate-x-0"];
        __VLS_styleScopedClasses["h-full"];
        __VLS_styleScopedClasses["px-3"];
        __VLS_styleScopedClasses["py-4"];
        __VLS_styleScopedClasses["overflow-y-auto"];
        __VLS_styleScopedClasses["bg-slate-100"];
        __VLS_styleScopedClasses["flex"];
        __VLS_styleScopedClasses["flex-col"];
        __VLS_styleScopedClasses["justify-between"];
        __VLS_styleScopedClasses["mb-4"];
        __VLS_styleScopedClasses["cursor-pointer"];
        __VLS_styleScopedClasses["text-sm"];
        __VLS_styleScopedClasses["font-medium"];
        __VLS_styleScopedClasses["text-gray-900"];
        __VLS_styleScopedClasses["mb-2"];
        __VLS_styleScopedClasses["sr-only"];
        __VLS_styleScopedClasses["peer"];
        __VLS_styleScopedClasses["relative"];
        __VLS_styleScopedClasses["w-11"];
        __VLS_styleScopedClasses["h-6"];
        __VLS_styleScopedClasses["bg-green-800"];
        __VLS_styleScopedClasses["rounded-full"];
        __VLS_styleScopedClasses["peer-checked:after:translate-x-full"];
        __VLS_styleScopedClasses["rtl:peer-checked:after:-translate-x-full"];
        __VLS_styleScopedClasses["peer-checked:after:border-white"];
        __VLS_styleScopedClasses["after:content-["];
        __VLS_styleScopedClasses["]"];
        __VLS_styleScopedClasses["after:absolute"];
        __VLS_styleScopedClasses["after:top-0.5"];
        __VLS_styleScopedClasses["after:start-[2px]"];
        __VLS_styleScopedClasses["after:bg-white"];
        __VLS_styleScopedClasses["after:border-gray-300"];
        __VLS_styleScopedClasses["after:border"];
        __VLS_styleScopedClasses["after:rounded-full"];
        __VLS_styleScopedClasses["after:h-5"];
        __VLS_styleScopedClasses["after:w-5"];
        __VLS_styleScopedClasses["after:transition-all"];
        __VLS_styleScopedClasses["dark:border-gray-600"];
        __VLS_styleScopedClasses["peer-checked:bg-green-600"];
        __VLS_styleScopedClasses["mb-4"];
        __VLS_styleScopedClasses["cursor-pointer"];
        __VLS_styleScopedClasses["text-sm"];
        __VLS_styleScopedClasses["font-medium"];
        __VLS_styleScopedClasses["text-gray-900"];
        __VLS_styleScopedClasses["mb-2"];
        __VLS_styleScopedClasses["sr-only"];
        __VLS_styleScopedClasses["peer"];
        __VLS_styleScopedClasses["relative"];
        __VLS_styleScopedClasses["w-11"];
        __VLS_styleScopedClasses["h-6"];
        __VLS_styleScopedClasses["bg-[#431A63]"];
        __VLS_styleScopedClasses["rounded-full"];
        __VLS_styleScopedClasses["peer-checked:after:translate-x-full"];
        __VLS_styleScopedClasses["rtl:peer-checked:after:-translate-x-full"];
        __VLS_styleScopedClasses["peer-checked:after:border-white"];
        __VLS_styleScopedClasses["after:content-["];
        __VLS_styleScopedClasses["]"];
        __VLS_styleScopedClasses["after:absolute"];
        __VLS_styleScopedClasses["after:top-0.5"];
        __VLS_styleScopedClasses["after:start-[2px]"];
        __VLS_styleScopedClasses["after:bg-white"];
        __VLS_styleScopedClasses["after:border-gray-300"];
        __VLS_styleScopedClasses["after:border"];
        __VLS_styleScopedClasses["after:rounded-full"];
        __VLS_styleScopedClasses["after:h-5"];
        __VLS_styleScopedClasses["after:w-5"];
        __VLS_styleScopedClasses["after:transition-all"];
        __VLS_styleScopedClasses["dark:border-gray-600"];
        __VLS_styleScopedClasses["peer-checked:bg-[#613583]"];
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            SavedRoutes: SavedRoutes,
            mapStore: mapStore,
            navStore: navStore,
            toggleMoorings: toggleMoorings,
            toggleMarinas: toggleMarinas,
            zoomToLocation: zoomToLocation,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
