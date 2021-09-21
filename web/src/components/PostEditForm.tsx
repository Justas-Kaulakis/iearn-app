import { Flex, Box, FormLabel, Checkbox, Button } from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers, FormikBag } from "formik";
import React, { FC } from "react";
import DropzoneField, {
  DropzoneFileType,
  requiredDropzoneValidation,
} from "./DropzoneField";
import InputField from "./InputField";
import Popup from "./Popup";

interface FormInputType {
  title: string;
  description: string;
  publish: boolean;
  image: DropzoneFileType | null;
}

interface PostFormInitValues {
  title: string;
  description: string;
  publish: boolean;
  imageUrl: string;
}

interface PostEditFormProps {
  data?: PostFormInitValues;
  isNew?: boolean;
  onSubmit: (
    values: FormInputType,
    formikHelpers: FormikHelpers<FormInputType>
  ) => void | Promise<any>;
  onDelete?: () => void | Promise<any>;
  setSavedHandle?: (isSaved: boolean) => void;
}

const PostEditForm: FC<PostEditFormProps> = ({
  data = {
    title: "",
    description: "",
    publish: false,
    imageUrl: "",
  },
  isNew,
  onSubmit,
  onDelete,
  setSavedHandle,
}) => {
  return (
    <Formik<FormInputType, {}>
      initialValues={{
        image: null,
        title: data.title,
        description: data.description,
        publish: data.publish,
      }}
      validate={(values) => {
        if (setSavedHandle !== undefined) {
          setSavedHandle(false);
        }
        // console.log(values);
        // for (const property in values) {
        //   if(values[property] !== )
        //   console.log(property, values[property]);
        // }
      }}
      onSubmit={onSubmit}
      validateOnBlur={false}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Flex width="100%" fontSize="0.8em" p="1em" direction="column">
            <InputField
              required
              placeholder="Pavadinimas"
              name="title"
              label="Pavadinimas"
              autoComplete="off"
            />
            <Box mt="1em">
              <InputField
                required
                placeholder="Trumpas aprašymas"
                name="description"
                label="Projekto aprašymas"
                isTextarea
              />
            </Box>
            <Box mt="1em">
              <FormLabel>Projekto kortelės nuotrauka</FormLabel>
              <Field
                name="image"
                validate={isNew && requiredDropzoneValidation}
                required={isNew}
                component={DropzoneField}
                imageUrl={data.imageUrl}
                dim={{ x: 300, y: 300 }}
              />
            </Box>
            {isNew ? null : (
              <Box mt="1em">
                <Field name="publish">
                  {({ field }: any) => (
                    <Checkbox
                      isChecked={field.value}
                      name="publish"
                      onClick={() => {
                        console.log(field);
                      }}
                      {...field}
                    >
                      Ar paskelbti?
                    </Checkbox>
                  )}
                </Field>
              </Box>
            )}

            <Button
              mt="2em"
              type="submit"
              w="100%"
              colorScheme={isNew ? "blue" : "teal"}
              disabled={isSubmitting}
            >
              {isNew ? "Rašyti straipsnį" : "Išsaugoti"}
            </Button>
            {isNew ? null : (
              <Popup
                title={"Ar ištrinti?"}
                closeText={"Ne"}
                okText="Taip, ištrinti"
                action={onDelete}
              >
                {(onOpen: () => void) => (
                  <Button
                    mt="1em"
                    w="100%"
                    colorScheme="red"
                    disabled={isSubmitting}
                    onClick={onOpen}
                  >
                    Ištrinti
                  </Button>
                )}
              </Popup>
            )}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default PostEditForm;
