import { createFileRoute } from "@tanstack/react-router";
import { Zap, Terminal, Cpu, Shield, ArrowRight, Activity, Database, Radio, Globe, Layers, ExternalLink, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createServerFn } from "@tanstack/react-start";
import { fetchAINews } from "@/lib/dynamic-news";
import { getEmpireStatus } from "@/lib/node-monitor";

const getSystemData = createServerFn().handler(async () => {
  const [news, nodes] = await Promise.all([
    fetchAINews(),
    getEmpireStatus()
  ]);
  return { news, nodes };
});

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getSystemData();
  },
  component: Index,
});

function Index() {
  const { news, nodes } = Route.useLoaderData();

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
          {nodes.map((node) => (
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
          ))}
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

      {/* Terminal Section - LIVE NEWS STREAM */}
      <section className="mx-auto max-w-6xl px-4 py-32">
        <div className="relative rounded-2xl border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_0_100px_-20px_rgba(0,242,255,0.15)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan opacity-40">
              ag_live_intelligence_stream.bin
            </div>
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
               <span className="text-[8px] font-mono font-bold text-green-400">RECEIVING_TRANSMISSION</span>
            </div>
          </div>
          <div className="p-8 font-mono text-xs md:text-sm leading-loose max-h-[500px] overflow-y-auto custom-scrollbar">
            {news.map((item, i) => (
              <div key={i} className="group mb-4 last:mb-0 hover:bg-white/[0.02] p-2 -mx-2 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground opacity-30 select-none shrink-0">[{new Date(item.pubDate).toLocaleTimeString()}]</span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-cyan/10 text-cyan rounded border border-cyan/20 uppercase tracking-tighter">
                        {item.source}
                      </span>
                    </div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan transition-colors font-bold flex items-center gap-2"
                    >
                      {item.title}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 flex items-center gap-2 text-white/50 animate-pulse">
              <span className="text-cyan">▋</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Awaiting next breakthrough...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative mx-auto max-w-4xl px-4 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-violet-600/5 blur-[100px]" />
        <h2 className="font-serif text-4xl font-black tracking-tight sm:text-6xl">
          The end of <span className="text-cyan italic neon-text-cyan uppercase">Artificial</span> intelligence. <br />
          The beginning of <span className="text-violet-400 neon-text-violet uppercase">Actual</span> intelligence.
        </h2>
        <p className="mt-10 text-lg text-muted-foreground font-medium leading-relaxed">
          We are building the first protocol that doesn't just answer questions, but solves for reality. 
          Antigravity is the infrastructure that allows code to dream, build, and defend itself.
        </p>
      </section>
    </main>
  );
}
