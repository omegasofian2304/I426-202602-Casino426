import { ref } from "vue";
import balanceData from "@/data/balance.json";

const STORAGE_KEY = "casino426-player-money";
const DEFAULT_BALANCE = Number(balanceData?.users?.[0]?.solde ?? 0);

function roundCurrency(value) {
  return Math.round(Number(value) * 100) / 100;
}

function readStoredBalance() {
  if (typeof window === "undefined") return DEFAULT_BALANCE;

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (rawValue === null) return DEFAULT_BALANCE;

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : DEFAULT_BALANCE;
}

function persistBalance() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(playerMoney.value));
}

export const playerMoney = ref(roundCurrency(readStoredBalance()));
export const gameState = ref("idle");
export const slotSpinCost = 10;

export function formatMoney(value) {
  return `${roundCurrency(value).toFixed(2)}$`;
}

export function canAfford(amount) {
  return playerMoney.value >= amount;
}

export function setGameState(nextState) {
  gameState.value = nextState;
}

export function spendMoney(amount) {
  const safeAmount = roundCurrency(amount);

  if (safeAmount <= 0) return false;
  if (!canAfford(safeAmount)) return false;

  playerMoney.value = roundCurrency(playerMoney.value - safeAmount);
  persistBalance();
  return true;
}

export function addMoney(amount) {
  const safeAmount = roundCurrency(amount);

  if (safeAmount <= 0) return;

  playerMoney.value = roundCurrency(playerMoney.value + safeAmount);
  persistBalance();
}

export function resetMoney() {
  playerMoney.value = roundCurrency(DEFAULT_BALANCE);
  persistBalance();
}

export function startSlotGame() {
  if (gameState.value === "playing") return false;
  if (!spendMoney(slotSpinCost)) return false;

  gameState.value = "playing";
  return true;
}
