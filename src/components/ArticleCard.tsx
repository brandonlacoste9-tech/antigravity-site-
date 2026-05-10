import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { categoryMeta, type Article } from "@/lib/articles";

type Variant = "hero" | "feature" | "default" | "compact" | "big-idea";

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: Variant }) {
  const { lang } = useI18n();
  const content = article[lang];
  const cat = categoryMeta[article.category];

  if (variant === "big-idea") {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group relative flex flex-col overflow-hidden bg-[var(--vox-yellow)] p-8 text-ink md:flex-row md:items-center md:gap-12 md:p-12"
      >
        <div className="flex-1">
          <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.2em] opacity-80">
            {cat[lang]} · La grande idée
          </span>
          <h2 className="font-serif text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed opacity-90">
            {content.dek}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-ink/20" />
            <span className="text-xs font-bold uppercase tracking-widest">{article.readMin} min de lecture</span>
          </div>
        </div>
        {article.image && (
          <div className="mt-10 aspect-[4/3] w-full flex-none overflow-hidden md:mt-0 md:w-1/3">
            <img
              src={article.image}
              alt={content.title}
              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        )}
      </Link>
    );
  }

  if (variant === "hero") {
    return (
      <div className="group grid gap-6 md:grid-cols-2 md:gap-10">
        <Link
          to="/article/$slug"
          params={{ slug: article.slug }}
          className="relative block aspect-[4/3] overflow-hidden md:aspect-[5/4]"
        >
          <img
            src={article.image}
            alt={content.title}
            width={1600}
            height={1024}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={cat.path} className="eyebrow w-fit">
            {cat[lang]} · {content.kicker}
          </Link>
          <h1 className="mt-3 font-serif text-4xl font-extrabold leading-[1.05] text-balance md:text-6xl">
            <Link to="/article/$slug" params={{ slug: article.slug }} className="hover-underline">
              {content.title}
            </Link>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">{content.dek}</p>
          <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
            {article.author} · {article.readMin} min
          </div>
        </div>
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <Link to="/article/$slug" params={{ slug: article.slug }} className="group block">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.image}
            alt={content.title}
            width={1024}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4">
          <span className="eyebrow">{cat[lang]}</span>
          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-balance md:text-3xl">
            <span className="hover-underline">{content.title}</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{content.dek}</p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to="/article/$slug" params={{ slug: article.slug }} className="group flex gap-4">
        <div className="h-20 w-24 flex-none overflow-hidden">
          <img src={article.image} alt={content.title} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="eyebrow">{cat[lang]}</span>
          <h4 className="mt-1 font-serif text-base font-bold leading-snug">
            <span className="hover-underline">{content.title}</span>
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/article/$slug" params={{ slug: article.slug }} className="group block">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={article.image}
          alt={content.title}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3">
        <span className="eyebrow">{cat[lang]}</span>
        <h3 className="mt-1 font-serif text-xl font-bold leading-tight text-balance">
          <span className="hover-underline">{content.title}</span>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{content.dek}</p>
      </div>
    </Link>
  );
}
