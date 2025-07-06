"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "./ui/moon";
import { SunMediumIcon } from "./ui/sun-medium";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <MoonIcon size={14} /> : <SunMediumIcon size={14} />}
    </button>
  );
}
