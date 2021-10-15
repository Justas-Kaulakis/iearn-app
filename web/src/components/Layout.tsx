import React, { FC } from "react";
import Footer from "./Footer";
import Header, { HeaderProps } from "./Header";
import Head from "next/head";
import { capitalize } from "../utils/capitalize";

type LayoutProps = {
  isFooter?: boolean;
  pageTitle?: string;
  noHead?: boolean;
} & HeaderProps;

const Layout: FC<LayoutProps> = ({
  pageTitle,
  active,
  isFooter = true,
  noHead = false,
  children,
}) => {
  const link = `${process.env.NEXT_PUBLIC_FE_URL_BASE}`;
  return (
    <>
      {noHead ? null : (
        <Head>
          <title>
            iEARN - {pageTitle || capitalize(active) || "Žiežmariai"}
          </title>
          <link
            rel="shortcut icon"
            type="image/svg + xml"
            href="/Circle-Icon.svg"
          />
          <meta property="og:url" content={link} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="lt_LT" />
          <meta property="og:title" content="iEARN Žiežmariai klubas!" />
          <meta property="og:description" content={null} />
          <meta property="og:image" content={null} />
        </Head>
      )}
      <Header active={active} />
      {/* <div className="base">{children}</div> */}
      {children}
      {!isFooter ? null : <Footer />}
    </>
  );
};

export default Layout;
