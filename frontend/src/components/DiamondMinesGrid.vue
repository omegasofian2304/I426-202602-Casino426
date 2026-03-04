<!--
File: MinesGrid.vue
Project: casino-royale
Description: The game "the Diamond Mines game"
Author: Léo del Duca, Rodrigo Silva Riço
Date of creation: 09-06-2025
-->

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="border-2 p-3 rounded">
      <div class="grid grid-cols-5 gap-2">
        <div
            v-for="cellIndex in 25"
            :key="cellIndex"
            class="w-24 h-24 bg-yellow-500 rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-200 border-b-4"
        >
        </div>
      </div>
    </div>
  </div>
</template>

/*
Source: Claude
Prompt: How can I round the corners of my squares to make them a little prettier?
*/
<script setup lang="ts">
import Header___ from "../components/header___.vue";
</script>