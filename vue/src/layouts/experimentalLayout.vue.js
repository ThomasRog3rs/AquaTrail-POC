/* __placeholder__ */
import { ref, onMounted } from 'vue';
import Card from '../components/experimental/Card.vue';
import { useSearchStore } from '../stores/searchStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const searchStore = useSearchStore();
const activeOption = ref();
function setActive(title) {
    searchStore.searchItems.find(x => x.active).active = false;
    searchStore.searchItems.find(x => x.title === title).active = true;
    activeOption.value = searchStore.searchItems.find(x => x.active).title;
}
onMounted(() => {
    activeOption.value = searchStore.searchItems.find(x => x.active).title;
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
    __VLS_intrinsicElements.nav;
    __VLS_intrinsicElements.nav;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
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
    __VLS_intrinsicElements.section;
    __VLS_intrinsicElements.section;
    __VLS_intrinsicElements.section;
    __VLS_intrinsicElements.section;
    __VLS_intrinsicElements.form;
    __VLS_intrinsicElements.form;
    __VLS_intrinsicElements.input;
    __VLS_intrinsicElements.input;
    __VLS_intrinsicElements.select;
    __VLS_intrinsicElements.select;
    __VLS_intrinsicElements.option;
    __VLS_intrinsicElements.option;
    __VLS_intrinsicElements.button;
    __VLS_intrinsicElements.button;
    __VLS_intrinsicElements.h2;
    __VLS_intrinsicElements.h2;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    // @ts-ignore
    [Card, Card, Card, Card, Card, Card,];
    {
        const __VLS_0 = __VLS_intrinsicElements["nav"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("bg-blue-700"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("bg-blue-700"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["h1"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, class: ("logo"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, class: ("logo"), }));
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_10 = __VLS_intrinsicElements["div"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, class: ("search-types"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ ...{}, class: ("search-types"), }));
            for (const [type] of __VLS_getVForSourceType((__VLS_ctx.searchStore.searchItems))) {
                {
                    const __VLS_15 = __VLS_intrinsicElements["div"];
                    const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                    const __VLS_17 = __VLS_16({ ...{ 'onClick': {}, }, class: ("search-type"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                    ({}({ ...{ 'onClick': {}, }, class: ("search-type"), }));
                    ({ active: type.active });
                    __VLS_styleScopedClasses = ({ active: type.active });
                    let __VLS_20 = { 'click': __VLS_pickEvent(__VLS_19['click'], {}.onClick) };
                    __VLS_20 = { click: $event => {
                            __VLS_ctx.setActive(type.title);
                            // @ts-ignore
                            [searchStore, setActive,];
                        }
                    };
                    (type.title);
                    (__VLS_18.slots).default;
                    const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
                    let __VLS_19;
                }
            }
            (__VLS_13.slots).default;
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_21 = __VLS_intrinsicElements["section"];
        const __VLS_22 = __VLS_elementAsFunctionalComponent(__VLS_21);
        const __VLS_23 = __VLS_22({ ...{}, id: ("search"), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        ({}({ ...{}, id: ("search"), }));
        {
            const __VLS_26 = __VLS_intrinsicElements["div"];
            const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
            const __VLS_28 = __VLS_27({ ...{}, class: ("search-container"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
            ({}({ ...{}, class: ("search-container"), }));
            {
                const __VLS_31 = __VLS_intrinsicElements["form"];
                const __VLS_32 = __VLS_elementAsFunctionalComponent(__VLS_31);
                const __VLS_33 = __VLS_32({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_32));
                ({}({ ...{}, }));
                {
                    const __VLS_36 = __VLS_intrinsicElements["input"];
                    const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
                    const __VLS_38 = __VLS_37({ ...{}, type: ("search"), placeholder: ("Search Marina Name"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
                    ({}({ ...{}, type: ("search"), placeholder: ("Search Marina Name"), }));
                    const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
                }
                {
                    const __VLS_41 = __VLS_intrinsicElements["select"];
                    const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
                    const __VLS_43 = __VLS_42({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                    ({}({ ...{}, }));
                    {
                        const __VLS_46 = __VLS_intrinsicElements["option"];
                        const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
                        const __VLS_48 = __VLS_47({ ...{}, value: (""), disabled: (true), selected: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
                        ({}({ ...{}, value: (""), disabled: (true), selected: (true), }));
                        (__VLS_49.slots).default;
                        const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
                    }
                    (__VLS_44.slots).default;
                    const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43);
                }
                {
                    const __VLS_51 = __VLS_intrinsicElements["input"];
                    const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
                    const __VLS_53 = __VLS_52({ ...{}, type: ("number"), placeholder: ("Distance from current location (km)"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
                    ({}({ ...{}, type: ("number"), placeholder: ("Distance from current location (km)"), }));
                    const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53);
                }
                (__VLS_34.slots).default;
                const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33);
            }
            {
                const __VLS_56 = __VLS_intrinsicElements["div"];
                const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
                const __VLS_58 = __VLS_57({ ...{}, class: ("container-footer"), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
                ({}({ ...{}, class: ("container-footer"), }));
                {
                    const __VLS_61 = __VLS_intrinsicElements["button"];
                    const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
                    const __VLS_63 = __VLS_62({ ...{}, class: ("bg-blue-700"), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
                    ({}({ ...{}, class: ("bg-blue-700"), }));
                    (__VLS_64.slots).default;
                    const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63);
                }
                (__VLS_59.slots).default;
                const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
            }
            (__VLS_29.slots).default;
            const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
        }
        (__VLS_24.slots).default;
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23);
    }
    {
        const __VLS_66 = __VLS_intrinsicElements["section"];
        const __VLS_67 = __VLS_elementAsFunctionalComponent(__VLS_66);
        const __VLS_68 = __VLS_67({ ...{}, id: ("close-by"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        ({}({ ...{}, id: ("close-by"), }));
        {
            const __VLS_71 = __VLS_intrinsicElements["h2"];
            const __VLS_72 = __VLS_elementAsFunctionalComponent(__VLS_71);
            const __VLS_73 = __VLS_72({ ...{}, class: ("mb-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_72));
            ({}({ ...{}, class: ("mb-2"), }));
            (__VLS_ctx.activeOption);
            (__VLS_74.slots).default;
            const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_71, __VLS_73);
        }
        {
            const __VLS_76 = __VLS_intrinsicElements["div"];
            const __VLS_77 = __VLS_elementAsFunctionalComponent(__VLS_76);
            const __VLS_78 = __VLS_77({ ...{}, class: ("close-items"), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
            ({}({ ...{}, class: ("close-items"), }));
            {
                const __VLS_81 = {}.Card;
                const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }));
                ({}.Card);
                ({}.Card);
                const __VLS_83 = __VLS_82({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }, ...__VLS_functionalComponentArgsRest(__VLS_82));
                ({}({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }));
                const __VLS_84 = __VLS_pickFunctionalComponentCtx(__VLS_81, __VLS_83);
            }
            {
                const __VLS_86 = {}.Card;
                const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((false)), distance: ((1.2)), }));
                ({}.Card);
                ({}.Card);
                const __VLS_88 = __VLS_87({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((false)), distance: ((1.2)), }, ...__VLS_functionalComponentArgsRest(__VLS_87));
                ({}({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((false)), distance: ((1.2)), }));
                const __VLS_89 = __VLS_pickFunctionalComponentCtx(__VLS_86, __VLS_88);
            }
            {
                const __VLS_91 = {}.Card;
                const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }));
                ({}.Card);
                ({}.Card);
                const __VLS_93 = __VLS_92({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }, ...__VLS_functionalComponentArgsRest(__VLS_92));
                ({}({ ...{}, name: ("Cotton Field Wharf"), description: ("\u004c\u006f\u0072\u0065\u006d\u0020\u0069\u0070\u0073\u0075\u006d\u0020\u0064\u006f\u006c\u006f\u0072\u0020\u0073\u0069\u0074\u0020\u0061\u006d\u0065\u0074\u002c\u0020\u0063\u006f\u006e\u0073\u0065\u0063\u0074\u0065\u0074\u0075\u0072\u0020\u0061\u0064\u0069\u0070\u0069\u0073\u0069\u0063\u0069\u006e\u0067\u0020\u0065\u006c\u0069\u0074\u002e\u0020\u0041\u0073\u0073\u0075\u006d\u0065\u006e\u0064\u0061\u002c\u0020\u0071\u0075\u0061\u006d\u003f\u000a"), image: (""), hasImage: ((true)), distance: ((1.2)), }));
                const __VLS_94 = __VLS_pickFunctionalComponentCtx(__VLS_91, __VLS_93);
            }
            (__VLS_79.slots).default;
            const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78);
        }
        (__VLS_69.slots).default;
        const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["bg-blue-700"];
        __VLS_styleScopedClasses["logo"];
        __VLS_styleScopedClasses["search-types"];
        __VLS_styleScopedClasses["search-type"];
        __VLS_styleScopedClasses["search-container"];
        __VLS_styleScopedClasses["container-footer"];
        __VLS_styleScopedClasses["bg-blue-700"];
        __VLS_styleScopedClasses["mb-2"];
        __VLS_styleScopedClasses["close-items"];
    }
    var __VLS_slots;
    // @ts-ignore
    [activeOption,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Card: Card,
            searchStore: searchStore,
            activeOption: activeOption,
            setActive: setActive,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
