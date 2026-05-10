import { useQuery } from "@tanstack/react-query";
import { fetchLatestNews } from "@/lib/dynamic-news";
import { Zap, ExternalLink } from "lucide-react";

export function LiveFeed() {
  const { data: news, isLoading } = useQuery({
    queryKey: ["latest-news"],
    queryFn: () => fetchLatestNews(),
    refetchInterval: 1000 * 60 * 60 * 24, // Refetch daily (or every 3 days as requested)
  });

  return (
    <div className="border-4 border-ink bg-background p-6">
      <div className="flex items-center gap-2 border-b-2 border-ink pb-4">
        <div className="flex h-6 w-6 animate-pulse items-center justify-center bg-accent text-white">
          <Zap className="h-4 w-4 fill-current" />
        </div>
        <h3 className="font-serif text-xl font-black uppercase tracking-tight">
          Fil Info En Direct
        </h3>
      </div>

      <div className="mt-6 divide-y-2 divide-ink/10">
        {isLoading ? (
          <div className="py-10 text-center font-serif font-bold opacity-50">Mise à jour...</div>
        ) : Array.isArray(news) ? (
          news.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                  {item.source}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  {new Date(item.date).toLocaleDateString("fr-CA", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <h4 className="mt-1 font-serif text-base font-bold leading-tight">
                {item.title}
              </h4>
              <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground line-clamp-2">
                {item.summary}
              </p>
              <a 
                href={item.url} 
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest hover:text-accent"
              >
                Lire la source <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))
        ) : (
          <div className="py-10 text-center font-serif text-sm opacity-50">Aucune nouvelle disponible.</div>
        )}
      </div>
      
      <div className="mt-6 border-t-2 border-ink pt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          Mis à jour automatiquement toutes les 72h
        </p>
      </div>
    </div>
  );
}
