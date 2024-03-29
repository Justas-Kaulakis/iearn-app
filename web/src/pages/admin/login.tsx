import React, { FC } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import {
  AdminLogInput,
  useForgotPasswordMutation,
  useIsLoggedInQuery,
  useLoginMutation,
} from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { myToast } from "../../utils/toasts";

interface LoginFormInputType {
  usernameOrEmail: string;
  password: string;
}

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const router = useRouter();

  const [, login] = useLoginMutation();
  const [{ data, fetching }] = useIsLoggedInQuery({
    requestPolicy: "network-only",
  });
  const [, forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  if (!fetching && data?.isLoggedIn) {
    console.log("Already logged in!", data);
    router.push("/admin/projektai");
  }

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        bgColor="#f1f1f1"
        justifyContent="center"
        align="center"
        h="100vh"
        w="100vw"
        backgroundImage={"url(/login_bg.png)"}
      >
        <Heading mb="1em" textAlign="center">
          Admin prisijungimas
        </Heading>

        <Box
          boxShadow="lg"
          mx="1em"
          w="100%"
          maxW={400}
          rounded="lg"
          p={5}
          bgColor="white"
        >
          <Formik<AdminLogInput>
            initialValues={{ usernameOrEmail: "", password: "" }}
            validate={(values) => {
              let errors: any = {};
              if (!values.password) {
                errors.password = "privaloma";
              } else if (values.password.length < 6) {
                errors.password = "Slaptažodis per trumpas";
              }
              return errors;
            }}
            onSubmit={async (
              { usernameOrEmail, password },
              { setSubmitting, setErrors }
            ) => {
              const { data } = await login({
                options: {
                  usernameOrEmail,
                  password,
                },
              });
              if (data?.login.errors) {
                setErrors(toErrorMap(data.login.errors));
              } else {
                console.log("Logged In!!!");
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/admin/projektai");
                }
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ display: "block" }}>
                <InputField
                  required
                  placeholder="vardas arba el. paštas"
                  name="usernameOrEmail"
                  label="Admin vardas arba el. paštas"
                />
                <br />
                <InputField
                  required
                  placeholder="slaptažodis"
                  name="password"
                  label="Slaptažodis"
                  type="password"
                />
                <Flex align="center" justifyContent="space-between" mt={1}>
                  <Button
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    mt={4}
                    type="submit"
                    colorScheme="teal"
                  >
                    Prisijungti
                  </Button>
                  <Button
                    ml="auto"
                    variant="link"
                    onClick={() => {
                      forgotPassword();
                      myToast(
                        toast,
                        "info",
                        "Išsiuntėme laišką į admin el. paštą."
                      );
                    }}
                  >
                    Pamiršau slaptažodį.
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
