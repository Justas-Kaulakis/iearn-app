import { ChakraProvider, toast } from "@chakra-ui/react";
import { Box, Divider, Flex, Heading, VStack } from "@chakra-ui/layout";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";

export function myToast(
  toast: any,
  type: "good" | "bad" | "info",
  title: string
) {
  const themes = {
    good: {
      color: "green.500",
      icon: FaCheckCircle,
    },
    bad: {
      color: "red.500",
      icon: FaExclamationCircle,
    },
    info: {
      color: "blue.500",
      icon: FaInfoCircle,
    },
  };
  const Icon: IconType = themes[type].icon;
  return toast({
    position: "bottom",
    duration: 4000,
    render: () => (
      <ChakraProvider>
        <Flex
          alignItems="center"
          color="white"
          p={3}
          bg={themes[type].color}
          rounded="base"
        >
          <Box height="fit-content" mr="5px">
            <Icon />
          </Box>

          <b>{title}</b>
        </Flex>
      </ChakraProvider>
    ),
  });
}
