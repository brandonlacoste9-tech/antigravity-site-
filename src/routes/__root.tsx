import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeadContent } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import "@/styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toISOString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-cyan/30">
      <div className="fixed top-0 left-0 right-0 z-[100] h-6 bg-black border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
          </div>
          <span className="text-[8px] font-mono font-bold text-cyan/60 tracking-widest uppercase">AG_OS_KERNEL_LOADED</span>
        </div>
        <div className="flex gap-4 items-center text-[8px] font-mono font-bold text-cyan/40">
          <span>{mounted ? time : "SYNCING..."}</span>
          <span className="text-cyan animate-pulse">● LIVE</span>
        </div>
      </div>
      <HeadContent>
        <title>ANTIGRAVITY | THE DEFIANT INTELLIGENCE</title>
        <meta name="description" content="Autonomous engine for next-generation digital infrastructure." />
      </HeadContent>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
