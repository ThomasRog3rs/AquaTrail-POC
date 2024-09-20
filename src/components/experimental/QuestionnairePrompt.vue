<script setup lang="ts">
import {useQuestionnaireStore} from "../../stores/questionnaireStore";
const questionnaireStore = useQuestionnaireStore();
</script>

<template>
  <div v-show="questionnaireStore.promptModalOpen" id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-screen">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-gray-200 rounded shadow">
        <button @click="questionnaireStore.closePrompt()" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg class="mx-auto mb-4 text-yellow-500 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M7.05 4.05A7 7 0 0 1 19 9c0 2.407-1.197 3.874-2.186 5.084l-.04.048C15.77 15.362 15 16.34 15 18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1c0-1.612-.77-2.613-1.78-3.875l-.045-.056C6.193 12.842 5 11.352 5 9a7 7 0 0 1 2.05-4.95ZM9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm1.586-13.414A2 2 0 0 1 12 7a1 1 0 1 0 0-2 4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 0 1 .586-1.414Z" clip-rule="evenodd"/>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-700">
            We'd love your feedback!
          </h3>
          <p class="mb-5 text-sm text-gray-600">
            Help us improve your experience by sharing your thoughts on how we can make meaningful updates to the web app.
          </p>
          <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAbMagWdUODVLS0owRTFMSlRHUjFIT0oyUlAyR1YyTy4u" target="_blank" class="w-full md:w-1/2 bg-blue-700 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
              Fill out the feedback form
            </a>
            <button @click="questionnaireStore.closePrompt()" type="button" class="w-full md:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mb-2 md:mb-0">
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>