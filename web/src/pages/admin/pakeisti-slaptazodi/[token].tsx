import { Button } from "@chakra-ui/button";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import InputField from "../../../components/InputField";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";
import NextLink from "next/link";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import {
  useChangePasswordTokenMutation,
  useForgotPasswordMutation,
} from "../../../generated/graphql";
import { myToast } from "../../../components/toasts";

const PakeistiSlaptazodi: NextPage<{ token: string }> = ({}) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordTokenMutation();
  const [tokenError, setTokenError] = useState("");
  const [worked, setWorked] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  return (
    <ChakraProvider>
      <Flex
        direction="column"
        bgColor="#f1f1f1"
        justifyContent="center"
        align="center"
        h="100vh"
        w="100vw"
      >
        {worked ? (
          <NextLink href="/admin/projektai">
            <Link colorScheme="teal" bg="white" rounded="sm" p="0.5em">
              <h3>Toliau</h3>
            </Link>
          </NextLink>
        ) : (
          <>
            <Formik<{ newPassword: string }>
              initialValues={{ newPassword: "" }}
              onSubmit={async (values, { setErrors }) => {
                const { data, error } = await changePassword({
                  token:
                    typeof router.query.token === "string"
                      ? router.query.token
                      : "",
                  newPassword: values.newPassword,
                });
                if (data?.changePasswordToken || error) {
                  const errorMap = toErrorMap(data.changePasswordToken);

                  if ("token" in errorMap) {
                    setTokenError(errorMap.token);
                  }
                  setErrors(errorMap);
                } else {
                  // worked
                  setWorked(true);
                  myToast(toast, "good", "Slaptažodis pakeistas!");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form style={{ display: "block" }}>
                  <Flex p="1em" bg="white" direction="column">
                    <InputField
                      name="newPassword"
                      placeholder="naujas slaptažodis"
                      label="Naujas slaptažodis"
                      type="password"
                    />

                    {tokenError ? (
                      <Flex wrap="wrap" mt="1em">
                        <Box mr="1em" color="red">
                          {tokenError}
                        </Box>
                        <Button
                          ml="auto"
                          colorScheme="teal"
                          variant="link"
                          onClick={() => {
                            forgotPassword();
                            myToast(
                              toast,
                              "info",
                              "Išsiuntėme naują laišką į admin el. paštą."
                            );
                          }}
                        >
                          Gauti naują laišką.
                        </Button>
                      </Flex>
                    ) : null}
                    <Button
                      isLoading={isSubmitting}
                      mt={4}
                      type="submit"
                      colorScheme="teal"
                    >
                      pakeisti slaptažodį
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  PakeistiSlaptazodi as any
);
