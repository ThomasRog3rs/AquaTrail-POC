<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';
import { Question } from "../../types/question";
import { useQuestionnaireStore } from "../../stores/questionnaireStore";

const questionnaireStore = useQuestionnaireStore();

// Define props to accept one `Question`
const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits<{
  (e: 'update:answer', answer: string[]): void;
}>()

// Store the answer in a reactive string
const answer = ref<string>("");

// Emit the answer whenever it changes
watch(answer, (newVal) => {
  emit('update:answer', [newVal]);
});

onMounted(() => {
  answer.value = "";
});
</script>

<template>
  <div>
    <!-- Render the question -->
    <h2 class="mb-2">{{ props.question.question }}</h2>

    <!-- Render a large text area for the open-ended answer -->
    <textarea
      v-model="answer"
      placeholder="Type your answer here"
      class="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
    ></textarea>
  </div>
</template>

<style scoped>
</style>
