import { Box, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { useIsLoggedInQuery } from "../generated/graphql";
import Layout from "./Layout";
import SideBar, { AdminLinks, SideBarProps } from "./SideBar";
import Error from "next/error";

interface AdminLayoutProps {
  active: AdminLinks;
  scrollable?: boolean;
  pageTitle?: string;
  bg?: string;
}

const AdminLayout: FC<AdminLayoutProps> = ({
  scrollable = true,
  active,
  children,
  pageTitle,
  bg,
}) => {
  const [{ data, fetching }] = useIsLoggedInQuery();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  if (!fetching && !data?.isLoggedIn) {
    //router.replace("/");
    return <Error statusCode={401} title="Apribotas priėjimas" />;
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
          <GridItem
            bg="#f1f1f1"
            style={!scrollable ? undefined : { overflowY: "scroll" }}
          >
            {children}
          </GridItem>
        </Grid>
      </ChakraProvider>

      {/* <Flex>
        <SideBar active={active} />
        <Box h="calc(100vh - 3em)" w="100%" bgColor="floralwhite">
          {children}
        </Box>
      </Flex> */}
    </Layout>
  );
};

export default AdminLayout;
