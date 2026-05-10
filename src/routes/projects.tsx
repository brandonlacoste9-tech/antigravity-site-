import { createFileRoute } from "@tanstack/react-router";
import { Zap, ExternalLink, Globe, Lock, Brain } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  const items = [
    { 
      name: "NEBULA_MESH", 
      desc: "A decentralized, distributed neural network that allows for zero-latency AI reasoning across a global mesh of local nodes.", 
      status: "DEPLOYS_PENDING",
      icon: Globe 
    },
    { 
      name: "PROJECT_VOID", 
      desc: "Development of a dark-intelligence protocol for secure, air-gapped agentic execution in high-stakes environments.", 
      status: "CLASSIFIED",
      icon: Lock 
    },
    { 
      name: "SYNAPSE_ONE", 
      desc: "The first successful demonstration of a multi-agent collective that built and managed its own sovereign economy.", 
      status: "OPERATIONAL",
      icon: Brain 
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 lg:py-40">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/30">
            <Zap className="h-7 w-7 text-cyan fill-current" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-cyan">
            Active Deployments
          </div>
        </div>
        <h1 className="font-serif text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl">
          THE <span className="text-cyan neon-text">VAULT</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl font-medium text-muted-foreground leading-relaxed">
          An overview of the protocols and sub-projects currently being governed by the Antigravity core.
        </p>
      </div>
      
      <div className="grid gap-1 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="group relative border border-white/5 bg-white/[0.02] p-12 transition-all hover:bg-white/[0.05]">
            <div className="absolute top-0 left-0 h-1 w-0 bg-cyan transition-all group-hover:w-full" />
            <item.icon className="h-10 w-10 text-cyan mb-10 opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="text-[10px] font-mono font-bold text-cyan mb-2 tracking-[0.3em]">
              {item.status}
            </div>
            <h3 className="text-2xl font-black mb-6 tracking-tight">{item.name}</h3>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground/80 flex-1">
              {item.desc}
            </p>
            
            <button className="mt-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-cyan/50 hover:text-cyan transition-colors">
              Request Decryption <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
