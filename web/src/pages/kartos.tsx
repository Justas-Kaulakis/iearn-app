import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import KartaCard from "../components/KartaCard";
import { useGenerationsQuery } from "../generated/graphql";

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  const [{ data, fetching }] = useGenerationsQuery();

  if (fetching || !data?.generations) {
    return null;
  }

  return (
    <Layout active="kartos">
      <div className="Base">
        {data?.generations.map((gen) => (
          <KartaCard key={gen.id} gen={gen} />
        ))}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kartos);
