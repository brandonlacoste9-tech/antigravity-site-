import Parser from "rss-parser";

const parser = new Parser();

export interface AINewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const FEEDS = [
  { name: "HackerNews", url: "https://news.ycombinator.com/rss" },
  { name: "ArXiv_AI", url: "http://export.arxiv.org/rss/cs.AI" },
  { name: "Wired_AI", url: "https://www.wired.com/feed/category/ai/latest/rss" },
];

export async function fetchAINews(): Promise<AINewsItem[]> {
  try {
    const allNews: AINewsItem[] = [];
    
    for (const feed of FEEDS) {
      const feedData = await parser.parseURL(feed.url);
      const items = feedData.items.slice(0, 5).map(item => ({
        title: item.title || "Unknown Transmission",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        source: feed.name
      }));
      allNews.push(...items);
    }

    // Sort by date and take top 12
    return allNews
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 12);
  } catch (error) {
    console.error("Transmission Error:", error);
    return [];
  }
}
