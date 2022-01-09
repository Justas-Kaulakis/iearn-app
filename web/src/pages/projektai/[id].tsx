import { withUrqlClient } from "next-urql";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { useIsLoggedInQuery, useProjectQuery } from "../../generated/graphql";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import parse from "html-react-parser";
import ProjectMeta from "../../components/ProjectMeta";
import { NextPage } from "next";
import MediaShare from "../../components/MediaShare";
import { FaEdit } from "react-icons/fa";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import GalleryCarousel from "../../components/GalleryCarousel";

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
  const [{ data: meData, fetching: meFetching }] = useIsLoggedInQuery();

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
  const { project, authorized } = data?.project || { project: null };
  let body: string;
  if (project) {
    //body = project.body.replace(/&nbsp;/g, " ");
    body = project.body;
  }
  const shareUrl = `${process.env.NEXT_PUBLIC_FE_URL_BASE}/projektai/${project?.id}`;
  // const shareUrl = "https://www.youtube.com/watch?v=78oUN6QTKxI";
  //console.log("Authorized: ", authorized);
  return (
    <>
      <Layout active="projektai">
        {/* <div
          className="Article-img"
          style={{ backgroundImage: `url("${project?.imageUrl}")` }}
        /> */}
        <img
          className="Article-img"
          src={project?.imageUrl}
          alt={project?.imageUrl}
        />
        <div className="article-box">
          {!project || fetching ? null : (
            <>
              <div className="intro">
                <h1 className="title">
                  {project.title}
                  {!meFetching && !meData.isLoggedIn ? null : (
                    <NextLink
                      href={`/admin/projektai/[id]`}
                      as={`/admin/projektai/${project.id}`}
                    >
                      <a className="edit-article" target={"edit" + project.id}>
                        <FaEdit size={25} color="#3182ce" />
                      </a>
                    </NextLink>
                  )}
                </h1>
                <div className="article-meta">
                  <div className="left">
                    <MediaShare
                      title={project.title}
                      url={shareUrl}
                      disabled={!project.isPublished}
                    />
                    {!meFetching && !meData.isLoggedIn ? null : (
                      <>
                        {project?.isPublished ? (
                          <div className="published-tag card-tag-green">
                            Paskelbta
                          </div>
                        ) : (
                          <div className="published-tag card-tag-red">
                            Nepaskelbta
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <time dateTime={project.publishedAt}>
                    {project.publishedAt}
                  </time>
                </div>
              </div>
              <article className="body">{parse(body)}</article>
              {/* <section className="bottom-pictures">
                <GalleryCarousel
                  data={Array(10)
                    .fill(0)
                    .map((_, i) => ({
                      id: i,
                      imageUrl: `https://lipsum.app/id/${i * 2}/1024x768`,
                      thumbnailUrl: `https://lipsum.app/id/${i * 2}/96x64`,
                      description: `Jonas ${i}`,
                    }))}
                />
              </section> */}
            </>
          )}
        </div>
      </Layout>
      <ProjectMeta project={project} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ProjectPage as any);
