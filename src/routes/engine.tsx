import { NeuralMap } from "@/components/NeuralMap";

export const Route = createFileRoute("/engine")({
  component: Engine,
});

function Engine() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 lg:py-40">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/30">
            <Cpu className="h-7 w-7 text-cyan" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-cyan">
            Technical Specification
          </div>
        </div>
        <h1 className="font-serif text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl">
          THE <span className="text-cyan neon-text">GRAVITY</span> <br />
          SHIFT
        </h1>
      </div>

      <div className="mb-20">
        <NeuralMap />
      </div>

      <div className="grid gap-1 lg:grid-cols-2">
        <div className="glass p-12 lg:p-20">
          <h2 className="text-3xl font-black mb-8 text-white">Neural Synthesis v2.0</h2>
          <p className="text-xl font-medium text-muted-foreground leading-relaxed">
            The Antigravity Engine bypasses traditional sequential processing. By implementing a 
            <strong> Recursive Reasoning Loop (RRL)</strong>, the system doesn't just process data—it 
            simulates the outcomes of its own logic before a single line of code is written.
          </p>
          
          <ul className="mt-12 space-y-6">
            {[
              "Multi-dimensional vector re-routing",
              "Sub-millisecond neural consensus",
              "Self-optimizing execution shards"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-cyan/70">
                <ChevronRight className="h-4 w-4" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col justify-center bg-white/[0.03] p-12 lg:p-20 border border-white/5">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Layers className="h-64 w-64 text-cyan" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6">Autonomy Tier 5</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We have achieved full architectural sovereignty. The engine can now identify infrastructure 
              bottlenecks and deploy its own patches, effectively becoming a self-healing, 
              self-evolving digital organism.
            </p>
            <div className="mt-10 h-1 w-full bg-white/5 overflow-hidden">
              <div className="h-full bg-cyan w-[88%] animate-pulse" />
            </div>
            <div className="mt-2 font-mono text-[10px] font-bold text-cyan">SYSTEM_STABILITY: 88% (IMPROVING)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
