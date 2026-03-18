/*
File: Home.vue
Project: Casino426
Description: home
Author: Loïc Roux
Date of creation: 04.03.2026
*/
<template>
  <div class="min-h-screen bg-[#8B0000] p-8 font-sans">

    <!-- Title -->
    <div class="flex justify-center mb-8">
      <div class="outline outline-2 outline-[#5ab4f0] outline-offset-2 rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg">
        <div class="bg-gradient-to-b from-green-400 to-green-600 rounded-full px-24 py-3 shadow-inner">
          <span class="text-black text-4xl font-normal tracking-wide">Casino royale</span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mx-auto max-w-2xl mb-8">
      <div class="bg-gray-200 border border-gray-400 px-6 py-4 rounded">
        <p class="text-gray-700 text-sm">Bienvenue sur le casino royale nous vous proposons plusieurs jeux dont le black jack, le bandit manchot, diamond mines</p>
      </div>
    </div>

    <!-- Jeux Section -->
    <div class="mb-6">
      <div class="inline-block bg-[#f8a0a0] rounded-full px-10 py-3 mb-6">
        <span class="text-3xl font-light text-black">Jeux</span>
      </div>

      <div class="flex gap-6 justify-center items-start">

        <!-- Black Jack -->
        <div class="bg-[#f8a0a0] rounded-2xl p-3 flex flex-col items-center w-48">
          <div class="outline outline-2 outline-[#5ab4f0] rounded-xl overflow-hidden w-full h-32 bg-[#1a1a2e] flex items-center justify-center">
            <img src="../assets/img/black_jack.png" alt="blackjack" class="w-full h-32 object-cover" />
          </div>
          <span class="text-sm text-gray-700 mt-1 mb-1">black jack</span>
          <PlayButton route="/blackjack"  text="Jouer" class="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 rounded-full px-10 py-2 shadow-inner transition-transform duration-150"/>
        </div>

        <!-- Diamond Mines  -->
        <div class="bg-[#f8a0a0] rounded-2xl p-3 flex flex-col items-center w-48">
          <div class="rounded-xl overflow-hidden w-full h-32 bg-[#2d1b00] flex items-center justify-center">
            <img src="../assets/img/diamond_mines.png" alt="diamond mines" class="w-full h-32 object-cover" />
          </div>
          <span class="text-sm text-gray-700 mt-1 mb-1">diamond mines</span>
          <PlayButton route="/diamond-mines"  text="Jouer" class="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 rounded-full px-10 py-2 shadow-inner transition-transform duration-150"/>
        </div>

        <!-- Machine à sous -->
        <div class="bg-[#f8a0a0] rounded-2xl p-3 flex flex-col items-center w-48">
          <div class="rounded-xl overflow-hidden w-full h-32 bg-[#3d0000] flex items-center justify-center">
            <img src="../assets/img/bandit_manchot.png" alt="bandit manchot" class="w-full h-32 object-cover" />
          </div>
          <span class="text-sm text-gray-700 mt-1 mb-1">machine a sous</span>
          <PlayButton route="/bandit-manchot" text="Jouer" class="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 rounded-full px-10 py-2 shadow-inner transition-transform duration-150"/>
        </div>

      </div>
    </div>

    <!-- Leaderboard Section -->
    <div class="mt-8">
      <div class="inline-block bg-[#f8a0a0] rounded-full px-10 py-3">
        <PlayButton route="/leaderboard" text="Leaderboard" class="text-3xl font-light text-black"/>
      </div>
    </div>

  </div>
</template>

<script setup>
import PlayButton from '../components/PlayButton.vue'
</script>