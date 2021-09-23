import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Error from "next/error";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useProjectQuery } from "../../generated/graphql";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import parse from "html-react-parser";
import Head from "next/head";
import ProjectMeta from "../../components/ProjectMeta";
import { NextPage } from "next";

interface ProjectPageProps { }

export function getServerSideProps() {
  return { props: {} };
}

const ProjectPage: NextPage<{}> = ({ }) => {
  const router = useRouter();
  const projectId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : "Bad";
  const [{ data, error, fetching }] = useProjectQuery({
    pause: projectId === "Bad",
    variables: {
      id: projectId as number,
    },
  });

  function youtube_parser(url: string): string | boolean {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

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
    body = project.body.replace(/&nbsp;/g, " ");

    parsedBody = parse(body, {
      replace: (node: any) => {
        if (!node?.attribs || node.type !== "tag" || node.name !== "oembed")
          return;

        if (!node?.attribs?.url) return <></>;
        console.log(node);
        const id = youtube_parser(node?.attribs?.url);
        if (!id) return;

        return (
          <div className="media-embed">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        );
      }
    });
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
              <article className="body">{parsedBody}</article>
            </>
          )}
        </div>
      </Layout>
      <ProjectMeta project={project} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ProjectPage as any);
