<!--<script setup lang="ts">-->
<!--import {defineProps, defineEmits, onMounted} from 'vue';-->
<!--import {Question} from "../../types/question";-->

<!--// Define props to accept one `Question`-->
<!--const props = defineProps<{-->
<!--  question: Question;-->
<!--}>();-->

<!--const emit = defineEmits<{-->
<!--  (e: 'update:answer', answer: string): void;-->
<!--}>()-->

<!--const updateAnswer = (optionSelected : string) => {-->
<!--  emit('update:answer', optionSelected);-->
<!--}-->

<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; Render the question &ndash;&gt;-->
<!--    <h2>{{ props.question.question }}</h2>-->

<!--    &lt;!&ndash; Render radio buttons for each option &ndash;&gt;-->
<!--    <div v-if="props.question.options">-->
<!--      <input-->
<!--          type="range"-->
<!--          placeholder="Radius (miles)"-->
<!--          :max="props.question.options.length"-->
<!--          min="1"-->
<!--          value="3"-->
<!--          style="display: block; width: 100%; margin: 0 auto; margin-bottom: 12px; margin-top: 12px;"-->
<!--      />-->
<!--      <div id="formProgress" class="mb-6">-->
<!--        <div class="flex justify-between">-->
<!--        <span v-for="(item, index) in props.question.options"-->
<!--              :key="item.id"-->
<!--              class="w-full mt-2 mb-5"-->
<!--              style="height: 3px; font-size: 15px;"> -->
<!--              <div class="w-0.5 bg-red-700" style="height: 20px; margin-right: auto;"></div>-->
<!--              {{item}}-->
<!--        </span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; If it's an open-ended question, show a text placeholder (not needed for this example) &ndash;&gt;-->
<!--    <div v-else>-->
<!--      <p>No options available</p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--/* Style your component */-->
<!--</style>-->