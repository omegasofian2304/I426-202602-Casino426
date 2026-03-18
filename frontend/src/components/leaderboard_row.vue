<!--
File: leaderboard_row.vue
Project: casino-royale
Description: the leaderboard row
Author: Roux Loïc
Date of creation: 10-03-2025
-->
<template>
  <div class="grid grid-cols-8 items-center py-5 px-2 rounded-xl transition-all duration-200 hover:bg-[rgba(255,200,0,0.06)] hover:translate-x-1">

    <!-- Col 1 : Numéro -->
    <div class="flex items-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#e6a800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-11 h-11 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">{{ rank }}</span>
    </div>

    <!-- Col 2-3 : Pseudo -->
    <div class="col-span-2">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-4 py-2 font-['Oswald'] font-bold text-[#5a0000] text-base inline-block">{{ name }}</span>
    </div>

    <!-- Col 4 : Victoires en % -->
    <div class="flex justify-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-lg">{{ winrate }}%</span>
    </div>

    <!-- Col 5 : Parties gagnées -->
    <div class="flex justify-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">{{ win }}</span>
    </div>

    <!-- Col 6 : Parties jouées -->
    <div class="flex justify-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">{{ total_game }}</span>
    </div>

    <!-- Col 7 : Type de jeux le plus joué -->
    <div class="flex justify-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-3 py-2 font-['Oswald'] font-bold text-[#5a0000] text-sm inline-block">{{ name_game }}</span>
    </div>

    <!-- Col 8 : Solde -->
    <div class="flex justify-center">
      <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-4 py-2 font-['Oswald'] font-bold text-[#5a0000] text-base inline-block">{{ solde }} $</span>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps({
  solde: {
    type: Number,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  winrate: {
    type: Number,
    required: true
  },
  win: {
    type: Number,
    required: true
  },
  total_game: {
    type: Number,
    required: true
  },
  name_game: {
    type: String,
    required: true
  }
})
</script>