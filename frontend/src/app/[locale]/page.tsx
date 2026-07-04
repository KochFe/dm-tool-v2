import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const t = useTranslations("Landing");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="absolute right-4 top-4 flex items-center gap-4">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-lg text-[var(--color-muted)]">{t("tagline")}</p>
      <p className="rounded-full border border-[var(--color-border)] px-4 py-1 text-sm text-[var(--color-accent)]">
        {t("status")}
      </p>
    </main>
  );
}
