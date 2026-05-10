import { createFileRoute } from "@tanstack/react-router";

const STATIC_PATHS = ["/", "/engine", "/terminal", "/projects", "/security"];

function urlEntry(origin: string, path: string, lastmod: string, changefreq: string, priority: string) {
  const loc = `${origin}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
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
