import { categoryMeta, type Category } from "@/lib/articles";

const SITE = "Canada Daily";

export function categoryHead(category: Category) {
  const m = categoryMeta[category];
  const titleFr = `${m.fr} — ${SITE}`;
  const titleEn = `${m.en} — ${SITE}`;
  const descFr = `Analyses, reportages et explications sur ${m.fr.toLowerCase()} au Canada.`;
  const descEn = `Analysis, reporting and explainers on ${m.en.toLowerCase()} in Canada.`;
  const url = m.path;

  return {
    meta: [
      { title: titleFr },
      { name: "description", content: descFr },
      { name: "keywords", content: `${m.fr}, ${m.en}, Canada, National, ${SITE}` },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE },
      { property: "og:title", content: m.fr },
      { property: "og:description", content: descFr },
      { property: "og:image", content: m.image },
      { property: "og:image:alt", content: m.fr },
      { property: "og:url", content: url },
      { property: "og:locale", content: "en_CA" },
      { property: "og:locale:alternate", content: "fr_CA" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@CanadaDaily" },
      { name: "twitter:title", content: m.fr },
      { name: "twitter:description", content: descFr },
      { name: "twitter:image", content: m.image },

      { name: "title:en", content: titleEn },
      { name: "description:en", content: descEn },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "fr-CA", href: url },
      { rel: "alternate", hrefLang: "en-CA", href: url },
      { rel: "alternate", hrefLang: "x-default", href: url },
    ],
  };
}
