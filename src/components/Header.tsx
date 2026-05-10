import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Cpu, Terminal, Zap, Shield, Globe } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/engine", label: "Engine", icon: Cpu },
    { to: "/terminal", label: "Terminal", icon: Terminal },
    { to: "/projects", label: "Projects", icon: Zap },
    { to: "/security", label: "Security", icon: Shield },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 glass border-b" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-cyan blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-void border border-cyan/50 text-cyan">
              <Zap className="h-6 w-6 fill-current" />
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-serif text-xl font-black uppercase tracking-tighter text-foreground">
              Antigravity
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-cyan opacity-80">
              Protocol v2.0
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-all hover:text-cyan"
              activeProps={{ className: "text-cyan" }}
            >
              <l.icon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 lg:flex">
            <div className="h-2 w-2 rounded-full bg-cyan animate-pulse"></div>
            <span className="text-[10px] font-mono font-bold text-cyan">CORE_ONLINE</span>
          </div>
          
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white/5 hover:border-cyan hover:text-cyan transition-colors lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="absolute inset-x-0 top-full glass border-b p-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 text-sm font-bold uppercase tracking-widest text-foreground/70"
                activeProps={{ className: "text-cyan" }}
              >
                <l.icon className="h-5 w-5" />
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
