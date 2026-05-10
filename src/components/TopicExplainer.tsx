import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { BookOpen, ArrowRight } from "lucide-react";

interface TopicExplainerProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
}

export function TopicExplainer({ title, description, slug, category, image }: TopicExplainerProps) {
  const { lang } = useI18n();

  return (
    <Link
      to="/article/$slug"
      params={{ slug }}
      className="group relative flex flex-col overflow-hidden border-2 border-ink bg-background transition-all hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
    >
      <div className="flex h-full flex-col p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            <BookOpen className="h-3 w-3" />
            Expliqué
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
            {category}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-black leading-tight group-hover:underline">
          {title}
        </h3>
        
        <p className="mt-4 flex-1 text-sm font-medium leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
          <span className="text-[10px] font-black uppercase tracking-widest">Commencer la lecture</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </div>
      </div>
      
      {image && (
        <div className="absolute right-[-10%] top-[-10%] z-[-1] h-32 w-32 rotate-12 opacity-10 grayscale transition-all group-hover:rotate-0 group-hover:opacity-20">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </Link>
  );
}
