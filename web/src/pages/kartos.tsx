import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import KartaCard from "../components/KartaCard";
import Fancybox from "../components/Fancybox";
import { useGenerationsQuery } from "../generated/graphql";

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  const [{ data, fetching }] = useGenerationsQuery();

  return (
    <Layout active="kartos">
      <div className="Base">
        {fetching || !data?.generations ? null : (
          <>
            {data?.generations.map((gen) => (
              <KartaCard key={gen.id} gen={gen} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kartos);
