import React from "react";

export const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "dark",
  setTheme: () => null,
});
