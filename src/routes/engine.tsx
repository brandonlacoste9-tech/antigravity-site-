import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";

export const Route = createFileRoute("/engine")({
  component: Engine,
});

function Engine() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <div className="flex items-center gap-4 mb-8">
        <Cpu className="h-10 w-10 text-cyan" />
        <h1 className="text-6xl font-black neon-text uppercase">The Engine</h1>
      </div>
      <div className="glass p-10">
        <p className="text-xl text-muted-foreground leading-relaxed">
          The Antigravity Engine is the core neural architecture that powers our autonomous agents. 
          By utilizing a multi-layered synthesis protocol, we achieve Level 5 autonomy in complex 
          software environments.
        </p>
      </div>
    </div>
  );
}
