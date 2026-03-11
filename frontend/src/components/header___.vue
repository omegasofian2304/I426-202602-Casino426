/*
File: header__.vue
Project: Casino426
Description: the header is used for this project.
Author: Loïc Roux
Date of creation: 04.03.2026
*/
<template>
  <header class="w-full bg-[#cc1111] flex items-center h-13 px-4 relative overflow-hidden font-['Oswald'] text-white text-sm tracking-wide">
    <router-link to="/home" class="text-[#000000]">
      <span class="z-10 whitespace-nowrap">Accueil</span>
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
      <button @click="toggleMenu" class="w-9 h-9 rounded-full border-2 border-[#333] bg-[#f0f0f0] flex items-center justify-center flex-shrink-0 hover:bg-gray-300 transition-colors">
        <svg class="w-5 h-5 text-[#333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </div>

    <!-- Overlay sombre -->
    <div
        v-if="menuOpen"
        @click="toggleMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Menu latéral -->
    <div
        v-if="menuOpen"
        class="fixed top-0 right-0 h-full w-72 z-50 flex items-center justify-center"
    >
      <div class="bg-yellow-400 rounded-2xl border-4 border-black w-64 overflow-hidden shadow-2xl">

        <!-- Argent -->
        <div class="p-5 border-b-2 border-black text-center">
          <span class="text-2xl font-bold text-black">Argent: 23,50</span>
        </div>

        <!-- Ajouter de l'argent -->
        <button class="w-full p-5 border-b-2 border-black text-center text-2xl font-bold text-black hover:bg-yellow-300 transition-colors">
          Ajouter de l'argent
        </button>

        <!-- Se connecter -->
        <button class="w-full p-5 border-b-2 border-black text-center text-2xl font-bold text-black hover:bg-yellow-300 transition-colors">
          Se connecter
        </button>

        <!-- Se déconnecter -->
        <button class="w-full p-5 border-b-2 border-black text-center text-2xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
          Se déconnecter
        </button>

        <!-- Contact -->
        <button class="w-full p-5 text-center text-2xl font-bold text-black hover:bg-yellow-300 transition-colors">
          Contact
        </button>

      </div>
    </div>

  </header>
</template>

/*
Source: qwen.ia
Prompt: How can I do color gradient in his header ?
*/
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>
