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
  const renamed: string = capitalize(name).replace("-", " ");
  return (
    <Link href={`/admin/${name}`}>
        <div title={renamed} className={`hoverCursor hoverDarken Admin-links ${selected ? "selectedLink" : ""}`}>
          {collapsed ? <Icon /> : (
            <>
              <Icon />
              {renamed}  
            </>
          )}
        </div>
    </Link>
  );
};

export default SideBarLink;
