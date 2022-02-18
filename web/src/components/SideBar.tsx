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
  FaInfo,
  FaUserCog,
  FaThList,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useLogoutMutation } from "../generated/graphql";
import Popup from "./Popup";
import SideBarLink from "./SideBarLink";

export type AdminLinks =
  | "nariai"
  | "kontaktai"
  | "projektai"
  | "galerija"
  | "kartos"
  | "istorija"
  | "mano-info"
  | "apie-mus";

export interface SideBarProps {
  active: AdminLinks;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ collapsed, setCollapsed, active }) => {
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  const links: { name: AdminLinks; icon: IconType }[] = [
    { name: "apie-mus", icon: FaInfo },
    { name: "nariai", icon: FaUsers },
    { name: "projektai", icon: FaEdit },
    { name: "galerija", icon: FaImages },
    { name: "kartos", icon: FaThList },
    { name: "istorija", icon: FaHistory },
    { name: "kontaktai", icon: FaLink },
    { name: "mano-info", icon: FaUserCog },
  ];

  const TopIcon = collapsed ? FaBars : FaTimes;

  return (
    <Flex bgColor="#427a7e" h="100%" w="100%" direction="column">
      <div className="hoverCursor hoverDarken Admin-links">
        <TopIcon color="white" onClick={() => setCollapsed(!collapsed)}/>
      </div>
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
          <div className="hoverCursor hoverDarken Admin-links" onClick={onOpen} style={{ margin: "auto 0 0 0" }}>
            <FaSignOutAlt />
            {collapsed ? null : "Atsijungti"}
          </div>
        )}
      </Popup>
    </Flex>
  );
};

export default SideBar;
