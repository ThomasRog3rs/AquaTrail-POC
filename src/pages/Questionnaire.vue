<template>
  <nav class="bg-blue-700" style="padding: 0px; padding-top: 10px; padding-bottom: 10px">
    <router-link to="/" class="logo" style="display: flex; justify-content: center; align-items: center;">
      <img src="../assets/logo4.png" width="70"  alt="Logo" style="margin-right: -4px;">
      <h1 style="color: white; font-size: 25px; margin: 0;" class="font-bold">Mooring Pin</h1>
    </router-link>
  </nav>
  <section v-if="showThanks">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">Thank You So Much!</span>
    </h2>
    <p class="text-gray-600 mb-6">
      Your feedback means a lot to us! If you’d like to stay in touch, please share your email below so we can update you on your insights. If not, feel free to continue right where you left off!
    </p>

    <!-- Optional Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Your Email (optional):</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        v-model="userEmail"
        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        :class="{'border-red-500': formError}"
      />
    </div>  

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
      <!-- Submit Button for Email -->
      <button
        type="submit"
        @click="submitEmail"
        class="w-full sm:w-auto bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500">
        Submit Email
      </button>
      <!-- Skip and Return to App Button -->
      <router-link
        type="button"
        to="/"
        class="w-full sm:w-auto bg-gray-600 text-white text-center font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500">
        Continue Without Email
      </router-link>
    </div>
    <hr class="my-6 border-t-2 border-gray-300">
    <!-- Instagram CTA -->
    <div class="text-center">
      <!-- <p class="text-gray-600 mb-2">Stay connected with us on social media for the latest updates!</p> -->
      <a
        href="https://instagram.com/mooringpin"
        target="_blank"
        class="block bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-6 rounded hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50">
        <svg class="inline-block mb-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
</svg>
Follow us on Instagram
      </a>
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
      <div class="container-header mt-6">
        <div class="search-error bg-red-600" v-if="formError">Please answer the question before moving onto the next section</div>
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
      
<!--      <div v-else-if="questionnaireStore.questions[currentQuestionIndex].type === 'range'">-->
<!--        <Range :question="questionnaireStore.questions[currentQuestionIndex]">-->
<!--          -->
<!--        </Range>-->
<!--      </div>-->
      
      <div v-else-if="questionnaireStore.questions[currentQuestionIndex].type === 'multi-select'">
        <Select             
            :question="questionnaireStore.questions[currentQuestionIndex]"
            @update:answer="handleAnswer"
            :key="currentQuestionIndex"
            class="space-y-2"
        />
      </div>

      <div v-else-if="questionnaireStore.questions[currentQuestionIndex].type === 'text'">
        <Text
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
import Range from "../components/formComponents/Range.vue";
import Text from "../components/formComponents/Text.vue";
import * as client from '../api-client';
import {QuestionnaireApi} from "../api-client/";
import {ApiQuestionnairePostRequest} from "../api-client";
import {useRouter} from 'vue-router';

const router = useRouter();

const questionAPI = new QuestionnaireApi();

const questionnaireStore = useQuestionnaireStore();

const currentQuestionIndex = ref<number>(0);

const showThanks = ref<boolean>(false);

const formError = ref<boolean>(false);

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

const nextQuestion = async () => {
  //Todo: post question to the backend
  if(questionnaireStore.questions[currentQuestionIndex.value].theAnswer === undefined){
    formError.value = true;
    return;
  }
  
  formError.value = false;
  console.warn("ANSEWR:")
  console.log(questionnaireStore.questions[currentQuestionIndex.value])
  const postRequest : client.ApiQuestionnairePostRequest = {
    questionnaireModel: {
      questionNumber: questionnaireStore.questions[currentQuestionIndex.value].id,
      questionName: questionnaireStore.questions[currentQuestionIndex.value].question,
      questionType: questionnaireStore.questions[currentQuestionIndex.value].type,
      questionOptions: questionnaireStore.questions[currentQuestionIndex.value].options,
      answers: questionnaireStore.questions[currentQuestionIndex.value].theAnswer
    }
  }
  console.log(postRequest);
  await questionAPI.apiQuestionnairePost(postRequest);
  questionnaireStore.questions[currentQuestionIndex.value].hasBeenAnswered = true;
  
  if (currentQuestionIndex.value < questionnaireStore.questions.length - 1) {
    currentQuestionIndex.value++;
  }else{
    //Todo: post whole form to backend
    
    showThanks.value = true;
  }
}

const userEmail =  ref<string | undefined>(undefined);

const submitEmail = async () => {
  if(userEmail.value === undefined) {
    formError.value = true;
    return;
  }

  // Regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is valid
  if (!userEmail || !emailPattern.test(userEmail.value)) {
    formError.value = true;
    return;
  }
  
  formError.value = false;
  const postRequest : client.ApiQuestionnairePostRequest = {
    questionnaireModel: {
      questionNumber: 8,
      questionName: "Please can we have your email and contact you?",
      questionType: "text-input",
      questionOptions: [""] as Array<string>,
      answers: [userEmail.value] as Array<string>
    }
  }
  console.log(postRequest);
  try{
    const res = await questionAPI.apiQuestionnairePost(postRequest);
    console.log(res);
    router.push("/");
  }catch(error: any){
    console.warn(error)
  }

}

onMounted(async () => {
  await questionnaireStore.startedForm();
})
</script>