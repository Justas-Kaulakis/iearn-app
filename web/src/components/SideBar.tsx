import { Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import {
  FaUsers,
  FaLink,
  FaImages,
  FaHistory,
  FaEdit,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useLogoutMutation } from "../generated/graphql";
import Popup from "./Popup";
import SideBarLink from "./SideBarLink";

export interface SideBarProps {
  active: "nariai" | "kontaktai" | "projektai" | "galerija" | "istorija";
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ collapsed, setCollapsed, active }) => {
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  const links: { name: string; icon: IconType }[] = [
    { name: "nariai", icon: FaUsers },
    { name: "projektai", icon: FaEdit },
    { name: "galerija", icon: FaImages },
    { name: "istorija", icon: FaHistory },
    { name: "kontaktai", icon: FaLink },
  ];

  const TopIcon = collapsed ? FaBars : FaTimes;

  return (
    <Flex bgColor="#427a7e" h="100%" w="100%" direction="column">
      <Flex justifyContent={collapsed ? "space-around" : "flex-end"}>
        <Box fontSize="1.5em" m="0.5em">
          <TopIcon
            className="hoverCursor"
            color="white"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </Box>
      </Flex>
      {links.map((link, i) => (
        <SideBarLink
          selected={active === link.name}
          collapsed={collapsed}
          key={`d54${i}>*`}
          link={link}
        />
      ))}
      <Popup
        title={"Ar tikrai norite atsijungti?"}
        closeText={"Ne"}
        okText="Taip, atsijungti"
        action={async () => {
          const { error } = await logout();
          if (error) {
            console.log("Logout error: ", error);
          }
          router.replace("/");
        }}
      >
        {(onOpen: () => void) => (
          <Flex
            px="1em"
            direction="row"
            justifyContent={collapsed ? "center" : undefined}
            mt="auto"
            fontSize="1.2em"
            align="center"
            mb="1em"
            color="white"
            className="hoverCursor"
            onClick={onOpen}
          >
            <FaSignOutAlt />
            {collapsed ? null : (
              <Box ml="0.5em" fontSize="1.2em">
                Atsijungti
              </Box>
            )}
          </Flex>
        )}
      </Popup>
    </Flex>
  );
};

export default SideBar;