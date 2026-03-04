<script setup lang="ts">
import { computed, ref } from "vue";

const pulling = ref(false);
const cooldown = ref(false);

const isDisabled = computed(() => pulling.value || cooldown.value);

function pullLever() {
  if (isDisabled.value) return;

  pulling.value = true;
  cooldown.value = true;

  window.setTimeout(() => {
    pulling.value = false;
  }, 420);

  window.setTimeout(() => {
    cooldown.value = false;
  }, 2000);
}
</script>

<template>
  <div class="m-0 min-h-screen grid place-items-center bg-[#7D0000] font-sans text-white">
    <div
        class="relative grid overflow-hidden
             w-[min(900px,96vw)] aspect-[3/2]
             border-[8px] border-[#0b0b0b] rounded-[10px]
             bg-[linear-gradient(180deg,_#c10f0f,_#a30b0b)]
             shadow-[0_10px_22px_rgba(0,0,0,.25)]"
        role="application"
        aria-label="Bandit manchot (maquette)"
    >
      <main class="grid [place-items:stretch] p-[18px]">
        <div
            class="h-full p-[18px] grid gap-[18px]
                 rounded-[10px]
                 bg-[linear-gradient(180deg,_#b80e0e,_#8f0a0a)]
                 shadow-[inset_0_0_0_10px_rgba(0,0,0,.10)]
                 grid-cols-[170px_1fr_140px]
                 max-[860px]:grid-cols-1"
        >
          <!-- Colonne boutons de gauche -->
          <div
              class="flex flex-col gap-[34px] pt-[120px] items-start
                   max-[860px]:flex-row max-[860px]:gap-4 max-[860px]:justify-center max-[860px]:pt-0"
          >
            <!-- Style Button -->
            <button
                type="button"
                class="
                rounded-full p-1.5
                bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700
                shadow-lg transition-transform duration-150 select-none
                active:scale-95 hover:scale-105
              "
                aria-label="Retour"
            >
              <div
                  class="
                  bg-gradient-to-b from-green-400 to-green-600
                  rounded-full px-8 py-2
                  shadow-inner transition-transform duration-150
                  hover:from-green-600 hover:to-green-800
                "
              >
                <span class="text-white font-semibold text-lg tracking-wide drop-shadow">
                  Retour
                </span>
              </div>
            </button>

            <button
                type="button"
                class="
                rounded-full p-1.5
                bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700
                shadow-lg transition-transform duration-150 select-none
                active:scale-95 hover:scale-105
              "
                aria-label="Infos"
            >
              <div
                  class="
                  bg-gradient-to-b from-green-400 to-green-600
                  rounded-full px-8 py-2
                  shadow-inner transition-transform duration-150
                  hover:from-green-600 hover:to-green-800
                "
              >
                <span class="text-white font-semibold text-lg tracking-wide drop-shadow">
                  Infos
                </span>
              </div>
            </button>
          </div>

          <!-- Centre -->
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
                class="relative w-[min(620px,100%)] h-[300px]
                     grid grid-cols-3 gap-[14px] p-[10px]
                     rounded-[26px]
                     bg-[rgba(0,0,0,.08)]"
                aria-label="Fenêtres (sans symboles)"
            >
              <div
                  class="relative overflow-hidden rounded-[26px]
                       border-[6px] border-[#d6b82a]
                       bg-[linear-gradient(180deg,_#ffffff,_#fbfbfb)]
                       shadow-[inset_0_0_0_2px_rgba(0,0,0,.10)]
                       before:content-[''] before:absolute before:inset-[-30%_-40%]
                       before:bg-[linear-gradient(90deg,_rgba(255,255,255,0)_0_35%,_rgba(255,255,255,.35)_45%,_rgba(255,255,255,0)_60%)]
                       before:rotate-[18deg] before:opacity-[.55]"
                  aria-hidden="true"
              />
              <div
                  class="relative overflow-hidden rounded-[26px]
                       border-[6px] border-[#d6b82a]
                       bg-[linear-gradient(180deg,_#ffffff,_#fbfbfb)]
                       shadow-[inset_0_0_0_2px_rgba(0,0,0,.10)]
                       before:content-[''] before:absolute before:inset-[-30%_-40%]
                       before:bg-[linear-gradient(90deg,_rgba(255,255,255,0)_0_35%,_rgba(255,255,255,.35)_45%,_rgba(255,255,255,0)_60%)]
                       before:rotate-[18deg] before:opacity-[.55]"
                  aria-hidden="true"
              />
              <div
                  class="relative overflow-hidden rounded-[26px]
                       border-[6px] border-[#d6b82a]
                       bg-[linear-gradient(180deg,_#ffffff,_#fbfbfb)]
                       shadow-[inset_0_0_0_2px_rgba(0,0,0,.10)]
                       before:content-[''] before:absolute before:inset-[-30%_-40%]
                       before:bg-[linear-gradient(90deg,_rgba(255,255,255,0)_0_35%,_rgba(255,255,255,.35)_45%,_rgba(255,255,255,0)_60%)]
                       before:rotate-[18deg] before:opacity-[.55]"
                  aria-hidden="true"
              />

              <div
                  class="pointer-events-none absolute left-[18px] right-[18px] top-1/2 -translate-y-1/2
                       h-[14px] rounded-full
                       bg-[linear-gradient(180deg,_#f5e27a,_#d6b82a)]
                       shadow-[0_3px_0_rgba(0,0,0,.18),_inset_0_1px_0_rgba(255,255,255,.45)]"
                  aria-hidden="true"
              />
            </div>
          </section>

          <!-- Droite : levier cliquable -->
          <aside class="relative max-[860px]:order-3" aria-label="Zone levier">
            <!-- zone cliquable -->
            <button
                type="button"
                @click="pullLever"
                :disabled="isDisabled"
                :aria-disabled="isDisabled"
                :aria-busy="pulling"
                class="absolute inset-0 w-full h-full rounded-[10px]
                     transition-transform duration-150
                     focus-visible:ring-4 focus-visible:ring-[#f5e27a]/60
                     bg-black/0"
                :class="isDisabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.99]'"
                aria-label="Tirer le levier"
            >
              <!-- Décor levier -->
              <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
                <!-- Plaque de support -->
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

                <!-- Levier animé -->
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
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>