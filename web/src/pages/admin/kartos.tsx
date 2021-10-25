import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Box, Flex, Grid, Stack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import DropzoneField, {
  requiredDropzoneValidation,
} from "../../components/DropzoneField";
import InputField from "../../components/InputField";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface KartosProps {}

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
          <Grid
            templateColumns="1fr 1fr"
            shadow="md"
            rounded="md"
            p="1em"
            bg="white"
            columnGap="1em"
          >
            <Flex direction="column">
              <Button mb="1em" width="fit-content" size="sm" colorScheme="red">
                Ištrinti
              </Button>
              <Formik initialValues={{}} onSubmit={() => {}}>
                {() => (
                  <Form style={{ display: "block" }}>
                    <InputField
                      name="description"
                      placeholder="Kartos aprašymas"
                      isTextarea
                    />
                    <Box mt="1em">
                      <Field
                        name="image"
                        validate={requiredDropzoneValidation}
                        required
                        component={DropzoneField}
                      />
                    </Box>
                  </Form>
                )}
              </Formik>
            </Flex>
            <Flex direction="column">
              <Button
                rightIcon={<FaPlus />}
                ml="auto"
                mb="1em"
                size="sm"
                variant="outline"
                colorScheme="blue"
              >
                Pridėti projektą
              </Button>
              <Flex direction="column">
                <Box>
                  <ButtonGroup isAttached>
                    <IconButton
                      aria-label="Išstrinti"
                      //variant="outline"
                      colorScheme="red"
                      icon={<FaTrashAlt />}
                      shadow="base"
                      size="sm"
                    />
                    <Button
                      colorScheme="blue"
                      size="sm"
                      shadow="base"
                      variant="link"
                    >
                      <Box mx="0.5em">
                        Nu labai didelis titulinis cia dabar!
                      </Box>
                    </Button>
                  </ButtonGroup>
                </Box>
              </Flex>
            </Flex>
          </Grid>
        </Stack>
      </div>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Kartos);
Kartos;
