import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangSwitch({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang, setLang } = useI18n();
  return (
    <div role="group" aria-label="Language / Lingua" className={cn("inline-flex rounded-md border p-0.5 text-xs font-semibold", tone === "dark" ? "border-ink-foreground/30" : "border-border", className)}>
      {(["en", "it"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded px-2.5 py-1 uppercase tracking-wider transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : tone === "dark" ? "text-ink-foreground/80 hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
