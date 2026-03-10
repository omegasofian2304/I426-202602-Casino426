/*
File: footer.vue
Project: Casino426
  Description: the footer is used for this project.
  Author: Loïc Roux
  Date of creation: 04.03.2026
  */
<template>
  <footer class="w-full bg-[#cc1111] flex items-center h-13 px-4 relative overflow-hidden font-['Oswald'] text-white text-sm tracking-wide">

    /*
    Source: chatgpt.com
    Prompt: comment mettre le contact a gauche?
      avec les 4 lignes de ccodes a la suite.
    */
    <!-- Nav gauche -->
    <div class="z-10 flex items-center gap-3">
      <span class="whitespace-nowrap text-sm">Contact</span>
    </div>

    <!-- dégradé gauche -->
    <div class="absolute left-20 top-0 h-full flex items-center pointer-events-none z-0">
      <div class="w-5 h-full bg-black opacity-100" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-80 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-60 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
    </div>

    <!-- Titre centré -->
    <span class="absolute left-1/2 -translate-x-1/2 z-10 text-base font-medium whitespace-nowrap">
      CPNV 2026 Tout droits résérvé
    </span>

    <!-- dégradé droite -->
    <div class="absolute right-14 top-0 h-full flex items-center pointer-events-none z-0">
      <div class="w-5 h-full bg-black opacity-60 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-80 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-100 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
    </div>

    <!-- Nav droite -->
    <div class="z-10 flex items-center gap-3 ml-auto">
      <span class="whitespace-nowrap text-sm">Support</span>
    </div>

  </footer>
</template>

<script setup lang="ts">
</script>
