import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface IstorijaProps {}

const Istorija: FC<IstorijaProps> = ({}) => {
  return (
    <Layout active="istorija">
      <h3>ISTORIJA</h3>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Istorija);
