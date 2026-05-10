import type { PoolConfig } from "./types.js";

// ─── Formatting ──────────────────────────────────────────────────

const USD_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export function formatUsd(n: number): string {
  return USD_FORMAT.format(n);
}

export function formatAmount(raw: bigint, decimals: number): string {
  const str = raw.toString();
  if (decimals === 0) return str;
  if (str.length <= decimals) {
    const pad = "0".repeat(decimals - str.length + 1);
    return `0.${pad}${str}`.replace(/0+$/, "").replace(/\.$/, "");
  }
  const intPart = str.slice(0, str.length - decimals);
  const fracPart = str.slice(str.length - decimals);
  return `${intPart}.${fracPart}`.replace(/0+$/, "").replace(/\.$/, "");
}

export function estimateUsdValue(
  amount0: bigint,
  amount1: bigint,
  pool: PoolConfig,
): number {
  const a0 =
    Number(amount0) / 10 ** pool.decimals0 * pool.token0PriceUsd;
  const a1 =
    Number(amount1) / 10 ** pool.decimals1 * pool.token1PriceUsd;
  return Math.abs(a0) + Math.abs(a1);
}

// ─── Time ────────────────────────────────────────────────────────

export function tsNow(): number {
  return Math.floor(Date.now() / 1000);
}

export function isoNow(): string {
  return new Date().toISOString();
}

// ─── ID Generation ───────────────────────────────────────────────

let idCounter = 0;
export function nextId(prefix: string): string {
  return `${prefix}-${Date.now()}-${++idCounter}`;
}

// ─── Console Colors ──────────────────────────────────────────────

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const MAGENTA = "\x1b[35m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

export function red(s: string): string {
  return RED + s + RESET;
}
export function yellow(s: string): string {
  return YELLOW + s + RESET;
}
export function cyan(s: string): string {
  return CYAN + s + RESET;
}
export function magenta(s: string): string {
  return MAGENTA + s + RESET;
}
export function bold(s: string): string {
  return BOLD + s + RESET;
}
export function dim(s: string): string {
  return DIM + s + RESET;
}
