import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:pt-20">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-2 text-5xl text-primary md:text-6xl">{title}</h1>
      {intro && <p className="mt-4 max-w-xl text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
