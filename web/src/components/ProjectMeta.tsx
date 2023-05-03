import React, { FC } from "react";
import Head from "next/head";

interface ProjectMetaProps {
  project: any;
}

const ProjectMeta: FC<ProjectMetaProps> = ({ project }) => {
  const link = `${process.env.NEXT_PUBLIC_FE_URL_BASE}/projektai/${project?.id}`;
  return (
    <>
      <Head>
        <title>{project?.title || "iEARN - Projetas"}</title>
        <link
          rel="shortcut icon"
          type="image/svg + xml"
          href="/Circle-Icon.svg"
        />
        <meta property="og:url" content={link} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={project?.title} />
        <meta property="og:description" content={project?.description} />
        <meta property="og:image" itemProp="image" content={project?.imageUrl} />
      </Head>
    </>
  );
};

export default ProjectMeta;
