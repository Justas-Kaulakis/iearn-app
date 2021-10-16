import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import DropzoneField, {
  DropzoneFileType,
  requiredDropzoneValidation,
} from "../../components/DropzoneField";
import InputField from "../../components/InputField";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface apieMusProps {}

const apieMus: FC<apieMusProps> = ({}) => {
  const contentLimit = 320;
  const [{ data, fetching, error }] = useGetAboutQuery();
  const [, updateAbout] = useUpdateAboutMutation();
  if (error) {
    console.log("Error loading About data");
  }

  return (
    <>
      <AdminLayout scrollable active="apie-mus">
        <AdminTopBar pageName={"mano-info / Apie mus"} />
        {fetching ? null : (
          <Box m="1em">
            <Flex
              rounded="md"
              width="100%"
              minW="210px"
              maxW="600px"
              direction="column"
              p="1em"
              bg="white"
              mx="auto"
              boxShadow="md"
            >
              <Heading size="md">Redaguoti Apie mus:</Heading>
              <Formik<{
                content: string;
                image: File | null;
              }>
                initialValues={{
                  content: data?.getAbout.content || "",
                  image: null,
                }}
                validate={({ content }) => {
                  if (content.length > contentLimit) {
                    return {
                      content: `sibolių limitas - ${contentLimit}`,
                    };
                  }
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                  console.log(values);
                  updateAbout({
                    id: data?.getAbout.id,
                    input: values,
                  });
                }}
                validateOnBlur={false}
              >
                {({ isSubmitting }) => (
                  <Form style={{ display: "block" }}>
                    <Box mt="0.5em" minWidth="150px">
                      <InputField
                        label="Klubo pristatymas / aprašymas:"
                        name="content"
                        placeholder={`iki ${contentLimit} sibolių`}
                        required
                        isTextarea
                        maxLength={120}
                      />
                      <Box mt="1em">
                        <FormLabel>Sekcijos nuotrauka:</FormLabel>
                        <Field
                          name="image"
                          validate={requiredDropzoneValidation}
                          required
                          component={DropzoneField}
                          imageUrl={data?.getAbout.imageUrl}
                          dim={{ x: 600, y: 600 }}
                        />
                      </Box>
                      <Flex mt="1em" justifyContent="end">
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          colorScheme="blue"
                          size="md"
                        >
                          Išsaugoti
                        </Button>
                      </Flex>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Flex>
          </Box>
        )}
      </AdminLayout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(apieMus);
