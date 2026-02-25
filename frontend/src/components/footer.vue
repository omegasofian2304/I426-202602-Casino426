<script setup lang="ts">

</script>

<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
  <footer>
    <span class="nav-left">Contact</span>

    <div class="chevrons">
      <div class="chevron"></div>
      <div class="chevron"></div>
      <div class="chevron"></div>
    </div>

    <span class="nav-center">CPNV 2026 tous droit résérvé</span>

    <div class="chevrons-right">
      <div class="chevron-right"></div>
      <div class="chevron-right"></div>
      <div class="chevron-right"></div>
    </div>
    <div>
      <span class="nav-right">Support</span>
    </div>
  </footer>
  </body>
</template>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

header {
  width: 100%;
  max-width: 960px;
  background-color: #cc1111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 52px;
  position: relative;
  overflow: hidden;
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  color: white;
  letter-spacing: 0.5px;
}

/* Diagonal black chevrons in the left area */
.chevrons {
  position: absolute;
  left: 90px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0;
  pointer-events: none;
}

.chevron {
  width: 22px;
  height: 100%;
  background: #111;
  clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%);
  margin-left: -4px;
}

.chevron:nth-child(2) { opacity: 0.85; }
.chevron:nth-child(3) { opacity: 0.7; }

/* Right side chevrons before icon */
.chevrons-right {
  position: absolute;
  right: 56px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.chevron-right {
  width: 22px;
  height: 100%;
  background: #111;
  clip-path: polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%);
  margin-left: -4px;
}

.nav-left {
  z-index: 1;
  white-space: nowrap;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
}

.nav-right {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

</style>