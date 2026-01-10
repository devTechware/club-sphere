import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "clubsphere";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old theme
    root.removeAttribute("data-theme");

    // Set new theme
    root.setAttribute(
      "data-theme",
      theme === "dark" ? "clubsphere-dark" : "clubsphere"
    );

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "clubsphere" ? "dark" : "clubsphere"
    );
  };

  const isDark = theme === "dark" || theme === "clubsphere-dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
