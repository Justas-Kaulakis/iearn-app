import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Box, Flex, Grid, Link, Stack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import { requiredDropzoneValidation } from "../../components/DropzoneField";
import DropzoneFieldMulti from "../../components/DropzoneFieldMulti";
import InputField from "../../components/InputField";
import { createUrqlClient } from "../../utils/createUrqlClient";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useGenerationsQuery } from "../../generated/graphql";
import AdminGenerationCard from "../../components/AdminGenerationCard";
const SelectProjectsInput = dynamic(
  () => import("../../components/SelectProjectsInput"),
  { ssr: false }
);

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  const [{ data, fetching, error }] = useGenerationsQuery();

  if (error) {
    console.log("Error fetching Generations: ", error);
  }

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
        {fetching || !data?.generations ? null : (
          <Stack maxWidth="800px" mt="1em" spacing="1em">
            {data?.generations.map((gen) => (
              <AdminGenerationCard key={gen.id} gen={gen} />
            ))}
          </Stack>
        )}
      </div>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Kartos);
Kartos;
