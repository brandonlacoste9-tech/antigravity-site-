import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeadContent } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen selection:bg-cyan/30">
      <HeadContent>
        <title>ANTIGRAVITY | THE AGENTIC PROTOCOL</title>
        <meta name="description" content="Autonomous engine for next-generation digital infrastructure." />
      </HeadContent>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
