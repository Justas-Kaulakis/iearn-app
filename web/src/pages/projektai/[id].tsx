import { withUrqlClient } from "next-urql";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { useProjectQuery } from "../../generated/graphql";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import parse from "html-react-parser";
import ProjectMeta from "../../components/ProjectMeta";
import { NextPage } from "next";

interface ProjectPageProps {}

export function getServerSideProps() {
  return { props: {} };
}

const ProjectPage: NextPage<{}> = ({}) => {
  const router = useRouter();
  const projectId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : "Bad";
  const [{ data, error, fetching }] = useProjectQuery({
    pause: projectId === "Bad",
    variables: {
      id: projectId as number,
    },
  });

  if (error) {
    console.log("Error: ", error);
  }
  if (error || data?.project?.error) {
    return (
      <Error
        statusCode={404}
        title={data?.project?.error || "Puslapis nerastas"}
      />
    );
  }
  const { project } = data?.project || { project: null };
  let body: string;
  let parsedBody: string | JSX.Element | JSX.Element[];
  if (project) {
    //body = project.body.replace(/&nbsp;/g, " ");
    body = project.body;
  }
  return (
    <>
      <Layout active="projektai">
        <div className="article-box">
          {!project || fetching ? null : (
            <>
              <div className="intro">
                <h1>{project.title}</h1>
                <p className="date-published">{project.publishedAt}</p>
                <hr />
              </div>
              <article className="body">{parse(body)}</article>
            </>
          )}
        </div>
      </Layout>
      <ProjectMeta project={project} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ProjectPage as any);
