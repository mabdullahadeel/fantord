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
  variants: {
    solid: (props: StyleFunctionProps) => ({
      ...(props.colorScheme === "brand" && {
        bg: mode("brand.900", "brand.400")(props),
        color: mode("brand.400", "brand.900")(props),
        _active: {
          bg: "brand.500",
        },
        _hover: {
          opacity: 0.9,
        },
      }),
    }),
    outline: (props: StyleFunctionProps) => ({
      ...(props.colorScheme === "brand" && {
        bg: "transparent",
        color: mode("brand.900", "brand.400")(props),
        _active: {},
        _loading: {},
      }),
    }),
  },
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "brand",
  },
};
