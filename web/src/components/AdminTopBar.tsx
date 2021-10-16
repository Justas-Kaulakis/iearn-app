import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

interface AdminTopBarProps {
  pageName: string;
}

const AdminTopBar: FC<AdminTopBarProps> = ({ pageName, children }) => {
  return (
    <Flex
      justifyContent="space-between"
      px="15px"
      fontSize="0.8em"
      align="center"
      color="white"
      bg="#427a7e"
      h="3em"
    >
      <Box>
        <span style={{ whiteSpace: "nowrap" }}>{pageName}</span>
      </Box>
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default AdminTopBar;
