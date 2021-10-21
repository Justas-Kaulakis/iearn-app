import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  return (
    <Layout active="kartos">
      <h3>KARTOS</h3>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kartos);
