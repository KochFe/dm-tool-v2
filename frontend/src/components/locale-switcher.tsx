"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("Locale");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className="flex gap-2">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={
            l === locale
              ? "font-semibold text-[var(--color-accent)]"
              : "text-[var(--color-muted)]"
          }
        >
          {t(l)}
        </Link>
      ))}
    </nav>
  );
}
