import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { defaultTheme, themeKey } from "src/constants/theme";
import { getTheme } from "./base";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentTheme = localStorage.getItem(themeKey) || defaultTheme;
  const [themeName, setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);

  const _setThemeName = (themeName: string): void => {
    localStorage.setItem(themeKey, themeName);
    setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
