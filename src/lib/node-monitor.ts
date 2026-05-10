import { createServerFn } from "@tanstack/react-start";

export interface NodeStatus {
  id: string;
  name: string;
  url: string;
  latency: number;
  status: "ONLINE" | "UNREACHABLE";
}

const EMPIRE_NODES = [
  { id: "QUEBEC_HUB", name: "Le Nordique", url: "https://le-nordique-new-one-.vercel.app" },
  { id: "NATIONAL_HUB", name: "Canada Daily", url: "https://canada-newspaper-.vercel.app" },
];

export const getEmpireStatus = createServerFn().handler(async () => {
  const results: NodeStatus[] = [];

  for (const node of EMPIRE_NODES) {
    const start = Date.now();
    try {
      const resp = await fetch(node.url, { method: "HEAD", signal: AbortSignal.timeout(3000) });
      results.push({
        ...node,
        latency: Date.now() - start,
        status: resp.ok ? "ONLINE" : "UNREACHABLE"
      });
    } catch (e) {
      results.push({
        ...node,
        latency: 0,
        status: "UNREACHABLE"
      });
    }
  }

  return results;
});
