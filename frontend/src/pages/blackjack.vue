<script setup>
import { ref, computed } from 'vue'

// --- State ---
const state = ref(false) // false = menu/fin, true = en jeu

const balance = ref(1000)
const bjBetAmount = ref(100)
const bjCurrentBet = ref(0)
const bjDeck = ref([])
const bjPlayerHand = ref([])
const bjDealerHand = ref([])
const bjPlayerTurn = ref(true)
const bjDealerRevealed = ref(false)
const bjGameMessage = ref('')
const bjGameStarted = ref(false)
const bjGameEnded = ref(false)
const bjGamesPlayed = ref(0)
const bjWins = ref(0)
const bjLosses = ref(0)
const bjBlackjacks = ref(0)
const dealerFirst = ref(false) // "laisser le croupier joué en premier"

// --- Computed ---
const playerScore = computed(() => bjCalcScore(bjPlayerHand.value))
const dealerScore = computed(() => {
  if (!bjDealerRevealed.value && bjDealerHand.value.length > 1) {
    return bjCalcScore([bjDealerHand.value[1]])
  }
  return bjCalcScore(bjDealerHand.value)
})
const potentialGain = computed(() => bjCurrentBet.value * 2)

// --- Logic ---
function bjCreateDeck() {
  const s = ['♠', '♥', '♦', '♣']
  const v = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const d = s.flatMap(x => v.map(y => ({ suit: x, value: y })))
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]]
  }
  return d
}

function getCardSymbol(c) {
  return c ? c.value + c.suit : ''
}

function isRed(c) {
  return c && (c.suit === '♥' || c.suit === '♦')
}

function bjCalcScore(h) {
  if (!h || !h.length) return 0
  let s = 0, a = 0
  for (const c of h) {
    if (!c) continue
    if (['J', 'Q', 'K'].includes(c.value)) s += 10
    else if (c.value === 'A') { s += 11; a++ }
    else s += parseInt(c.value)
  }
  while (s > 21 && a > 0) { s -= 10; a-- }
  return s
}

function startBlackjack() {
  if (bjBetAmount.value > balance.value || bjBetAmount.value < 10) return
  bjCurrentBet.value = bjBetAmount.value
  balance.value -= bjCurrentBet.value
  bjDeck.value = bjCreateDeck()
  bjPlayerHand.value = [bjDeck.value.pop(), bjDeck.value.pop()]
  bjDealerHand.value = [bjDeck.value.pop(), bjDeck.value.pop()]
  bjPlayerTurn.value = true
  bjDealerRevealed.value = false
  bjGameMessage.value = ''
  bjGameStarted.value = true
  bjGameEnded.value = false
  bjGamesPlayed.value++
  state.value = true

  if (dealerFirst.value) {
    bjDealerRevealed.value = true
    while (bjCalcScore(bjDealerHand.value) < 17) bjDealerHand.value.push(bjDeck.value.pop())
  }

  if (playerScore.value === 21) {
    bjBlackjacks.value++
    bjWins.value++
    balance.value += bjCurrentBet.value * 2.5
    bjGameMessage.value = '🎉 BLACKJACK ! +' + (bjCurrentBet.value * 2.5) + '€'
    bjGameEnded.value = true
    bjDealerRevealed.value = true
  }
}

function bjHit() {
  bjPlayerHand.value.push(bjDeck.value.pop())
  if (playerScore.value > 21) {
    bjLosses.value++
    bjGameMessage.value = '💥 Perdu ! Dépassé 21'
    bjGameEnded.value = true
    bjDealerRevealed.value = true
  }
}

function bjStand() {
  bjPlayerTurn.value = false
  bjDealerRevealed.value = true
  while (bjCalcScore(bjDealerHand.value) < 17) bjDealerHand.value.push(bjDeck.value.pop())
  if (dealerScore.value > 21) {
    bjWins.value++
    balance.value += bjCurrentBet.value * 2
    bjGameMessage.value = '🎉 Gagné !'
  } else if (playerScore.value > dealerScore.value) {
    bjWins.value++
    balance.value += bjCurrentBet.value * 2
    bjGameMessage.value = '🎉 Gagné !'
  } else if (playerScore.value < dealerScore.value) {
    bjLosses.value++
    bjGameMessage.value = '💥 Perdu !'
  } else {
    balance.value += bjCurrentBet.value
    bjGameMessage.value = '🤝 Égalité !'
  }
  bjGameEnded.value = true
}

function bjDoubleDown() {
  if (balance.value < bjCurrentBet.value || bjPlayerHand.value.length !== 2) return
  balance.value -= bjCurrentBet.value
  bjCurrentBet.value *= 2
  bjPlayerHand.value.push(bjDeck.value.pop())
  if (playerScore.value > 21) {
    bjLosses.value++
    bjGameMessage.value = '💥 Perdu !'
    bjGameEnded.value = true
    bjDealerRevealed.value = true
  } else bjStand()
}

function resetBlackjack() {
  bjGameStarted.value = false
  bjGameEnded.value = false
  bjPlayerHand.value = []
  bjDealerHand.value = []
  bjCurrentBet.value = 0
  bjGameMessage.value = ''
  bjPlayerTurn.value = true
  bjDealerRevealed.value = false
  state.value = false
}
</script>

<template>
  <div class="w-full bg-[#7D0000] flex items-center justify-center p-6 py-10">

    <!-- ── MENU ── -->
    <Transition name="fade" mode="out-in">
      <div v-if="!state" key="menu" class="table-felt rounded-2xl p-10 w-full max-w-2xl shadow-[0_0_60px_#00000088] border-4 border-[#c8a84b]">
        <h1 class="text-center text-white text-3xl font-bold tracking-widest mb-10 uppercase">Blackjack</h1>

        <div class="flex flex-col gap-6">
          <!-- Mise -->
          <div class="flex items-center gap-4">
            <label class="text-white text-lg whitespace-nowrap w-36">Argent misé :</label>
            <input
                v-model.number="bjBetAmount"
                type="number" :min="10" :max="balance"
                class="bet-input flex-1"
            />
          </div>

          <!-- Gain potentiel -->
          <div class="flex items-center gap-4">
            <label class="text-white text-lg whitespace-nowrap w-36">Gain si partie gagnée :</label>
            <span class="text-white text-lg font-bold">{{ bjBetAmount * 2 }}€</span>
          </div>

          <!-- Dealer first -->
          <div class="flex items-center gap-6 mt-2">
            <label class="text-white text-lg">Laisser le croupier joué en premier :</label>
            <div class="flex gap-6">
              <label class="flex flex-col items-center gap-1 text-white text-sm cursor-pointer">
                Oui
                <input type="radio" :value="true" v-model="dealerFirst" class="casino-radio" />
              </label>
              <label class="flex flex-col items-center gap-1 text-white text-sm cursor-pointer">
                Non
                <input type="radio" :value="false" v-model="dealerFirst" class="casino-radio" />
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-10">
          <button @click="startBlackjack" :disabled="bjBetAmount > balance || bjBetAmount < 10" class="deal-btn">
            Lancer partie
          </button>
        </div>
      </div>

      <!-- ── GAME TABLE ── -->
      <div v-else key="game" class="table-felt rounded-2xl w-full max-w-4xl shadow-[0_0_60px_#00000088] border-4 border-[#c8a84b] relative overflow-hidden" style="min-height:520px;">

        <!-- Card slots background -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- dealer slots -->
          <div class="flex gap-4 absolute top-[60px] left-1/2 -translate-x-1/2">
            <div v-for="i in 5" :key="'ds'+i" class="card-slot"></div>
          </div>
          <!-- player slots -->
          <div class="flex gap-4 absolute bottom-[100px] left-1/2 -translate-x-1/2">
            <div v-for="i in 5" :key="'ps'+i" class="card-slot"></div>
          </div>
        </div>

        <!-- Deck pile -->
        <div class="absolute left-6 top-1/2 -translate-y-1/2">
          <div class="card-back w-[60px] h-[84px] rounded-lg shadow-lg"></div>
        </div>

        <!-- Dealer label -->
        <div class="absolute top-4 left-1/2 -translate-x-1/2 text-white text-base font-semibold tracking-widest">Croupier</div>

        <!-- Dealer cards -->
        <div class="absolute top-[60px] left-1/2 -translate-x-1/2 flex gap-3">
          <div
              v-for="(card, index) in bjDealerHand" :key="'d'+index"
              class="playing-card"
              :class="{ 'card-red': isRed(card) && (index !== 0 || bjDealerRevealed) }"
          >
            <template v-if="index === 0 && !bjDealerRevealed">
              <div class="card-back-inner"></div>
            </template>
            <template v-else>
              <span class="card-corner top-1 left-1.5">{{ card?.value }}</span>
              <span class="card-suit-center">{{ card?.suit }}</span>
              <span class="card-corner bottom-1 right-1.5 rotate-180">{{ card?.value }}</span>
            </template>
          </div>
        </div>

        <!-- Dealer score -->
        <div class="absolute right-6 top-[80px] text-white text-sm">
          score du<br>croupier : <span class="font-bold">{{ dealerScore }}</span>
        </div>

        <!-- Bet display -->
        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm">
          Argent misé : <span class="font-bold">{{ bjCurrentBet }}</span>
        </div>

        <!-- Game message -->
        <div v-if="bjGameMessage" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <div class="bg-black/70 text-white text-2xl font-bold px-8 py-4 rounded-xl border border-[#c8a84b]">
            {{ bjGameMessage }}
          </div>
        </div>

        <!-- Player label -->
        <div class="absolute bottom-[170px] left-1/2 -translate-x-1/2 text-white text-base font-semibold tracking-widest">Toi</div>

        <!-- Player cards -->
        <div class="absolute bottom-[90px] left-1/2 -translate-x-1/2 flex gap-3">
          <div
              v-for="(card, index) in bjPlayerHand" :key="'p'+index"
              class="playing-card"
              :class="{ 'card-red': isRed(card) }"
          >
            <span class="card-corner top-1 left-1.5">{{ card?.value }}</span>
            <span class="card-suit-center">{{ card?.suit }}</span>
            <span class="card-corner bottom-1 right-1.5 rotate-180">{{ card?.value }}</span>
          </div>
        </div>

        <!-- Player score -->
        <div class="absolute right-6 bottom-[110px] text-white text-sm">
          Votre score : <span class="font-bold">{{ playerScore }}</span>
        </div>

        <!-- Action buttons -->
        <div class="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
          <!-- In-game actions -->
          <template v-if="bjGameStarted && !bjGameEnded && bjPlayerTurn">
            <button @click="bjHit" class="action-btn btn-hit">Tirer une carte</button>
            <button @click="bjStand" class="action-btn btn-stay">Rester</button>
            <button @click="bjDoubleDown" :disabled="balance < bjCurrentBet || bjPlayerHand.length !== 2" class="action-btn btn-double disabled:opacity-40">Doubler</button>
          </template>

          <!-- End game -->
          <template v-if="bjGameEnded">
            <button @click="resetBlackjack" class="deal-btn">Nouvelle Partie</button>
          </template>
        </div>

      </div>
    </Transition>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap');

.w-full.bg-\[\#7D0000\] {
  min-height: calc(100vh - 120px); /* compense header + footer */
}

* { font-family: 'Lato', sans-serif; }

.table-felt {
  background: radial-gradient(ellipse at center, #1a6b3a 0%, #0f4a28 60%, #0a3a1e 100%);
  position: relative;
}

/* Card slot outlines */
.card-slot {
  width: 70px;
  height: 98px;
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 8px;
}

/* Playing card */
.playing-card {
  width: 70px;
  height: 98px;
  background: #fff;
  border-radius: 8px;
  position: relative;
  box-shadow: 2px 4px 12px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a2e;
  font-weight: 700;
  font-size: 1rem;
}
.playing-card.card-red { color: #c0392b; }

.card-corner {
  position: absolute;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
}
.top-1 { top: 4px; }
.bottom-1 { bottom: 4px; }
.left-1\.5 { left: 6px; }
.right-1\.5 { right: 6px; }
.rotate-180 { transform: rotate(180deg); }

.card-suit-center {
  font-size: 1.5rem;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}

/* Card back */
.card-back {
  background: linear-gradient(135deg, #2c3e7a, #1a237e);
  border: 3px solid #c8a84b;
  border-radius: 8px;
  position: relative;
}
.card-back::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(200,168,75,0.4);
  border-radius: 4px;
  background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255,255,255,0.04) 4px,
      rgba(255,255,255,0.04) 8px
  );
}
.card-back-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2c3e7a, #1a237e);
  border-radius: 6px;
}

/* Buttons */
.deal-btn {
  background: radial-gradient(ellipse, #cc2200, #8b0000);
  border: 3px solid #c8a84b;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.75rem 2.5rem;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: transform 0.1s, opacity 0.2s;
  letter-spacing: 0.03em;
}
.deal-btn:hover { opacity: 0.9; }
.deal-btn:active { transform: scale(0.97); }
.deal-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.action-btn {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.6rem 1.8rem;
  border-radius: 999px;
  cursor: pointer;
  border: 3px solid #c8a84b;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  transition: transform 0.1s;
  color: white;
}
.action-btn:active { transform: scale(0.96); }
.btn-hit { background: radial-gradient(ellipse, #cc2200, #8b0000); }
.btn-stay { background: radial-gradient(ellipse, #2255cc, #1a3a8b); }
.btn-double { background: radial-gradient(ellipse, #229944, #165c2c); }

/* Bet input */
.bet-input {
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  width: 140px;
  outline: none;
}

/* Radio */
.casino-radio {
  width: 28px;
  height: 28px;
  appearance: none;
  background: #d0ccc0;
  border: 2px solid #999;
  border-radius: 3px;
  cursor: pointer;
}
.casino-radio:checked {
  background: #aaa;
  border-color: #666;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.35s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>