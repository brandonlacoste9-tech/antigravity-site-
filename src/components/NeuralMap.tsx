import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Activity } from 'lucide-react';

export function NeuralMap() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { name: "NORTH_AMERICA_HUB", city: "Ottawa", x: "25%", y: "35%", status: "OPTIMAL" },
    { name: "EUROPE_CORE_NODE", city: "Berlin", x: "50%", y: "30%", status: "STABLE" },
    { name: "ASIA_SYNC_POINT", city: "Tokyo", x: "85%", y: "40%", status: "SYNCING" },
    { name: "SOUTH_PACIFIC_MESH", city: "Sydney", x: "90%", y: "80%", status: "OPTIMAL" },
    { name: "LATAM_NEURAL_RELAY", city: "São Paulo", x: "35%", y: "75%", status: "STABLE" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative glass p-1 lg:p-2 overflow-hidden rounded-3xl border-2 border-white/5">
      <div className="absolute inset-0 bg-cyan/5 opacity-20" />
      
      {/* Background Map SVG (Simplified World Map) */}
      <svg className="w-full h-[400px] opacity-20 pointer-events-none" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 150 Q 200 100 300 150 T 500 150 T 700 150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-cyan/30" />
        <path d="M150 250 Q 350 350 550 250 T 750 250" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-cyan/30" />
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node, i) => (
          <div 
            key={node.name} 
            className="absolute transition-all duration-1000"
            style={{ left: node.x, top: node.y }}
          >
            <div className="relative group">
              {/* Pulse effect */}
              <div className={`absolute -inset-4 rounded-full transition-all duration-500 ${activeNode === i ? 'bg-cyan/20 scale-150 opacity-100' : 'bg-transparent scale-0 opacity-0'}`} />
              
              {/* Node dot */}
              <div className={`h-3 w-3 rounded-full border-2 border-background transition-all duration-300 ${activeNode === i ? 'bg-cyan scale-125 neon-border' : 'bg-cyan/40'}`} />
              
              {/* Label */}
              <div className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-500 ${activeNode === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                <div className="glass px-3 py-1.5 rounded-lg border border-cyan/30">
                  <div className="text-[8px] font-mono font-bold text-cyan mb-0.5">{node.name}</div>
                  <div className="text-[10px] font-black text-white">{node.city} — {node.status}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Overlay */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div className="glass px-6 py-4 border border-white/10 flex items-center gap-4">
          <Activity className="h-5 w-5 text-cyan animate-pulse" />
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan/50">Global Sync Rate</div>
            <div className="text-2xl font-black text-white">99.982%</div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-green-400">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400" /> ENCRYPTED_TUNNEL: ACTIVE
          </div>
          <div className="text-[10px] font-mono font-bold text-cyan/50">NODES_CONNECTED: 4,092</div>
        </div>
      </div>
    </div>
  );
}
