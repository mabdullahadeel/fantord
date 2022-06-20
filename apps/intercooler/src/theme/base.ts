import { surkulTheme } from "./SurkulTheme/SurkulTheme";
import { Dict } from "@chakra-ui/utils";

const themeMap: { [key: string]: Dict<any> } = {
  surkulTheme,
};

export const getTheme = (themeName: string) => themeMap[themeName];
