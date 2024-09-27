<script setup lang="ts">
import {useRouter} from "vue-router";
import {useQuestionnaireStore} from "../../stores/questionnaireStore";
import * as client from "../../api-client";
import {QuestionnaireApi} from "../../api-client";
const questionnaireStore = useQuestionnaireStore();
const router = useRouter();

const questionAPI = new QuestionnaireApi();
const acceptForm = async () => {
  const postRequest : client.ApiQuestionnairePostRequest = {
    questionnaireModel: {
      questionNumber: 0,
      questionName: "please give us feedback",
      questionType: "prompt",
      questionOptions: ["yes", "no"],
      answers: ["yes"]
    }
  }
  console.log(postRequest);
  await questionAPI.apiQuestionnairePost(postRequest);
  await router.push("/feedback");
  questionnaireStore.hasBeenPrompted = true;
}
</script>

<template>
  <div class="top-0 left-0 w-full bg-blue-100 p-4 z-50 relative" v-show="questionnaireStore.promptModalOpen">
    <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-2" @click="questionnaireStore.closePrompt()">
      x
    </button>
    <div class="pr-3"> <!-- Add right padding to prevent text overlap with the close button -->
      <p class="text-center">
        <strong class="text-blue-600 font-semibold">
          Alpha
        </strong>
        <span class="text-gray-700 mx-2">
          Help us improve your experience by sharing your thoughts on how we can make meaningful updates to the web app.
          <span @click="acceptForm" class="text-blue-700 underline cursor-pointer">Fill out the feedback form</span>.
        </span>
      </p>
    </div>
  </div>
</template>