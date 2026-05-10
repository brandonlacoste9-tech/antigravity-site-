import { createFileRoute } from "@tanstack/react-router";
import { Zap, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  const items = [
    { name: "Project Zero", desc: "The foundation of agentic coding.", status: "COMPLETE" },
    { name: "Nebula", desc: "Distributed neural networking across the edge.", status: "IN_PROGRESS" },
    { name: "Horizon", desc: "Visualizing the future of human-AI collaboration.", status: "EXPERIMENTAL" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <div className="flex items-center gap-4 mb-12">
        <Zap className="h-10 w-10 text-cyan fill-current" />
        <h1 className="text-6xl font-black neon-text uppercase tracking-tighter">Projects</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="glass p-8 glass-hover flex flex-col">
            <div className="text-[10px] font-mono font-bold text-cyan mb-2 tracking-[0.2em]">{item.status}</div>
            <h3 className="text-2xl font-black mb-4">{item.name}</h3>
            <p className="text-muted-foreground text-sm flex-1">{item.desc}</p>
            <button className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-cyan transition-colors">
              Access Vault <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
