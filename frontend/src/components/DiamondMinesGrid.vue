<script setup>
const rows = 5
const cols = 5
</script>

<template>
  <div class="grid-container">
    <div
        v-for="cell in rows * cols"
        :key="cell"
        class="grid-cell"
    ></div>
  </div>
</template>

<style scoped>
/* Container de la grille */
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-template-rows: repeat(5, 60px);
  gap: 5px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #222;
}

/* Cellules */
.grid-cell {
  background-color: #555;
  border-radius: 6px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
}

/* Effet hover */
.grid-cell:hover {
  transform: scale(1.1);
  background-color: #777;
}
</style>