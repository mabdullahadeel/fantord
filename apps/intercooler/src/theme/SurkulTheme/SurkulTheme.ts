import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export const surkulTheme = extendTheme({
  colors: {
    brand: {
      900: "#0E0F35",
      800: "#1C1E68",
      700: "#5E63B6",
      600: "#7A7FD8",
      500: "#A393EB",
      400: "#F5C7F7",
      300: "#F5C7F7",
      200: "#FAF2FA",
      100: "#FFFFFF",
    },
    typography: {
      primary: "#FFFFFF",
      secondary: "#7D7EA3",
    },
  },
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
  },
  components: {
    Button,
  },
  styles: {
    global: {
      body: (props: StyleFunctionProps) => ({
        bg: props.colorMode === "dark" ? "brand.100" : "brand.900",
      }),
    },
  },
});
