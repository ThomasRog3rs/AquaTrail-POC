<template>
  <nav class="bg-blue-700" style="padding: 0px; padding-top: 10px;">
    <!-- <img src="../assets/signal-2024-08-14-154247_002.png" width="50" height="50" style="display: inline-block;"/>  -->
    <!-- <h1 class="logo">Mooring Pin</h1> -->
    <img style="margin: 0px auto" src="../assets/logo.png" width="50%" alt="">
    <!-- <p v-if="userLocation">Your location: {{ userLocation.longitude }}, {{ userLocation.latitude }}</p>         -->
  </nav>
  <!--  class="max-w-md mx-auto mt-5 bg-white rounded"-->
  <section v-if="showThanks">
      <div class="">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4"><span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">Thank you for your time!</span></h2>
        <p class="text-gray-600 mb-6">We appreciate your feedback. If you're okay with us contacting you about your response, please leave your email below. Otherwise, you can simply return to where you left off.</p>

        <!-- Optional Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Your Email (optional):</label>
          <input type="email" id="email" name="email" placeholder="you@example.com"
                 class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <!-- Submit Button for Email -->
          <button type="submit"
                  class="w-full sm:w-auto bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500">
            Submit Email
          </button>

          <!-- Skip and Return to App Button -->
          <router-link type="button" to="/">
                  class="w-full sm:w-auto bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500">
            Continue Without Email
          </router-link>
        </div>
    </div>
  </section>
  <section v-else>
<!--    <h2 class="text-xl font-bold text-gray-800 mb-4">Feedback Form</h2>-->
    <h1 class="text-2xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
              Feedback
            </span>
      Form
    </h1>
    <div id="formProgress" class="mb-6">
      <div class="flex justify-between">
    <span v-for="(item, index) in questionnaireStore.questions"
          :key="item.id"
          class="w-full mr-2 mt-6 text-center text-white"
          :class="{
            'bg-blue-500': item.hasBeenAnswered,   /* Blue for answered */
            'bg-gray-500': !item.hasBeenAnswered && currentQuestionIndex !== index, /* Gray for unanswered */
            '!bg-yellow-500': currentQuestionIndex === index  /* Yellow for current question */
          }"
          style="height: 3px;"> <!-- Adjust height here -->
    </span>
      </div>
    </div>
    <form @submit.prevent class="space-y-6">
      <div v-if="questionnaireStore.questions[currentQuestionIndex].type === 'radio'">
        <Radio
            :question="questionnaireStore.questions[currentQuestionIndex]"
            @update:answer="handleAnswer"
            :key="currentQuestionIndex"
            class="space-y-2"
        />
      </div>
      
      <div v-else-if="questionnaireStore.questions[currentQuestionIndex].type === 'multi-select'">
        <Select             
            :question="questionnaireStore.questions[currentQuestionIndex]"
            @update:answer="handleAnswer"
            :key="currentQuestionIndex"
            class="space-y-2"
        />
      </div>

      <div v-else class="text-gray-700">
        {{
          questionnaireStore.questions[currentQuestionIndex].question
        }}
      </div>

      <div class="flex justify-between">
        <button v-if="currentQuestionIndex > 0"
                @click="previousQuestion"
                class="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
          Previous
        </button>
        <button @click="nextQuestion"
                class="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 ml-auto">
          Next
        </button>
      </div>
    </form>

  </section>
</template>


<script setup lang="ts">
import {useQuestionnaireStore} from "../stores/questionnaireStore";
import {onMounted, ref} from "vue";
import Radio from "../components/formComponents/Radio.vue";
import Select from "../components/formComponents/Select.vue";

const questionnaireStore = useQuestionnaireStore();

const currentQuestionIndex = ref<number>(0);

const showThanks = ref<boolean>(false);

const handleAnswer = (answer : string[] | string) => {
  if (Array.isArray(answer)) {
    // If answer is already an array, assign it directly
    questionnaireStore.questions[currentQuestionIndex.value].theAnswer = answer;
  } else {
    // If answer is a single string, wrap it in an array
    questionnaireStore.questions[currentQuestionIndex.value].theAnswer = [answer];
  }
}

const previousQuestion = () => {
  if(currentQuestionIndex.value > 0){
    currentQuestionIndex.value--;
  }
}

const nextQuestion = () => {
  //Todo: post question to the backend
  questionnaireStore.questions[currentQuestionIndex.value].hasBeenAnswered = true;
  console.warn("ANSEWR:")
  console.log(questionnaireStore.questions[currentQuestionIndex.value])
  
  if (currentQuestionIndex.value < questionnaireStore.questions.length - 1) {
    currentQuestionIndex.value++;
  }else{
    //Todo: post whole form to backend
    showThanks.value = true;
  }
}

onMounted(() => {
  
})
</script>