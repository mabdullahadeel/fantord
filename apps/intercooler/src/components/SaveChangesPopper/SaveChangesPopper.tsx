import { Text, chakra, Kbd, Button, HStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface SaveChangesPopperProps {
  isVisible: boolean;
  isLoading: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const MotionPopprtCtn = chakra(motion.div);

const SaveChangesPopper: React.FC<SaveChangesPopperProps> = ({
  isVisible,
  isLoading,
  onCancel,
  onSave,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <MotionPopprtCtn
          key="save-changes-popper"
          initial={{ opacity: 0.5, y: 100 }}
          animate={{ opacity: 1, bottom: 10, y: 0 }}
          exit={{ opacity: 0.5, bottom: 10, y: 100 }}
          position="fixed"
          bottom={0}
          right={0}
          zIndex={10}
          mx="auto"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <HStack
            p={5}
            bg="brand.800"
            borderRadius={5}
            w={{
              base: "100vw",
              md: "80vw",
              lg: "60vw",
            }}
            mx={1}
            justifyContent="space-between"
          >
            <Text fontWeight="bold" fontSize="larger">
              You have unsaved changes! <Kbd>Save</Kbd> or <Kbd>Cancel</Kbd>
            </Text>
            <HStack gap={5}>
              <Button isLoading={isLoading} onClick={() => onSave()}>
                Save
              </Button>
              <Button
                colorScheme="red"
                isLoading={isLoading}
                variant="outline"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </HStack>
          </HStack>
        </MotionPopprtCtn>
      )}
    </AnimatePresence>
  );
};

export default SaveChangesPopper;
