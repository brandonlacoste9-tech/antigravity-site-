import { createFileRoute } from "@tanstack/react-router";
import { Terminal as TerminalIcon } from "lucide-react";

export const Route = createFileRoute("/terminal")({
  component: Terminal,
});

function Terminal() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <div className="flex items-center gap-4 mb-8">
        <TerminalIcon className="h-10 w-10 text-violet" />
        <h1 className="text-6xl font-black text-violet neon-text uppercase tracking-tighter">Terminal</h1>
      </div>
      <div className="bg-black/50 border border-violet/30 p-10 font-mono text-violet rounded-xl shadow-2xl">
        <div className="mb-4 text-xs opacity-50 font-bold">// ANTIGRAVITY_SHELL v2.0</div>
        <div className="flex gap-2">
          <span className="opacity-50">admin@antigravity:~$</span>
          <span>antigravity --status</span>
        </div>
        <div className="mt-2 text-white font-bold">STATUS: [OPERATIONAL]</div>
        <div>CORE_TEMPERATURE: 32°C</div>
        <div>NEURAL_LOAD: 12%</div>
        <div>ACTIVE_AGENTS: 1,024</div>
        <div className="mt-4 flex gap-2">
          <span className="opacity-50">admin@antigravity:~$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
