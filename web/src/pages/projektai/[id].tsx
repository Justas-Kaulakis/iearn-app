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
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { ChakraProvider } from "@chakra-ui/react";
import { stopAnimation } from "framer-motion/types/render/utils/animation";
import MediaShare from "../../components/MediaShare";
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
  if (project) {
    //body = project.body.replace(/&nbsp;/g, " ");
    body = project.body;
  }
  const shareUrl = `${process.env.NEXT_PUBLIC_FE_URL_BASE}/projektai/${project?.id}`;
  // const shareUrl = "https://www.youtube.com/watch?v=78oUN6QTKxI";
  return (
    <>
      <Layout active="projektai">
        <div className="article-box">
          {!project || fetching ? null : (
            <>
              <div className="intro">
                <h1>{project.title}</h1>
                <div className="article-meta">
                  <MediaShare
                    title={project.title}
                    url={shareUrl}
                    disabled={!project.isPublished}
                  />
                  <time dateTime={project.publishedAt}>
                    {project.publishedAt}
                  </time>
                </div>
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
