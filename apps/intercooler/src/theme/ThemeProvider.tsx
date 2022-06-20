import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { defaultTheme, themeKey } from "src/constants/theme";
import { getTheme } from "./base";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, _setThemeName] = useState(defaultTheme);

  useEffect(() => {
    const curThemeName = window.localStorage.getItem(themeKey) || defaultTheme;
    setThemeName(curThemeName);
  }, []);

  const theme = getTheme(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem(themeKey, themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
