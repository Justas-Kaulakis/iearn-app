import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Members from "../components/Members";
import Layout from "../components/Layout";
import NewestProjects from "../components/NewestProjects";

const Index: FC = () => {
  return (
    <Layout active="pagrindinis">
      <section className="top">
        <div className="landing-img"></div>
      </section>
      <h1 className="green-heading">Naujausi Projektai</h1>
      <NewestProjects />
      <h1 className="green-heading">Klubo nariai</h1>
      <Members />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
