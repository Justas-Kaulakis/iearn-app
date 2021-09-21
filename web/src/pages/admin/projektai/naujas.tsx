import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { FC, useRef } from "react";
import AdminLayout from "../../../components/AdminLayout";
import AdminTopBar from "../../../components/AdminTopBar";
import PostEditForm from "../../../components/PostEditForm";
//import Editor from "../../../components/Editor";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useCreateProjectMutation } from "../../../generated/graphql";
import { useRouter } from "next/dist/client/router";

//import Editor from "../../../components/Editor";
const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

interface redaguotiProps {}

const redaguoti: NextPage<redaguotiProps> = ({}) => {
  const [, createProject] = useCreateProjectMutation();
  const router = useRouter();

  return (
    <>
      <AdminLayout pageTitle="Naujas projektas" active="projektai">
        <AdminTopBar pageName="projektai / naujas projektas" />
        <Flex
          bg="#f1f1f1"
          justifyContent="center"
          width="100%"
          height="calc(100% - 2.4em)"
        >
          <Box pt="1em" width="400px">
            <PostEditForm
              isNew
              onSubmit={async (values, { setSubmitting }) => {
                console.log("Submiting: ", values);
                const { data, error } = await createProject({
                  input: {
                    title: values.title,
                    description: values.description,
                    body: "",
                    image: values.image,
                    isPublished: values.publish,
                  },
                });
                console.log("Response: ", data);
                if (error) {
                  console.log("Submitting Error: ", error);
                  return;
                }
                router.replace(`/admin/projektai/${data.createProject.id}`);
              }}
            />
          </Box>
        </Flex>

        {/* <Grid
          height="calc(100% - 2.4em)"
          templateColumns={`minmax(400px, 1fr) ${formW}px`}
        >
          <GridItem w={`calc(100% - ${formW})`} bg="#f1f1f1">
            <Flex maxWidth="600px" mx="auto" h="100%">
              <Button>Rašyti teks</Button>
              {/* <Editor callbackEditor={callbackEditor} /> * /}
            </Flex>
          </GridItem>
          <GridItem>
            
          </GridItem>
        </Grid> */}
      </AdminLayout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(redaguoti);
