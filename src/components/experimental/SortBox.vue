<template>
    <div class="sortBox shadow-lg" v-if="props.open">
            <div class="header">
                <h1>{{props.title}}</h1>
                <span class="close" @click="closeBox">&cross;</span>
            </div>
            <slot></slot>
        </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeBox = () => {
    emit('close'); 
}
</script>

<style>

div.sortBox{
    padding: 30px;
    border-top: 2px solid rgb(186, 186, 186);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(240, 240, 240);
    min-height: 30vh;
    max-height: 50vh;
    overflow: scroll;
    /* transition: transform 0.3s ease-out, opacity 0.3s ease-out; */
}

div.sortBox > div.header{
    font-size: 25px;
    display: flex;
    justify-content:space-between
}

div.sortBox > div.header > span.close:hover{
    cursor: pointer;
}
</style>