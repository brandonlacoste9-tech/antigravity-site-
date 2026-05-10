import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Command } from "cmdk";
import { articles, categoryMeta } from "@/lib/articles";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@tanstack/react-router";

export function SearchModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const { lang } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 pt-[15vh] backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl border-4 border-ink bg-background p-2 shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
        <Command className="flex flex-col">
          <div className="flex items-center border-b-2 border-ink px-4 py-4">
            <SearchIcon className="mr-3 h-5 w-5 stroke-[3px] text-accent" />
            <Command.Input
              autoFocus
              placeholder="Rechercher une analyse... Search an analysis..."
              className="flex-1 bg-transparent text-lg font-bold outline-none placeholder:text-muted-foreground/50"
            />
            <button onClick={() => setOpen(false)} className="ml-3 hover:text-accent">
              <X className="h-5 w-5 stroke-[3px]" />
            </button>
          </div>

          <Command.List className="max-h-[50vh] overflow-y-auto px-2 py-4">
            <Command.Empty className="py-10 text-center font-serif text-xl font-bold">
              Aucun résultat trouvé. No results found.
            </Command.Empty>

            <Command.Group heading="Articles" className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
              {articles.map((a) => (
                <Command.Item
                  key={a.slug}
                  onSelect={() => {
                    navigate({ to: "/article/$slug", params: { slug: a.slug } });
                    setOpen(false);
                  }}
                  className="mt-2 flex cursor-pointer flex-col p-3 hover:bg-vox-yellow/20 aria-selected:bg-vox-yellow/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-accent">
                      {categoryMeta[a.category][lang]}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {a.author}
                    </span>
                  </div>
                  <div className="mt-1 font-serif text-lg font-black leading-tight">
                    {a[lang].title}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-ink/10 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex gap-4">
              <span><kbd className="bg-muted px-1.5 py-0.5 border border-ink/20">↑↓</kbd> Naviguer</span>
              <span><kbd className="bg-muted px-1.5 py-0.5 border border-ink/20">Enter</kbd> Ouvrir</span>
            </div>
            <span><kbd className="bg-muted px-1.5 py-0.5 border border-ink/20">ESC</kbd> Fermer</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
