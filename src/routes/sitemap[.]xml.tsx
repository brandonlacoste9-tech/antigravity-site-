import { createFileRoute } from "@tanstack/react-router";
import { articles, categoryMeta } from "@/lib/articles";

const STATIC_PATHS = ["/", "/politique", "/economie", "/culture", "/environnement", "/a-propos"];

function urlEntry(origin: string, path: string, lastmod: string, changefreq: string, priority: string) {
  const loc = `${origin}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = new Date().toISOString().slice(0, 10);

        const staticUrls = STATIC_PATHS.map((p) =>
          urlEntry(origin, p, today, p === "/" ? "daily" : "weekly", p === "/" ? "1.0" : "0.8"),
        );

        const articleUrls = articles.map((a) =>
          urlEntry(origin, `/article/${a.slug}`, a.date, "monthly", "0.7"),
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...articleUrls].join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

// Categories meta is referenced via Map iteration above; ensure import isn't dropped.
void categoryMeta;
