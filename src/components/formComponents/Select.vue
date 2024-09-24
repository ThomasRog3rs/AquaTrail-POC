<script setup lang="ts">
import {defineProps, defineEmits, ref, watch, onMounted} from 'vue';
import {Question} from "../../types/question";
import {useQuestionnaireStore} from "../../stores/questionnaireStore";

const questionnaireStore = useQuestionnaireStore();

// Define props to accept one `Question`
const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits<{
  (e: 'update:answer', answer: string[]): void;
}>()

// Store selected options in a reactive array
const selectedOptions = ref<string[]>([]);

// Update the selected options and emit the changes
const updateAnswer = (option: string) => {
  if (selectedOptions.value.includes(option)) {
    // Remove the option if already selected
    selectedOptions.value = selectedOptions.value.filter(opt => opt !== option);
  } else {
    // Add the option if not selected
    selectedOptions.value.push(option);
  }

  emit('update:answer', selectedOptions.value);
}

watch(selectedOptions, (newVal) => {
  emit('update:answer', newVal);
});

onMounted(() => {
  selectedOptions.value = [];
})
</script>

<template>
  <div>
    <!-- Render the question -->
    <h2>{{ props.question.question }}</h2>

    <!-- Render checkboxes for each option for multi-select -->
    <div v-if="props.question.options">
      <div v-for="(option, index) in props.question.options" :key="index">
        <input
            type="checkbox"
            :id="`option-${props.question.id}-${index}`"
            :name="`question-${props.question.id}`"
            :value="option"
            :checked="selectedOptions.includes(option)"
            @change="updateAnswer(option)"
        />
        <label :for="`option-${props.question.id}-${index}`">{{ option }}</label>
      </div>
    </div>

    <!-- If it's an open-ended question, show a text placeholder (not needed for this example) -->
    <div v-else>
      <p>No options available</p>
    </div>
  </div>
</template>

<style scoped>

</style>