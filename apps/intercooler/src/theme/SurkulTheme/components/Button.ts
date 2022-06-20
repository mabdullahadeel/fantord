import { ComponentStyleConfig } from "@chakra-ui/react";
import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "3px",
    _hover: {},
    _active: {
      transform: "scale(0.98)",
    },
  },
  sizes: {
    lg: {
      height: "4rem",
    },
    md: {
      height: "3rem",
    },
    sm: {
      height: "2rem",
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: (props: StyleFunctionProps) => ({
      bg: mode("brand.900", "brand.400")(props),
      color: mode("brand.400", "brand.900")(props),
      _active: {
        bg: "brand.500",
      },
      _hover: {
        opacity: 0.9,
      },
    }),
    outline: (props: StyleFunctionProps) => ({
      bg: "transparent",
      color: mode("brand.900", "brand.400")(props),
      _active: {},
      _loading: {},
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "brand",
  },
};
