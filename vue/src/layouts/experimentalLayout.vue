<template>
    <layout-test>
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
      <main>

      </main>
    </layout-test>
  </template>
  
  <script setup lang="ts">
  import { useSearchStore } from '../stores/searchStore';
  const searchStore = useSearchStore();

  function setActive(title:string){
    searchStore.searchItems.find(x => x.active)!.active = false;
    searchStore.searchItems.find(x => x.title === title)!.active = true;
  }
  </script>

  <style>
    nav{
      padding: 20px;
    }

    h1.logo{
      color: white;
      font-size: 25px;
      text-align: center;
      font-weight: bold;
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
  </style>