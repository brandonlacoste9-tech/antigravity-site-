import { createFileRoute } from "@tanstack/react-router";
import { Zap, Terminal, Cpu, Shield, ArrowRight, Activity, Database, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-32 sm:px-6 lg:px-8 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 mb-8">
            <Radio className="h-4 w-4 text-cyan animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan">
              Transmission Received: protocol_active
            </span>
          </div>
          
          <h1 className="max-w-4xl font-serif text-6xl font-black leading-[0.9] tracking-tighter text-foreground sm:text-8xl md:text-9xl">
            THE AGENTIC <br />
            <span className="text-cyan neon-text">SINGULARITY</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg font-medium text-muted-foreground/80 md:text-xl">
            Deploying the world's first autonomous coding protocol. <br className="hidden md:block" />
            Antigravity is not just an assistant; it is the engine of the next iteration.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-lg font-black uppercase tracking-widest bg-cyan text-void hover:bg-white transition-all neon-border">
              Initialize Protocol
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-black uppercase tracking-widest border-2 border-white/20 glass hover:border-cyan transition-all">
              Read Specs
            </Button>
          </div>
        </div>

        {/* System Stats Dashboard */}
        <div className="mt-32 grid gap-6 md:grid-cols-3">
          {[
            { label: "Neural Bandwidth", value: "8.4 TB/s", icon: Activity, color: "text-cyan" },
            { label: "Token Density", value: "1.2M / sec", icon: Database, color: "text-violet" },
            { label: "Uptime Stability", value: "99.999%", icon: Shield, color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="glass group p-8 glass-hover">
              <stat.icon className={`h-8 w-8 mb-6 ${stat.color}`} />
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">
                {stat.label}
              </div>
              <div className="mt-2 text-4xl font-black tracking-tighter text-foreground">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal View */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="relative rounded-xl border-4 border-void bg-[#0a0a0c] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] font-mono font-bold uppercase text-muted-foreground opacity-50">
              agent_executor_stream.sh
            </div>
            <div className="w-12" />
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-cyan/80">
            <div className="flex gap-4">
              <span className="text-muted-foreground select-none">09:41:02</span>
              <span className="text-white">AG_OS [v2.0]: Booting system core...</span>
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-muted-foreground select-none">09:41:03</span>
              <span className="text-cyan">ANALYZING: Context window scan [OK]</span>
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-muted-foreground select-none">09:41:05</span>
              <span className="text-violet">DECODING: User intent pattern identified.</span>
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-muted-foreground select-none">09:41:07</span>
              <span className="text-green-400">EXECUTING: Creating next-gen architecture...</span>
            </div>
            <div className="flex gap-4 mt-4 animate-pulse">
              <span className="text-cyan">_</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent opacity-50" />
    </main>
  );
}
