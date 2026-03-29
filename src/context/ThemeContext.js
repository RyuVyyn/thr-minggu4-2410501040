import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const lightColors = {
  background: "#f1f5f9",
  card: "#ffffff",
  text: "#0f172a",
  textMuted: "#64748b",
  border: "#cbd5e1",
  input: "#f8fafc",
  primary: "#0f172a",
  primaryText: "#ffffff",
  chipActive: "#e2e8f0",
  dangerBg: "#fee2e2",
  dangerText: "#b91c1c",
};

const darkColors = {
  background: "#020617",
  card: "#0f172a",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  border: "#334155",
  input: "#1e293b",
  primary: "#38bdf8",
  primaryText: "#082f49",
  chipActive: "#334155",
  dangerBg: "#7f1d1d",
  dangerText: "#fecaca",
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((prev) => !prev),
      colors: isDarkMode ? darkColors : lightColors,
    }),
    [isDarkMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
