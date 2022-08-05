import React from "react";
import ReactSelect, { StylesConfig } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import chroma from "chroma-js";
import {
  useColorModeValue,
  useTheme,
  type ChakraProps,
  Box,
} from "@chakra-ui/react";

export interface ColouredSelectOption {
  readonly value: string;
  readonly label: string;
  readonly color?: string | undefined | null;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface SelectProps extends StateManagerProps<ColouredSelectOption> {
  sx?: ChakraProps["sx"];
}

export const Select: React.FC<SelectProps> = React.forwardRef(function Select(
  props,
  ref
) {
  const { colors } = useTheme();
  const bg = useColorModeValue(colors.brand["200"], colors.brand["900"]);
  const bgCtn = useColorModeValue(colors.brand["200"], colors.brand["800"]);
  const bc = useColorModeValue(colors.brand["200"], colors.brand["700"]);
  const bcHover = useColorModeValue(colors.brand["400"], colors.brand["600"]);
  const color = useColorModeValue(colors.brand["900"], "white");

  const coloredStyles: StylesConfig<ColouredSelectOption> = {
    container: (styles) => ({
      ...styles,
    }),
    input: (styles) => ({
      ...styles,
      color,
    }),
    menuList: (styles) => ({
      ...styles,
      backgroundColor: bgCtn,
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: bg,
      height: "3rem",
      borderColor: bc,
      borderRadius: 5,
      ":hover": {
        borderColor: bcHover,
        cursor: "pointer",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color || colors.brand["500"]);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color || undefined
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color || undefined,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color || undefined
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    singleValue: (styles, { data }) => ({
      ...styles,
      color: data.color || undefined,
    }),
    multiValue: (styles, { data }) => {
      const color = chroma(data.color || colors.brand["400"]);
      return {
        ...styles,
        backgroundColor: color.alpha(0.2).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color || undefined,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color || undefined,
      ":hover": {
        backgroundColor: data.color || undefined,
        color: "white",
      },
    }),
  };

  return (
    <Box sx={{ ...props.sx }}>
      <ReactSelect styles={coloredStyles} {...props} />
    </Box>
  );
});
