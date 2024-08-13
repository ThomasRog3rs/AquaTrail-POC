<template>
      <nav class="bg-blue-700">
        <h1 class="logo">Booking Pin</h1>
        <div class="search-types">
          <template v-for="type in searchStore.searchItems">
              <div class="search-type" :class="{ active: type.active }" @click="setActive(type.title)">
                {{ type.title }}
              </div>
          </template>
        </div>
      </nav>
      <section id="search">
        <div class="search-container">
          <form>
            <input type="search" placeholder="Search Marina Name">
            <select>
              <option value="" disabled selected>Select Services (optional)</option>
            </select>
            <input type="number" placeholder="Distance from current location (km)">
          </form>
          <div class="container-footer">
              <button class="bg-blue-700">Search</button>
          </div>
        </div>
      </section>
      <section id="close-by">
        <h2 class="mb-2">{{ activeOption }} close to you</h2>
        <div class="close-items">
          <Card name="Cotton Field Wharf" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quam?
" image="" :has-image="true" :distance="1.2"></Card>
<Card name="Cotton Field Wharf" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quam?
" image="" :has-image="false" :distance="1.2"></Card>
<Card name="Cotton Field Wharf" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quam?
" image="" :has-image="true" :distance="1.2"></Card>
        </div>
      </section>
            <RouterLink to="/old">View Legacy</RouterLink>
  </template>
  <script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import Card from '../components/experimental/Card.vue';
  import { useSearchStore } from '../stores/searchStore';
  const searchStore = useSearchStore();

  const activeOption = ref<string>();

  function setActive(title:string){
    searchStore.searchItems.find(x => x.active)!.active = false;
    searchStore.searchItems.find(x => x.title === title)!.active = true;
    activeOption.value = searchStore.searchItems.find(x => x.active)!.title;
  }

  onMounted(() => {
    activeOption.value = searchStore.searchItems.find(x => x.active)!.title;
  })
  </script>

  <style scoped>
    nav, section{
      padding: 20px;
    }

    h1.logo{
      color: white;
      font-size: 25px;
      text-align: center;
      font-weight: bold;
    }

    h2{
      font-size: 20px;
    }

    div.search-types{
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: 15px;
    }

    div.search-type{
      text-align: center;
      padding: 10px;
      border: 2px solid transparent;
      width: 100%;
      margin: 10px;
      color: white;
      border-radius: 100px;
      font-weight: 500;
    }

    div.search-type:hover{
      cursor: pointer;
      background-color: #2563eb;
    }

    div.search-type.active{
      background-color: #1e3a8a;
      border: 2px solid white;
    }

    .search-container{
      border: 5px solid #facc15;
      border-radius: 8px;
      /* padding: 5px; */
    }

    .search-container > form{
      padding: 5px;
      background-color: whitesmoke;
    }

    .search-container > form > input, select{
      width: 100%;
      padding: 20px;
      background-color: whitesmoke;
      
    }
    .search-container > form > input:not(:last-child),
    .search-container > form > select:not(:last-child) {
      border-bottom: 1px solid rgb(186, 186, 186);
    }

    select {
      color: rgb(186, 186, 186); /* Change this to your desired color */
    }

    .search-container > .container-footer > button{
      width: 100%;
      color: white;
      padding: 0px;
      padding: 15px;
      font-weight: 500;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

    }

    .close-items{
      width: 1200px;
      display: flex;
      justify-content: space-between;
    }

    section#close-by{
      overflow-x: scroll;
    }
    /* *{
      overflow: scroll !important;
    } */
  </style>
