import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  Box,
  Button,
  CloseButton,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import { useRouter } from "next/router";
import Editor from "../../components/Editor";
import {
  useHistoryQuery,
  useUpdateHistoryBodyMutation,
} from "../../generated/graphql";
import { NextPage } from "next";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Form, Formik } from "formik";

const Istorija: NextPage<{}> = ({}) => {
  const formW = 300;
  const maxEditW = 700;
  const callbackEditor = useRef<any>();
  const router = useRouter();
  const [saved, setSaved] = useState(true);
  const [{ data, fetching, error }] = useHistoryQuery();
  const [, updateHistory] = useUpdateHistoryBodyMutation();

  return (
    <AdminLayout active="istorija">
      <AdminTopBar pageName="istorija">
        <Formik
          initialValues={{}}
          onSubmit={async () => {
            await updateHistory({
              id: data?.history.id,
              body: callbackEditor.current.getData(),
            });
            setSaved(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Button
                bg="lightblue"
                variant="outline"
                mr="1em"
                size="sm"
                type="submit"
                colorScheme="blue"
                disabled={isSubmitting}
              >
                Išsaugoti
              </Button>
            </Form>
          )}
        </Formik>

        <Link href={`/istorija`}>
          <a style={{ display: "flex" }}>
            <Tag
              _hover={{ backgroundColor: "#e5ffed" }}
              className="hoverCursor"
              my="auto"
              mr="1em"
              colorScheme="green"
            >
              <TagLabel>Peržiūrėti</TagLabel>
              <TagRightIcon as={FaExternalLinkAlt} />
            </Tag>
          </a>
        </Link>
        <Tag colorScheme={saved ? "green" : "red"} bg="white" variant="outline">
          <TagLabel>{saved ? "Išsaugota" : "Neišsaugota"}</TagLabel>
        </Tag>
      </AdminTopBar>
      <Box width="100%" maxWidth={maxEditW} mx="auto" h="calc(100% - 2.4em)">
        {/* EDITOOOOR */}
        {fetching ? null : (
          <Editor
            id={data?.history.id}
            data={data?.history.body}
            callbackEditor={callbackEditor}
            setSavedHandle={(isSaved) => {
              setSaved(isSaved);
            }}
            isFromHistory
          />
        )}
      </Box>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  Istorija as any
);
