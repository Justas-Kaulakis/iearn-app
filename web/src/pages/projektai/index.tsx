import { Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useProjectsQuery } from "../../generated/graphql";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Pagination from "../../components/Pagination";

interface ProjektaiProps {
  page?: number;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Math.max(
    1,
    typeof query.page === "string" ? parseInt(query.page as string) : 1
  );
  console.log(query.page);
  return {
    props: {
      page,
    }, // will be passed to the page component as props
  };
};

const Projektai: NextPage<ProjektaiProps> = ({ page }) => {
  // console.log("PAGE: ", page);
  const perPage = 9;
  const [{ data, fetching, error }] = useProjectsQuery({
    variables: {
      offset: (page - 1) * perPage,
      limit: perPage,
    },
  });
  if (error) {
    console.log("ERROR: ", error);
  }
  if (fetching) {
    return null;
  }
  //if(data?.projects?.projects?.size)

  const totalPageNum = Math.max(1, Math.ceil(data?.projects?.total / perPage));
  if (page > totalPageNum) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout active="projektai">
      <div className="Base">
        <h1 className="green-heading">Projektai</h1>
        {!data?.projects?.projects ? (
          <h2>Projektų nėra</h2>
        ) : (
          <>
            <section className="projects-container wide">
              {data.projects?.projects?.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  imageUrl={p.imageUrl}
                  title={p.title}
                  description={p.description}
                  createdAt={p.createdAt}
                />
              ))}
            </section>
            <Pagination
              href="/projektai"
              currentPage={page}
              totalPageCount={totalPageNum}
              hasMore={data?.projects?.hasMore}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Projektai);
