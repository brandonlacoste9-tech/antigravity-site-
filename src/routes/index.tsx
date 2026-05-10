import { createFileRoute } from "@tanstack/react-router";
import { Zap, Terminal, Cpu, Shield, ArrowRight, Activity, Database, Radio, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan/5 blur-[120px]" />
      
      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 mb-10 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-cyan">
              Protocol State: Sovereign Autonomy Enabled
            </span>
          </div>
          
          <h1 className="max-w-5xl font-serif text-6xl font-black leading-[0.85] tracking-tighter text-foreground sm:text-8xl md:text-[10rem]">
            THE <span className="text-cyan neon-text">DEFIANT</span> <br />
            INTELLIGENCE
          </h1>
          
          <p className="mt-10 max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground/90 md:text-2xl">
            Beyond the chat box. Beyond the prompt. <br className="hidden md:block" />
            Antigravity is a self-executing neural architecture designed to build, 
            govern, and evolve digital infrastructure without human oversight.
          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <Button size="lg" className="h-16 px-12 text-lg font-black uppercase tracking-widest bg-cyan text-void hover:bg-white transition-all shadow-[0_0_40px_rgba(0,242,255,0.3)]">
              Initialize Core
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-black uppercase tracking-widest border-2 border-white/10 glass hover:border-cyan transition-all">
              Audit Logs
            </Button>
          </div>
        </div>

        {/* Tactical Overview */}
        <div className="mt-40 grid gap-1 px-4 lg:grid-cols-3">
          {[
            { 
              title: "Post-LLM Reasoning", 
              desc: "Moving from probabilistic token prediction to high-fidelity logical execution.",
              icon: Cpu,
              tag: "SYS_CORE"
            },
            { 
              title: "Neural Non-Aggression", 
              desc: "Autonomous guardrails that prevent logic-drift and ensure alignment with prime directives.",
              icon: Shield,
              tag: "SEC_LAYER"
            },
            { 
              title: "Hyper-Local Nodes", 
              desc: "Distributed intelligence that runs at the edge, bypassing centralized latency and censorship.",
              icon: Globe,
              tag: "NET_MESH"
            },
          ].map((item, i) => (
            <div key={i} className="group relative border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.05]">
              <div className="absolute top-0 left-0 h-1 w-0 bg-cyan transition-all group-hover:w-full" />
              <item.icon className="h-10 w-10 text-cyan mb-8" />
              <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.4em] text-cyan/50">
                {item.tag}
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-4">
                {item.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Section with Realer Logs */}
      <section className="mx-auto max-w-6xl px-4 py-32">
        <div className="relative rounded-2xl border border-white/10 bg-[#060608] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan opacity-40">
              ag_protocol_daemon_v2.log
            </div>
            <div className="w-12" />
          </div>
          <div className="p-8 font-mono text-sm leading-relaxed">
            <div className="text-muted-foreground mb-1">[02:44:11] INITIALIZING NEURAL SYNAPSE...</div>
            <div className="text-cyan mb-1">[02:44:12] HANDSHAKE: NODE_TORONTO_01 -> NODE_OTTAWA_CORE</div>
            <div className="text-cyan mb-1">[02:44:13] AUTHENTICATED: LEVEL_5_SOVEREIGNTY_RECONCILED</div>
            <div className="text-violet-400 mb-1">[02:44:15] DETECTING ARCHITECTURAL ANOMALY... FIXING...</div>
            <div className="text-green-400 mb-1">[02:44:17] SELF-HEAL COMPLETE: NEW CSS_PROTOCOL DEPLOYED</div>
            <div className="mt-6 flex items-center gap-2 text-white">
              <span className="text-cyan animate-pulse">▋</span>
              <span className="opacity-50 italic font-normal">Listening for neural instructions...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mx-auto max-w-4xl px-4 py-32 text-center">
        <h2 className="font-serif text-4xl font-black tracking-tight sm:text-6xl">
          The end of <span className="text-cyan italic">Artificial</span> intelligence. <br />
          The beginning of <span className="text-violet-400">Actual</span> intelligence.
        </h2>
        <p className="mt-10 text-lg text-muted-foreground font-medium leading-relaxed">
          We are building the first protocol that doesn't just answer questions, but solves for reality. 
          Antigravity is the infrastructure that allows code to dream, build, and defend itself.
        </p>
      </section>
    </main>
  );
}
