import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('searchStore', () => {
    // Define the type for each search type object
    type SearchType = {
        icon: string,
        title: string,
        active: boolean
    };

    // Initialize the searchTypes array with the correct structure
    const searchItems = ref<SearchType[]>([
        { icon: "", title: "Marinas", active: true },
        // { icon: "", title: "Moorings", active: false },
        // { icon: "", title: "Services", active: false },
    ]);

    const serviceValues = ref<string[]>([
        "Boat Hire Services",
        "Boat Sales and Brokerage",
        "Boat Lifting and Storage",
        "Slipway",
        "Boat Mail",
        "Calor Gas",
        "Coal",
        "Composting",
        "Diesel",
        "EV Charging",
        "Fuel and Utilities",
        "Petrol",
        "Waste Disposal",
        "Elsan",
        "Pump Out",
        "Bar",
        "Cafe",
        "Blacking",
        "Boat Maintenance and Repair",
        "Chandlery",
        "Laundry",
        "Cleaning",
        "Parking",
        "Showers",
        "Toilets",
        "Lifting and Craning",
        "Hard Standing",
        "Club and Social Areas",
        "WiFi",
        "Water",
        "Boat Construction and Building",
        "Sanitation Station",
        "Boat Yard and Dock Services"
    ]);

    return { searchItems, serviceValues };
});