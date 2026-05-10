import type { MonitorConfig, PoolConfig } from "./types.js";

// ─── Default Pools (high-liquidity Uniswap V3 pairs) ────────────

const DEFAULT_POOLS: PoolConfig[] = [
  {
    address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
    name: "USDC/ETH (0.05%)",
    token0: "USDC",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
    token0PriceUsd: 1.0,
    token1PriceUsd: 3000,
  },
  {
    address: "0xCBCdF9626bC03E24f779434178A73a0B4bad62eD",
    name: "WBTC/ETH (0.3%)",
    token0: "WBTC",
    token1: "WETH",
    decimals0: 8,
    decimals1: 18,
    token0PriceUsd: 65000,
    token1PriceUsd: 3000,
  },
  {
    address: "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36",
    name: "ETH/USDT (0.05%)",
    token0: "WETH",
    token1: "USDT",
    decimals0: 18,
    decimals1: 6,
    token0PriceUsd: 3000,
    token1PriceUsd: 1.0,
  },
  {
    address: "0x4585FE77225b41b697C938B018E2Ac67Ac5a20c0",
    name: "WBTC/USDC (0.3%)",
    token0: "WBTC",
    token1: "USDC",
    decimals0: 8,
    decimals1: 6,
    token0PriceUsd: 65000,
    token1PriceUsd: 1.0,
  },
];

// ─── Config Builder ──────────────────────────────────────────────

function envStr(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

function envNum(key: string, fallback: number): number {
  const v = process.env[key];
  return v ? Number(v) : fallback;
}

function envPoolAddresses(): `0x${string}`[] | null {
  const raw = process.env.POOL_ADDRESSES;
  if (!raw) return null;
  return raw.split(",").map((a) => a.trim() as `0x${string}`);
}

export function buildConfig(overrides?: Partial<MonitorConfig>): MonitorConfig {
  const customPools = envPoolAddresses();

  let pools: PoolConfig[];
  if (customPools && customPools.length > 0) {
    pools = customPools.map((addr) => ({
      address: addr,
      name: `Pool ${addr.slice(0, 10)}...`,
      token0: "TK0",
      token1: "TK1",
      decimals0: 18,
      decimals1: 18,
      token0PriceUsd: 1,
      token1PriceUsd: 1,
    }));
  } else {
    pools = DEFAULT_POOLS;
  }

  return {
    rpcUrl: envStr("RPC_URL", "https://eth-mainnet.g.alchemy.com/v2/demo"),
    rpcWsUrl: process.env.RPC_WS_URL || undefined,
    pools,
    minLiquidityUsd: envNum("MIN_LIQUIDITY_USD", 500_000),
    zscoreThreshold: envNum("ZSCORE_THRESHOLD", 2.5),
    flashLoanWindowSec: envNum("FLASH_LOAN_WINDOW_SECONDS", 30),
    flashLoanMinTxCount: envNum("FLASH_LOAN_MIN_TX_COUNT", 3),
    rollingWindowSize: 200,
    pollIntervalMs: 2000,
    ...overrides,
  };
}
