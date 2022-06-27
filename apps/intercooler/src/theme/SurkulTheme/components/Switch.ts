import { ComponentStyleConfig } from "@chakra-ui/react";
import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

export const Switch: ComponentStyleConfig = {
  baseStyle: {
    track: {
      bg: "brand.400",
      border: "1px solid " + "#5E63B6",
      _checked: {
        bg: "brand.700",
        border: "1px solid " + "#5E63B6",
      },
    },
    thumb: {
      bg: "brand.800",
      _checked: {
        bg: "brand.400",
      },
    },
  },
  sizes: {
    lg: {},
    md: {},
    sm: {},
  },
  defaultProps: {
    size: "lg",
    colorScheme: "brand",
  },
};
