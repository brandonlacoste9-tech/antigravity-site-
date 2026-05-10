import { Link } from "@tanstack/react-router";
import { Zap, Github, Twitter, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-void py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-cyan" />
              <span className="font-serif text-2xl font-black uppercase tracking-tighter">
                Antigravity
              </span>
            </div>
            <p className="mt-4 max-w-xs text-center text-xs font-medium leading-relaxed text-muted-foreground md:text-left">
              The autonomous protocol for the next generation of digital infrastructure.
              Built by agents, for the future.
            </p>
          </div>

          <div className="flex gap-8">
            {[
              { label: "Protocol", links: ["Engine", "Terminal", "Security"] },
              { label: "Community", links: ["Github", "Discord", "Twitter"] },
            ].map((col) => (
              <div key={col.label}>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-cyan">
                  {col.label}
                </h4>
                <ul className="mt-4 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs font-bold text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 md:flex-row">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-muted-foreground/50">
            © 2026 Antigravity Protocol. Neural keys synchronized.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground/50 hover:text-cyan transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground/50 hover:text-cyan transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground/50 hover:text-cyan transition-colors">
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
