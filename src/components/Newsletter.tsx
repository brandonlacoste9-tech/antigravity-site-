import { useI18n } from "@/lib/i18n";
import { useState } from "react";

interface NewsletterProps {
  variant?: "default" | "sidebar";
}

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const { tr } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (variant === "sidebar") {
    return (
      <div className="border-4 border-ink bg-vox-yellow p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <h3 className="font-serif text-2xl font-black uppercase leading-tight tracking-tighter">
          {tr("newsletter_title")}
        </h3>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink/70">
          {tr("newsletter_sub")}
        </p>
        
        {done ? (
          <p className="mt-6 font-black uppercase tracking-widest">✓ Succès</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-6 flex flex-col gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tr("email_placeholder")}
              className="border-2 border-ink bg-background px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-ink py-2 text-xs font-black uppercase tracking-[0.2em] text-vox-yellow transition hover:bg-accent hover:text-white"
            >
              {tr("newsletter_cta")}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="my-20 border-y-4 border-ink bg-vox-yellow/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <span className="bg-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.3em] text-vox-yellow">
            Newsletter
          </span>
          <h2 className="mt-4 font-serif text-4xl font-black leading-none tracking-tighter md:text-5xl">
            {tr("newsletter_title")}
          </h2>
          <p className="mt-4 max-w-md text-lg font-medium leading-relaxed text-ink/80">
            {tr("newsletter_sub")}
          </p>
        </div>
        
        <div className="relative">
          {done ? (
            <div className="border-4 border-ink bg-background p-8 text-center shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
               <p className="font-serif text-2xl font-black uppercase tracking-widest">✓ Merci · Thank you</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
              className="flex flex-col gap-4 border-4 border-ink bg-background p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tr("email_placeholder")}
                className="flex-1 border-2 border-ink bg-background px-4 py-3 text-base font-bold outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-ink px-8 py-3 text-xs font-black uppercase tracking-[0.3em] text-vox-yellow transition hover:bg-accent hover:text-white"
              >
                {tr("newsletter_cta")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
