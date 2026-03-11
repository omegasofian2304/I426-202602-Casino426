<!--
File: leaderboard___.vue
Project: casino-royale
Description: the leaderboard
Author: Roux Loïc
Date of creation: 10-03-2025
-->
<template>
  <!-- Table card -->
  <div class="rounded-2xl shadow-[0_0_0_1px_rgba(255,200,0,0.15),0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,200,0,0.1)] overflow-hidden bg-[rgba(60,0,0,0.75)] backdrop-blur-md">

    <!-- Column headers -->
    <div class="grid grid-cols-6 px-6 py-3 border-b border-white/10">
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase">Numéro</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase col-span-2">Pseudo</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Victoires en %</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Parties gagnées</div>
      <div class="font-['Oswald'] text-white/80 font-semibold tracking-wider text-sm uppercase text-center">Parties jouées</div>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-white/5 px-4 py-2">

      <!-- Row 1 -->
      <div class="grid grid-cols-6 items-center py-5 px-2 rounded-xl transition-all duration-200 hover:bg-[rgba(255,200,0,0.06)] hover:translate-x-1">
        <div class="flex items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#e6a800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-11 h-11 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">1st</span>
        </div>
        <div class="col-span-2">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-4 py-2 font-['Oswald'] font-bold text-[#5a0000] text-base inline-block">Daliatelle</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-lg">98</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">873</span>
        </div>
        <div class="flex justify-center gap-2 items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">891</span>
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-3 py-2 font-['Oswald'] font-bold text-[#5a0000] text-sm hidden sm:inline-block">Black Jack</span>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="grid grid-cols-6 items-center py-5 px-2 rounded-xl transition-all duration-200 hover:bg-[rgba(255,200,0,0.06)] hover:translate-x-1">
        <div class="flex items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#f5d080,#d4900a)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-11 h-11 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">2</span>
        </div>
        <div class="col-span-2">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-4 py-2 font-['Oswald'] font-bold text-[#5a0000] text-base inline-block">Dragonneau1</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-lg">97</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">853</span>
        </div>
        <div class="flex justify-center gap-2 items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">880</span>
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-3 py-2 font-['Oswald'] font-bold text-[#5a0000] text-sm hidden sm:inline-block">D. Mines</span>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="grid grid-cols-6 items-center py-5 px-2 rounded-xl transition-all duration-200 hover:bg-[rgba(255,200,0,0.06)] hover:translate-x-1">
        <div class="flex items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#f0c860,#c8800a)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-11 h-11 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">3</span>
        </div>
        <div class="col-span-2">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-4 py-2 font-['Oswald'] font-bold text-[#5a0000] text-base inline-block">GuiGeek8318</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-lg">96</span>
        </div>
        <div class="flex justify-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">833</span>
        </div>
        <div class="flex justify-center gap-2 items-center">
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] w-12 h-12 rounded-full flex items-center justify-center font-['Oswald'] font-bold text-[#5a0000] text-base">868</span>
          <span class="bg-[radial-gradient(circle_at_35%_35%,#ffe066,#f5b800)] shadow-[0_2px_8px_rgba(245,184,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl px-3 py-2 font-['Oswald'] font-bold text-[#5a0000] text-sm hidden sm:inline-block">D.Mines</span>
        </div>
      </div>

    </div>
  </div>


</template>
<script setup lang="ts">
</script>