import { createFileRoute } from "@tanstack/react-router";
import { Zap, Terminal as TerminalIcon, Cpu, Shield, Activity, Globe, ExternalLink, Server, Loader2, Gauge, Network } from "lucide-react";
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

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-12 selection:bg-cyan/30 overflow-hidden">
      {/* BACKGROUND NEURAL GRID */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1800px] space-y-8 h-full">
        
        {/* HEADER: PROTOCOL STATUS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-cyan neon-glow-cyan" />
              <h1 className="font-serif text-4xl font-black tracking-tighter uppercase italic">Antigravity Nexus</h1>
            </div>
            <p className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">Sovereign Intelligence Command Center // Local Node: North_America_01</p>
          </div>
          
          <div className="flex gap-4">
             {nodes.map((node) => (
               <div key={node.id} className="glass-card px-4 py-2 flex items-center gap-3 border-white/5 bg-white/[0.02]">
                 <div className={`h-1.5 w-1.5 rounded-full ${node.status === 'ONLINE' ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
                 <div>
                   <div className="text-[8px] font-mono font-bold text-white/20 uppercase leading-none mb-1">{node.id}</div>
                   <div className="text-[10px] font-mono font-bold text-white/80 leading-none">{node.latency}ms</div>
                 </div>
               </div>
             ))}
             <div className="glass-card px-4 py-2 flex items-center gap-3 border-cyan/30 bg-cyan/5">
                 <div className="h-1.5 w-1.5 rounded-full bg-cyan animate-ping" />
                 <div>
                   <div className="text-[8px] font-mono font-bold text-cyan/40 uppercase leading-none mb-1">Shadow_Node</div>
                   <div className="text-[10px] font-mono font-bold text-cyan leading-none">Initializing...</div>
                 </div>
             </div>
          </div>
        </div>

        {/* MAIN TACTICAL GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT: THE INTERACTIVE CORE */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <InteractiveTerminal initialNews={news} nodes={nodes} />
            
            <div className="flex-1 min-h-[300px] rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,242,255,0.1),transparent)] pointer-events-none" />
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <Network className="h-3 w-3 text-cyan" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan">Neural_Topology_Visualizer</span>
              </div>
              
              <div className="flex items-center justify-center h-full p-12">
                <div className="relative h-64 w-64">
                   {/* CIRCULAR INFRASTRUCTURE MOCK */}
                   <div className="absolute inset-0 rounded-full border border-cyan/20 animate-[spin_20s_linear_infinite]" />
                   <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan flex items-center justify-center neon-glow-cyan">
                        <Cpu className="h-6 w-6 text-cyan" />
                      </div>
                   </div>
                   {/* NODE DOTS */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-green-400" />
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_#00f2ff]" />
                   <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet-400" />
                </div>
              </div>
              
              {/* LIVE SIGNAL OVERLAY */}
              <div className="absolute bottom-4 left-6 right-6 p-4 rounded-xl bg-black/80 border border-white/5 backdrop-blur-md">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-mono text-cyan/40 uppercase tracking-widest">Live_Signal_Ingest</span>
                    <span className="text-[8px] font-mono text-cyan/60">STREAMING_FROM_SHADOW_CORE</span>
                 </div>
                 <div className="font-mono text-[9px] text-cyan/80 truncate">
                   {">"} [UNISWAP_V3] ANOMALOUS_LIQUIDITY_MIGRATION: POOL_ADDR(0x1f9...342) // MAGNITUDE: 14.8x // ZK_ATTESTATION_PENDING...
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AGENTIC WORKSTREAM & SYSTEM VITALS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* BONDING REGISTRY */}
            <div className="rounded-2xl border border-cyan/30 bg-cyan/5 p-6 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Shield className="h-12 w-12 text-cyan" />
              </div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan/60">Bonding_Registry</h3>
                <span className="px-2 py-0.5 rounded bg-cyan/20 border border-cyan/30 text-[8px] font-mono text-cyan">VALIDATED</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <span className="text-3xl font-black italic tracking-tighter text-white">32.00</span>
                   <span className="text-[10px] font-mono text-cyan mb-1 font-bold">SHADOW_BONDED</span>
                </div>
                <div className="h-1.5 w-full bg-cyan/10 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan w-full shadow-[0_0_15px_#00f2ff]" />
                </div>
                <p className="text-[9px] font-mono text-white/30 leading-relaxed">MRENCLAVE verified. Node is stake-weighted and eligible for epoch rewards.</p>
              </div>
            </div>

            {/* ENGINE METRICS */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">System_Vitals</h3>
                <Gauge className="h-4 w-4 text-white/20" />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-2 uppercase">
                    <span className="text-white/40">Neural Load</span>
                    <span className="text-cyan">42.8%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan w-[42.8%] shadow-[0_0_10px_#00f2ff]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-2 uppercase">
                    <span className="text-white/40">Throughput</span>
                    <span className="text-violet-400">8.4 GB/s</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-400 w-[65%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* AGENTIC WORKSTREAM */}
            <div className="flex-1 min-h-[500px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-4 bg-cyan" />
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan">Agentic_Workstream</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-green-400 uppercase">Hermes_Active</span>
                </div>
              </div>

              <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-cyan uppercase tracking-tighter">Mission: Shadow_Node_Init</span>
                    <span className="text-[8px] text-white/20">17:18:29</span>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan/5 border border-cyan/10">
                    <p className="text-[11px] text-cyan/80 leading-relaxed">Infrastructure mapping complete. Purging news legacy modules. Rerouting to Nexus Command layout.</p>
                  </div>
                </div>

                <div className="space-y-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">Task: Infra_Audit</span>
                    <span className="text-[8px] text-white/20">17:15:02</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-[11px] text-white/40 leading-relaxed">Scanning local filesystem for node registry... Found 3 target directories.</p>
                  </div>
                </div>

                <div className="space-y-2 opacity-30">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">System_Boot</span>
                    <span className="text-[8px] text-white/20">17:01:05</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
                    <p className="text-[11px] text-white/30 leading-relaxed">Hermes Agent v0.13.0 established neural handshake via DeepSeek-v4-Pro.</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <button className="group relative w-full overflow-hidden rounded-xl bg-white/[0.03] p-px transition-all hover:bg-cyan/20">
                   <div className="relative flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 transition-all group-hover:bg-transparent group-hover:text-cyan">
                     <TerminalIcon className="h-3 w-3" />
                     New Mission Directive
                   </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
