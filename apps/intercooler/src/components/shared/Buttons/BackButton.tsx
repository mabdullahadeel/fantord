import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, type ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface BackButtonProps extends ButtonProps {}

const BackButton: React.FC<BackButtonProps> = ({ ...rest }) => {
  const router = useRouter();
  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      w={{
        lg: "10%",
        md: "30%",
        base: "100%",
      }}
      onClick={router.back}
      {...rest}
    >
      Back
    </Button>
  );
};

export default BackButton;
