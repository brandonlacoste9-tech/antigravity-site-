import { useI18n } from "@/lib/i18n";
import { categoryMeta, getArticlesByCategory, type Category } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

export function CategoryPage({ category }: { category: Category }) {
  const { lang } = useI18n();
  const m = categoryMeta[category];
  const list = getArticlesByCategory(category);
  const [lead, ...rest] = list;

  return (
    <div>
      <header className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="eyebrow">Section</span>
          <h1 className="mt-2 font-serif text-5xl font-extrabold tracking-tight md:text-7xl">{m[lang]}</h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {lead && <ArticleCard article={lead} variant="hero" />}
        {rest.length > 0 && (
          <div className="mt-16 grid gap-10 border-t border-foreground pt-10 md:grid-cols-3">
            {rest.map((a) => <ArticleCard key={a.slug} article={a} variant="feature" />)}
          </div>
        )}
      </section>
    </div>
  );
}
