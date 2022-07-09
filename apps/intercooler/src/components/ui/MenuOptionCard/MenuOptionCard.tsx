import { Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface MenuOptionCardProps {
  title: string;
  description?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const MenuOptionCard: React.FC<MenuOptionCardProps> = ({
  title,
  description,
  startIcon,
  endIcon,
}) => {
  return (
    <Flex
      alignItems="center"
      gap={5}
      w="100%"
      border="1px solid"
      borderColor="brand.600"
      p={3}
      borderRadius={4}
      transition="all 0.6s ease-in-out"
      _hover={{
        borderColor: "brand.400",
        bg: "brand.800",
        cursor: "pointer",
      }}
      _active={{
        transform: "translateY(6px)",
      }}
    >
      {startIcon && <>{startIcon}</>}
      <Stack spacing={1} flex={1}>
        <Text fontSize="2xl">{title}</Text>
        {description && <Text color="typography.secondary">{description}</Text>}
      </Stack>
      {endIcon && <>{endIcon}</>}
    </Flex>
  );
};
