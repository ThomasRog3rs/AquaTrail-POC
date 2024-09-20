<script setup lang="ts">
import {defineProps, defineEmits, onMounted} from 'vue';
import {Question} from "../../types/question";
import {useQuestionnaireStore} from "../../stores/questionnaireStore";

const questionnaireStore = useQuestionnaireStore();

// Define props to accept one `Question`
const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits<{
  (e: 'update:answer', answer: string): void;
}>()

const updateAnswer = (optionSelected : string) => {
  emit('update:answer', optionSelected);
}

</script>

<template>
  <div>
    <!-- Render the question -->
    <h2>{{ props.question.question }}</h2>

    <!-- Render radio buttons for each option -->
    <div v-if="props.question.options">
      <div v-for="(option, index) in props.question.options" :key="index">
        <input
            type="radio"
            :id="`option-${props.question.id}-${index}`"
            :name="`question-${props.question.id}`"
            :value="option"
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
/* Style your component */
</style>