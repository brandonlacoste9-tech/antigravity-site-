# Shadow Node — Technical Specification v0.1

**Component:** Decentralized Financial Intelligence Execution Node
**Status:** Draft · **Classification:** Internal
**Target Throughput:** 10⁴ on-chain events/second per shard

---

## 1. Abstract

The Shadow Node is a stateless, cryptographically-verifiable execution unit within a peer-to-peer intelligence fabric. Each node ingests raw on-chain event streams (transfers, swaps, liquidations, governance signals), executes a privacy-preserving inference pipeline, and gossips **zero-knowledge attestations** of anomalous patterns to the mesh — without exposing the underlying data or model weights. Nodes collectively form a self-organizing surveillance mesh for decentralized finance (DeFi) without a central oracle.

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      SHADOW NODE RUNTIME                     │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ Stream   │──│ Inference    │──│ Attestation           │  │
│  │ Ingest   │  │ Engine       │  │ Generator (ZKP)       │  │
│  │ (gRPC)   │  │ (ONNX/TFLite)│  │ (Groth16 / PLONK)     │  │
│  └──────────┘  └──────────────┘  └───────────────────────┘  │
│        │              │                     │                │
│        ▼              ▼                     ▼                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Epidemic Gossip Layer                    │    │
│  │         (libp2p + GossipSub 1.2 w/ IDONTWANT)        │    │
│  └──────────────────────────────────────────────────────┘    │
│        │                                                     │
│        ▼                                                     │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           Secure Enclave (TEE — SGX/TDX)             │    │
│  │   · Model weights sealed to MRENCLAVE                 │    │
│  │   · Attestation keys derived from CPU root of trust   │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Stream Ingest Layer

| Property              | Value                                   |
|-----------------------|-----------------------------------------|
| Transport             | gRPC bidirectional stream (HTTP/2)      |
| Serialization         | Protobuf v3 — `ChainEvent` schema       |
| Supported Sources     | EVM-compatible (websocket RPC), Solana (Geyser), Cosmos (Tendermint WS) |
| Backpressure          | Token-bucket per peer, 2× RTT window    |
| Replay Protection     | Event hash → 64-bit Bloom filter, 1‰ FPR, LRU eviction |

**ChainEvent message schema:**

```protobuf
message ChainEvent {
  bytes  event_hash    = 1;  // keccak256(tx_hash || log_index)
  uint64 block_number  = 2;
  uint64 timestamp     = 3;  // Unix millis
  string chain_id      = 4;  // CAIP-2
  oneof payload {
    TransferEvent  transfer  = 10;
    SwapEvent      swap      = 11;
    LiquidationEvent liquidation = 12;
    GovernanceEvent governance = 13;
  }
}
```

---

## 4. Inference Engine

Each node runs a **graph neural network (GNN)** over a local sliding-window transaction graph.

### 4.1 Model Architecture

- **Backbone:** Temporal Graph Attention Network (TGAT) with 4 layers, 128-dim hidden
- **Input features:** amount (log-normalized), token embedding (32-dim learned), address degree centrality, time-delta encoding (harmonic)
- **Output heads:**
  - `fraud_score` — scalar [0,1], sigmoid
  - `wash_trade_flag` — binary
  - `sandwich_prob` — scalar [0,1]
  - `anomaly_embedding` — 64-dim latent for clustering

### 4.2 Inference Pipeline

```
ChainEvent → Feature Extractor (Rust, <50 µs) → GNN Forward Pass (ONNX Runtime) → Score Vector
```

- Feature extractor: zero-allocation Rust via `evm-utils` crate
- GNN inference: ONNX Runtime with INT8 quantization
- Target latency: **<2 ms P99** per event on consumer GPU (RTX 3060 equivalent)
- Batch window: 256 events or 100 ms, whichever first

### 4.3 Privacy Guarantee

Full model weights and intermediate activations never leave the **TEE enclave**. Only the ZK attestation result is gossiped. Enclave remote attestation (DCAP) is refreshed every epoch boundary (64 blocks).

---

## 5. ZK Attestation Layer

Nodes reach consensus on *irregular activity* without revealing *which addresses triggered it*.

### 5.1 Circuit Design

**Groth16 circuit** (BN254 curve, ~2.3M constraints):

- **Public inputs:** `anomaly_score ∈ [0,1]` (quantized to 16-bit fixed-point), `block_range`, `chain_id`
- **Private witness:** address set, raw features, model inference trace
- **Statement proven:** ∃ inference run over events E in block_range B yielding score ≥ θ for some subset, where θ is the global alert threshold

### 5.2 Threshold & Aggregation

| Parameter          | Value        |
|--------------------|--------------|
| Alert threshold θ  | 0.87 (configurable per staking tier) |
| Proof size         | 256 bytes (compressed) |
| Proving time       | <3 seconds (GPU Groth16 prover) |
| Verification       | <10 ms per proof (constant) |

Nodes gossip proofs via GossipSub topic `shadow.attestation.v1`. Recipients verify the proof in constant time and update a local **heatmap** of alerting blocks/chains.

---

## 6. Epidemic Gossip & Mesh Topology

| Property              | Detail                                      |
|-----------------------|---------------------------------------------|
| Transport             | libp2p (QUIC + Noise XX handshake)          |
| Peer Discovery        | Kademlia DHT (bootstrap via DNS seeds)      |
| Message Routing       | GossipSub 1.2 with `IDONTWANT` for dedup    |
| Peer Scoring          | P₇ scoring: mesh delivery rate, proof validity ratio, uptime |
| Sybil Resistance      | Stake-weighted: 1 Shadow Node = minimum 32 SHADOW tokens bonded |

---

## 7. Staking & Incentives

| Action                          | Reward/Penalty                     |
|---------------------------------|------------------------------------|
| Submit valid ZK attestation     | +N SHADOW (inflation per epoch)   |
| First attester for a block      | 2× reward multiplier               |
| Invalid/expired proof           | Slash 4% bonded stake              |
| Liveness (miss >20% of epochs)  | Slash 0.5% bonded per missed epoch |
| False negative detection        | Community challenge → slashing DAO |

Reward pool: 2% annual inflation of SHADOW token supply, distributed pro-rata per epoch.

---

## 8. Boot Sequence

1. **Provisioning:** Operator downloads enclave-signed Docker image + MRENCLAVE measurement
2. **Attestation:** Remote attestation quote verified against on-chain registry (Ethereum L1)
3. **Key Derivation:** Enclave derives Ed25519 node key from CPU sealing key + chain nonce
4. **Model Download:** Encrypted model blob fetched from IPFS, decrypted inside enclave
5. **Sync:** Fast-sync event history via Merkle snapshots from 3 random peers
6. **Live:** Begin stream ingest, inference, and gossip loop

---

## 9. Deployment Footprint

| Resource     | Minimum        | Recommended     |
|-------------|----------------|-----------------|
| CPU         | 4 cores        | 8 cores (SGX/TDX capable) |
| RAM         | 8 GB           | 16 GB           |
| Storage     | 50 GB NVMe     | 200 GB NVMe     |
| Network     | 100 Mbps       | 1 Gbps          |
| GPU         | —              | CUDA 8 GB VRAM (for proving acceleration) |

---

## 10. Attack Surface & Mitigations

| Threat                          | Mitigation                                       |
|---------------------------------|--------------------------------------------------|
| Model extraction via side-channel | TEE constant-time inference, noise injection     |
| Sybil attestation spam          | Stake-weighted peer scoring + rate limiting       |
| Enclave rollback                | Monotonic epoch counter in sealed storage         |
| Eclipse attack                  | Random peer rotation per epoch, DNS seed diversity |
| Front-running attestations      | Commit-reveal scheme: hash(proof) → gossip proof  |

---

*End of specification draft. Next: reference implementation in Rust (`shadow-core` crate).*
