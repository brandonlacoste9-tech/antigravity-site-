// ─── Uniswap V3 Core Types ───────────────────────────────────────

/** A single liquidity event emitted by a Uniswap V3 pool */
export interface LiquidityEvent {
  /** Event type discriminator */
  type: "Mint" | "Burn";
  /** Block number */
  blockNumber: bigint;
  /** Transaction hash */
  txHash: `0x${string}`;
  /** Log index within the transaction */
  logIndex: number;
  /** Pool address */
  pool: `0x${string}`;
  /** Owner of the position (LP address) */
  owner: `0x${string}`;
  /** Lower tick boundary */
  tickLower: number;
  /** Upper tick boundary */
  tickUpper: number;
  /** Amount of token0 added/removed (raw, no decimals) */
  amount0: bigint;
  /** Amount of token1 added/removed (raw, no decimals) */
  amount1: bigint;
  /** Liquidity delta (Q64.96 fixed-point) */
  liquidity: bigint;
  /** Unix timestamp from the block */
  timestamp: number;
}

/** A single Swap event from a Uniswap V3 pool */
export interface SwapEvent {
  type: "Swap";
  blockNumber: bigint;
  txHash: `0x${string}`;
  logIndex: number;
  pool: `0x${string}`;
  sender: `0x${string}`;
  recipient: `0x${string}`;
  amount0: bigint;
  amount1: bigint;
  sqrtPriceX96: bigint;
  liquidity: bigint;
  tick: number;
  timestamp: number;
}

/** Union of all monitored Uniswap V3 events */
export type PoolEvent = LiquidityEvent | SwapEvent;

// ─── Pool Metadata ───────────────────────────────────────────────

export interface PoolConfig {
  /** Uniswap V3 pool address */
  address: `0x${string}`;
  /** Human-readable label */
  name: string;
  /** Token0 symbol */
  token0: string;
  /** Token1 symbol */
  token1: string;
  /** Token0 decimals */
  decimals0: number;
  /** Token1 decimals */
  decimals1: number;
  /** Approximate USD price of token0 (for anomaly severity calc) */
  token0PriceUsd: number;
  /** Approximate USD price of token1 */
  token1PriceUsd: number;
}

// ─── Anomaly Detection ───────────────────────────────────────────

export type AnomalyKind =
  | "large_mint"
  | "large_burn"
  | "liquidity_imbalance"
  | "flash_loan_pattern"
  | "rapid_succession"
  | "price_impact_spike";

export interface AnomalySignal {
  /** Unique signal ID */
  id: string;
  /** Classification */
  kind: AnomalyKind;
  /** Severity score 0–1 (higher = more anomalous) */
  severity: number;
  /** The triggering event(s) */
  events: PoolEvent[];
  /** Pool metadata */
  pool: PoolConfig;
  /** Human-readable description */
  description: string;
  /** Estimated USD value involved */
  estimatedValueUsd: number;
  /** When the signal was generated (epoch ms) */
  detectedAt: number;
}

// ─── Rolling Stats ───────────────────────────────────────────────

export interface RollingStats {
  count: number;
  mean: number;
  m2: number; // Welford's running variance accumulator
  min: number;
  max: number;
}

// ─── Configuration ───────────────────────────────────────────────

export interface MonitorConfig {
  rpcUrl: string;
  rpcWsUrl?: string;
  pools: PoolConfig[];
  /** Minimum absolute USD liquidity change to even consider anomalous */
  minLiquidityUsd: number;
  /** Z-score threshold for statistical anomaly flagging */
  zscoreThreshold: number;
  /** Time window (seconds) for flash-loan pattern detection */
  flashLoanWindowSec: number;
  /** Minimum number of txs in flash-loan window to trigger */
  flashLoanMinTxCount: number;
  /** Max events kept in rolling window per pool */
  rollingWindowSize: number;
  /** Polling interval in ms (only used if WebSocket unavailable) */
  pollIntervalMs: number;
}
