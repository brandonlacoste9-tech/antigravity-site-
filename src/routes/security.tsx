import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Eye } from "lucide-react";

export const Route = createFileRoute("/security")({
  component: Security,
});

function Security() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <div className="flex items-center gap-4 mb-8">
        <Shield className="h-10 w-10 text-green-400" />
        <h1 className="text-6xl font-black text-green-400 neon-text uppercase tracking-tighter">Security</h1>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="glass p-10">
          <Lock className="h-8 w-8 mb-6 text-green-400" />
          <h2 className="text-2xl font-black mb-4">Encrypted Neural Nodes</h2>
          <p className="text-muted-foreground leading-relaxed">
            All agent communications are secured via 512-bit post-quantum encryption protocols. 
            The integrity of the protocol is maintained through decentralized consensus.
          </p>
        </div>
        <div className="glass p-10">
          <Eye className="h-8 w-8 mb-6 text-green-400" />
          <h2 className="text-2xl font-black mb-4">Zero-Knowledge Proofs</h2>
          <p className="text-muted-foreground leading-relaxed">
            We ensure the privacy of our neural datasets through advanced cryptographic validation, 
            allowing for verification without data exposure.
          </p>
        </div>
      </div>
    </div>
  );
}
