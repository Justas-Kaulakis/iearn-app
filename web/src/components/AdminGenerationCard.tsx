import { Grid, Flex, Box, Link, Heading } from "@chakra-ui/layout";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Generation,
  GenerationImage,
  Project,
  useCreateGenerationMutation,
  useUpdateGenerationMutation,
} from "../generated/graphql";
import { requiredDropzoneValidation } from "./DropzoneField";
import DropzoneFieldMulti, {
  DropzoneMultiValueType,
} from "./DropzoneFieldMulti";
import InputField from "./InputField";
import { SelectProjectType } from "./SelectProjectsInput";
const SelectProjectsInput = dynamic(() => import("./SelectProjectsInput"), {
  ssr: false,
});

interface AdminGenerationCardProps {
  gen?: {
    __typename?: "Generation";
  } & Pick<Generation, "id" | "title" | "description"> & {
      images?: Pick<GenerationImage, "id" | "imageUrl">[];
      projects?: Pick<Project, "id" | "title" | "description">[];
    };
  create?: boolean;
}

interface KartosFormTypes {
  images: DropzoneMultiValueType;
  title: string;
  description: string;
  search: string;
}

const AdminGenerationCard: FC<AdminGenerationCardProps> = ({
  gen,
  create = false,
}) => {
  const [listProjects, setListProjects] = useState<Array<SelectProjectType>>(
    gen.projects
  );
  const [, createGeneration] = useCreateGenerationMutation();
  const [, updateGeneration] = useUpdateGenerationMutation();

  console.log("Gen: ", gen);
  const handleCreate = async (values: KartosFormTypes) => {
    const { data, error } = await createGeneration({
      input: {
        title: values.title,
        description: values.description,
        projectIds: listProjects.map(({ id }) => id),
        images: values.images.map((img) => {
          console.log(img.file);
          return img.file;
        }),
      },
    });
    if (error) {
      console.log("Error submitting: ", error);
    }
    console.log("res data: ", data);
  };
  const handleUpdate = async (values: KartosFormTypes) => {
    const { data, error } = await updateGeneration({
      id: gen.id,
      input: {
        title: values.title,
        description: values.description,
        projectIds: listProjects.map(({ id }) => id),
        images: values.images.map((img) => {
          console.log(img.file);
          return img.file;
        }),
      },
    });
    if (error) {
      console.log("Error updating: ", error);
    }
    console.log("res data: ", data);
  };
  return (
    <Formik<KartosFormTypes>
      initialValues={{
        title: gen?.title || "",
        description: gen?.description || "",
        images: [],
        search: "",
      }}
      onSubmit={create ? handleCreate : handleUpdate}
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
                  imageUrls={gen?.images || undefined}
                />
              </Box>
            </Flex>
            <Flex direction="column">
              <Heading textAlign="end" mb="1em" size="md">
                Kartos projektai
              </Heading>
              <Flex direction="column">
                {listProjects.map((p) => (
                  <ButtonGroup mb="0.3em" key={p.id} w="100%" isAttached>
                    <IconButton
                      aria-label="Išstrinti"
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
                      <Link href={`/projektai/${p.id}`} isExternal mx="0.5em">
                        {p.title}
                      </Link>
                    </Button>
                  </ButtonGroup>
                ))}
              </Flex>
              <SelectProjectsInput
                setListProjects={setListProjects}
                name="search"
              />
            </Flex>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AdminGenerationCard;
