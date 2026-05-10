import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Send, ChevronRight, ExternalLink } from 'lucide-react';

interface TerminalProps {
  initialNews: any[];
  nodes: any[];
}

export function InteractiveTerminal({ initialNews, nodes }: TerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [news, setNews] = useState(initialNews);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogs([
      { type: 'sys', text: 'AG_OS_KERNEL v2.0.4 LOADED' },
      { type: 'sys', text: 'NEURAL_MESH SYNCHRONIZED' },
      { type: 'sys', text: 'TYPE /help TO SEE AVAILABLE COMMANDS' },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, news]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const [action, ...args] = cmd.split(" ");
    
    setLogs(prev => [...prev, { type: 'user', text: `> ${input}` }]);
    setInput("");

    switch (action) {
      case '/help':
        setLogs(prev => [...prev, { type: 'sys', text: 'AVAILABLE COMMANDS: /scan, /fetch, /memo [text], /clear, /nodes' }]);
        break;
      case '/clear':
        setLogs([]);
        break;
      case '/scan':
        setLogs(prev => [...prev, { type: 'sys', text: 'INITIATING EMPIRE NODE SCAN...' }]);
        nodes.forEach(node => {
          setLogs(prev => [...prev, { type: 'node', text: `NODE: ${node.name} | STATUS: ${node.status} | LATENCY: ${node.latency}ms` }]);
        });
        break;
      case '/nodes':
        setLogs(prev => [...prev, { type: 'sys', text: `TOTAL_NODES_CONNECTED: ${nodes.length}` }]);
        break;
      case '/memo':
        const memo = args.join(" ");
        setLogs(prev => [...prev, { type: 'memo', text: `MEMO_SAVED: ${memo || 'EMPTY_BUFFER'}` }]);
        break;
      case '/fetch':
        setLogs(prev => [...prev, { type: 'sys', text: 'RE-FETCHING INTELLIGENCE STREAM...' }]);
        // In a real app, this would call the server fn again.
        setLogs(prev => [...prev, { type: 'sys', text: 'STREAM_RECONCILED: 12 NEW SIGNALS DETECTED' }]);
        break;
      default:
        setLogs(prev => [...prev, { type: 'error', text: `COMMAND_NOT_FOUND: ${action}` }]);
    }
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_0_100px_-20px_rgba(0,242,255,0.15)] overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-6 py-4 shrink-0">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan opacity-40">
          ag_interactive_console_v2.bin
        </div>
        <div className="flex items-center gap-2">
           <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
           <span className="text-[8px] font-mono font-bold text-green-400">ACTIVE</span>
        </div>
      </div>

      {/* Output Area */}
      <div ref={scrollRef} className="flex-1 p-8 font-mono text-xs md:text-sm overflow-y-auto custom-scrollbar">
        {/* System Logs */}
        {logs.map((log, i) => (
          <div key={i} className={`mb-2 ${
            log.type === 'user' ? 'text-white' : 
            log.type === 'error' ? 'text-red-500' : 
            log.type === 'memo' ? 'text-violet-400 font-bold italic' :
            log.type === 'node' ? 'text-cyan/80' : 'text-muted-foreground'
          }`}>
            {log.text}
          </div>
        ))}

        {/* Live News Injection */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="text-[10px] font-bold text-cyan mb-6 uppercase tracking-widest flex items-center gap-2">
            <Radio className="h-3 w-3" /> Live Intelligence Stream
          </div>
          {news.map((item, i) => (
            <div key={i} className="group mb-4 hover:bg-white/[0.02] p-2 -mx-2 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground opacity-30 select-none shrink-0">[{new Date(item.pubDate).toLocaleTimeString()}]</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-cyan/10 text-cyan rounded border border-cyan/20 uppercase tracking-tighter">
                      {item.source}
                    </span>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan transition-colors font-bold flex items-center gap-2">
                    {item.title}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="border-t border-white/5 bg-white/[0.02] p-4 flex items-center gap-4">
        <ChevronRight className="h-5 w-5 text-cyan" />
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command (type /help)..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20"
          autoFocus
        />
        <Button type="submit" size="icon" variant="ghost" className="text-cyan hover:bg-cyan/10">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function Radio({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
    </svg>
  );
}
