<!--
File: leaderboard___.vue
Project: casino-royale
Description: the leaderboard
Author: Roux Loïc
Date of creation: 10-03-2026
-->
<script setup lang="ts">
import leaderboard_row from '../components/leaderboard_row.vue'
</script>
<template>
  <!-- Table card -->
  <div class="rounded-2xl shadow-[0_0_0_1px_rgba(255,200,0,0.15),0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,200,0,0.1)] overflow-hidden bg-[rgba(60,0,0,0.75)] backdrop-blur-md">

    <!-- Column headers -->
    <div class="grid grid-cols-8 px-6 py-3 border-b border-white/10">
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase">Numéro</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase col-span-2">Pseudo</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Victoires en %</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Parties gagnées</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Parties jouées</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Type de jeux le plus joué</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Solde</div>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-white/5 px-4 py-2">
      <leaderboard_row :solde="9999999" name="Daliatelle"  rank="1" :winrate="0" :win="0" :total_game="0" name_game="black Jack" />
      <leaderboard_row :solde="80000"   name="Dragonneau1" rank="2" :winrate="0" :win="0" :total_game="0" name_game="D-Mines" />
      <leaderboard_row :solde="60000"   name="GuiGeek8318" rank="3" :winrate="0" :win="0" :total_game="0" name_game="D-Mines" />
    </div>
  </div>
</template>