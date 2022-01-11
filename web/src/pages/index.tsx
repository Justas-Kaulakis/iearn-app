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
          src="http://localhost:4000/api/images/landing-image.png"
          alt="Landing-image"
        />
      </section>
      <div className="Base">
        <AboutUs />
        <h1 className="green-heading">Naujausi Projektai</h1>
        <NewestProjects />
        <h1 className="green-heading">Klubo nariai</h1>
        <Members />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
