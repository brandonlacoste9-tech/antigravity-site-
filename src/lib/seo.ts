const SITE = "Antigravity Protocol";

export function getSeo(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | ${SITE}` },
      { name: "description", content: description },
      { name: "keywords", content: "AI, Agentic, Autonomy, Neural, Protocol, Antigravity" },
      { property: "og:site_name", content: SITE },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AntigravityAI" },
    ],
  };
}
