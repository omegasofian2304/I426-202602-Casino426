<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import {
  addMoney,
  formatMoney,
  gameState,
  playerMoney,
  setGameState,
  slotSpinCost,
  startSlotGame,
} from "@/stores/casinoState.js";

const router = useRouter();

const SYMBOLS = [
  { id: "cherry", emoji: "🍒", label: "Cerise", weight: 28, tripleMultiplier: 2 },
  { id: "lemon", emoji: "🍋", label: "Citron", weight: 24, tripleMultiplier: 3 },
  { id: "clover", emoji: "🍀", label: "Trèfle", weight: 18, tripleMultiplier: 5 },
  { id: "bell", emoji: "🔔", label: "Cloche", weight: 14, tripleMultiplier: 8 },
  { id: "diamond", emoji: "💎", label: "Diamant", weight: 10, tripleMultiplier: 15 },
  { id: "seven", emoji: "7️⃣", label: "Sept", weight: 6, tripleMultiplier: 30 },
];

const REEL_CELL_HEIGHT = 86;
const VISIBLE_ROWS = 3;
const STOP_TRACK_RANDOM_STEPS = 12;
const LOOP_REPEAT_COUNT = 8;
const LOOP_CYCLE_DISTANCE = REEL_CELL_HEIGHT * SYMBOLS.length;
const REEL_LOOP_DURATIONS_MS = [240, 205, 175];
const REEL_STOP_DELAYS_MS = [650, 1080, 1510];
const REEL_STOP_DURATIONS_MS = [520, 660, 820];

const pulling = ref(false);
const cooldown = ref(false);
const showInfos = ref(false);
const lastDeductedAmount = ref(0);
const lastWinAmount = ref(0);
const resultTitle = ref("Prêt à jouer");
const resultMessage = ref("Tire le levier pour lancer les rouleaux.");
const reels = ref([pickRandomSymbol(), pickRandomSymbol(), pickRandomSymbol()]);
const reelGlow = ref([false, false, false]);
const reelTracks = ref(reels.value.map((symbol) => buildStaticTrack(symbol)));
const reelOffsets = ref([0, 0, 0]);
const reelTransitions = ref(["none", "none", "none"]);
const spinningBlur = ref([false, false, false]);
const reelLooping = ref([false, false, false]);
const stoppingTimeouts = [];

const isDisabled = computed(
    () => pulling.value || cooldown.value || gameState.value === "playing" || playerMoney.value < slotSpinCost,
);

const statusLabel = computed(() => (gameState.value === "playing" ? "playing" : "idle"));
const formattedBalance = computed(() => formatMoney(playerMoney.value));
const formattedSpinCost = computed(() => formatMoney(slotSpinCost));
const formattedLastDeduction = computed(() =>
    lastDeductedAmount.value > 0 ? `-${formatMoney(lastDeductedAmount.value)}` : "0.00$",
);
const formattedLastWin = computed(() =>
    lastWinAmount.value > 0 ? `+${formatMoney(lastWinAmount.value)}` : "0.00$",
);

function goHome() {
  router.push("/home");
}

function sleep(delay) {
  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(resolve, delay);
    stoppingTimeouts.push(timeoutId);
  });
}

function pickRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function pickWeightedSymbol() {
  const totalWeight = SYMBOLS.reduce((sum, symbol) => sum + symbol.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const symbol of SYMBOLS) {
    roll -= symbol.weight;
    if (roll <= 0) return symbol;
  }

  return SYMBOLS[0];
}

function shuffleSymbols(list) {
  const shuffled = [...list];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildStaticTrack(centerSymbol) {
  return [pickRandomSymbol(), centerSymbol, pickRandomSymbol()];
}

function buildLoopTrack() {
  const cycle = shuffleSymbols(SYMBOLS);
  const track = [];

  for (let repeatIndex = 0; repeatIndex < LOOP_REPEAT_COUNT; repeatIndex += 1) {
    track.push(...cycle);
  }

  track.push(...cycle.slice(0, VISIBLE_ROWS));
  return track;
}

function buildStopTrack(finalSymbol) {
  const track = [];

  for (let step = 0; step < STOP_TRACK_RANDOM_STEPS; step += 1) {
    track.push(pickRandomSymbol());
  }

  track.push(pickRandomSymbol());
  track.push(finalSymbol);
  track.push(pickRandomSymbol());

  return track;
}

function evaluateSpin(finalReels) {
  const symbolsById = finalReels.reduce((map, symbol) => {
    map[symbol.id] = (map[symbol.id] ?? 0) + 1;
    return map;
  }, {});

  const [firstReel] = finalReels;
  const isTriple = finalReels.every((symbol) => symbol.id === firstReel.id);

  if (isTriple) {
    const multiplier = firstReel.tripleMultiplier;
    const jackpotText = firstReel.id === "seven" ? " JACKPOT !" : "";
    return {
      title: `Triple ${firstReel.label}${jackpotText}`,
      message: `Tu alignes 3 ${firstReel.label.toLowerCase()}s : gain x${multiplier}.`,
      winAmount: slotSpinCost * multiplier,
    };
  }

  if ((symbolsById.cherry ?? 0) === 2) {
    return {
      title: "Deux cerises",
      message: "Tu récupères un petit bonus grâce aux 2 cerises.",
      winAmount: slotSpinCost * 1.5,
    };
  }

  if ((symbolsById.cherry ?? 0) === 1) {
    return {
      title: "Une cerise",
      message: "La cerise te rend une partie de la mise.",
      winAmount: slotSpinCost * 0.5,
    };
  }

  return {
    title: "Perdu",
    message: "Aucune combinaison gagnante cette fois.",
    winAmount: 0,
  };
}

function clearSpinTimers() {
  while (stoppingTimeouts.length > 0) {
    window.clearTimeout(stoppingTimeouts.pop());
  }
}

async function stopReel(reelIndex, finalSymbol) {
  reelLooping.value[reelIndex] = false;
  reelTracks.value[reelIndex] = buildStopTrack(finalSymbol);
  reelOffsets.value[reelIndex] = 0;
  reelTransitions.value[reelIndex] = "none";

  await nextTick();

  reelTransitions.value[reelIndex] = `transform ${REEL_STOP_DURATIONS_MS[reelIndex]}ms cubic-bezier(.12,.78,.18,1)`;
  reelOffsets.value[reelIndex] = -REEL_CELL_HEIGHT * (reelTracks.value[reelIndex].length - VISIBLE_ROWS);

  const timeoutId = window.setTimeout(() => {
    spinningBlur.value[reelIndex] = false;
    reelGlow.value[reelIndex] = true;
  }, REEL_STOP_DURATIONS_MS[reelIndex] - 80);
  stoppingTimeouts.push(timeoutId);

  await sleep(REEL_STOP_DURATIONS_MS[reelIndex] + 40);
}

async function animateSpin(finalReels) {
  clearSpinTimers();
  reelGlow.value = [false, false, false];
  spinningBlur.value = [true, true, true];
  reelTransitions.value = ["none", "none", "none"];
  reelOffsets.value = [0, 0, 0];
  reelLooping.value = [false, false, false];

  reelTracks.value = finalReels.map(() => buildLoopTrack());

  await nextTick();

  reelLooping.value = [true, true, true];

  const stopPromises = finalReels.map(async (finalSymbol, reelIndex) => {
    await sleep(REEL_STOP_DELAYS_MS[reelIndex]);
    await stopReel(reelIndex, finalSymbol);
  });

  await Promise.all(stopPromises);

  reels.value = [...finalReels];
  reelTracks.value = finalReels.map((symbol) => buildStaticTrack(symbol));
  reelOffsets.value = [0, 0, 0];
  reelTransitions.value = ["none", "none", "none"];
  reelLooping.value = [false, false, false];
  reelGlow.value = [true, true, true];
  spinningBlur.value = [false, false, false];
}

async function pullLever() {
  if (isDisabled.value) {
    if (playerMoney.value < slotSpinCost) {
      resultTitle.value = "Solde insuffisant";
      resultMessage.value = "Tu n'as pas assez d'argent pour relancer la machine.";
    }
    return;
  }

  const started = startSlotGame();
  if (!started) return;

  pulling.value = true;
  cooldown.value = true;
  lastDeductedAmount.value = slotSpinCost;
  lastWinAmount.value = 0;
  resultTitle.value = "Lancement...";
  resultMessage.value = `-${formatMoney(slotSpinCost)} déduits. Les rouleaux tournent.`;

  const finalReels = [pickWeightedSymbol(), pickWeightedSymbol(), pickWeightedSymbol()];

  try {
    const leverReleaseTimeout = window.setTimeout(() => {
      pulling.value = false;
    }, 420);
    stoppingTimeouts.push(leverReleaseTimeout);

    await animateSpin(finalReels);

    const result = evaluateSpin(finalReels);
    if (result.winAmount > 0) {
      addMoney(result.winAmount);
    }

    lastWinAmount.value = result.winAmount;
    resultTitle.value = result.title;
    resultMessage.value = result.winAmount > 0
        ? `${result.message} Tu gagnes ${formatMoney(result.winAmount)}.`
        : result.message;
  } finally {
    clearSpinTimers();
    pulling.value = false;
    cooldown.value = false;
    setGameState("idle");
  }
}

onBeforeUnmount(() => {
  clearSpinTimers();
});
</script>

<template>
  <div
      class="relative grid overflow-hidden
           w-[min(980px,96vw)]
           border-[8px] border-[#0b0b0b] rounded-[10px]
           bg-[linear-gradient(180deg,_#c10f0f,_#a30b0b)]
           shadow-[0_10px_22px_rgba(0,0,0,.25)]"
      role="application"
      aria-label="Bandit manchot"
  >
    <main class="grid [place-items:stretch] p-[18px]">
      <div
          class="h-full p-[18px] grid gap-[18px]
               rounded-[10px]
               bg-[linear-gradient(180deg,_#b80e0e,_#8f0a0a)]
               shadow-[inset_0_0_0_10px_rgba(0,0,0,.10)]
               grid-cols-[170px_1fr_160px]
               max-[920px]:grid-cols-1"
      >
        <div
            class="flex flex-col gap-[24px] pt-[100px] items-start
                 max-[920px]:flex-row max-[920px]:gap-4 max-[920px]:justify-center max-[920px]:pt-0"
        >
          <button
              type="button"
              class="rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg transition-transform duration-150 select-none active:scale-95 hover:scale-105"
              aria-label="Retour"
              @click="goHome"
          >
            <div class="bg-gradient-to-b from-green-400 to-green-600 rounded-full px-8 py-2 shadow-inner transition-transform duration-150 hover:from-green-600 hover:to-green-800">
              <span class="text-white font-semibold text-lg tracking-wide drop-shadow">Retour</span>
            </div>
          </button>

          <button
              type="button"
              class="rounded-full p-1.5 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg transition-transform duration-150 select-none active:scale-95 hover:scale-105"
              aria-label="Infos"
              @click="showInfos = !showInfos"
          >
            <div class="bg-gradient-to-b from-green-400 to-green-600 rounded-full px-8 py-2 shadow-inner transition-transform duration-150 hover:from-green-600 hover:to-green-800">
              <span class="text-white font-semibold text-lg tracking-wide drop-shadow">Infos</span>
            </div>
          </button>
        </div>

        <section class="flex flex-col items-center gap-[18px] pt-[10px]" aria-label="Zone de jeu">
          <div
              class="w-[min(520px,100%)] py-[14px] px-[22px] text-center
                   text-[42px] font-black
                   rounded-[16px]
                   border-[6px] border-[#d6b82a]
                   bg-[linear-gradient(180deg,_#3bdc48,_#1b8d24)]
                   [text-shadow:0_2px_0_rgba(0,0,0,.25)]
                   shadow-[inset_0_2px_0_rgba(255,255,255,.35),_0_10px_0_rgba(0,0,0,.15)]"
          >
            Jackpot
          </div>

          <div
              class="relative w-[min(650px,100%)] px-[18px] py-[18px]
                   rounded-[26px]
                   bg-[rgba(0,0,0,.10)] shadow-[inset_0_0_0_2px_rgba(255,255,255,.08)]"
              aria-label="Rouleaux"
          >
            <div class="relative z-10 grid grid-cols-3 gap-[14px] items-center">
              <template v-for="(reel, reelIndex) in reels" :key="`${reelIndex}-${statusLabel}`">
                <div
                    class="relative overflow-hidden rounded-[26px]
                         border-[6px] border-[#d6b82a]
                         bg-[linear-gradient(180deg,_rgba(255,255,255,.90),_rgba(246,246,246,.88))]
                         shadow-[inset_0_0_0_2px_rgba(0,0,0,.10),_0_10px_16px_rgba(0,0,0,.12)]"
                    :class="reelGlow[reelIndex] ? 'scale-[1.015] shadow-[0_0_24px_rgba(255,230,120,.75),_inset_0_0_0_2px_rgba(0,0,0,.10)]' : ''"
                >
                  <div class="reel-window">
                    <div
                        class="reel-track"
                        :class="[spinningBlur[reelIndex] ? 'reel-track--spinning' : '', reelLooping[reelIndex] ? 'reel-track--looping' : '']"
                        :style="{
                        transform: `translateY(${reelOffsets[reelIndex]}px)`,
                        transition: reelTransitions[reelIndex],
                        animationDuration: `${REEL_LOOP_DURATIONS_MS[reelIndex]}ms`,
                        '--loop-distance': `-${LOOP_CYCLE_DISTANCE}px`,
                      }"
                    >
                      <div
                          v-for="(symbol, symbolIndex) in reelTracks[reelIndex]"
                          :key="`${reelIndex}-${symbol.id}-${symbolIndex}`"
                          class="reel-symbol"
                      >
                        <div class="reel-symbol-card">
                          <span class="text-[58px] leading-none drop-shadow-[0_3px_2px_rgba(0,0,0,.18)]">{{ symbol.emoji }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </div>

          <div class="w-[min(620px,100%)] rounded-[18px] border-[5px] border-[#d6b82a] bg-black/20 px-5 py-4 text-center shadow-[0_8px_0_rgba(0,0,0,.15)]">
            <p class="text-2xl font-black text-[#ffe791]">{{ resultTitle }}</p>
            <p class="mt-2 min-h-[24px] text-sm text-white/95">{{ resultMessage }}</p>
          </div>

          <transition name="fade">
            <div
                v-if="showInfos"
                class="w-[min(620px,100%)] rounded-[18px] border-[5px] border-[#d6b82a] bg-[#5f0000]/90 px-5 py-4 text-white shadow-[0_8px_0_rgba(0,0,0,.18)]"
            >
              <h3 class="text-xl font-black text-[#ffe791]">Table des gains</h3>
              <div class="mt-3 grid gap-2 text-sm">
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>7️⃣ 7️⃣ 7️⃣</span><span>x30 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>💎 💎 💎</span><span>x15 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>🔔 🔔 🔔</span><span>x8 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>🍀 🍀 🍀</span><span>x5 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>🍋 🍋 🍋</span><span>x3 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>🍒 🍒 🍒</span><span>x2 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>2 cerises</span><span>x1.5 la mise</span></div>
                <div class="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2"><span>1 cerise</span><span>x0.5 la mise</span></div>
              </div>
            </div>
          </transition>
        </section>

        <aside class="relative flex flex-col items-center justify-end pb-4 max-[920px]:order-3" aria-label="Zone levier">
          <button
              type="button"
              @click="pullLever"
              :disabled="isDisabled"
              :aria-disabled="isDisabled"
              :aria-busy="pulling"
              class="relative w-full min-h-[390px] rounded-[10px]
                   transition-transform duration-150
                   focus-visible:ring-4 focus-visible:ring-[#f5e27a]/60
                   bg-black/0"
              :class="isDisabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.99]'"
              aria-label="Tirer le levier"
          >
            <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                  class="absolute right-[-20px] top-[240px] w-[60px] h-[150px]
                       rounded-[14px] border-[5px] border-[#0b0b0b]
                       bg-[linear-gradient(180deg,_#f5e27a,_#d6b82a)]
                       shadow-[inset_0_2px_0_rgba(255,255,255,.45),_0_8px_0_rgba(0,0,0,.18)]"
              >
                <div class="absolute left-[10px] top-[14px] w-[10px] h-[10px] rounded-full bg-[#0b0b0b]/70" />
                <div class="absolute right-[10px] top-[14px] w-[10px] h-[10px] rounded-full bg-[#0b0b0b]/70" />
                <div class="absolute left-[10px] bottom-[14px] w-[10px] h-[10px] rounded-full bg-[#0b0b0b]/70" />
                <div class="absolute right-[10px] bottom-[14px] w-[10px] h-[10px] rounded-full bg-[#0b0b0b]/70" />

                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[22px] h-[45px] rounded-full border-[4px] border-[#0b0b0b]
                         bg-[linear-gradient(180deg,_#696969,_#d9d9d9)]
                         shadow-[inset_0_2px_0_rgba(255,255,255,.6),_0_3px_0_rgba(0,0,0,.18)]"
                />
              </div>

              <div
                  class="absolute right-[-3px] top-[45px]
                       h-[270px] w-[24px]
                       origin-bottom
                       transition-transform duration-200 ease-out"
                  :class="pulling
                  ? 'rotate-[-35deg] translate-x-[5.5px] translate-y-[20px]'
                  : 'rotate-[-5deg] translate-y-0'"
              >
                <div
                    class="absolute bottom-[10px] left-1/2 -translate-x-1/2
                         w-[16px] h-[210px] rounded-full
                         border-[5px] border-[#0b0b0b]
                         bg-[linear-gradient(180deg,_#f7f7f7,_#bdbdbd)]
                         shadow-[inset_0_2px_0_rgba(255,255,255,.55),_0_8px_0_rgba(0,0,0,.16)]"
                />
                <div
                    class="absolute bottom-[0px] left-1/2 -translate-x-1/2
                         w-[22px] h-[22px] rounded-full
                         border-[4px] border-[#0b0b0b]
                         bg-[linear-gradient(180deg,_#ffffff,_#d9d9d9)]
                         shadow-[inset_0_2px_0_rgba(255,255,255,.6),_0_3px_0_rgba(0,0,0,.18)]"
                />
                <div
                    class="absolute top-[10px] left-1/2 -translate-x-1/2
                         w-[56px] h-[56px] rounded-full
                         border-[6px] border-[#0b0b0b]
                         bg-[radial-gradient(circle_at_30%_25%,_#ffbebe_0_16%,_#ff4b4b_35%,_#b80000_78%)]
                         shadow-[inset_0_3px_0_rgba(255,255,255,.55),_0_10px_0_rgba(0,0,0,.20)]"
                />
              </div>
            </div>
          </button>

          <div class="mt-3 w-full rounded-[14px] border-[4px] border-[#d6b82a] bg-black/20 p-3 text-center shadow-[0_6px_0_rgba(0,0,0,.15)]">
            <p class="text-sm font-semibold tracking-wide text-[#ffe791]">Prix du lancement : {{ formattedSpinCost }}</p>
            <p class="mt-1 text-sm font-semibold">Somme déduite : <span class="text-[#ffd0d0]">{{ formattedLastDeduction }}</span></p>
            <p class="mt-1 text-sm font-semibold">Dernier gain : <span class="text-[#c6ffb9]">{{ formattedLastWin }}</span></p>
            <p class="mt-1 text-sm font-semibold">Solde actuel : <span class="text-white">{{ formattedBalance }}</span></p>
            <p class="mt-1 text-sm font-semibold">Game state : <span class="uppercase text-[#9cff9c]">{{ statusLabel }}</span></p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.reel-window {
  position: relative;
  height: 258px;
  overflow: hidden;
}

.reel-window::before,
.reel-window::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 34px;
  z-index: 20;
  pointer-events: none;
}

.reel-window::before {
  top: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0));
}

.reel-window::after {
  bottom: 0;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0));
}

.reel-track {
  will-change: transform, filter;
}

.reel-track--looping {
  animation-name: reelSpinLoop;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.reel-track--spinning {
  filter: blur(1.9px);
}

.reel-symbol {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  user-select: none;
}

.reel-symbol-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(244, 244, 244, 0.72));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 1px 0 rgba(0, 0, 0, 0.06);
}

@keyframes reelSpinLoop {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(var(--loop-distance, -516px));
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
