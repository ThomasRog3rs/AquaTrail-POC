<template>
<!-- Main modal -->
<div v-show="props.open" id="crud-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[55] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full" @click="toggleDropdown">
        <!-- Modal content -->
        <div class="relative bg-white flex flex-col rounded shadow">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t sticky top-0 bg-white z-10">
                <h3 class="text-lg font-semibold text-gray-900">
                    Update Marina Info
                </h3>
                <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5 flex-grow overflow-y-auto" @submit.prevent="handleSubmit">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input v-model="formData.name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suggest a new name">
                    </div>
                    <div class="col-span-2">
                        <label for="canal" class="block mb-2 text-sm font-medium text-gray-900">Canal Name</label>
                        <input v-model="formData.canalName" type="text" name="canal" id="canal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suggest a new canal name">
                    </div>
                    <div class="col-span-2">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input v-model="formData.address" type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suggest a new address">
                    </div>
                    <div class="col-span-2">
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900">Website</label>
                        <input v-model="formData.website" type="text" name="website" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suggest a new website">
                    </div>
                    <div class="col-span-2">
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                        <input v-model="formData.phoneNumber" type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suggest a new phone number">
                    </div>
                    <!-- Custom Multi-select Dropdown for Services -->
                    <div class="col-span-2">
                        <label for="services" class="block mb-2 text-sm font-medium text-gray-900">Services</label>
                        <div class="relative">
                            <div 
                                id="openServiceDropdown"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 cursor-pointer"
                            >
                                Select Services
                            </div>
                            <ul 
                                v-show="dropdownOpen" 
                                id="serviceDropdown"
                                class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-auto"
                            >
                                <li 
                                    v-for="service in services" 
                                    :key="service" 
                                    id="serviceDropdown"
                                    @click="toggleService(service)" 
                                    class="p-2 cursor-pointer hover:bg-blue-500 hover:text-white block"
                                    :class="{'!bg-blue-700 text-white': selectedServices.includes(service)}" 
                                >
                                    <div class="flex justify-between items-center" id="serviceDropdown">
                                        <div id="serviceDropdown">{{ service }}</div>
                                        <svg v-show="selectedServices.includes(service)" id="serviceDropdown" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-2">
                            <p>Selected Services: <strong>{{ selectedServices.join(', ') }}</strong></p>
                        </div>
                    </div>

                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Other comments (optional)</label>
                        <textarea v-model="formData.description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Do you have anything else to add?"></textarea>                    
                    </div>
                </div>
                <div class="col-span-2">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email (optional)</label>
                    <input v-model="formData.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="example@mail.com">
                </div>
            </form>
            <!-- Modal footer -->
            <!-- Modal footer, sticky at the bottom -->
            <div class="flex items-center justify-end p-4 md:p-5 border-t-2 border-gray-300 rounded-b sticky bottom-0 bg-white">
                <button type="submit" class="inline-block bg-blue-700 text-white hover:bg-blue-800 font-bold py-2 px-4 rounded" @click="handleSubmit">
                    Submit Suggestion
                </button>
            </div>
        </div>
    </div>
</div> 

</template>

<script setup lang="ts">
  import * as client from '../../api-client/';
  import { MarinaModel } from '../../api-client/';
  import {onMounted, ref, PropType} from "vue";

  const props = defineProps({
        open: {
            type: Boolean,
            required: true
        },
        marina: {
            type: Object as PropType<MarinaModel>,
            required: true
        }
    });

    const emit = defineEmits<{
        (event: 'close'): void;
        (event: 'submitted', value: boolean): void;
    }>();

    const closeModal = () => {
        emit('close');
    }

    // Define reactive data
    const formData = ref({
        name: props.marina?.name || '',
        canalName: props.marina?.canalName || '',
        address: props.marina?.address || '',
        website: props.marina?.website || '',
        phoneNumber: props.marina?.phoneNumber || '',
        description: '',
        email: ''
    });

    const selectedServices = ref<string[]>([]);
    const dropdownOpen = ref<boolean>(false);
    const services = ref<Array<string>>([]);

    const toggleDropdown = (e: MouseEvent) => {
        //@ts-ignore
        const targetId = e.target.id;
        //@ts-ignore
        const parentId = e.target.parentElement?.id; // Use optional chaining to avoid errors

        // Check if clicked outside of dropdown and close it
        if (parentId !== "serviceDropdown" && targetId !== "openServiceDropdown") {
            dropdownOpen.value = false; // Close the dropdown if clicked outside
        }

        // Toggle the dropdown if the click is on the toggle button
        if (targetId === "openServiceDropdown") {
            console.log(targetId)
            dropdownOpen.value = !dropdownOpen.value; // Toggle the dropdown 
        }

        console.log(dropdownOpen.value);
    };

    // Toggle service selection
    const toggleService = (service: string) => {
        if (selectedServices.value.includes(service)) {
            selectedServices.value = selectedServices.value.filter(s => s !== service);
        } else {
            selectedServices.value.push(service);
        }
    };

    const handleSubmit = async () => {
        const SuggestionApi = new client.SuggestionApi();
        try{
            console.log({
                ...formData.value,
                services: selectedServices.value
            });

            const params : client.SuggestionMarinaSuggestionsUpdatePostRequest = {
                updateMarinaSuggestionModel:{
                    marinaId: props.marina.id ?? undefined,
                    userEmail: formData.value.email ?? null,
                    suggestedName: formData.value.name ?? null,
                    suggestedCoordinates: null,
                    suggestedWebsite: formData.value.website ?? null,
                    suggestedAddress: formData.value.address ?? null,
                    suggestedCanalName: formData.value.canalName ?? null,
                    suggestedPhoneNumber: formData.value.phoneNumber ?? null,
                    services: selectedServices.value ?? null,
                    otherComments: formData.value.description ?? null
                }
            }

            const res = await SuggestionApi.suggestionMarinaSuggestionsUpdatePost(params);

            submitted(true);

        }catch{
            submitted(false);

        }
    };

    function submitted(sucess:boolean){
        emit("submitted", sucess);
    }

    const TypesApi = new client.TypesApi();
    onMounted(async () => {
        const response = await TypesApi.typesServiceTypesGet();
        // Filter out undefined values and map to a string array
        services.value = response
            .map((x:any) => x.value)
            .filter((value:any) => value !== undefined)
            .filter((value:any) => value !== null);
        
        services.value.push("Other (please specify below)");

        if(props.marina.services!.length > 0){
            selectedServices.value = props.marina.services?.map((x:any) => x.serviceType.value)!;
        }

        console.log(selectedServices.value);
        console.log(services.value);

    })
</script>