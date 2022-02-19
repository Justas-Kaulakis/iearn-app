import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { FC, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import { createUrqlClient } from "../../utils/createUrqlClient";
import dynamic from "next/dynamic";
import { useGenerationsQuery } from "../../generated/graphql";
import AdminGenerationCard from "../../components/AdminGenerationCard";
const SelectProjectsInput = dynamic(
  () => import("../../components/SelectProjectsInput"),
  { ssr: false }
);

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  const [{ data, fetching, error }, refetchGenerations] = useGenerationsQuery();

  if (error) {
    console.log("Error fetching Generations: ", error);
  }

  return (
    <AdminLayout active="kartos" pageTitle="Kartos">
      <AdminTopBar pageName="Kartos" />
      <div className="Admin-content">
        {fetching || !data?.generations ? null : (
          <Stack maxWidth="900px" mx="auto" spacing="1em">
            <Box display="block" >
              <AdminGenerationCard
                onCreateExtra={() => {
                  refetchGenerations({ requestPolicy: "network-only" });
                }}
                create
              />
            </Box>
            {data?.generations.map((gen) => (
              <AdminGenerationCard
                redoQuery={refetchGenerations}
                key={gen.id}
                gen={gen}
              />
            ))}
          </Stack>
        )}
      </div>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Kartos);
Kartos;
