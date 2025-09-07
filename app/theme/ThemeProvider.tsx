"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "mushaf";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.body.className = theme;
    if (theme === "mushaf") {
      document.body.style.background = "#fdf6e3 url('/mushaf-pattern.svg') repeat";
      document.body.style.fontFamily = "'Amiri', 'Cairo', serif";
      document.body.style.border = "20px solid #c2b280";
      document.body.style.borderImage = "url('/mushaf-pattern.svg') 30 round";
    } else {
      document.body.style.background = "";
      document.body.style.fontFamily = "";
      document.body.style.border = "";
      document.body.style.borderImage = "";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
