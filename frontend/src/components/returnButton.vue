<script setup>
defineProps({
  textBtn: String
})
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class=" rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700shadow-lg
      active:scale-95 hover:scale-105 transition-transform duration-150  " @click="handleClick">
    <div
        class="
        bg-gradient-to-b from-green-600 to-green-800
        rounded-full
        px-10 py-2
        shadow-inner
      "
    >
      <span class="text-white font-semibold text-lg tracking-wide drop-shadow">
        {{ textBtn }}
      </span>
    </div>
  </button>
</template>

<style scoped>

</style>

