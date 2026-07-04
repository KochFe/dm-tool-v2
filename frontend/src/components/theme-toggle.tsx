"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync client-only localStorage state after mount; initializer would break SSR
      setTheme(stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggle")}
      className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-fg)]"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
