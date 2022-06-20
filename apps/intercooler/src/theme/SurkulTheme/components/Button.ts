import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "3px",
    _hover: {},
    _active: {
      bg: "brand.500",
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
    solid: {
      bg: "brand.400",
      color: "brand.900",
    },
    outline: {
      bg: "transparent",
      color: "brand.400",
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "",
  },
};
