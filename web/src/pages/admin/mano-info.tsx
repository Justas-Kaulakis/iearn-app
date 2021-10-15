import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Heading, VStack } from "@chakra-ui/layout";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import InputField from "../../components/InputField";
import {
  useChangePasswordMutation,
  useChangeUsernameEmailMutation,
  useMeQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { FaCheckCircle } from "react-icons/fa";
import { myToast } from "../../components/toasts";

interface ManoInfoProps {}

const ManoInfo: FC<ManoInfoProps> = ({}) => {
  const [{ data, fetching, error }] = useMeQuery();
  const [nameEmailSaved, setNameEmailSaved] = useState(true);
  const [paswordSaved, setPaswordSaved] = useState(true);
  const [, changeUsernameEmail] = useChangeUsernameEmailMutation();
  const [, changePassword] = useChangePasswordMutation();
  /// popping messages
  const toast = useToast();

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
            <Formik<{ password: string; username: string; email: string }>
              initialValues={{
                password: "",
                username: data?.me?.username || "",
                email: data?.me?.email || "",
              }}
              validate={({ username, email, password }) => {
                setNameEmailSaved(false);
              }}
              onSubmit={async (values, { setErrors, resetForm }) => {
                //console.log(values);
                const { data } = await changeUsernameEmail({ input: values });
                if (data?.changeUsernameEmail) {
                  setErrors(toErrorMap(data.changeUsernameEmail));
                } else {
                  setNameEmailSaved(true);
                  myToast(toast, "good", "Vardas arba el. paštas pakeistas.");
                  resetForm({ password: "" } as any);
                }
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form style={{ display: "block" }}>
                  <Box minWidth="150px">
                    <InputField
                      label="Prisijungimo  vardas:"
                      name="username"
                      placeholder="naujas Admin vardas"
                      required
                      size="sm"
                    />
                    <Box mt="0.5em">
                      <InputField
                        label="el. paštas:"
                        name="email"
                        placeholder="naujas El. paštas"
                        required
                        size="sm"
                      />
                    </Box>
                    {nameEmailSaved ? null : (
                      <>
                        <Box mt="0.5em">
                          <InputField
                            label="Patvirtinti slaptažodžiu:"
                            name="password"
                            placeholder="slaptažodis"
                            required
                            size="sm"
                            type="password"
                          />
                        </Box>
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
                      </>
                    )}
                  </Box>
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
              validate={({ newPassword, repeatNewPassword }) => {
                if (newPassword && repeatNewPassword)
                  if (newPassword !== repeatNewPassword) {
                    return {
                      repeatNewPassword: "Slaptažodis nesutampa.",
                    };
                  }
                return {};
              }}
              onSubmit={async (
                { repeatNewPassword, ...values },
                { setErrors, resetForm }
              ) => {
                const { data } = await changePassword({ input: values });
                if (data?.changePassword) {
                  setErrors(toErrorMap(data.changePassword));
                } else {
                  resetForm();
                  setNameEmailSaved(true);
                  myToast(toast, "good", "Slaptažodis pakeistas.");
                }
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form style={{ display: "block" }}>
                  <Box mt="0.5em" minWidth="150px">
                    <InputField
                      label="Dabartinis slaptažodis:"
                      name="password"
                      placeholder="dabartinis slaptažodis"
                      required
                      size="sm"
                      type="password"
                    />
                    <InputField
                      label="Naujas slaptažodis:"
                      name="newPassword"
                      placeholder="naujas slaptažodis"
                      required
                      size="sm"
                      type="password"
                    />
                    <Box mt="0.5em">
                      <InputField
                        label="Pakartoti naują slaptažodį:"
                        name="repeatNewPassword"
                        placeholder="pakartoti naują slaptažodį"
                        required
                        size="sm"
                        type="password"
                      />
                    </Box>
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
