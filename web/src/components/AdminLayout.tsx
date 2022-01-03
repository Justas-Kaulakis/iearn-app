import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { useIsLoggedInQuery } from "../generated/graphql";
import Layout from "./Layout";
import SideBar, { AdminLinks } from "./SideBar";
import Error from "next/error";

interface AdminLayoutProps {
  active: AdminLinks;

  pageTitle?: string;
  bg?: string;
}

const AdminLayout: FC<AdminLayoutProps> = ({
  active,
  children,
  pageTitle,
  bg,
}) => {
  const [{ data, fetching }] = useIsLoggedInQuery();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  if (fetching) return null;
  if (!fetching && !data?.isLoggedIn) {
    router.replace("/admin/login");
    return null;
    //return <Error statusCode={401} title="Apribotas priėjimas" />;
  }
  return (
    <Layout pageTitle={pageTitle} isFooter={false} active="admin">
      <ChakraProvider>
        <Grid
          h="calc(100vh - 3em)"
          gridTemplateColumns={`${collapsed ? 60 : 200}px auto`}
        >
          <GridItem>
            <SideBar
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              active={active}
            />
          </GridItem>
          <GridItem bg="#f1f1f1">{children}</GridItem>
        </Grid>
      </ChakraProvider>
    </Layout>
  );
};

export default AdminLayout;
