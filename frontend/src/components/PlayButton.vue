/*
File: PlayButton.vue
Project: Casino426
  Description: make the button on home enable
  Author: Loïc Roux
  Date of creation: 04.03.2026
  */
<template>
  <router-link :to="route">
    <button >
      <div>
        <span class="text-white font-semibold text-lg tracking-wide drop-shadow">{{ text }}</span>
      </div>
    </button>
  </router-link>
</template>

<script setup>
defineProps({
  route: {
    type: String,
    required: true
  },
  text:{
    type: String ,
    required:true
  }
})
</script>

/*
Source: claude.ia
Prompt: How can I do some props from playbutton to home.vue for an easy change to the button  ?
*/