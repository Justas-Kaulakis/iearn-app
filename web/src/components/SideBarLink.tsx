import Link from "next/link";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import { capitalize } from "../utils/capitalize";
import { Tooltip } from "@chakra-ui/react";

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
  let renamed: string;
  renamed = capitalize(name).replace("-", " ");
  return (
    // <Tooltip label={renamed} openDelay={1000} placement='right' >
    <Link href={`/admin/${name}`}>
        <div className={`hoverCursor hoverDarken Admin-links ${selected ? "selectedLink" : ""}`}>
          {collapsed ? <Icon /> : (
            <>
              <Icon />
              {renamed}  
            </>
          )}
        </div>
    </Link>
    // </Tooltip>
  );
};

export default SideBarLink;
