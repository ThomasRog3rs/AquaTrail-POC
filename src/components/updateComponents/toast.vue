<template>
    <div
      v-if="visible"
      :class="toastClasses"
      class="m-4 shadow-lg fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300"
      role="alert"
      @click="hideToast"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg
            v-if="success"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="ml-3">
          <span class="font-medium">{{ message }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed, onMounted } from 'vue';
  
  const props = defineProps<{
    success: boolean;
    message: string;
  }>();
  
  const visible = ref(true);
  
  // Automatically hide the toast after a certain duration
  watch(visible, (newVal) => {
    if (newVal) {
      setTimeout(() => {
        hideToast();
      }, 3000); // Toast will disappear after 3 seconds
    }
  });
  
  // Method to hide the toast
  const hideToast = () => {
    visible.value = false;
  };
  
  // Computed class for dynamic styling
  const toastClasses = computed(() => {
    return props.success
      ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
      : 'bg-red-100 border-l-4 border-red-500 text-red-700';
  });

  onMounted(()=>{
    setTimeout(() => {
        hideToast();
      }, 3000);
  })
  </script>
  
  <style scoped>
  /* Optional: you can add some styling here if needed */
  </style>