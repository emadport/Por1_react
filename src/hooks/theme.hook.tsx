import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  value: ThemeContextValue;
  children: ReactNode;
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
