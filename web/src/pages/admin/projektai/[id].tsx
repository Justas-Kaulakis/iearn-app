import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import AdminTopBar from "../../../components/AdminTopBar";
import { useRouter } from "next/router";
import PostEditForm from "../../../components/PostEditForm";
import Editor from "../../../components/Editor";
import {
  useDeleteProjectMutation,
  useProjectQuery,
  useUpdateProjectMutation,
} from "../../../generated/graphql";
import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";

const Redaguoti: NextPage<{}> = ({}) => {
  const formW = 300;
  const maxEditW = 600;
  const callbackEditor = useRef<any>();
  const router = useRouter();
  const [saved, setSaved] = useState(true);
  const projectId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : "Bad";
  const [{ data, error, fetching }] = useProjectQuery({
    pause: projectId === "Bad",
    variables: {
      id: projectId as number,
    },
  });
  const [, updateProject] = useUpdateProjectMutation();
  const [, deleteProject] = useDeleteProjectMutation();
  if (error) {
    console.log("Error: ", error);
  }

  if (fetching) {
    return null;
  }
  if (error || data?.project?.error) {
    return <Error statusCode={404} title={data?.project?.error} />;
  }
  const { project } = data?.project || { project: null };
  console.log("Project: ", project);
  return (
    <AdminLayout active="projektai">
      <AdminTopBar pageName={`projektai / redaguoti / ${project?.title}`}>
        <Tag colorScheme={saved ? "green" : "red"} bg="white" variant="outline">
          <TagLabel>{saved ? "Išsaugota" : "Neišsaugota"}</TagLabel>
        </Tag>
      </AdminTopBar>
      <Grid
        height="calc(100% - 2.4em)"
        templateColumns={`minmax(420px, 1fr) ${formW}px`}
      >
        <GridItem display="flex" justifyContent="center" bg="#f1f1f1">
          <Box
            width="100%"
            maxWidth={maxEditW}
            //mx="auto"
            h="100%"
          >
            {/* EDITOOOOR */}
            <Editor
              id={projectId as number}
              data={project?.body}
              callbackEditor={callbackEditor}
              setSavedHandle={(isSaved) => {
                setSaved(isSaved);
              }}
            />
          </Box>
        </GridItem>
        <GridItem zIndex="1">
          <PostEditForm
            data={{
              title: project?.title,
              description: project?.description,
              publish: project?.isPublished,
              imageUrl: project?.imageUrl,
            }}
            setSavedHandle={(isSaved) => {
              setSaved(isSaved);
            }}
            onDelete={async () => {
              console.log("DELETING!!");
              const { error } = await deleteProject({
                id: projectId as number,
              });
              if (error) {
                console.log("%c Error deleting project project", {
                  color: "red",
                });
              } else {
                router.push("/admin/projektai");
              }
            }}
            onSubmit={async (values) => {
              console.log("Values: ", values);
              //console.log(callbackEditor.current.getData());
              const { data: response, error } = await updateProject({
                id: projectId as number,
                input: {
                  title: values.title,
                  description: values.description,
                  body: callbackEditor.current.getData(),
                  image: values.image || null,
                  isPublished: values.publish,
                },
              });
              if (error) {
                console.error("UPDATE ERROR: ", error);
              }
              setSaved(true);
              //router.reload();
              console.log(response);
            }}
          />
        </GridItem>
      </Grid>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  Redaguoti as any
);
