import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import { capitalize } from "../utils/capitalize";

interface SideBarLinkProps {
  link: { name: string; icon: IconType };
  collapsed: boolean;
  selected: boolean;
}

const SideBarLink: FC<SideBarLinkProps> = ({
  collapsed,
  link: { icon: Icon, name },
  selected,
}) => {
  return (
    <Link href={`/admin/${name}`}>
      <Flex
        className="hoverCursor hoverDarken"
        justifyContent={collapsed ? "center" : undefined}
        direction="row"
        color={selected ? "#cad2c5" : "white"}
        px="1em"
        py="0.5em"
      >
        <Icon style={{ width: "1.4em", height: "1.4em" }} />
        {collapsed ? null : (
          <Box ml="0.5em" >
            {capitalize(name)}
          </Box>
        )}
      </Flex>
    </Link>
  );
};

export default SideBarLink;
