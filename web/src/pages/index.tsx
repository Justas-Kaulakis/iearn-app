import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Members from "../components/Members";
import Layout from "../components/Layout";
import NewestProjects from "../components/NewestProjects";
import AboutUs from "../components/About";

const Index: FC = () => {
  return (
    <Layout active="pagrindinis">
      <section className="top">
        <img
          className="landing-img"
          src="/landing-image.webp"
          alt="Landing-image"
        />
      </section>
      <div className="Base">
        <AboutUs />
        <NewestProjects />
        <Members />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
