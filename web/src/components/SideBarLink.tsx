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
      <div className={`hoverCursor hoverDarken Admin-links ${selected ? "selectedLink" : ""}`}>
        <Icon />
        {collapsed ? null : capitalize(name).replace("-", " ")}
      </div>
    </Link>
  );
};

export default SideBarLink;
