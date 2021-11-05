import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import KartaCard from "../components/KartaCard";

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  return (
    <Layout active="kartos">
      <div className="Base">
        <KartaCard key={4538542} id={3}/>
        <KartaCard key={3548634234} id={2}/>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kartos);
