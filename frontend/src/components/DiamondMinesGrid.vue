<script setup>
import PlayButton from '../components/PlayButton.vue'
import CashoutButton from "./CashoutButton.vue";
import ReturnButton from "./returnButton.vue";
</script><!--
File: MinesGrid.vue
Project: casino-royale
Description: The game "the Diamond Mines game"
Author: Léo del Duca, Rodrigo Silva Riço
Date of creation: 09-06-2025
-->

<template>
  <div class="min-h-screen flex items-center justify-center ">

    <!-- Gauche -->
    <div class="flex-1 flex items-center justify-center  border-2 rounded">
      <div class="flex flex-col items-center gap-4">
        <!-- Colonne de 3 labels -->
        <div class="flex flex-col gap-3">
          <div class="p-3 bg-gray-100 rounded">Future infos</div>
          <div class="p-3 bg-gray-100 rounded">Future infos</div>
          <div class="p-3 bg-gray-100 rounded">Future infos</div>
        </div>

        <!-- Boutons en bas -->

        <div class="flex justify-between mt-auto">
          <return-button :textBtn="rejouer" ></return-button>
          <button class=" rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700shadow-lg
      active:scale-95 hover:scale-105 transition-transform duration-150 ">
            <div
                class="
        bg-gradient-to-b from-green-600 to-green-800
        rounded-full
        px-10 py-2
        shadow-inner
      "
            >
      <span class="text-white font-semibold text-lg tracking-wide drop-shadow">
        retour
      </span>
            </div>
          </button>
        </div>

      </div>
    </div>

    <!-- Droite -->
    <div class="flex-none flex flex-col border-2 rounded p-6 gap-6">

      <!-- Tableau -->
      <div class="flex justify-center">
        <div class="grid grid-cols-5 gap-4">
          <div
              v-for="cellIndex in 25"
              :key="cellIndex"
              class="w-28 h-28 bg-yellow-500 rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-200 border-b-4">
          </div>
        </div>
      </div>



    </div>

  </div>
</template>

/*
Source: Claude
Prompt: How can I round the corners of my squares to make them a little prettier?
*/
