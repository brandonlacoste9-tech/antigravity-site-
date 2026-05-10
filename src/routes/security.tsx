import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Eye, Terminal, Key } from "lucide-react";

export const Route = createFileRoute("/security")({
  component: Security,
});

function Security() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 lg:py-40">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-green-400/10 flex items-center justify-center border border-green-400/30">
            <Shield className="h-7 w-7 text-green-400" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-green-400">
            Sovereign Defense
          </div>
        </div>
        <h1 className="font-serif text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl text-green-400">
          NEURAL <br />
          <span className="text-white">FORTRESS</span>
        </h1>
      </div>

      <div className="grid gap-1 lg:grid-cols-2">
        <div className="group border border-white/5 bg-white/[0.02] p-12 lg:p-20 transition-all hover:bg-white/[0.05]">
          <Key className="h-12 w-12 mb-10 text-green-400" />
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Sovereign Encryption</h2>
          <p className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
            The Antigravity protocol utilizes a proprietary <strong>Post-Quantum Neural Key (PQNK)</strong> 
            architecture. Every data packet is wrapped in a self-destructing encryption layer that 
            requires a multi-node consensus to decrypt.
          </p>
        </div>

        <div className="group border border-white/5 bg-white/[0.02] p-12 lg:p-20 transition-all hover:bg-white/[0.05]">
          <Terminal className="h-12 w-12 mb-10 text-green-400" />
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Zero-Drift Logic</h2>
          <p className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
            To prevent AI hallucination and malicious drift, our <strong>Cognitive Guardian</strong> monitors 
            all reasoning paths. If a logic branch deviates from the prime directive by more than 
            0.001%, the neural node is immediately quarantined.
          </p>
        </div>
      </div>

      <div className="mt-20 glass p-12 text-center">
        <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-green-400 mb-4">
          Status: ACTIVE_SURVEILLANCE_ENGAGED
        </div>
        <p className="text-sm font-mono text-muted-foreground/60 italic max-w-2xl mx-auto">
          "The most secure protocol is the one that defends itself before the threat is even conceived."
        </p>
      </div>
    </div>
  );
}
