/*
File: PlayButton.vue
Project: Casino426
  Description: make the button on home enable
  Author: Loïc Roux
  Date of creation: 04.03.2026
  */
<template>
  <router-link :to="route">
    <button class="outline outline-2 outline-[#5ab4f0] outline-offset-2 rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg active:scale-95 hover:scale-105 transition-transform duration-150">
      <div class="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 rounded-full px-10 py-2 shadow-inner transition-transform duration-150">
        <span class="text-white font-semibold text-lg tracking-wide drop-shadow">Play</span>
      </div>
    </button>
  </router-link>
</template>

<script setup>
defineProps({
  route: {
    type: String,
    required: true
  }
})
</script>

/*
Source: claude.ia
Prompt: How can I do some props from playbutton to home.vue for an easy change to the button ?
*/