import { ComponentStyleConfig } from "@chakra-ui/react";
import {
  StyleFunctionProps,
  mode,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";

const baseStyleList: SystemStyleFunction = (props) => {
  return {
    bg: mode("brand.100", "brand.600")(props),
  };
};

export const Menu: ComponentStyleConfig = {
  baseStyle: (props) => ({
    list: baseStyleList(props),
    item: {
      _hover: {
        bg: "brand.400",
        color: "brand.900",
        fontWeight: "bold",
      },
    },
  }),
};
