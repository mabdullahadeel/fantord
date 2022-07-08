import { useMediaQuery } from "@chakra-ui/react";

export const useDevice = () => {
  const [isMobile, isTablet, isDesktop] = useMediaQuery([
    "(max-width: 480px)",
    "(max-width: 768px)",
    "(max-width: 1024px)",
  ]);

  return { isMobile, isTablet, isDesktop };
};
