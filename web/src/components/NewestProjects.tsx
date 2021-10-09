import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { useProjectsQuery } from "../generated/graphql";
import Card from "./Card";

interface NewestProjectsProps {}

const NewestProjects: FC<NewestProjectsProps> = ({}) => {
  const [{ data, fetching, error }] = useProjectsQuery({
    variables: {
      offset: 0,
      limit: 3,
    },
  });
  if (error) {
    console.log("ERROR FETCHING PROJECTS: ", error);
  }
  if (fetching) {
    return null;
  }

  return (
    <section className="projects-container">
      {data.projects?.projects?.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          title={p.title}
          description={p.description}
          imageUrl={p.imageUrl}
        />
      ))}
      <div  className="card daugiau_projektu">
        <Link href="/projektai">
          <a>
            <h2>Daugiau projektų</h2>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default NewestProjects;
