import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Members from "../components/Members";
import Layout from "../components/Layout";
import NewestProjects from "../components/NewestProjects";

const Index: FC = () => {
  return (
    <>
      <Layout active="pagrindinis">
        <section className="top">
          <div className="landing-img"></div>
        </section>
        <NewestProjects />
        <Members />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

/*
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { useMembersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  const [{ data, fetching, error }] = useMembersQuery();
  if (error) {
    console.log("error: ", error);
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }
  if (!fetching && !data) {
    console.log("Query failed");
    return <h2>Query failed for some reason</h2>;
  }
  if (!data) return null;

  return (
    <div>
      {data.members?.map((m) => (
        <div key={m.id}>
          <img src={m.imageUrl!} alt="" />
          <div>{m.id}</div>
          <div>{m.fullName}</div>
          <div>{m.description}</div>
        </div>
      ))}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
*/
