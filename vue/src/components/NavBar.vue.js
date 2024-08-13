/* __placeholder__ */
import { useNavStore } from '../stores/navStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const navStore = useNavStore();
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
    __VLS_intrinsicElements.nav;
    __VLS_intrinsicElements.nav;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.img;
    __VLS_intrinsicElements.button;
    __VLS_intrinsicElements.button;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.svg;
    __VLS_intrinsicElements.svg;
    __VLS_intrinsicElements.path;
    {
        const __VLS_0 = __VLS_intrinsicElements["nav"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("bg-slate-100 w-full z-20 h-69 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow"), style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("bg-slate-100 w-full z-20 h-69 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow"), style: ({}), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["div"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, class: ("flex p-4 justify-between"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, class: ("flex p-4 justify-between"), }));
            {
                const __VLS_10 = __VLS_intrinsicElements["a"];
                const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
                const __VLS_12 = __VLS_11({ ...{}, href: ("/"), class: ("flex space-x-3"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                ({}({ ...{}, href: ("/"), class: ("flex space-x-3"), }));
                {
                    const __VLS_15 = __VLS_intrinsicElements["img"];
                    const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                    const __VLS_17 = __VLS_16({ ...{}, src: ("../assets/AquaTrailsLogo.png"), class: ("h-8"), alt: ("Flowbite Logo"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                    ({}({ ...{}, src: ("../assets/AquaTrailsLogo.png"), class: ("h-8"), alt: ("Flowbite Logo"), }));
                    const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
                }
                (__VLS_13.slots).default;
                const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
            }
            {
                const __VLS_20 = __VLS_intrinsicElements["div"];
                const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                const __VLS_22 = __VLS_21({ ...{}, class: ("flex space-x-6"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                ({}({ ...{}, class: ("flex space-x-6"), }));
                {
                    const __VLS_25 = __VLS_intrinsicElements["button"];
                    const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                    const __VLS_27 = __VLS_26({ ...{ 'onClick': {}, }, class: ("md:hidden"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                    ({}({ ...{ 'onClick': {}, }, class: ("md:hidden"), }));
                    let __VLS_30 = { 'click': __VLS_pickEvent(__VLS_29['click'], {}.onClick) };
                    __VLS_30 = { click: $event => {
                            __VLS_ctx.navStore.toggleNav = !__VLS_ctx.navStore.toggleNav;
                            // @ts-ignore
                            [navStore, navStore,];
                        }
                    };
                    {
                        const __VLS_31 = __VLS_intrinsicElements["span"];
                        const __VLS_32 = __VLS_elementAsFunctionalComponent(__VLS_31);
                        const __VLS_33 = __VLS_32({ ...{}, class: ("sr-only"), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
                        ({}({ ...{}, class: ("sr-only"), }));
                        (__VLS_34.slots).default;
                        const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33);
                    }
                    {
                        const __VLS_36 = __VLS_intrinsicElements["svg"];
                        const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
                        const __VLS_38 = __VLS_37({ ...{}, class: ("w-5 h-5"), "aria-hidden": ("true"), xmlns: ("http://www.w3.org/2000/svg"), fill: ("none"), viewBox: ("0 0 17 14"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
                        ({}({ ...{}, class: ("w-5 h-5"), "aria-hidden": ("true"), xmlns: ("http://www.w3.org/2000/svg"), fill: ("none"), viewBox: ("0 0 17 14"), }));
                        {
                            const __VLS_41 = __VLS_intrinsicElements["path"];
                            const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
                            const __VLS_43 = __VLS_42({ ...{}, stroke: ("currentColor"), "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M1 1h15M1 7h15M1 13h15"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                            ({}({ ...{}, stroke: ("currentColor"), "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M1 1h15M1 7h15M1 13h15"), }));
                            const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43);
                        }
                        (__VLS_39.slots).default;
                        const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
                    }
                    (__VLS_28.slots).default;
                    const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
                    let __VLS_29;
                }
                (__VLS_23.slots).default;
                const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
            }
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            navStore: navStore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
