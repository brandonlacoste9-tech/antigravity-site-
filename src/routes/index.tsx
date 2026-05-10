import { createFileRoute } from "@tanstack/react-router";
import { Zap, Terminal, Cpu, Shield, ArrowRight, Activity, Database, Radio, Globe, Layers, ExternalLink, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createServerFn } from "@tanstack/react-start";
import { fetchAINews } from "@/lib/dynamic-news";
import { getEmpireStatus } from "@/lib/node-monitor";
import { useState, useEffect } from "react";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

const getSystemData = createServerFn().handler(async () => {
  try {
    const [news, nodes] = await Promise.all([
      fetchAINews(),
      getEmpireStatus()
    ]);
    return { news: news || [], nodes: nodes || [] };
  } catch (error) {
    return { news: [], nodes: [] };
  }
});

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getSystemData();
  },
  component: Index,
});

function Index() {
  const { news, nodes } = Route.useLoaderData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 mb-10 backdrop-blur-xl neon-glow-cyan">
            <div className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-cyan">
              Sovereign Network: Synchronized
            </span>
          </div>
          
          <h1 className="max-w-5xl font-serif text-6xl font-black leading-[0.85] tracking-tighter text-foreground sm:text-8xl md:text-[10rem]">
            THE <span className="text-cyan neon-text-cyan hover-glitch cursor-default uppercase">Defiant</span> <br />
            <span className="text-white">INTELLIGENCE</span>
          </h1>
        </div>

        {/* Real-Time Empire Nodes Dashboard */}
        <div className="mt-32 grid gap-4 lg:grid-cols-2">
          {nodes.length > 0 ? nodes.map((node) => (
            <div key={node.id} className="glass-card p-8 flex items-center justify-between group hover:border-cyan transition-all">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${node.status === 'ONLINE' ? 'bg-cyan/10 text-cyan' : 'bg-red-500/10 text-red-500'}`}>
                  <Server className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{node.id}</div>
                  <div className="text-xl font-black text-white">{node.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] font-mono font-bold ${node.status === 'ONLINE' ? 'text-green-400' : 'text-red-500'}`}>
                   {node.status}
                </div>
                <div className="text-xs font-bold text-muted-foreground">{node.latency}ms</div>
              </div>
            </div>
          )) : (
            <div className="lg:col-span-2 glass-card p-8 text-center text-muted-foreground/50 font-mono text-xs italic">
               Node heartbeat synchronization in progress...
            </div>
          )}
        </div>

        {/* Tactical Overview */}
        <div className="mt-12 grid gap-4 px-4 lg:grid-cols-3">
          {[
            { 
              title: "Autonomous Aggregation", 
              desc: "Real-time parsing of ArXiv, HackerNews, and Wired AI streams.",
              icon: Cpu,
              tag: "CORE_FEED",
              color: "text-cyan"
            },
            { 
              title: "Empire Monitoring", 
              desc: "Live heartbeats from Le Nordique and Canada Daily nodes.",
              icon: Activity,
              tag: "NODE_WATCH",
              color: "text-violet-400"
            },
            { 
              title: "Shadow Distribution", 
              desc: "Bypassing mainstream curation to deliver the raw signals.",
              icon: Globe,
              tag: "SIGNAL_MESH",
              color: "text-cyan"
            },
          ].map((item, i) => (
            <div key={i} className="group glass-card p-10 transition-all hover:-translate-y-2 hover:bg-white/[0.05]">
              <item.icon className={`h-10 w-10 ${item.color} mb-8`} />
              <div className={`mb-2 font-mono text-[10px] font-bold tracking-[0.4em] ${item.color} opacity-50`}>
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

      {/* Terminal Section - INTERACTIVE */}
      <section className="mx-auto max-w-6xl px-4 py-32">
        <InteractiveTerminal initialNews={news} nodes={nodes} />
      </section>
    </main>
  );
}
