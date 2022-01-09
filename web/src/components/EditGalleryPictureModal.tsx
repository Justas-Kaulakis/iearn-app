import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { OperationContext } from "@urql/core";
import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import {
  GalleryInput,
  useCreateGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useUpdateGalleryImageMutation,
} from "../generated/graphql";
import DropzoneField, { requiredDropzoneValidation } from "./DropzoneField";
import InputField from "./InputField";
import Popup from "./Popup";

interface EditGalleryPictureModalProps {
  item?: { id: number; resizedUrl: string; description?: string };
  create?: boolean;
  redoQuery: (opts?: Partial<OperationContext>) => void;
}

interface galleryItemFormType {
  image: null | File;
  description: string;
}

const EditGalleryPictureModal: FC<EditGalleryPictureModalProps> = ({
  item,
  create = false,
  redoQuery,
  children,
}) => {
  const maxW = 400;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createGalleryImage] = useCreateGalleryImageMutation();
  const [, updateGalleryImage] = useUpdateGalleryImageMutation();
  const [, deleteGalleryImage] = useDeleteGalleryImageMutation();
  async function handleCreate(values: Omit<GalleryInput, "maxW">) {
    //console.log("Bam!: ", values);
    await createGalleryImage({
      input: { ...values, maxW },
    });
    redoQuery({ requestPolicy: "network-only" });
    onClose();
  }
  async function handleUpdate(values: Omit<GalleryInput, "maxW">) {
    //console.log("Bam!: ", values);
    await updateGalleryImage({
      id: item.id,
      input: { ...values, maxW },
    });
    redoQuery({ requestPolicy: "network-only" });
    onClose();
  }
  return (
    <>
      {(children as any)(onOpen)}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="1em">
          <ModalHeader>
            {create ? "Pridėti nuotrauką" : "Redagavimas"}
          </ModalHeader>
          <ModalCloseButton />
          <Formik<galleryItemFormType>
            initialValues={{
              image: null,
              description: item?.description || "",
            }}
            onSubmit={create ? handleCreate : handleUpdate}
            validateOnBlur={false}
          >
            {({ isSubmitting }) => (
              <Form style={{ display: "block" }}>
                <ModalBody>
                  <Box>
                    <Field
                      name="image"
                      validate={create && requiredDropzoneValidation}
                      required={create}
                      component={DropzoneField}
                      imageUrl={item?.resizedUrl || undefined}
                    />
                  </Box>
                  <Box mt="1em">
                    <InputField
                      placeholder="Aprašymas"
                      name="description"
                      label="Vaizdo aprašymas"
                      isTextarea
                    />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    colorScheme="blue"
                  >
                    {create ? "Pridėti nuotrauką" : "Išsaugoti"}
                  </Button>
                  {create ? null : (
                    <Button
                      ml={3}
                      disabled={isSubmitting}
                      colorScheme="red"
                      onClick={async () => {
                        await deleteGalleryImage({ id: item.id });
                        onClose();
                        redoQuery({ requestPolicy: "network-only" });
                      }}
                    >
                      Išstrinti
                    </Button>
                  )}
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditGalleryPictureModal;
