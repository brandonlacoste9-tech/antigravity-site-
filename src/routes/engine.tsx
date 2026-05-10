import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Layers, Zap, Infinity, ChevronRight, Activity, Globe, Shield } from "lucide-react";
import { NeuralMap } from "@/components/NeuralMap";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute("/engine")({
  component: Engine,
});

const MOCK_TRAFFIC_DATA = [
  { time: '00:00', load: 45 },
  { time: '04:00', load: 30 },
  { time: '08:00', load: 85 },
  { time: '12:00', load: 65 },
  { time: '16:00', load: 95 },
  { time: '20:00', load: 70 },
  { time: '23:59', load: 55 },
];

function Engine() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 lg:py-40">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/30 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
            <Activity className="h-7 w-7 text-cyan" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-cyan">
            Network Performance
          </div>
        </div>
        <h1 className="font-serif text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl">
          THE <span className="text-cyan neon-text-cyan">PULSE</span>
        </h1>
      </div>

      {/* Global Map Integration */}
      <div className="mb-12">
        <NeuralMap />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Real-Time Load Chart */}
        <div className="lg:col-span-2 glass-card p-10 min-h-[400px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-white">Neural Load Variance</h2>
              <p className="text-xs font-mono text-cyan/50 mt-1 uppercase tracking-widest">Aggregated Empire Throughput (24h)</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono font-bold text-green-400">STATUS: NOMINAL</div>
              <div className="text-2xl font-black text-white">8.4 TB/s</div>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TRAFFIC_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#060608', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  itemStyle={{ color: '#00F2FF' }}
                />
                <Area type="monotone" dataKey="load" stroke="#00F2FF" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live System Specs */}
        <div className="flex flex-col gap-6">
          {[
            { label: "Core Autonomy", val: "Tier 5.2", icon: Cpu, color: "text-cyan" },
            { label: "Encryption Depth", val: "512-PQ", icon: Shield, color: "text-green-400" },
            { label: "Neural Drift", val: "0.0003%", icon: Layers, color: "text-violet-400" },
          ].map((spec) => (
            <div key={spec.label} className="glass-card p-8 flex items-center justify-between group hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <spec.icon className={`h-6 w-6 ${spec.color}`} />
                <div className="text-sm font-bold text-muted-foreground">{spec.label}</div>
              </div>
              <div className="text-lg font-black text-white">{spec.val}</div>
            </div>
          ))}
          
          <div className="glass-card p-8 flex-1 bg-cyan/5 border-cyan/20 flex flex-col justify-center text-center">
            <div className="text-[10px] font-mono font-bold text-cyan uppercase tracking-[0.3em] mb-4">Transmission Pulse</div>
            <div className="text-5xl font-black text-white">88<span className="text-cyan animate-pulse">%</span></div>
            <div className="text-[10px] font-bold text-cyan/50 mt-2">Empire-Wide Sync</div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-white/5 pt-20">
         <p className="text-center text-sm font-mono text-muted-foreground/40 italic">
           "The simulation is the shadow. The data is the light."
         </p>
      </div>
    </div>
  );
}
