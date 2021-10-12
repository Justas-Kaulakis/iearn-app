import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/layout";
import { MenuDivider } from "@chakra-ui/menu";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import InputField from "../../components/InputField";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface ManoInfoProps {}

const ManoInfo: FC<ManoInfoProps> = ({}) => {
  const [{ data, fetching, error }] = useMeQuery();
  if (error) {
    console.log("Error loading Admin data: ", error);
  }
  return (
    <AdminLayout scrollable active="mano-info">
      <AdminTopBar pageName={`mano-info / ${data?.me?.username}`} />
      <VStack minWidth="300px" p="1em">
        {fetching && !data?.me ? null : (
          <Box
            maxWidth="500px"
            width="100%"
            shadow="lg"
            rounded="1em"
            p="1em"
            bg="white"
          >
            <Heading size="md">Prisijungimo informacija</Heading>
            <Divider my="5px" />
            <Formik<{ username: string; email: string }>
              initialValues={{
                username: data?.me?.username || "",
                email: data?.me?.email || "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form style={{ display: "block" }}>
                  <Flex flexWrap="wrap" justifyContent="space-around">
                    <Box minWidth="150px">
                      <InputField
                        label="prisijungimo  vardas:"
                        name="username"
                        placeholder="Naujas Admin vardas"
                        required
                        size="sm"
                      />
                    </Box>
                    <Box minWidth="150px">
                      <InputField
                        label="el. paštas:"
                        name="email"
                        placeholder="Naujas El. paštas"
                        required
                        size="sm"
                      />
                      <Flex mt="1em" justifyContent="end">
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          colorScheme="red"
                          size="md"
                        >
                          Keisti duomenis
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Form>
              )}
            </Formik>
            <Divider my="1em" />
            <Heading mb="1em" size="sm">
              Pakeisti slaptažodį:
            </Heading>
            <Formik<{
              password: string;
              newPassword: string;
              repeatNewPassword: string;
            }>
              initialValues={{
                password: "",
                newPassword: "",
                repeatNewPassword: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form style={{ display: "block" }}>
                  <Flex flexWrap="wrap" justifyContent="space-around">
                    <Box mt="0.5em" minWidth="150px">
                      <InputField
                        label="Slaptažodis:"
                        name="password"
                        placeholder="Dabartinis slaptažodis"
                        required
                        size="sm"
                      />
                    </Box>
                    <Box mt="0.5em" minWidth="150px">
                      <InputField
                        label="Naujas slaptažodis:"
                        name="newPassword"
                        placeholder="Naujas slaptažodis"
                        required
                        size="sm"
                      />
                    </Box>
                    <Box mt="0.5em" minWidth="150px">
                      <InputField
                        label="Pakartoti naują slaptažodį:"
                        name="repeatNewPassword"
                        placeholder="Pakartoti naują slaptažodį"
                        required
                        size="sm"
                      />
                      <Flex mt="1em" justifyContent="end">
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          colorScheme="red"
                          size="md"
                        >
                          Atnaujinti slaptažodį
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </VStack>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ManoInfo
) as any;
