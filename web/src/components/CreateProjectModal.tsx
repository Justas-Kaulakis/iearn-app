import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useCreateProjectMutation } from "../generated/graphql";
import DropzoneField, { requiredDropzoneValidation } from "./DropzoneField";
import InputField from "./InputField";

interface PostFormInitValues {
  title: string;
  description: string;
  imageUrl: string;
}

interface CreateProjectModalProps {}

interface FormInputType {
  title: string;
  description: string;
  image: File | null;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createProject] = useCreateProjectMutation();
  const router = useRouter();
  return (
    <>
      {(children as any)(onOpen)}
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent m="1em">
          <ModalHeader>Pridėti projektą</ModalHeader>
          <ModalCloseButton />
          <Formik<FormInputType>
            initialValues={{
              image: null,
              title: "",
              description: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Submiting: ", values);
              const { data, error } = await createProject({
                input: {
                  title: values.title,
                  description: values.description,
                  body: "",
                  image: values.image,
                  isPublished: false,
                },
              });
              console.log("Response: ", data);
              if (error) {
                console.log("Submitting Error: ", error);
                return;
              }
              router.replace(`/admin/projektai/${data.createProject.id}`);
            }}
            validateOnBlur={false}
          >
            {({ isSubmitting }) => (
              <Form style={{ display: "block" }}>
                <ModalBody>
                  <InputField
                    required
                    placeholder="Pavadinimas"
                    name="title"
                    label="Pavadinimas"
                    autoComplete="off"
                  />
                  <Box mt="1em">
                    <InputField
                      placeholder="Aprašymas"
                      name="description"
                      label="Projekto aprašymas"
                      isTextarea
                    />
                  </Box>
                  <Box mt="1em">
                    <Field
                      name="image"
                      validate={requiredDropzoneValidation}
                      required
                      component={DropzoneField}
                    />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    colorScheme="blue"
                  >
                    Kurti toliau...
                  </Button>
                  <Button
                    ml={3}
                    colorScheme="red"
                    variant="outline"
                    onClick={onClose}
                  >
                    Atšaukti
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
