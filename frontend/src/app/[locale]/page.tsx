import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("Landing");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-bg)] text-[var(--color-fg)]">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-lg text-[var(--color-muted)]">{t("tagline")}</p>
      <p className="rounded-full border border-[var(--color-border)] px-4 py-1 text-sm text-[var(--color-accent)]">
        {t("status")}
      </p>
    </main>
  );
}
