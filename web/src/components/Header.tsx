import React, { FC } from "react";
import { FaBars, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useIsLoggedInQuery } from "../generated/graphql";

export interface HeaderProps {
  active:
    | "pagrindinis"
    | "projektai"
    | "kartos"
    | "istorija"
    | "galerija"
    | "admin";
}

const Header: FC<HeaderProps> = ({ active }) => {
  const linkNames = [
    "pagrindinis",
    "projektai",
    "kartos",
    "istorija",
    "galerija",
  ];
  const [{ data }] = useIsLoggedInQuery({
    requestPolicy: "network-only",
  });

  //console.log(data?.isLoggedIn);

  return (
    <header className="header">
      <Link href="/">
        <a className="logolink">
          <img className="logo" src="/logo.svg" alt="logo" />
        </a>
      </Link>
      <nav className="nav-bar">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <FaBars aria-hidden />
        </label>
        <ul className="nav-links">
          {linkNames.map((name) => (
            <li
              key={name.toString()}
              className={active === name ? "active" : undefined}
            >
              <Link href={`/${name === "pagrindinis" ? "" : name}`}>
                <a className="nav-link">{name.toUpperCase()}</a>
              </Link>
            </li>
          ))}
          {!data?.isLoggedIn ? null : (
            <li className={active === "admin" ? "active" : undefined}>
              <Link href={active === "admin" ? "#" : "/admin/projektai"}>
                <a className="nav-link">ADMIN</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
