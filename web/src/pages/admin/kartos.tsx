import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Box, Flex, Grid, Stack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import { requiredDropzoneValidation } from "../../components/DropzoneField";
import DropzoneFieldMulti from "../../components/DropzoneFieldMulti";
import InputField from "../../components/InputField";
import { createUrqlClient } from "../../utils/createUrqlClient";
import dynamic from "next/dynamic";
const SelectProjectsInput = dynamic(
  () => import("../../components/SelectProjectsInput"),
  { ssr: false }
);

interface KartosProps {}

interface KartosFormTypes {
  images: File[] | null;
  title: string;
  description: string;
  projectIds: number[] | null;
}

const Kartos: FC<KartosProps> = ({}) => {
  return (
    <AdminLayout active="kartos" pageTitle="Kartos">
      <AdminTopBar pageName="Kartos" />
      <div className="Admin-content">
        <Button
          variant="outline"
          size="sm"
          colorScheme="blue"
          leftIcon={<FaPlus />}
        >
          Pridėti naują kartą
        </Button>
        <Stack mt="1em" spacing="1em">
          <Formik<KartosFormTypes>
            initialValues={{
              title: "",
              description: "",
              images: null,
              projectIds: null,
            }}
            onSubmit={(values) => {
              console.log("values: ", values);
            }}
            validateOnBlur={false}
          >
            {({ isSubmitting }) => (
              <Form style={{ display: "block" }}>
                <Grid
                  templateColumns="minmax(300px, 1fr) 1fr"
                  shadow="md"
                  rounded="md"
                  p="1em"
                  bg="white"
                  columnGap="1em"
                >
                  <Flex direction="column">
                    <Flex justifyContent="space-between">
                      <Button
                        mb="1em"
                        width="fit-content"
                        size="sm"
                        colorScheme="red"
                      >
                        Ištrinti
                      </Button>

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        colorScheme="blue"
                        size="sm"
                      >
                        Išsaugoti
                      </Button>
                    </Flex>
                    <InputField name="title" placeholder="Titulinis" required />
                    <Box mt="1em">
                      <InputField
                        name="description"
                        placeholder="Kartos aprašymas"
                        isTextarea
                        required
                      />
                    </Box>
                    <Box mt="1em">
                      <Field
                        name="images"
                        validate={requiredDropzoneValidation}
                        required
                        component={DropzoneFieldMulti}
                        maxFiles={2}
                      />
                    </Box>
                  </Flex>
                  <Flex direction="column">
                    <SelectProjectsInput name="projectIds" />

                    <Flex direction="column">
                      <ButtonGroup w="100%" isAttached>
                        <IconButton
                          aria-label="Išstrinti"
                          //variant="outline"
                          colorScheme="red"
                          icon={<FaTrashAlt />}
                          shadow="base"
                          size="sm"
                        />
                        <Button
                          w="100%"
                          colorScheme="blue"
                          size="sm"
                          shadow="base"
                          variant="link"
                          justifyContent="start"
                        >
                          <Box mx="0.5em">
                            Nu labai didelis titulinis cia dabar!
                          </Box>
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  </Flex>
                </Grid>
              </Form>
            )}
          </Formik>
        </Stack>
      </div>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Kartos);
Kartos;
