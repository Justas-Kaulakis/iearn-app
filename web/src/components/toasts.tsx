import { ChakraProvider } from "@chakra-ui/react";
import { Box, Divider, Flex, Heading, VStack } from "@chakra-ui/layout";
import { FaCheckCircle } from "react-icons/fa";

export const myToast = (toast: any, type: "good" | "bad", title: string) => {
  return toast({
    position: "bottom",
    duration: 4000,
    render: () => (
      <ChakraProvider>
        <Flex
          alignItems="center"
          color="white"
          p={3}
          bg={type === "good" ? "green.500" : "red.500"}
          rounded="base"
        >
          <Box height="fit-content" mr="5px">
            <FaCheckCircle />
          </Box>

          <b>{title}</b>
        </Flex>
      </ChakraProvider>
    ),
  });
};
