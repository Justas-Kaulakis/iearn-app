import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import parse from "html-react-parser";
import { useHistoryQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface IstorijaProps {}

const Istorija: FC<IstorijaProps> = ({}) => {
  const [{ data, fetching, error }] = useHistoryQuery();

  if (!fetching) console.log(data?.history);
  return (
    <Layout active="istorija">
      <div className="Base">
        <h1 style={{ textAlign: "center" }} className="green-heading">
          i*EARN Klubo Istorija
        </h1>
        <div className="article-box">
          <article className="body">
            {fetching && !data?.history ? null : (
              <>{parse(data?.history.body)}</>
            )}
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Istorija);
