<!-- ***********************************************************************************************************************
* Program name :           header__.vue
* Description :            header de l'app
* Author :                 Loïc Roux
* Creation date :          04.03.2026
* Modified by :            Loïc Roux
* Modification date :      04.03.2026
* Version :                4.0
**********************************************************************************************************************/ -->
<template>
  <header class="w-full bg-[#cc1111] flex items-center h-13 px-4 relative overflow-hidden font-['Oswald'] text-white text-sm tracking-wide">
    <router-link to="/home" class="text-[#000000]">
      <button>Accueil</button>
    </router-link>
    <!-- Chevrons gauche -->
    <div class="absolute left-20 top-0 h-full flex items-center pointer-events-none z-0">
      <div class="w-5 h-full bg-black opacity-100" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-80 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-60 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
    </div>

    <!-- Titre centré -->
    <span class="absolute left-1/2 -translate-x-1/2 z-10 text-base font-medium whitespace-nowrap">
      Casino Royale
    </span>

    <!-- Chevrons droite -->
    <div class="absolute right-14 top-0 h-full flex items-center pointer-events-none z-0">
      <div class="w-5 h-full bg-black opacity-60 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-80 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
      <div class="w-5 h-full bg-black opacity-100 -ml-1" style="clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"></div>
    </div>

    <!-- Nav droite -->
    <div class="z-10 flex items-center gap-3 ml-auto">
      <span class="whitespace-nowrap text-sm">Argent : 23,50</span>
      <div class="w-9 h-9 rounded-full border-2 border-[#333] bg-[#f0f0f0] flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-[#333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </div>

  </header>
</template>
/*
Source: qwen.ia
Prompt: How can I do color gradient in his header ?
*/
<script setup lang="ts">
import {users } from '../data/balance.json'
import Home from "@/pages/home.vue";
</script>